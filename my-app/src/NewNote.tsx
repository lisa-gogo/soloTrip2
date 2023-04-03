import React, {useEffect} from 'react'
import NoteForm from './NoteForm'
import { NoteData, Tag, RawNote,RawNoteData } from './types';
import {useAuth} from './contexts/AuthContext'


type NewNoteProps = {
    onSubmit: (data:NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
}

export default function NewNote({ onSubmit, onAddTag, availableTags } : NewNoteProps) {

  const {currentUser} = useAuth();
  

  return (
    <> 
      <h1 className='mb-4'>Trip lists</h1>
      {currentUser ? <></>:<h4 className='text-danger'>Please login to submit</h4>}
      <NoteForm 
      />
    </>
  )
}
