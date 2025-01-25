import { getArticleData } from "../../../lib/articles"
import Link from "next/link"

import {ArrowLeft} from "lucide-react"

const Article = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug
  const articleData = await getArticleData(slug)

  return (
    <div className="min-h-screen bg-[#FDF7F2]">
      <section className="max-w-screen-lg mx-auto px-4 py-16">
        <div className="flex justify-between pb-4">
          <Link href={"/blog"} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <p>back to blogs</p>
          </Link>
          <p>{articleData.date.toString()}</p>
        </div>
        <article className="article" dangerouslySetInnerHTML={{__html: articleData.contentHtml}}></article>
      </section>
    </div>
  )
}

export default Article