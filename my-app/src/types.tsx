export type Note = {
  id: string 
} & NoteData

export type RawNote ={
  id: string 
} & RawNoteData
export type RawNoteData = {
   title: string
   markdown: string;
   tagIds: string[]
}

export type NoteData = {
   title: string
   markdown: string;
   tags: Tag[]
}

export type Tag = {
  id: string 
  label: string
}

export type Trip = {
  id: string
  user_name : string 
  user_id : string 
  start_time: string 
  end_time : string 
  title: string 
  place: string 
  gender1: string 
  gender2: string 
  markdown: string 
  price: string 
}