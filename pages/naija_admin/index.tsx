import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { RootState } from '../../redux/store'
import { useRouter } from "next/router";
import { Row, Col, Button } from 'react-bootstrap'
import dynamic from "next/dynamic";
import { tokenInstance } from '../../utils/axios';
import Swal from 'sweetalert2'
import { logoutUser } from '../../redux/userSlice';

const JoditEditor = dynamic(
	() => import("jodit-react"),
	{ ssr: false }
);



export default function HomeComp() {

  const {accessToken} = useSelector((state: RootState)=> state.user)
  const router = useRouter()
  const [Post, setPost] = useState({
   title:'', text:'',category:''
  })
  const [image, setimage] = useState<File>()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
   
  
  useEffect(() => {
    Authorize()
  }, [])

  const Authorize = async ()=>{
    await tokenInstance(accessToken).get("api/controller/user/auth").then((res)=>{
    }).catch((err)=>{      
      if (err?.response?.data === "not authenticated" || err?.response?.data === "jwt expired") {
        dispatch(logoutUser())
        router.push("/")
      } 
    })
  }
  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    let formField = new FormData()

    formField.append('title',Post.title)
    formField.append('text',Post.text)
    formField.append('category',Post.category)
    formField.append('file',image!)
    setLoading(true)
    await tokenInstance(accessToken).post("api/controller/post/post", formField).then((res)=>{
      Swal.fire({
        icon: 'success',
        title: 'post created successfully',
        showConfirmButton: false,
        timer: 5000
      })
      setLoading(false)
      document.getElementById("myForm").reset()
      setPost({
        title:'', text:'',category:''
       })
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'something went wrong, please try again',
        showConfirmButton: false,
        timer: 5000
      })
      if (err?.response?.data === "not authenticated") {
        dispatch(logoutUser())
      } 
      else if (err?.response?.data.message === "Invalid file type") {
        Swal.fire({
          icon: 'error',
          title: 'Invalid file type, only JPEG and PNG is allowed!',
          showConfirmButton: false,
        })
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    if (!accessToken) {
      router.push("/")
    }
  }, [accessToken])


  if (accessToken) {
    return (
    
      <div style={{margin:'3rem'}}>


         <div className='card row p-3' >
          <form id="myForm">
              <Row>
                <Col md={12}>
                <input onChange={(e)=>setPost({...Post, title:e.target.value})} type="text" className='form-control' placeholder='enter post title'/>
                </Col>
              </Row>
              <br /><br />
              <Row>
                <Col md={6}>
                <select onChange={(e)=>setPost({...Post, category:e.target.value})} style={{width:'100%',padding:'5px',borderRadius:'5px',border:'1px solid #c2c5c5',color:'#414242'}}>
                   <option value="">Select Category</option>
                   <option value="News">Trending News</option>
                   <option value="Movies">Trending Movies</option>
                </select>
                </Col>
                <Col md={6}>
                <input onChange={(e)=>setimage(e?.target.files?.[0])} type="file" className='form-control'/>
                </Col>
              </Row>
              <br /><br />

              <JoditEditor value={Post.text} onChange={(e)=>setPost({...Post, text:e})}/>
              <br />
              <Button onClick={handleSubmit} disabled={Loading}>
                {Loading === true? "Submitting...":"Submit"}
              </Button>
            </form>
         </div>


      </div>
                  
                
    )
  }
}
