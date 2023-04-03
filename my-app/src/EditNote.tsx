import React from 'react'
import NoteForm from './NoteForm'
import { NoteData, Tag, RawNote,RawNoteData } from './types';
import { useTrip } from './NoteLayout'




export default function EditNote() {

  const trip = useTrip()
  return (
    <> 
      <h1 className='mb-4'>Edit Note</h1>
      <NoteForm 
      />
    </>
  )
}