import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to='/'><button>Home</button></Link>
      <Link to='/projects'><button>Projects</button></Link>
      <Link to='/new-project'><button>Add Projects</button></Link>
    </div>
  );
}

export default Header;