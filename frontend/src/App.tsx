import React, { useRef } from 'react';
import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
import Landing from './components/pages/landing-page';
import MasterVerification from './components/pages/master-page/views/verification/MasterVerification';
import { GlobalProvider } from './contexts/global/global-context';
import ProtectedRoute from './components/guards/protected-route';
import CreatePost from './components/pages/master-page/views/create-post';
import { createProtectedComponent } from './utilities/misc/create-protected-component';
import ViewWriteup from './components/pages/writeups-page/views/view-writeup';
import useAuthenticationManagement from './hooks/use-authentication-management';
import NotFound from './components/pages/not-found';

function App() {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  useAuthenticationManagement()
  return (
    <>
    <GlobalProvider loadingBarRef={loadingBarRef}>
      <LoadingBar color='#f11946' ref={loadingBarRef} />
      <Router>
        <Routes>
          <Route path='/' Component={Landing}/>
          <Route path='/master-verification' Component={MasterVerification}/>
          <Route path='/create-post' element={createProtectedComponent(<CreatePost/>)}/>
          <Route path='/writeups/:writeupID' Component={ViewWriteup}/>
          <Route path='/*' Component={NotFound}/>
        </Routes>
      </Router>
    </GlobalProvider>
    </>
  );
}

export default App;