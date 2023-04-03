import React, {useContext, useState, useEffect} from 'react'
import {auth, database} from '../config/firebase.tsx'
import {createUserWithEmailAndPassword, signInWithPopup, signOut,onAuthStateChanged, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import {collection, addDoc, setDoc,doc} from 'firebase/firestore'
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState (true)


 const dbInstance = collection(database,'users')

 const signup = async (username, email, password)=>{
        try{
           var data = {username : username, email :email};
            await createUserWithEmailAndPassword(auth,email,password) 
            // addDoc(dbInstance, data)
            // .then(()=> alert('User Created')
            //   ).catch((err)=>alert(err.message)
            //    );
          //    const db = getDatabase();
          setDoc(doc(database, "users", auth.currentUser.uid), data).then(()=>alert('User created'))
          .catch((err)=>alert(err.message));

           
          //  await  db.ref('users/'+ auth.currentUser.uid).set(data)
           await updateProfile(auth.currentUser, { displayName: username })
        }catch(err){
          console.error(err);
        }
    } 

 const login = async (email,password) =>{
     try{
            await signInWithEmailAndPassword(auth,email,password) 
        }catch(err){
          console.error(err);
        }
      }
 
 const logout=()=>{
  return signOut(auth);
 }


useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, user=>{
                setCurrentUser(user);  
                setLoading(false)
            })
            return unsubscribe
    },[])
   const value={
    currentUser,
    signup,
    login,
    logout
  }

    return (
    <AuthContext.Provider value={value}>
     {!loading && children}
    </AuthContext.Provider>
  )
}
