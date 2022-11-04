import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { RootState } from '../../redux/store'
import { useRouter } from "next/router";
import { Row, Col, Button, Modal, Card } from 'react-bootstrap'
import dynamic from "next/dynamic";
import { tokenInstance } from '../../utils/axios';
import Swal from 'sweetalert2'
import { logoutUser } from '../../redux/userSlice';



export default function YouTube() {

  const {accessToken} = useSelector((state: RootState)=> state.user)
  const router = useRouter()
  const [Youtube, setYoutube] = useState({
   title:'', youtube_id:''
  })
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [NewYoutube, setNewYoutube] = useState<any[]>([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
  
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


  useEffect(() => {
    GetYoutube()
  }, [])

  const GetYoutube = async ()=>{
    await tokenInstance(accessToken).get("api/controller/youtube/youtube").then((res)=>{
        setNewYoutube(res.data)
    }).catch((err)=>{      
      if (err?.response?.data === "not authenticated" || err?.response?.data === "jwt expired") {
        dispatch(logoutUser())
        router.push("/")
      } 
    })
  }
  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    setLoading(true)
    await tokenInstance(accessToken).post("api/controller/youtube/youtube", {Youtube}).then((res)=>{
        setNewYoutube(prev=> [res.data, ...prev])
      Swal.fire({
        icon: 'success',
        title: 'Youtube created successfully',
        showConfirmButton: false,
        timer: 5000
      })
      setLoading(false)
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
      setLoading(false)
    })
  }


  const handleDelete = async(id:string)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
            await tokenInstance(accessToken).put('api/controller/youtube/youtube', {id}).then((res)=>{
                const delpost = NewYoutube.filter(x=>x._id !== res.data._id)
                setNewYoutube(delpost)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
            }).catch((err)=>{
                console.log(err.message);
            })
        }
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

        <Button size='sm' onClick={handleShow}>
          add youtube +
        </Button>


        <Row style={{marginTop:'3rem'}}>
            {NewYoutube?.map((data,index)=>(
            <Col md={4} key={index}>
            <Card>
            <Card.Body>
                <Card.Title>{data?.title}</Card.Title>
                <Card.Text>
                 <p>{data?.youtube_id}</p>
                </Card.Text>
                <Button onClick={()=>handleDelete(data?._id)} size='sm' variant="danger">Delete</Button>
            </Card.Body>
            </Card>
            </Col>
            ))}
        </Row>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Cinema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col md={6} style={{marginBottom:'10px'}}>
            <input onChange={(e)=>setYoutube({...Youtube, title:e.target.value})} type="text" className='form-control' placeholder='enter youtube title'/>
            </Col>
            <Col md={6} style={{marginBottom:'10px'}}>
            <input onChange={(e)=>setYoutube({...Youtube, youtube_id:e.target.value})} type="text" className='form-control' placeholder='enter youtube id'/>
            </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSubmit} disabled={Loading}>
                {Loading === true? "Submitting...":"Submit"}
            </Button>
        </Modal.Footer>
       </Modal>


      </div>
                  
                
    )
  }
}
