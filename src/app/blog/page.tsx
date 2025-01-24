import ArticleItemList from "../../components/articleListItem";
import { getCategorisedArticles } from "../../../lib/articles";
import Link from 'next/link';


export default function Page() {
  const articles = getCategorisedArticles()

  return (
    <div className='min-h-screen bg-[#FDF7F2] p-8'>
      <div className="max-w-screen-2xl mx-auto">
        <section className="flex justify-between items-center">
            <div>
              <Link href="/" className='text-decoration-line: underline'>Liam So</Link>
              <p>Software Engineer at ResMed</p>
            </div>
            <div className='flex gap-6'>
              <Link href="/blog" className="cursor-pointer hover:text-gray-600">Blog</Link>
              <a href="https://github.com/Liam-So" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-gray-600">Github</a>
            </div>
        </section>
      </div>
    
      {/* Blog Section */}
      <section id="blog" className="py-16 px-4">
        <section className="flex flex-col max-w-screen-2xl mx-auto">
          {articles !== null && Object.keys(articles).map((article, index) => (<ArticleItemList key={index} category={article} articles={articles[article]} />))}
          </section>
      </section>

    </div>
  )
}