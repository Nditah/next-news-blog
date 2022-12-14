import { categories } from "../constants"
import fetchNews from "../lib/fetchNews"
import NewsList from "./NewsList"
import newsJson from '../news.json'
import sortNewsByImage from "../lib/sortNewsByImage"

async function Homepage() {

    const news: NewsResponse = await fetchNews({ category: categories.join(',') }) // sortNewsByImage(newsJson) || 
    console.log(news)

  return (
    <div>
        <NewsList news={news} />
    </div>
  )
}

export default Homepage