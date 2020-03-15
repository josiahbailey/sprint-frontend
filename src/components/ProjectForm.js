import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom'
import axios from 'axios'

const ProjectForm = () => {
  const history = useHistory()
  const [edit, toggleEdit] = useState(false)
  const [project, setProject] = useState({
    name: '',
    description: ''
  })
  const match = useRouteMatch()
  const path = match.url.slice(12)
  const id = match.params.id

  useEffect(() => {
    if (path === 'update') {
      toggleEdit(true)
      axios.get(`http://localhost:4000/api/projects/${id}`)
        .then(res => {
          console.log(res)
          setProject({
            name: res.data.name,
            description: res.data.description
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  const handleChange = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (edit === false) {
      axios.post(`http://localhost:4000/api/projects`, project)
        .then(res => {
          console.log(res)
          history.push('/projects')
        })
        .catch(err => {
          console.log(err)
        })
    } else if (edit === true) {
      axios.put(`http://localhost:4000/api/projects/${id}`, project)
        .then(res => {
          console.log(res)
          toggleEdit(false)
          history.push(`/projects/${id}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
    setProject({
      name: '',
      description: ''
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='name' value={project.name} placeholder='name' />
        <input onChange={handleChange} type='text' name='description' value={project.description} placeholder='description' />
        <button type='submit'>{edit ? 'Update Project' : 'Add Project'}</button>
      </form>
    </div>
  );
}

export default ProjectForm;