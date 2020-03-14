import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import ActionCard from './ActionCard'

const Page = () => {
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

  return (
    <div>
      <Link to={`/projects/${id}/new-action`}><button>Add Actions</button></Link>
      <button>Toggle Project Completed</button>
      <Link to={``}><button>Update Project</button></Link>
      <button>Remove Project</button>
      <h1>Completed: {completed ? 'true' : 'false'}</h1>
      <h2>{name}</h2>
      <p>{description}</p>
      <h3>Actions: </h3>
      {actions ? actions.map(action => {
        if (action.completed === true) {
          return ''
        } else {
          return <Link to={`/projects/${id}/actions/${action.id}`}><ActionCard action={action} /></Link>
        }
      }) : ''}
      <Link to='/'>Back</Link>
    </div>
  );
}

export default Page;