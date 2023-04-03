import React from 'react'
import { useParams, Navigate, Outlet, useOutletContext } from 'react-router-dom'
import {Note} from './App'
import { Trip } from './types'
type NoteLayoutProps ={
    trips: Trip[]
}

export default function NoteLayout({trips}:NoteLayoutProps) {

    const {id} = useParams()
    const trip = trips.find((n: Trip)=> n.id === id)

    if (trip == null) return <Navigate to="/" replace/>
  
    return <Outlet context={trip}/>
}


export function useTrip(){
  return useOutletContext<Trip>()
}
// useOutletContext was used inside of Outlet 