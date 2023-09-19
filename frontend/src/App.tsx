import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Landing from './components/pages/landing-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Landing}/>
      </Routes>
    </Router>
  );
}

export default App;
