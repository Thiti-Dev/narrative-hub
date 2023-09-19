import React from 'react';
import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Landing from './components/pages/landing-page';
import MasterVerification from './components/pages/master-page/views/verification/MasterVerification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Landing}/>
        <Route path='/master-verification' Component={MasterVerification}/>
      </Routes>
    </Router>
  );
}

export default App;
