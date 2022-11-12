import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { axiosInstance } from '../../utils/axios'
import moment from 'moment'
import Image from 'next/image'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    
  } from 'next-share';
import { useRouter } from 'next/router'
import AllLatestNews from '../../components/allLatestNews'
import Swal from 'sweetalert2'
import Head from 'next/head'




export const getServerSideProps = async (context) => {
    const slug = context.params.slug
    
    try {
        const data = await(await axiosInstance.get("api/controller/post/getpost")).data
        const singdata = await(await axiosInstance.put(`api/controller/post/${slug}`)).data
       return {
         props: {
           data,
           slug,
           singdata
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


export default function Single({data, error, slug, singdata}:any) {

    if (error) {
        console.log(error);  
     }

     const [News, setNews] = useState<any[]>([])
     const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;
    const [Comment, setComment] = useState({
        name:'', text:'', post_id:singdata._id
    })
    const [NewComment, setNewComment] = useState<any[]>([])
     
     
     useEffect(() => {
       const news = data?.filter(x=>x.category === "News" && x.slug !== slug)
       setNews(news)
     }, [data])


     useEffect(() => {
        getPost()
     }, [singdata])
     
     const getPost = async()=>{
        await axiosInstance.put("api/controller/comment/createcomment",{post_id:singdata._id}).then((res)=>{
            setNewComment(res.data)
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'something went wrong, please try again',
                showConfirmButton: false,
                timer: 5000
              })
        })
     }


     const handleSubmit = async(e)=>{
        e.preventDefault()
        await axiosInstance.post("api/controller/comment/createcomment", {Comment}).then((res)=>{
            setNewComment(prev=> [res.data, ...prev])
            document.getElementById("myForm").reset()
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'something went wrong, please try again',
                showConfirmButton: false,
                timer: 5000
              })
        })
     }
  

       

  return (
    <div>

      <Head>
        <meta property="og:title" content={singdata?.title}/>
        <meta property="og:image" content={singdata?.image}/>
        <meta property="og:url" content={`https://naijacinemas.com/post/${singdata?.slug}?`}/>
        <title>{singdata?.title}</title>
     </Head>
        
        <Header/>
    
    
    
    <section className="post-news-area section-padding-100-0 mb-70" style={{marginTop:'5rem'}}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="post-details-content mb-100">

                    <div className="post-content">
                        <h1 className="post-title mb-5">{singdata?.title}</h1>
                        <div className="d-flex align-items-center mb-5">
                            <span className="post-date mr-30"><i className='fa fa-calendar'></i>&nbsp; {moment(singdata?.createdAt).fromNow()}</span>
                            <span className="post-date"><i className='fa fa-user'></i>&nbsp; &nbsp;By Mercy</span>
                        </div>
                    </div>
                    
                    <img className="mb-30" src={singdata?.image} alt={singdata?.title} style={{width:'100%', height:'550px'}}/>

                    <span>
                    <span>Kindly share this story:</span>
                     &nbsp;&nbsp;
                    <FacebookShareButton
                    url={URL}
                    quote={singdata?.title}
                    >
                    <FacebookIcon size={32} round />
                    </FacebookShareButton>  &nbsp;&nbsp;&nbsp;

                    <TwitterShareButton
                    url={URL}
                    title={singdata?.title}
                    >
                    <TwitterIcon size={32} round />
                    </TwitterShareButton> &nbsp;&nbsp;&nbsp;

                    <LinkedinShareButton 
                    url={URL}>
                    <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    </span>

                    <br /><br />
            
                    <p dangerouslySetInnerHTML={{ __html: singdata?.text}}></p>

                    </div>

                    <div className="comment_area clearfix mb-100">
                        <h4 className="mb-40">Comments</h4>

                        <ol>
                            {NewComment?.map((data,i)=>(
                            <li className="single_comment_area" key={i}>
                                <div className="comment-content d-flex">
                                    <div className="comment-author">
                                        <img src="/img/image3.jpg" alt="author"/>
                                    </div>
                                    <div className="comment-meta">
                                        <div className="d-flex">
                                            <a className="post-author">{data.name}</a>
                                            <a className="post-date">{moment(data.createdAt).fromNow()}</a>
                                        </div>
                                        <p>{data.text}</p>
                                    </div>
                                </div>
                            </li>
                           ))}
                        </ol>
                    </div>

                    <div className="post-a-comment-area mb-30 clearfix">
                        <h4 className="mb-50">Leave a reply</h4>

                        <div className="contact-form-area">
                            <form id='myForm'>
                                <div className="row">
                                    
                                    <div className="col-12">
                                        <input onChange={(e)=>setComment({...Comment, name:e.target.value})} type="text" className="form-control" id="subject" placeholder="name"/>
                                    </div>
                                    <div className="col-12">
                                        <textarea onChange={(e)=>setComment({...Comment, text:e.target.value})} name="message" className="form-control" id="message" cols={30} rows={10} placeholder="Message"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button onClick={handleSubmit} className="btn newsbox-btn mt-30">Submit Comment</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-9 col-md-6 col-lg-4">
                    <div className="sidebar-area">

                        <AllLatestNews News={News}/>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer/>
    </div>
  )
}
