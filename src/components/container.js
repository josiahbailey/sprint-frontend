import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'

const Container = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4000/api/projects')
      .then(res => {
        console.log(res)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      {data.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}><ProjectCard project={project} /></Link>
      ))}
    </div>
  );
}

export default Container;