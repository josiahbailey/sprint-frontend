import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const ActionForm = () => {
  const history = useHistory()
  const [edit, toggleEdit] = useState(false)
  const [action, setAction] = useState({
    description: '',
    notes: ''
  })
  const id = useParams().id
  const idtwo = useParams().idtwo

  useEffect(() => {
    if (idtwo) {
      toggleEdit(true)
      axios.get(`http://localhost:4000/api/actions/${idtwo}`)
        .then(res => {
          console.log(res)
          setAction({
            description: res.data.description,
            notes: res.data.notes
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  const handleChange = e => {
    setAction({
      ...action,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (edit === false) {
      axios.post(`http://localhost:4000/api/projects/${id}/actions`, action)
        .then(res => {
          console.log(res)
          history.push(`/projects/${id}`)
        })
        .catch(err => {
          console.log(err)
        })
    } else if (edit === true) {
      axios.put(`http://localhost:4000/api/actions/${idtwo}`, action)
        .then(res => {
          console.log(res)
          toggleEdit(false)
          history.push(`/projects/${id}/actions/${idtwo}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
    setAction({
      description: '',
      notes: ''
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='description' value={action.description} placeholder='description' />
        <input onChange={handleChange} type='text' name='notes' value={action.notes} placeholder='notes' />
        <button type='submit'>{edit ? 'Update Action' : 'Add Action'}</button>
      </form>
    </div>
  );
}

export default ActionForm;