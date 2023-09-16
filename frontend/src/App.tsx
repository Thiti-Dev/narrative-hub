import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css';
import Landing from './components/landing-page/';

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
