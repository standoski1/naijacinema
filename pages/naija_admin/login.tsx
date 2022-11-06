import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axios'
import { useDispatch, useSelector  } from 'react-redux'
import { loginUser } from '../../redux/userSlice'
import { RootState } from '../../redux/store'
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

export default function Login() {

    const [userData, setuserData] = useState({
      email:'', password:''
    })
    const dispatch = useDispatch()
    const {accessToken} = useSelector((state: RootState)=> state.user)
    const router = useRouter()

    
    const handleSubmit = async()=>{
      await axiosInstance.post("api/controller/user/user", {userData}).then((res)=>{
        dispatch(loginUser(res.data));
      }).catch((err)=>{
        console.log(err.message);
        if (err?.response?.data === "wrong credentials") {
            Swal.fire({
                icon: 'error',
                title: 'The Email or Password you entered is not correct',
                showConfirmButton: false,
                timer: 5000
              })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'something went wrong, please try again',
                showConfirmButton: false,
                timer: 5000
              })
        }
      })
    }

    useEffect(() => {
      if (accessToken) {
        router.push("/naija_admin")
      }
    }, [accessToken])
    


  return (
                <section className="vh-100" style={{backgroundColor:' #eee',marginBottom:'-30px'}}>
                <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" style={{borderRadius:'25px',marginTop:'15px',marginBottom:'15px'}}>
                        <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
            
                            <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4">Welcome Back</p>
            
                            <form className="mx-1 mx-md-4">
            
                                <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fa fa-user fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input onChange={(e)=>setuserData({...userData, email:e.target.value})} type="email" placeholder='Enter your Email' className="form-control" />
                                </div>
                                </div>
            
                                <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input onChange={(e)=>setuserData({...userData, password:e.target.value})} type="password" placeholder='Enter Your Password' className="form-control" />
                                </div>
                                </div>
            
            
                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg">LogIn</button>
                                </div>
            
                            </form>
            
                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
            
                            <img src="/img/login.jpg" style={{marginBottom:'2rem'}} className="img-fluid" alt="Sample image"/>
            
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
  )
}
