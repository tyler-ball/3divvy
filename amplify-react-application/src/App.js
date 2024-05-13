import React from 'react';
import {Amplify} from 'aws-amplify';
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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/market' element={<Market />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App);