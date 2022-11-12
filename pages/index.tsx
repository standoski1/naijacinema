import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LatestNews from '../components/LatestNews'
import { axiosInstance } from '../utils/axios'
import moment from 'moment'
import YouTube, { YouTubeProps } from 'react-youtube';
import Link from 'next/link'
import Search from '../components/Search'



export const getServerSideProps = async () => {
    try {
        const data = await(await axiosInstance.get("api/controller/post/getpost")).data
        const youtube = await(await axiosInstance.get("api/controller/youtube/youtube")).data
       return {
         props: {
           data,
           youtube
         }
       };
   } catch (error:any) {
       return {
           props: {
               error: error.message
           },
       };
   }
     
   }

const Home: NextPage = ({data, error, youtube}:any) => {

    if (error) {
       console.log(error);  
    }

    const [Movies, setMovies] = useState<any[]>([])
    const [News, setNews] = useState<any[]>([])


    useEffect(() => {
      const movs = data?.filter(x=>x.category === "Movies")
      setMovies(movs)
      const news = data?.filter(x=>x.category === "News")
      setNews(news)
    }, [data])


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };
    
      const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    
    
    
  return (
    <div>
      <Head>
        <title>Naija Cinemas: we provide all movies, time, duration, date, showing on all nigeria cinemas</title>
        <meta property="og:title" content="Naija Cinemas: we provide all movies, time, duration, date, showing on all nigeria cinemas"/>
        <meta property="og:description" content="Nigeria Cinemas movie guide, we gather all movies showing in all cinemas in nigeria, and also their address, so you can always count on us."/>
        <meta property="og:image" content="/img/cinemas2.png"/>
        <meta property="og:url" content="https://naijacinemas.com?"/>
        <meta name="description" content="Nigeria Cinemas movie guide, we gather all movies showing in all cinemas in nigeria, and also their address, so you can always count on us."></meta>
        <meta name="keywords" content="Nigeria Cinemas, movies, best nigeria cinema, all nigeria cinema"></meta>
      </Head>

      <Header/>

      
     <Search/>
    
    <section className="intro-news-area section-padding-100-0 mb-70">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="intro-news-tab">

                        <div className="intro-news-filter d-flex justify-content-between">
                            <h6>Trending Movies</h6>  
                        </div>

                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-1" role="tabpanel" aria-labelledby="nav1">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="single-blog-post style-2 mb-5">
                                            <div className="blog-thumbnail">
                                                <Link href={`/post/${Movies[0]?.slug}`}><a><img src={Movies[0]?.image} style={{width:'100%', height:'500px'}} alt={Movies[0]?.title}/></a></Link>
                                            </div>

                                            <div className="blog-content">
                                                <span className="post-date">{moment(Movies[0]?.createdAt).fromNow()}</span>
                                                <Link href={`/post/${Movies[0]?.slug}`}><a className="post-title">{Movies[0]?.title}</a></Link>
                                                <a className="post-author mb-30">By Mercy</a>
                                            </div>
                                        </div>
                                    </div>
                                    {Movies?.slice(1,5).map((data,i)=>(
                                    <div className="col-12 col-sm-6" key={i}>
                                        <div className="single-blog-post style-2 mb-5">
                                            <div className="blog-thumbnail">
                                            <Link href={`/post/${data?.slug}`}><a><img src={data?.image} style={{width:'100%', height:'450px'}} alt={Movies[0]?.title}/></a></Link>
                                            </div>
                                            <div className="blog-content">
                                                <span className="post-date">{moment(data?.createdAt).fromNow()}</span>
                                                <Link href={`/post/${data?.slug}`}><a className="post-title">{data?.title}</a></Link>
                                                <a className="post-author">By Mercy</a>
                                            </div>
                                        </div>
                                    </div>
                                   ))}
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-9 col-md-6 col-lg-4">
                    <div className="sidebar-area">

                        <LatestNews News={News}/>

                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <div className="big-add-area">
        <div className="container-fluid">
            <img src="/img/cinema5.jpg" style={{width:'100%',height:'200px',objectFit:'cover'}} alt="nigeria cinemas"/>
        </div>
    </div>

   
    <div className="news-area section-padding-100-70">
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 col-lg-8">

                <div className="intro-news-filter d-flex justify-content-between">
                    <h6>Latest News</h6>  
                </div>
                 {News?.slice(0,3).map((data,i)=>(
                    <div className="single-blog-post d-flex flex-wrap style-5 mb-30" key={i}>
                        <div className="blog-thumbnail">
                        <Link href={`/post/${data?.slug}`}><a><Image src={data?.image} width='800px' height='500px' alt={data?.title}/></a></Link>
                        </div>
                        <div className="blog-content">
                            <span className="post-date">{moment(data?.createdAt).fromNow()}</span>
                            <Link href={`/post/${data?.slug}`}><a className="post-title">{data?.title}</a></Link>
                            <a className="post-author">By Mercy</a>
                            <p dangerouslySetInnerHTML={{ __html: data?.text.slice(0,150) + "&hellip;"}}></p>
                        </div>
                    </div>
                  ))}
                </div>

                <div className="col-12 col-md-4 col-lg-4">

                <div className="intro-news-filter d-flex justify-content-between">
                    <h6>Trending Youtube Videos</h6>  
                </div>
                    {youtube?.slice(0,2).map((data,i)=>(
                    <div className="single-blog-post style-6 mb-30" key={i}>
                        <div className="blog-thumbnail">
                        <YouTube videoId={data.youtube_id} title="beautiful cat" opts={opts} onReady={onPlayerReady} style={{width:'100%',height:'350px'}}/>
                        </div>
                         <br />
                        <div className="blog-content">
                            <span className="post-date">{moment(data?.createdAt).fromNow()}</span>
                            <p className="post-title">{data.title}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>

    <Footer/>

    </div>
  )
}

export default Home
