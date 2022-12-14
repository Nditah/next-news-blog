import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';

interface FetchNewsParams {
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
    date?: string,
    languages?: string,
    countries?: string,
}

const fetchNews = async (data: FetchNewsParams) => {
    const { category, keywords, isDynamic, date, languages, countries } = data;
    // graphql query
    const GET_QUERY = gql `
        query MyQuery(
            $access_key: String!, 
            $categories: String!, 
            $keywords: String, 
            $date: String, 
            $languages: String,  
            $countries: String, 
            $sort: String, 
            $limit: Int) {
        myQuery(
            access_key: $access_key
            categories: $categories
            keywords: $keywords
            date: $date
            languages: $languages
            countries: $countries
            sort: $sort
            limit: $limit
        ) {
            data {
            author
            category
            country
            description
            image
            language
            published_at
            source
            title
            url
            }
            pagination {
            total
            offset
            limit
            count
            }
        }
    }
    `

    // fetch function with Nextjs 13 caching
    const res = await fetch('https://pazardzhik.stepzen.net/api/altered-grizzly/__graphql', {
        method: 'POST',
        cache: isDynamic ? 'no-cache' : 'default',
        next: isDynamic ? { revalidate: 0 } : { revalidate: 300 },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query: GET_QUERY, 
            variables: {
                access_key: `${process.env.MEDIASTACK_API_KEY}`,
                categories: category || 'business,sports',
                keywords,
                date,
                languages: languages || 'en',
                countries: countries || 'ng, gb, us',
                sort: "published_desc",
                limit: 5
            }
        })
    })
 
    const response = await res.json()
    
    // Sort function by images vs images not present 

    const news = sortNewsByImage(response?.data?.myQuery)
    
    // return response as result
    return news;

}

export default fetchNews;

 

