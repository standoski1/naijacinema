import Image from 'next/image'
import React from 'react'
import moment from 'moment'
import Link from 'next/link'

export default function LatestNews({News}) {
  return (
    <div className="single-widget-area news-widget mb-30">
          <div className="intro-news-filter d-flex justify-content-between">
                    <h6>Trending News</h6>  
          </div>
          {News?.slice(3,15).map((data,i)=>(
        <div className="single-blog-post d-flex style-4 mb-30" key={i}>
            <div className="blog-thumbnail">
            <Link href={`/post/${data?.slug}`}><a><Image src={data?.image} width='800px' height='550px' alt=""/></a></Link>
            </div>
            <div className="blog-content">
                <span className="post-date">{moment(data?.createdAt).fromNow()}</span>
                <Link href={`/post/${data?.slug}`}><a className="post-title">{data?.title}</a></Link>
            </div>
        </div>
          ))}
    </div>
  )
}
