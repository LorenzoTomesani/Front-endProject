
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Login from './components/login';
function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default Router;