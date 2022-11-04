import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { RootState } from '../../redux/store'
import { useRouter } from "next/router";
import { tokenInstance } from '../../utils/axios';
import Swal from 'sweetalert2'
import { logoutUser } from '../../redux/userSlice';
import { Button, Card, Col, Row } from 'react-bootstrap';


export default function AddMovies() {

  const {accessToken} = useSelector((state: RootState)=> state.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const [inputList, setInputList] = useState([{
    movies:'',duration:'',mon:'',tue:'',wed:'',thur:'',fri:'',sat:'',sun:''
  }]);
  const [NewCinema, setNewCinema] = useState<any>({
    cinema:'', date:''
  })
  const [Cinemas, setCinemas] = useState<any[]>([])
  const [NewMovies, setNewMovies] = useState<any[]>([])
  const [MovieId, setMovieId] = useState('')
   
  
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
    getCinemas()
  }, [])

  const getCinemas = async ()=>{
    await tokenInstance(accessToken).get("api/controller/movies/newmovies").then((res)=>{
      setCinemas(res.data)
    }).catch((err)=>{      
      if (err?.response?.data === "not authenticated" || err?.response?.data === "jwt expired") {
        dispatch(logoutUser())
        router.push("/")
      } 
    })
  }


  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async ()=>{
    await tokenInstance(accessToken).get("api/controller/movies/getmovies").then((res)=>{
      setNewMovies(res.data)
    }).catch((err)=>{      
      if (err?.response?.data === "not authenticated" || err?.response?.data === "jwt expired") {
        dispatch(logoutUser())
        router.push("/")
      } 
    })
  }


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {
      movies:'',duration:'',mon:'',tue:'',wed:'',thur:'',fri:'',sat:'',sun:''
    }]);
  };
  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    await tokenInstance(accessToken).post("api/controller/movies/newmovies", {list:inputList, cinema:NewCinema}).then((res)=>{
      setNewMovies(prev=> [res.data, ...prev])
      Swal.fire({
        icon: 'success',
        title: 'post created successfully',
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


  const handleUpdate = async()=>{
    setLoading(true)
    await tokenInstance(accessToken).put("api/controller/movies/newmovies", {list:inputList, cinema:NewCinema,id:MovieId}).then((res)=>{
      Swal.fire({
        icon: 'success',
        title: 'post updated successfully',
        showConfirmButton: false,
        timer: 5000
      })
      getMovies()
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
            await tokenInstance(accessToken).post('api/controller/movies/getmovies', {id}).then((res)=>{
                const delpost = NewMovies.filter(x=>x._id !== res.data._id)
                setNewMovies(delpost)
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


  const handleEdit = async(id)=>{
     const findmov = NewMovies.find(x=>x._id === id)
     setNewCinema({date:findmov.date})
     setMovieId(findmov._id)
     findmov.movies?.map((data)=>{
      setInputList(prev=> [...prev, data])
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
      <Row>
        <Col md={6}>
         <select onChange={(e)=>setNewCinema({...NewCinema, cinema:e.target.value})} name="" id="" style={{width:'100%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'8px',margin:'5px 0'}}>
         <option value=''>choose cinema</option>
          {Cinemas?.map((data,index)=>(
          <option value={data._id} key={index}>{data.name}</option>
          ))}
         </select>
        </Col>
        <Col md={6}>
         <input value={NewCinema.date} onChange={(e)=>setNewCinema({...NewCinema, date:e.target.value})} type="text" className='form-control' placeholder='movie date range'/>
        </Col>
      </Row>
     <button  style={{margin:'5px'}} className="btn btn-info btn-sm" onClick={handleAddClick}>+</button>
                
    {inputList.map((x, i) => {
      return (
         <div key={i} className="box" style={{width:'100%',display:'flex'}}>

          <input placeholder='movie name' type='text' name='movies' value={x?.movies} onChange={e => handleInputChange(e, i)}
          style={{width:'20%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px 0'}}>
          </input>

          <input placeholder='duration' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='duration'
              value={x.duration}
              onChange={e => handleInputChange(e, i)}
            />
          <input placeholder='mon' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='mon'
              value={x.mon}
              onChange={e => handleInputChange(e, i)}
            />
          <input placeholder='tue' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='tue'
              value={x.tue}
              onChange={e => handleInputChange(e, i)}
            />
          <input placeholder='wed' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='wed'
              value={x.wed}
              onChange={e => handleInputChange(e, i)}
            />
          <input placeholder='thur' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='thur'
              value={x.thur}
              onChange={e => handleInputChange(e, i)}
            />
          <input placeholder='fri' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='fri'
              value={x.fri}
              onChange={e => handleInputChange(e, i)}
            />
          <input placeholder='sat' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='sat'
              value={x.sat}
              onChange={e => handleInputChange(e, i)}
            />
          <input placeholder='sun' style={{width:'10%',border:'1px solid#cdd1cd',borderRadius:'5px',padding:'6px',margin:'5px'}}
              type='text'
              name='sun'
              value={x.sun}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              <button 
                className="btn btn-danger btn-sm" style={{margin:'5px'}}
                onClick={(e) => handleRemoveClick(e)}>x</button>
            </div>
          </div>
        );
      })}
         
         <br />
         {MovieId? 
         <Button onClick={handleUpdate} disabled={Loading}>
                {Loading === true? "Updating...":"Update"}
          </Button>
           :
         <Button onClick={handleSubmit} disabled={Loading}>
                {Loading === true? "Submitting...":"Submit"}
          </Button>
         }
        <br /><hr /><br />

        <Row>
          {NewMovies?.map((data,i)=>(
          <Col md={3} key={i}>
          <Card>
            <Card.Img variant="top" src={data?.cinema_id?.image} style={{height:'100px'}}/>
            <Card.Body>
              <Card.Title>{data?.cinema_id?.name}</Card.Title>
              <Card.Text>
              {data?.cinema_id?.address}
              </Card.Text>
              <Button onClick={()=>handleEdit(data?._id)} size="sm" variant="primary">edit</Button>&nbsp;&nbsp;
              <Button onClick={()=>handleDelete(data?._id)} size="sm" variant="danger">delete</Button>
            </Card.Body>
          </Card>
          </Col>
         ))}
        </Row>

      </div>
                  
                
    )
  }
}
