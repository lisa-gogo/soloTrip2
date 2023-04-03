import React, {useRef, FormEvent, useState}from 'react'
import { Form } from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext'
import { useNavigate, Link} from 'react-router-dom';
import { auth, database } from '../config/firebase';
import {collection, addDoc, setDoc,doc} from 'firebase/firestore'


export default function UpdateProfile() {

  const [userName, setUsername] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("")
  const [DOB, setDob] = useState("")
  const [health, setHealth] = useState("")
  const [occupation, setOccupation] = useState("")


  const {currentUser, logout} = useAuth();
  const email = currentUser?.email; 

  const navigate = useNavigate();

  const userData = {
    email : email,
    username : userName,
    first_name: firstName,
    last_name: lastName,
    gender: gender,
    date_of_birth: DOB,
    health: health,  
    occupation: occupation,
    create_at : new Date().getTime(),

  }

  // save in firebase
  const handleSave =(e:FormEvent)=>{
    e.preventDefault()
    setDoc(doc(database, "users", currentUser.uid), userData).then(()=>{
      alert('User created')
      navigate("/")
    })
  }

  return (
    <>
     <main className="h-screen flex items-center justify-center"> 
       <Form className = "bg-white flex rounded-lg w-1/2 ">
           <div className="flex-1 text-grey-700 p-20 "> 
             <h1 className="pb-2">let's get started</h1>
             <p>Give more information about you</p>
             <div className='mt-6'>
                <div className='pb-4'>
                    <input type="text" onChange={e=>setUsername(e.target.value)} required placeholder='user name' />        
                </div>
                 <div className='pb-4'>
                    <input type="text" onChange={e=>setFirstName(e.target.value)} required placeholder='first name' />        
                </div>
                 <div className='pb-4'>
                    <input type="text" onChange={e=>setLastName(e.target.value)} placeholder='last name' required defaultValue={""}></input>        
                </div>
                 <div className='pb-4'>
                    <select onChange={e=>setGender(e.target.value)} >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Not tell</option>
                    </select>        
                </div>
                 <div className='pb-4'>
                    <input type="date" onChange={e=>setDob(e.target.value)}  placeholder='date of birth'></input>        
                </div>
                 <div className='pb-4'>
                  <label> Do you have contagious disease ? </label>
                    <select onChange={e=>setHealth(e.target.value)} placeholder='health' >
                      <option>no</option>
                      <option>yes</option>
                      </select>        
                </div>
                 <div className='pb-4'>
                    <input  type="text" placeholder='occupation' onChange={e=>setOccupation(e.target.value)}></input>        
                </div>

             </div>
           </div>
          <button onClick={handleSave}>Save</button>
          <Link to="/">
             <button >Cancel</button>
          </Link>
          
       </Form>
         
     </main>
      
    </>
   
  )
}
