import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Page = () => {
  const [project, setProject] = useState()
  const id = useParams().id

  useEffect(() => {
    console.log(id)
    axios.get(`http://localhost:4000/api/projects/${id}`)
      .then(res => {
        console.log(res)
        setProject(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const { name, description, actions } = project ? project : {}

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      {actions ? actions.map(action => (
        <div>
          <h4>{action.description}</h4>
          <p>{action.notes}</p>
        </div>
      )) : ''}
      <Link to='/'>Back</Link>
    </div>
  );
}

export default Page;