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
                        <a className="post-title">Welcome To <br/> Naija Cinemas</a>
                        <p>Nullam lacinia ex eleifend orci porttitor, suscipit interdum augue condimentum. Etiam pretium turpis eget nibh laoreet iaculis. Proin ac urna at lectus volutpat lobortis. Vestibulum venenatis iaculis diam vitae lobortis. Donec tincidunt viverra elit, sed consectetur est pr etium ac. Mauris nec mauris tellus. </p>
                        

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
