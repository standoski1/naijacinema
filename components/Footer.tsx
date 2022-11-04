import React from 'react'

export default function Footer() {
  return (
    <footer className="footer-area">
        <div className="footer-logo mb-100">
            <a href="index.html"><img src="/img/naijacinema.png" alt=""/></a>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="footer-content text-center">
                        <div className="footer-nav">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Disclaimer</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="footer-social-info">
                            <a href="https://facebook.com/naijacinemas" target="_blank" rel="noopener noreferrer" title="facebook"><i className="fa fa-facebook-square" style={{fontSize:'22px'}} aria-hidden="true"></i></a>
                            <a href="https://twitter.com/naija_cinemas" target="_blank" rel="noopener noreferrer" title="twitter"><i className="fa fa-twitter-square" style={{fontSize:'22px'}} aria-hidden="true"></i></a>
                            <a href="https://instagram.com/naija_cinemas" target="_blank" rel="noopener noreferrer" title="instagram"><i className="fa fa-instagram" style={{fontSize:'22px'}} aria-hidden="true"></i></a>
                        </div>

                        <p className="copywrite-text">
                        GET IN TOUCH WITH US : <span><a style={{fontSize:'1rem'}} href="mailto:graceama002@gmail.com">graceama002@gmail.com</a></span> 
                        </p> 
                        <p className="copywrite-text">
                         Copyright &copy; All rights reserved | developed by &nbsp;
                         <a href="https://grafytech.com" target="_blank" rel="noopener noreferrer">grafytech</a>
                        </p> 
                    </div>
                </div>
            </div>
        </div>

        <button
        type="button"
        className="btn btn-floating btn-lg"
        id="btn-back-to-top"
        >
        <i className="fa fa-arrow-up"></i>
        </button>

    </footer>
  )
}
