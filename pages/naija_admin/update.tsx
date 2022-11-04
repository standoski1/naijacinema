import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { RootState } from '../../redux/store'
import { logoutUser } from '../../redux/userSlice'
import { tokenInstance } from '../../utils/axios'
import dynamic from "next/dynamic";
const JoditEditor = dynamic(
	() => import("jodit-react"),
	{ ssr: false }
);


export default function Update() {

    const {accessToken} = useSelector((state: RootState)=> state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const [Post, setPost] = useState<any[]>([])
    const [show, setShow] = useState(false);
    const [ModalPost, setModalPost] = useState({
        title:'',text:'',id:'',oldImg:'',category:''
    })
    const [ModalFile, setModalFile] = useState<File>()
    const [Loading, setLoading] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        const filpost = Post.find(x=>x._id === id)
        setModalPost({title:filpost.title, text:filpost.text,id:filpost._id,
            oldImg:filpost.image,category:filpost.category})
    }

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
        getPosts()
      }, [])

      const getPosts = async()=>{
        await tokenInstance(accessToken).get("api/controller/post/editpost").then((res)=>{
            setPost(res.data)
        }).catch((err)=>{
            console.log(err.message);
        })
      }

      const handleDelete = async(id:string, img:string)=>{
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
                await tokenInstance(accessToken).post(`api/controller/post/editpost`, {id,img}).then((res)=>{
                    const delpost = Post.filter(x=>x._id !== res.data._id)
                    setPost(delpost)
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


      const handleSubmit = async(e)=>{
        e.preventDefault();
        let formField = new FormData()
    
        formField.append('title',ModalPost.title)
        formField.append('text',ModalPost.text)
        formField.append('category',ModalPost.category)
        formField.append('id',ModalPost.id)
        formField.append('oldimage',ModalPost.oldImg)
        formField.append('file',ModalFile!)
        setLoading(true)
        await tokenInstance(accessToken).post("api/controller/post/updatepost", formField).then((res)=>{
            setPost(res.data)
          Swal.fire({
            icon: 'success',
            title: 'post updated successfully',
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
      


      useEffect(() => {
        if (!accessToken) {
          router.push("/")
        }
      }, [accessToken])
    
    
if (accessToken) {
  return (
    <div style={{margin:'2rem'}}>
        <Row>
            {Post?.map((data,index)=>(
            <Col md={3} style={{marginBottom:'1rem'}} key={index}>
            <Card>
                <Card.Img variant="top" src={data.image} />
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: data.text.slice(0,100)+"&hellip;"}}></div>
                    </Card.Text>
                    <Button onClick={()=>handleDelete(data._id, data.image)} size='sm' variant="danger">Delete</Button>&nbsp;
                    <Button onClick={()=>handleShow(data._id)} size='sm' variant="primary">Edit</Button>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Row>
            <Col md={12}>
            <input value={ModalPost.title} onChange={(e)=>setModalPost({...ModalPost, title:e.target.value})} type="text" className='form-control' placeholder='enter post title'/>
            </Col>
            </Row>
            <br /><br />

            <Row>
            <Col md={6}>
            <select onChange={(e)=>setModalPost({...ModalPost, category:e.target.value})} style={{width:'100%',padding:'5px',borderRadius:'5px',border:'1px solid #c2c5c5',color:'#414242'}}>
               {
                ModalPost.category === "News"?
                <>
                 <option value="News">Trending News</option>
                 <option value="Movies">Trending Movies</option>
                </>: ModalPost.category === "Movies"?
                <>
                 <option value="Movies">Trending Movies</option>
                 <option value="News">Trending News</option>
                </>:
                <>
                 <option value="News">Trending News</option>
                 <option value="Movies">Trending Movies</option>
                </>
               }
            </select>
            </Col>
            <Col md={6}>
            <input onChange={(e)=>setModalFile(e?.target.files?.[0])} type="file" className='form-control'/>
            </Col>
            </Row>
            <br /><br />

            <JoditEditor value={ModalPost.text} onChange={(e)=>setModalPost({...ModalPost, text:e})}/>
            <br />
              
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
