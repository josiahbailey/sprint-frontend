import React from 'react';
import Container from './components/container'
import Page from './components/Page'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Container} />

      <Route exact path='/:id' component={Page} />
    </div>
  );
}

export default App;
