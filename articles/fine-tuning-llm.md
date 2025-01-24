---
title: "Adventures in Structured Prompting: Making LLMs Output Valid JSON"
category: "Tech Blogs"
date: "07-11-2024"
---

# Adventures in Structured Prompting: Making LLMs Output Valid JSON

One of the biggest and most humbling challenges I faced when developing FinTrack was getting LLMs to **consistently** return JSON in the format that I wanted. Below marks some of the iterations I went through when developing the application.

## First Solution: Begging the LLM to return it the way I wanted

When first playing around with LLMs, I decided to provide a prompt instructing it to return JSON data, then ran a regex expression to extract JSON. My plan was to keep retrying this until the LLM got it right.

```python
def get_transaction_prompt(categories: list, descriptions: str) -> str:
    return f"""
You are an AI assistant designed to categorize financial transactions with extreme precision.

Your task is to classify each description into EXACTLY ONE of the provided categories. You must ONLY use categories from the given list. No exceptions.
Categories:
{categories}

Output Format:
Output your response as a list of categories, one for each description, in the same order as the input descriptions.
It should be JSON readable.

Example:
["Category1", "Category2", "Category3", ...]
"""
```

As you can probably guess, the LLM was extremely inconsistent with its responses. At times, it would create its own categories despite my emphasis that it **must** use only the given list. Worse, it would sometimes return text explanations instead of JSON.

This solution proved to be a bottleneck because as the input data grew, so did processing time—retries added significant overhead. How could I do better?

## Second Solution: Specifying JSON as an Output Format

I discovered that some LLM APIs allow specifying JSON as the output format. Ollama, for example, has a built-in option to enforce JSON output:

```python
def send_to_ollama(prompt, model="llama3.1"):
  payload = {
    "model": model,
    "prompt": prompt,
    "stream": False,
    "format": "json",
    "options": {
      "temperature": 0.1,
      "top_p": 0.9,
      "top_k": 10
    }
  }
  
  try:
      response = requests.post(OLLAMA_API_URL, json=payload, timeout=30)
      response.raise_for_status()
      return response.json()["response"]
  except requests.RequestException as e:
      return f"Error calling Ollama API: {str(e)}"
```

This significantly improved consistency in returning JSON. However, I still ran into a major issue: the LLM continued generating **invalid categories** not present in my list.

### Example:

#### Input:
```
Categories:
1. 🛒 Groceries
2. 🏠 Rent
3. 💡 Utilities
4. 🍽️ Dining Out
5. 🍷 Drinks
6. 🎭 Entertainment
7. 🛍️ Shopping
8. 🚗 Transportation
9. 💪🏼 Health
10. ✈️ Travel
11. 📦 Subscriptions
```

#### Transactions:
```
1. CANADIAN TIRE #081 MONTREAL QC
2. VIDEOTRON LTEE 877-512-0911 QC
3. HYDRO-QUEBEC MTLHYDRO QC
4. BELL MOBILITY 888-333-2811 QC
5. ECONOFITNESS MONT-ROYAL MTL QC
6. TIM HORTONS #4223 MONTREAL QC
7. UBER *TRIP-WX5F2 MONTREAL QC
8. LA BANQUISE MONTREAL QC
9. PETRO-CANADA #4421 MONTREAL QC
10. NETFLIX.COM NETFLIX.COM QC
11. AMZN.CA*2H4LL8N23 MONTREAL QC
12. METRO ETS BERRI MONTREAL QC
```

#### Output:
```json
{
  "1": "🛒 Groceries",
  "2": "🛜 Wifi",
  "3": "💡 Utilities",
  "4": "💡 Utilities",
  "5": "💪🏼 Health",
  "6": "🍽️ Restaurants",
  "7": "🚗 Transportation",
  "8": "🍽️ Dining Out",
  "9": "🛒 Groceries",
  "10": "📦 Subscriptions",
  "11": "️🎥 Misc",
  "12": "🛒 Groceries"
}
```

The model introduced **“🛜 Wifi”** and **“️🎥 Misc”**, categories that did not exist in my provided list. Furthermore Canadian Tire was also misclassified as **Groceries** when it should be **Shopping**, and **🍽️ Restaurants** was used instead of **🍽️ Dining Out**. Clearly, I needed stricter enforcement.

## Third Solution: Pydantic + OpenAI

To strictly enforce category selection, I switched to **Pydantic** and OpenAI’s structured output feature:

```python
from enum import Enum
from pydantic import BaseModel

class Category(str, Enum):
  GROCERIES = "🛒 Groceries"
  DINING = "🍽️ Dining Out"
  DRINKS = "🍷 Drinks"
  RENT = "🏠 Rent"
  ENTERTAINMENT = "🎭 Entertainment"
  UTILITIES = "💡 Utilities"
  SHOPPING = "🛍️ Shopping"
  TRANSPORTATION = "🚗 Transportation"
  TRAVEL = "✈️ Travel"
  HEALTH = "💪🏼 Health"
  SUBSCRIPTIONS = "📦 Subscriptions"

class CategorizedTransaction(BaseModel):
  description: str
  category: Category

class CategorizedTransactions(BaseModel):
  transactions: list[CategorizedTransaction]

def send_to_openai(prompt, model=OPEN_AI_MODEL):
   try:
      start = time.time()
      print(f'Starting inference ✨')

      completion = client.beta.chat.completions.parse(
          model=model,
          messages=[
              {"role": "system", "content": "You are a precise classifier. Categorize the transactions strictly using the provided categories."},
              {"role": "user", "content": prompt}
          ],
          response_format=CategorizedTransactions,
          max_tokens=1000
      )
      
      categorization_task = completion.choices[0].message
      end = time.time()
      return categorization_task
   except Exception as e:
      print(e)
      return None
```

### Why This Worked
1. **Strict Schema Validation:** Using `Pydantic`, the model can only return categories from a predefined list, eliminating hallucinated categories.
2. **OpenAI’s JSON Mode:** Ensures structured JSON output without additional parsing logic.
3. **Lower Processing Time:** Eliminating retries significantly reduced latency.

## Conclusion
This journey taught me that **LLMs are not naturally reliable JSON generators**, and enforcing structure requires more than just good prompting. By leveraging API features like OpenAI’s structured outputs and enforcing schema validation with Pydantic, I was able to make my transaction categorization process both **fast** and **accurate**.

If you're working with structured data and LLMs, consider:
- Using built-in API features like `format: "json"`.
- Applying strict validation with schema libraries like Pydantic.
- Choosing models that allow parsing into structured types.


