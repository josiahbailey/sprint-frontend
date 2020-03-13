import React from 'react';

const Card = ({ project }) => {
  const { name, description } = project
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
}

export default Card;