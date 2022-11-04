import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { RootState } from '../../redux/store'
import { useRouter } from "next/router";
import { Row, Col, Button, Modal, Card } from 'react-bootstrap'
import dynamic from "next/dynamic";
import { tokenInstance } from '../../utils/axios';
import Swal from 'sweetalert2'
import { logoutUser } from '../../redux/userSlice';



export default function AddCinemas() {

  const {accessToken} = useSelector((state: RootState)=> state.user)
  const router = useRouter()
  const [Cinema, setCinema] = useState({
   name:'', state:'',address:''
  })
  const [Image, setImage] = useState<File>()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [NewCinema, setNewCinema] = useState<any[]>([])

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
    GetCinemas()
  }, [])

  const GetCinemas = async ()=>{
    await tokenInstance(accessToken).get("api/controller/cinema/getcinema").then((res)=>{
        setNewCinema(res.data)
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
    
    formField.append('name',Cinema.name)
    formField.append('state',Cinema.state)
    formField.append('address',Cinema.address)
    formField.append('file',Image!)
    
    setLoading(true)
    await tokenInstance(accessToken).post("api/controller/cinema/addcinema", formField).then((res)=>{
        setNewCinema(prev=> [res.data, ...prev])
      Swal.fire({
        icon: 'success',
        title: 'Cinema created successfully',
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
            await tokenInstance(accessToken).post('api/controller/cinema/getcinema', {id,img}).then((res)=>{
                const delpost = NewCinema.filter(x=>x._id !== res.data._id)
                setNewCinema(delpost)
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
          add cinema +
        </Button>


        <Row style={{marginTop:'3rem'}}>
            {NewCinema?.map((data,index)=>(
            <Col md={4} key={index}>
            <Card>
            <Card.Img variant="top" src={data?.image} style={{height:'180px'}}/>
            <Card.Body>
                <Card.Title>{data?.name}</Card.Title>
                <Card.Text>
                 <p>{data?.state}</p>
                 <p>{data?.address}</p>
                </Card.Text>
                <Button onClick={()=>handleDelete(data?._id, data?.image)} size='sm' variant="danger">Delete</Button>
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
            <Col md={12} style={{marginBottom:'10px'}}>
            <input onChange={(e)=>setCinema({...Cinema, name:e.target.value})} type="text" className='form-control' placeholder='enter cinema name'/>
            </Col>
            <Col md={6} style={{marginBottom:'10px'}}>
            <input onChange={(e)=>setImage(e.target.files?.[0])} type="file" className='form-control'/>
            </Col>
            
            <Col md={6} style={{marginBottom:'10px'}}>
            <select onChange={(e)=>setCinema({...Cinema, state:e.target.value})} style={{width:'100%',padding:'5px',borderRadius:'5px',border:'1px solid #c2c5c5',color:'#414242'}}>
                <option value="">...Select State...</option>
                <option value="Abuja">ABUJA FCT</option>
                <option value="Abia">ABIA</option>
                <option value="Adamawa">ADAMAWA</option>
                <option value="Akwa Ibom">AKWA IBOM</option>
                <option value="Anambra">ANAMBRA</option>
                <option value="Bauchi">BAUCHI</option>
                <option value="Bayelsa">BAYELSA</option>
                <option value="Benue">BENUE</option>
                <option value="Borno">BORNO</option>
                <option value="Cross River">CROSS RIVER</option>
                <option value="Delta">DELTA</option>
                <option value="Ebonyi">EBONYI</option>
                <option value="Edo">EDO</option>
                <option value="Ekiti">EKITI</option>
                <option value="Enugu">ENUGU</option>
                <option value="Gombe">GOMBE</option>
                <option value="Imo">IMO</option>
                <option value="Jigawa">JIGAWA</option>
                <option value="Kaduna">KADUNA</option>
                <option value="Kano">KANO</option>
                <option value="Katsina">KATSINA</option>
                <option value="Kebbi">KEBBI</option>
                <option value="Kogi">KOGI</option>
                <option value="Kwara">KWARA</option>
                <option value="Lagos">LAGOS</option>
                <option value="Nassarawa">NASSARAWA</option>
                <option value="Niger">NIGER</option>
                <option value="Ogun">OGUN</option>
                <option value="Ondo">ONDO</option>
                <option value="Osun">OSUN</option>
                <option value="Oyo">OYO</option>
                <option value="Plateau">PLATEAU</option>
                <option value="Rivers">RIVERS</option>
                <option value="Sokoto">SOKOTO</option>
                <option value="Taraba">TARABA</option>
                <option value="Yobe">YOBE</option>
                <option value="Zamfara">ZAMFARA</option>
            </select>
            </Col>

            <Col md={12}>
            <textarea onChange={(e)=>setCinema({...Cinema, address:e.target.value})} className='form-control' placeholder='enter cinema address'/>
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
