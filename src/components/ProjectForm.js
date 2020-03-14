import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const ProjectForm = () => {
  const history = useHistory()
  const [project, setProject] = useState({
    name: '',
    description: ''
  })

  const handleChange = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`http://localhost:4000/api/projects`, project)
      .then(res => {
        console.log(res)
        history.push('/projects')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='name' value={project.name} placeholder='name' />
        <input onChange={handleChange} type='text' name='description' value={project.description} placeholder='description' />
        <button type='submit'>Add Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;