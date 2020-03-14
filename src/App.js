import React from 'react';
import { Route } from 'react-router-dom'

import Container from './components/Container'
import Page from './components/ProjectPage'
import Header from './components/Header'
import ActionPage from './components/ActionPage'

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path='/' component={Container} />

      <Route exact path='/:id' component={Page} />

      <Route exact path='/:id/actions/:idtwo' component={ActionPage} />
    </div>
  );
}

export default App;
