import React, {useState, useEffect} from 'react';
import Form from './Form';

const App =() => {
  const [news, setNews] = useState([])
  const [term, setTerm] = useState('everything')
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    const fetchNews = async() => {
    try {
        const resp = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=fims88uExPwUnhdhP8m2rQSsP5njWulj`)
        const news = await resp.json()
        setNews(news.response.docs)
        setLoading(false)
        console.log(news)
      }
      catch (error) {
      console.log(error)
    } 
    }
    fetchNews()
  }, [term])
  return (
    <div className="App">
      <>
        <div className="showcase">
          <div className="overlay px-5">
            <h1 className="text-3xl font-bold text-white text-center mb-4 lg:text-5xl capitalize">News on {term}</h1>
            <Form searchText= {(search) => setTerm(search)}/>
          </div>
        </div>
        
        {loading ? (<h1 className="text-5xl font-bold text-white text-center mt-20">Loading ...</h1>) 
        : 
        (<section className="px-5 pt-10 pb-20 grid grid-cols-1 gap-10">
          {news.map((news) =>{
            const {abstract, headline:{main}, byline:{original}, lead_paragraph, news_desk, source, section_name, web_url, _id} = news

            return (
              <article key={_id} className="bg-white py-10 px-5 article rounded-lg lg:w-9/12 mx-auto">
                
                <h2 className="text-3xl font-bold lg:text-3xl my-2">{main}</h2>
                <h1 className="text-2xl font-bold mb-5 mt-2">{section_name}</h1>
                <p>{abstract}</p>
                <p >{lead_paragraph}</p>

                <ul className='my-4'>
                  <li><span className="text-1xl font-bold">Brought to us by:</span> {original}</li>
                  <li><span className="text-1xl font-bold">Source:</span> {source}</li>
                  <li><span className="text-1xl font-bold">News-Desk:</span> {news_desk}</li>
                </ul>
                <a href={web_url} target="_blank" className="underline" rel="noreferrer">Web Resources</a>
              </article>
            )
          })}
        </section>)}
      </>
    </div>
  );
}

export default App;
