import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const ActionForm = () => {
  const history = useHistory()
  const [action, setAction] = useState({
    description: '',
    notes: ''
  })
  const id = useParams().id

  const handleChange = e => {
    setAction({
      ...action,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`http://localhost:4000/api/projects/${id}/actions`, action)
      .then(res => {
        console.log(res)
        history.push(`/projects/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='description' value={action.description} placeholder='description' />
        <input onChange={handleChange} type='text' name='notes' value={action.notes} placeholder='notes' />
        <button type='submit'>Add Action</button>
      </form>
    </div>
  );
}

export default ActionForm;