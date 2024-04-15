import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Form from './components/Form/Form';
import SharedLayout from './SharedLayout';
import CardPage from './components/CardPage/CardPage';

const App = () => {
  return <BrowserRouter>
            <Routes>
      <Route path='/' element={<SharedLayout />}>
               <Route path='/' element={<Form />} />
               <Route path='Card' element={<CardPage />} />
        </Route>
            </Routes>
  </BrowserRouter>
}

export default App