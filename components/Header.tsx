import React, { useState } from "react";
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'



export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [Search, setSearch] = useState('')
    const router = useRouter()


    return (
      <div className={styles.Navbar}>
        <span className={styles.navlogo}><img src="/img/cinemas2.png" alt="Nigeria Cinemas" /></span>
        <div className={`${styles.navitems} ${isOpen && styles.open}`}>
            <br />
        <div className={styles.Navsearch}>
            <div className="search1">
                <input onChange={(e)=>setSearch(e.target.value)} style={{height:'42px',marginTop:'6px'}} type="text" className="form-control" placeholder="Looking for Something?"/>
                <button onClick={()=> router.push(`/query/post?slug=${Search}`)} style={{height:'30px',width:'50px'}} className="btn btn-sm btn-info">Search</button>
            </div>
        </div>
           <br />
          <a href="/">Home</a>
          <hr style={{color:'#fff'}}/>
          <a href="/about">privacy policy</a>
          <hr style={{color:'#fff'}}/>
          <a href="/contact">Contact</a>
          <hr style={{color:'#fff'}}/>
          <div className="dropdown menu-large nav-item"> 
          <span className="dropdown-toggle nav-link" data-bs-toggle="dropdown">Cinemas by States</span>
            <ul className="dropdown-menu megamenu">
                <div className="row" style={{overflowY:'scroll', maxHeight:'300px',padding:'10px'}}>
                    <li className="col-md-3">
                        <ul>
                            <li onClick={()=> router.push('/query/cinemas?query=Abuja')}><a>Abuja</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Abia')}><a>Abia</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Adamawa')}><a>Adamawa</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Akwa Ibom')}><a>Akwa Ibom</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Anambra')}><a>Anambra</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Bauchi')}><a>Bauchi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Bayelsa')}><a>Bayelsa</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Benue')}><a>Benue</a></li>
                        </ul>
                    </li>
                    <li className="col-md-3">
                        <ul>
                            <li onClick={()=> router.push('/query/cinemas?query=Borno')}><a>Borno</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Cross River')}><a>Cross River</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Delta')}><a>Delta</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Ebonyi')}><a>Ebonyi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Edo')}><a>Edo</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Ekiti')}><a>Ekiti</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Enugu')}><a>Enugu</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Gombe')}><a>Gombe</a></li>
                        </ul>
                    </li>
                    <li className="col-md-2">
                        <ul>
                           <li onClick={()=> router.push('/query/cinemas?query=Imo')}><a>Imo</a></li>
                           <li onClick={()=> router.push('/query/cinemas?query=Jigawa')}><a>Jigawa</a></li>
                           <li onClick={()=> router.push('/query/cinemas?query=Kaduna')}><a>Kaduna</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kano')}><a>Kano</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Katsina')}><a>Katsina</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kebbi')}><a>Kebbi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kogi')}><a>Kogi</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Kwara')}><a>Kwara</a></li>
                        </ul>
                    </li>
                    <li className="col-md-2">
                        <ul>
                           <li onClick={()=> router.push('/query/cinemas?query=Lagos')}><a>Lagos</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Nassarawa')}><a>Nassarawa</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Niger')}><a>Niger</a></li>
                           <li onClick={()=> router.push('/query/cinemas?query=Ogun')}><a>Ogun</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Ondo')}><a>Ondo</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Osun')}><a>Osun</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Oyo')}><a>Oyo</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Plateau')}><a>Plateau</a></li>
                        </ul>
                    </li>
                    <li className="col-md-2">
                        <ul>
                            <li onClick={()=> router.push('/query/cinemas?query=Rivers')}><a>Rivers</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Sokoto')}><a>Sokoto</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Taraba')}><a>Taraba</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Yobe')}><a>Yobe</a></li>
                            <li onClick={()=> router.push('/query/cinemas?query=Zamfara')}><a>Zamfara</a></li>
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