import React, { useEffect, useState } from 'react';
import {Amplify} from 'aws-amplify';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import {withAuthenticator} from '@aws-amplify/ui-react';
import awsConfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Market from './pages/Market';
import NoPage from './pages/NoPage';
import './styles/navStyle.css'

Amplify.configure(awsConfig);

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [ username, setUsername ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ signInDetails, setSignInDetails ] = useState('');

  useEffect(() => {
    fetchJWTToken();
  }, []);

  const fetchJWTToken = async() => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens.accessToken.toString();
      setAccessToken(token);

      const signInDetails = await getCurrentUser();
      setSignInDetails(signInDetails);
      setUsername(signInDetails.username);
      setUserId(signInDetails.userId);

    } catch(error) {
      console.log("Error fetching Access Token: ", error);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home signInDetails={signInDetails} accessToken={accessToken} />} />
          <Route path='/home' element={<Home signInDetails={signInDetails} accessToken={accessToken} />} />
          <Route path='/market' element={<Market signInDetails={signInDetails} accessToken={accessToken} />} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App);