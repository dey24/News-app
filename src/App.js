import React, {useState, useEffect} from 'react';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import Weather from './Weather';
import StockTable from './Stocks';

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

  const currentDate = new Date();
  const day = currentDate.toLocaleString('default', { day: 'numeric' });
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.toLocaleString('default', { year: 'numeric' });
  const [time, setTime] = useState(currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));

  useEffect(() => {
    const updateTime = () => {
      const newDate = new Date();
      setTime(newDate.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true}))
    }
    const msUntilNextMin = 60000 - (currentDate.getSeconds()* 1000 + currentDate.getMilliseconds());
    
    let intervalId;
    let timeoutID;

    timeoutID = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60000);
    }, msUntilNextMin);
    // const timeoutID = setTimeout(() => {
    //   updateTime();
    //   let intervalId = setInterval(updateTime, 60000);
    //   timeoutID.intervalId = intervalId;
    // },msUntilNextMin)

    return function cleanup(){
      clearTimeout(timeoutID);
      clearInterval(intervalId);
    }
  })
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
        (<section className="px-5 pt-5 pb-20 grid grid-cols-1 gap-10">
        <div className="flex justify-around gap-56">
            <div className=" rounded-lg text-left max-w-xl">
              <div className="flex  items-center mb-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-800 mr-2" />
                <p className="text-3xl font-bold text-gray-800">{`${day} ${month} ${year}`}</p>
              </div>
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faClock} className="text-gray-600 mr-2" />
                <p className="text-2xl font-medium text-gray-600">{time}</p>
                {/* <p className="text-2xl font-medium text-gray-600">{currentDate}</p> */}
              </div>
            </div>
            <div>
              <Weather /> 
            </div>
          </div>
          

        
          {news.map((news) =>{
            const {abstract, headline:{main}, byline:{original}, lead_paragraph, news_desk, source, section_name, web_url, _id} = news

            return (
              <article key={_id} className="bg-white py-10 px-5 article rounded-lg lg:w-9/12 mx-auto drop-shadow-2xl">
                
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
