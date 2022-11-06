import React, { useState } from "react";
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'
import Link from "next/link";



export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [Search, setSearch] = useState('')
    const router = useRouter()


    return (
      <div className={styles.Navbar}>
        <span className={styles.navlogo}><Link href="/"><a><img src="/img/cinemas2.png" alt="Nigeria Cinemas" /></a></Link></span>
        <div className={`${styles.navitems} ${isOpen && styles.open}`}>
            <br />
        <div className={styles.Navsearch}>
            <div className="search1">
                <input onChange={(e)=>setSearch(e.target.value)} style={{height:'42px',marginTop:'6px'}} type="text" className="form-control" placeholder="Looking for Something?"/>
                <button onClick={()=> router.push(`/query/post?slug=${Search}`)} style={{height:'30px',width:'50px'}} className="btn btn-sm btn-info">Search</button>
            </div>
        </div>
           <br />
          <Link href="/"><a>Home</a></Link>
          <hr style={{color:'#fff'}}/>
          <Link href="/privacy"><a>privacy policy</a></Link>
          <hr style={{color:'#fff'}}/>
          <Link href="/disclaimer"><a>disclaimer</a></Link>
          <hr style={{color:'#fff'}}/>
          <div className="dropdown menu-large nav-item"> 
          <span className="dropdown-toggle nav-link" data-bs-toggle="dropdown">Cinemas by States</span>
            <ul className="dropdown-menu megamenu">
                <div className="row" style={{overflowY:'scroll', maxHeight:'300px',padding:'10px'}}>
                    <li className="col-md-3">
                        <ul>
                            <li onClick={()=> router.push('/query/cinemas?query=Abuja')}><a style={{cursor:'pointer'}}>Abuja</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Abia')}><a style={{cursor:'pointer'}}>Abia</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Adamawa')}><a style={{cursor:'pointer'}}>Adamawa</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Akwa Ibom')}><a style={{cursor:'pointer'}}>Akwa Ibom</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Anambra')}><a style={{cursor:'pointer'}}>Anambra</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Bauchi')}><a style={{cursor:'pointer'}}>Bauchi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Bayelsa')}><a style={{cursor:'pointer'}}>Bayelsa</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Benue')}><a style={{cursor:'pointer'}}>Benue</a></li>
                        </ul>
                    </li>
                    <li className="col-md-3">
                        <ul>
                            <li onClick={()=> router.push('/query/cinemas?query=Borno')}><a style={{cursor:'pointer'}}>Borno</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Cross River')}><a style={{cursor:'pointer'}}>Cross River</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Delta')}><a style={{cursor:'pointer'}}>Delta</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Ebonyi')}><a style={{cursor:'pointer'}}>Ebonyi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Edo')}><a style={{cursor:'pointer'}}>Edo</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Ekiti')}><a style={{cursor:'pointer'}}>Ekiti</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Enugu')}><a style={{cursor:'pointer'}}>Enugu</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Gombe')}><a style={{cursor:'pointer'}}>Gombe</a></li>
                        </ul>
                    </li>
                    <li className="col-md-2">
                        <ul>
                           <li onClick={()=> router.push('/query/cinemas?query=Imo')}><a style={{cursor:'pointer'}}>Imo</a></li>
                           <li onClick={()=> router.push('/query/cinemas?query=Jigawa')}><a style={{cursor:'pointer'}}>Jigawa</a></li>
                           <li onClick={()=> router.push('/query/cinemas?query=Kaduna')}><a style={{cursor:'pointer'}}>Kaduna</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kano')}><a style={{cursor:'pointer'}}>Kano</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Katsina')}><a style={{cursor:'pointer'}}>Katsina</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kebbi')}><a style={{cursor:'pointer'}}>Kebbi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kogi')}><a style={{cursor:'pointer'}}>Kogi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kwara')}><a style={{cursor:'pointer'}}>Kwara</a></li>
                        </ul>
                    </li>
                    <li className="col-md-2">
                        <ul>
                           <li onClick={()=> router.push('/query/cinemas?query=Lagos')}><a style={{cursor:'pointer'}}>Lagos</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Nassarawa')}><a style={{cursor:'pointer'}}>Nassarawa</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Niger')}><a style={{cursor:'pointer'}}>Niger</a></li>
                           <li onClick={()=> router.push('/query/cinemas?query=Ogun')}><a style={{cursor:'pointer'}}>Ogun</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Ondo')}><a style={{cursor:'pointer'}}>Ondo</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Osun')}><a style={{cursor:'pointer'}}>Osun</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Oyo')}><a style={{cursor:'pointer'}}>Oyo</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Plateau')}><a style={{cursor:'pointer'}}>Plateau</a></li>
                        </ul>
                    </li>
                    <li className="col-md-2">
                        <ul>
                            <li onClick={()=> router.push('/query/cinemas?query=Rivers')}><a style={{cursor:'pointer'}}>Rivers</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Sokoto')}><a style={{cursor:'pointer'}}>Sokoto</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Taraba')}><a style={{cursor:'pointer'}}>Taraba</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Yobe')}><a style={{cursor:'pointer'}}>Yobe</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Zamfara')}><a style={{cursor:'pointer'}}>Zamfara</a></li>
                        </ul>
                    </li>
                </div>
            </ul>
        </div>
        </div>
        <div
          className={`${styles.navtoggle} ${isOpen && styles.open}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.bar}></div>
        </div>
      </div>
    );
}