import { Button } from "react-bootstrap"
import {auth, googleProvider} from '../config/firebase.tsx'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from "react"
export const Auth = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = async ()=>{
        try{
            await createUserWithEmailAndPassword(auth, email,password) 
        }catch(err){
          console.error(err);
        }
    }

    const signInWithGoogle = async () =>{
      try{
        await signInWithPopup(auth, googleProvider )
      }catch(err){
        console.error(err)
      }
    }

    const logout = async () =>{
      try{
        await signOut(auth)
      }catch(err){
        console.error(err);
      }
    }
    return <div>
        {auth.currentUser === null?<>Hi</>:<>ok</>}
        <input placeholder="Email..."
        onChange={e=>setEmail(e.target.value)}
        />
        <input placeholder="Password..."
        type="password"
        onChange={e=>setPassword(e.target.value)}
        />
        <button onClick={signIn} variant="outline-secondary">Sign In</button>
        <button onClick={signInWithGoogle}>Sign In with Google </button>
        <button onClick={logout}>Log Out</button>
    </div>
}