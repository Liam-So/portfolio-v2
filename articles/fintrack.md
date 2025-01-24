---
title: "Building FinTrack: A Privacy-Focused Approach to Budgeting with AI"
category: "Tech Blogs"
date: "04-12-2024"
---

<!-- Sample of how to reference an image -->
<!-- ![Art](/dashboard.png) -->

# Building FinTrack: A Privacy-Focused Approach to Budgeting with AI

Managing personal finances should be a core routine in anyone's life—especially young adults. As I'm writing this, nearly half of Canadians reported that [rising prices were greatly affecting their ability to meet day-to-day expenses](https://www.statcan.gc.ca/o1/en/plus/7305-lets-talk-about-money). With increasing rents and inflation, financial literacy is more important than ever, and it all starts with budgeting.

Budgeting should be simple, but I found existing tools lacking in key areas:

## The Problem: Why Existing Solutions Didn’t Work for Me
- **No open banking in Canada** – Unlike other countries, there’s no seamless way to link bank accounts, meaning manual tracking was my only option.
- **Lack of a visually appealing, free option** – Most budgeting apps had outdated interfaces or required a subscription fee.
- **Privacy concerns** – I wasn’t comfortable handing over my financial data to third-party services.

For a while, I relied on a spreadsheet, but categorizing every transaction manually was tedious. It used to take me **15 minutes** to categorize and budget my expenses each session. I wanted an automated, privacy-first solution that could **reduce that time significantly**.

## The Solution: Building My Own Finance Tracker
My goal was to create a tool that:

1. Automates transaction categorization
2. Prioritizes data privacy
3. Provides a clean and intuitive UI

The app allows users to upload transactions manually via CSV. To ensure privacy, all processing is done locally using **Ollama**, meaning financial data never leaves the user’s machine. In the demo version, I leverage OpenAI's API to categorize transactions but only send descriptions—never personally identifiable information (PII).

## Challenges & Technical Decisions
- **No Open Banking = No Automatic Data Import**  
  - Since I couldn’t fetch transactions directly from banks, I built a CSV ingestion system to standardize inputs.
- **Ensuring Accurate Categorization**  
  - Manual categorization was slow, so I fine-tuned structured prompting for an LLM to categorize transactions efficiently. The system is modular, allowing me to swap different LLM models as needed.
- **Balancing Privacy with AI**  
  - Running everything locally with **Ollama** meant keeping data secure, but I needed to ensure it could still function effectively.

## Results: 87% Faster Budgeting
What used to take me **15 minutes** now only takes **2 minutes** per session—an **87% reduction in time spent budgeting**. By leveraging structured prompting and local AI processing, I was able to automate the majority of the categorization work, making budgeting far less tedious.

## Future Improvements
I plan to integrate **pgvector** to further improve transaction categorization by matching new transactions with previously categorized ones. This will enhance accuracy and reduce the need for manual adjustments over time. Additionally, I want to refine the user experience, making it even easier to navigate and customize.

## Final Thoughts
This project started as a way to solve my own problem, but it reinforced key principles I value as a developer—**privacy, automation, and usability**. I’m continuing to refine the system, and I hope it can help others who face similar challenges with financial tracking. If you're interested in privacy-focused finance tools or have ideas for improving AI-driven categorization, I’d love to connect!

