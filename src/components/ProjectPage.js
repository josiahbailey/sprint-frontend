import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import ActionCard from './ActionCard'

const ProjectPage = () => {
  const history = useHistory()
  const [project, setProject] = useState()
  const { name, description, actions, completed } = project ? project : {}
  const id = useParams().id
  // const incomplete = actions ? actions.filter(action => action.completed === false) : null
  // const complete = actions ? actions.filter(action => action.completed !== false) : null

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

  const complete = project ? {
    name: project.name,
    description: project.description,
    completed: !completed
  } : {}

  const toggleComplete = e => {
    axios.put(`http://localhost:4000/api/projects/${id}`, complete)
      .then(res => {
        console.log(res)
        setProject(res.data.project)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <Link to={`/projects/${id}/new-action`}><button>Add Actions</button></Link>
      <button onClick={toggleComplete}>Toggle Project Completed</button>
      <Link to={`/projects/${id}/update`}><button>Update Project</button></Link>
      <button onClick={handleDelete}>Remove Project</button>
      <h1>Completed: {completed ? 'true' : 'false'}</h1>
      <h2>{name}</h2>
      <p>{description}</p>
      <h3>Actions: </h3>
      {actions ?
        actions.map(action => (
          <Link key={action.id} to={`/projects/${id}/actions/${action.id}`}><ActionCard action={action} /></Link>
        ))
        : ''
      }
      <Link to='/projects'>Back</Link>
    </div>
  );
}

export default ProjectPage;

// {
//   incomplete !== null ?
//   incomplete.map(action => (
//     <Link key={action.id} to={`/projects/${id}/actions/${action.id}`}><ActionCard action={action} /></Link>
//   ))
//   : ''
// }
// {
//   complete !== null ?
//   <div>
//     <h3>Completed: </h3>
//     {complete.map(action => (
//       <Link key={action.id} to={`/projects/${id}/actions/${action.id}`}><ActionCard action={action} /></Link>
//     ))}
//   </div>
//   : ''
// }