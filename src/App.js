import React from 'react';
import { Route } from 'react-router-dom'

import Container from './components/Container'
import ProjectPage from './components/ProjectPage'
import Header from './components/Header'
import ActionPage from './components/ActionPage'
import ActionForm from './components/ActionForm'
import ProjectForm from './components/ProjectForm'

function App() {
  return (
    <div className="App">
      <Header />

      <Route exact path='/projects' component={Container} />

      <Route exact path='/projects/:id' component={ProjectPage} />

      <Route exact path='/projects/:id/actions/:idtwo' component={ActionPage} />

      <Route exact path='/new-project' component={ProjectForm} />

      <Route exact path='/projects/:id/update' component={ProjectForm} />

      <Route exact path='/projecets/:id/new-action' component={ActionForm} />

      <Route exact path='/projects/:id/actions/:idtwo/update' component={ActionForm} />
    </div>
  );
}

export default App;
