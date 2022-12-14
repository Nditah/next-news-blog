export default function sortNewsByImage(news: NewsResponse): NewsResponse {
    const newsWithImage = news.data.filter((item) => !!item.image)
    const newsWithoutImage = news.data.filter((item) => !item.image)
    return {
        ...news,
        data: [...newsWithImage, ...newsWithoutImage]
    }
}
