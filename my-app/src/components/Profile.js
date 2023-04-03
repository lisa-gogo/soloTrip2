import React, {useEffect, useState} from 'react'
import { Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { database } from '../config/firebase';

export default function Profile () {
    const {currentUser} = useAuth()
    const docRef = doc(database, "users", currentUser.uid);
    const [userInfo, setUserInfo] = useState(null)

// Get a document, forcing the SDK to fetch from the offline cache.
try {
   getDoc(docRef).then((x)=>setUserInfo(x.data()));
  // Document was found in the cache. If no cached document exists,
  // an error will be returned to the 'catch' block below.
} catch (e) {
  console.log("Error getting cached document:", e);
}

    
 

  return (
    <>
    <Card>
        <Card.Body className='fs-5 text'> 
            <h1 className='text-center mb-4'>Profile</h1>
            <strong>Email:</strong>{userInfo?.email}
             <div>
                <strong>Username:</strong>{userInfo?.username}
              </div>
              <div>
                <strong>first name: </strong>{userInfo?.first_name}
              </div>
               <div>
                <strong>last name: </strong>{userInfo?.last_name}
              </div>
              <div>
                <strong>gender: </strong>{userInfo?.gender}
              </div>
              <div>
                <strong>health: </strong>{userInfo?.health}
              </div>
              <div>
                <strong>occupation: </strong>{userInfo?.occupation}
              </div>
                <div>
                <strong>Date of birth: </strong>{userInfo?.date_of_birth}
              </div>
            <Link to="/updateprofile" className='btn btn-primary w-100'>Update Profiles</Link>
             <Link to="/" className='btn btn-primary w-100 mt-4'>Back</Link>
        </Card.Body>
    </Card>
    
    </>
 
    
  )
}
