import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'
import axios from 'axios'

const ActionPage = () => {
  const history = useHistory()
  const [action, setAction] = useState()
  const { description, notes, completed } = action ? action : {}
  const id = useParams().id
  const idtwo = useParams().idtwo

  useEffect(() => {
    axios.get(`http://localhost:4000/api/actions/${idtwo}`)
      .then(res => {
        console.log(res)
        setAction(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleDelete = e => {
    axios.delete(`http://localhost:4000/api/actions/${idtwo}`)
      .then(res => {
        console.log(res)
        history.push(`/projects/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const toggleComplete = e => {
    axios.put(`http://localhost:4000/api/actions/${idtwo}`, { ...action, completed: !completed })
      .then(res => {
        console.log(res)
        setAction(res.data.action)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <button onClick={toggleComplete}>Toggle Action Completed</button>
      <Link to={`/projects/${id}/actions/${idtwo}/update`}><button>Update Action </button></Link>
      <button onClick={handleDelete}>Remove Action</button>
      <h1>Completed: {completed ? 'true' : 'false'}</h1>
      <h2>{description}</h2>
      <h3>{notes}</h3>
      <Link to={`/projects/${id}`}>Back</Link>
    </div>
  );
}

export default ActionPage;