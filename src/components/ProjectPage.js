import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import ActionCard from './ActionCard'

const Page = () => {
  const history = useHistory()
  const [project, setProject] = useState()
  const { name, description, actions, completed } = project ? project : {}
  const id = useParams().id

  useEffect(() => {
    axios.get(`http://localhost:4000/api/projects/${id}`)
      .then(res => {
        console.log(res)
        setProject(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleDelete = e => {
    axios.delete(`http://localhost:4000/api/projects/${id}`)
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
      <Link to={`/projects/${id}/new-action`}><button>Add Actions</button></Link>
      <button>Toggle Project Completed</button>
      <Link to={`/projects/${id}/update`}><button>Update Project</button></Link>
      <button onClick={handleDelete}>Remove Project</button>
      <h1>Completed: {completed ? 'true' : 'false'}</h1>
      <h2>{name}</h2>
      <p>{description}</p>
      <h3>Actions: </h3>
      {actions ? actions.map(action => {
        if (action.completed === true) {
          return ''
        } else {
          return <Link key={action.id} to={`/projects/${id}/actions/${action.id}`}><ActionCard action={action} /></Link>
        }
      }) : ''}
      <h3>Completed Actions: </h3>
      {actions ? actions.map(action => {
        if (action.completed === true) {
          return <Link key={action.id} to={`/projects/${id}/actions/${action.id}`}><ActionCard action={action} /></Link>
        } else {
          return ''
        }
      }) : ''}
      <Link to='/projects'>Back</Link>
    </div>
  );
}

export default Page;