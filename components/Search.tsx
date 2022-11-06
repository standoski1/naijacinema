import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Search() {

  const [Search, setSearch] = useState('')
  const router = useRouter()


  return (
    <div className="catagory-featured-post bg-overlay clearfix" style={{backgroundImage:'url(/img/cinema4.jpg)',marginTop:'3.7rem'}}>
        <div className="container-fluid h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12 col-lg-9">
                    <div className="post-content">
                        <h1 className="post-title">Welcome To <br/> Naija Cinemas</h1>
                        <p>We offer you updates on the latest blockbusters showing in cinemas around you and also latest entertainment news, and exciting movie reviews.
                          you can be rest assured that we have you covered when moving to another state, as you can find every cinema in every state, right here..
                        </p>
                        

                        <div className="row height d-flex justify-content-center align-items-center">
                         <div className="col-md-8">
                        <div className="search">
                          <i className="fa fa-search"></i>
                          <input onChange={(e)=>setSearch(e.target.value)} type="text" className="form-control" placeholder="Search for Cinema e.g Silverbird Cinema?"/>
                          <button onClick={()=> router.push(`/query/cinemas?query=${Search}`)} className="btn btn-primary">Search</button>
                        </div>
                         </div>
                      </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
