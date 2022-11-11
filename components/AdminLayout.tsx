import Link from "next/link";
import * as React from 'react';
import { ReactElement, useEffect, useState } from "react";
import Footer from "./AdminFooter";
import { useDispatch } from 'react-redux'
import { logoutUser } from "../redux/userSlice";
import { useRouter } from "next/router";



export default function Layout({children}: {children: ReactElement}) {

    const [sideBar, setsideBar] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const routepath = router.asPath
    
    

    useEffect(() => {  

        if (sideBar === true) {
            document.body.classList.add('sidenav-toggled');
        }
        else{
            document.body.classList.remove('sidenav-toggled');        
        }
        }, [sideBar])

        const handletoggle = ()=>{
            setsideBar(!sideBar)
            console.log("clicked");
    }


    const handleLogout = ()=>{
        dispatch(logoutUser())
    }

       


    if (routepath === '/naija_admin'|| routepath === '/naija_admin/update' || routepath === '/naija_admin/addcinemas'
      || routepath === '/naija_admin/addmovies' || routepath === '/naija_admin/youtube') {
    
    return(
       <>
         <div className="nav-fixed body">
          <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
            
            <button onClick={handletoggle} className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><i className="fa fa-bars fa-2x"></i></button>
            
            <a className="navbar-brand pe-3 ps-4 ps-lg-2" href="/"> <img src="/img/cinemas2.png" style={{width:'30px',height:'25px'}} alt="naijacinemas" /></a>
            
            <form className="form-inline me-auto d-none d-lg-block me-3">
                <div className="input-group input-group-joined input-group-solid">
                    <input className="form-control pe-0" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-text"><i data-feather="search"></i></div>
                </div>
            </form>
            
            <ul className="navbar-nav align-items-center ms-auto">
                
                
                <li className="nav-item dropdown no-caret me-3 d-lg-none">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="searchDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="search"></i></a>
                    
                    <div className="dropdown-menu dropdown-menu-end p-3 shadow animated--fade-in-up" aria-labelledby="searchDropdown">
                        <form className="form-inline me-auto w-100">
                            <div className="input-group input-group-joined input-group-solid">
                                <input className="form-control pe-0" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-text"><i data-feather="search"></i></div>
                            </div>
                        </form>
                    </div>
                </li>
                
                
                
                <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                <a style={{textDecoration:'none'}} className="dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i style={{color:'grey',fontSize:'23px',marginRight:'5px'}} className="fa fa-user-circle-o"></i><i style={{color:'grey',fontSize:'20px',marginRight:'10px',marginTop:'-8px'}} className="fa fa-sort-desc"></i></a>
                    <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                        <h6 className="dropdown-header d-flex align-items-center">
                            <img className="dropdown-user-img" src="assets/img/illustrations/profiles/profile-1.png" />
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">Valerie Luna</div>
                                <div className="dropdown-user-details-email">vluna@aol.com</div>
                            </div>
                        </h6>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#!">
                            <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                            Account
                        </a>
                        <a onClick={handleLogout} className="dropdown-item" style={{cursor:'pointer'}}>
                            <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav className="sidenav shadow-right sidenav-light">
                    <div className="sidenav-menu">
                        <div className="nav accordion" id="accordionSidenav">


                            <div className="sidenav-menu-heading">Super Admin</div>
                            
                            <Link href="/naija_admin">
                               <a className={`nav-link ${routepath === "/naija_admin" && "active"}`}>
                                <div className="nav-link-icon"><i data-feather="filter"></i></div>
                                Create Blog
                               </a>
                            </Link>
                            <Link href="/naija_admin/update">
                               <a className={`nav-link ${routepath === "/naija_admin/update" && "active"}`}>
                                <div className="nav-link-icon"><i data-feather="filter"></i></div>
                                Edit Blog
                               </a>
                            </Link>
                            <Link href="/naija_admin/addcinemas">
                               <a className={`nav-link ${routepath === "/naija_admin/addcinemas" && "active"}`}>
                                <div className="nav-link-icon"><i data-feather="filter"></i></div>
                                add Cinema
                               </a>
                            </Link>
                            <Link href="/naija_admin/addmovies">
                               <a className={`nav-link ${routepath === "/naija_admin/addmovies" && "active"}`}>
                                <div className="nav-link-icon"><i data-feather="filter"></i></div>
                                add Movies
                               </a>
                            </Link>

                            <Link href="/naija_admin/youtube">
                               <a className={`nav-link ${routepath === "/naija_admin/youtube" && "active"}`}>
                                <div className="nav-link-icon"><i data-feather="filter"></i></div>
                                add Youtube
                               </a>
                            </Link>
                            
                    </div>
                    </div>
               
                    <div className="sidenav-footer">
                        <div className="sidenav-footer-content">
                            <div className="sidenav-footer-subtitle">Logged in as:</div>
                            <div className="sidenav-footer-title">Valerie Luna</div>
                        </div>
                    </div>
                </nav>
            </div>



           <div id="layoutSidenav_content">

              {children}
               <Footer/>

            </div>
            
        </div>
    </div>
    </>    
  )

}


else{
    return (
        <>
        {children}
        </>
    )
}
         
}  

