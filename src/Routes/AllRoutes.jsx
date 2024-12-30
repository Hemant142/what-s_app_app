import React from 'react'
import { Route, Routes } from 'react-router-dom'

import BasketDetails from '../Pages/BasketDetails'

import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import ConfirmOrder from '../Pages/ConfirmOrder'
import PrivateRoute from './PrivateRoute'
import Disclosure from '../Pages/Disclosure'

export default function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/:id' element={<Login/>} />
            <Route path='/basket/:id' element={<PrivateRoute><BasketDetails /></PrivateRoute>} />
            <Route path='/disclosure/:id' element={<PrivateRoute><Disclosure/></PrivateRoute>}/>
            <Route path='/confirm-order' element={<PrivateRoute><ConfirmOrder/></PrivateRoute>} />
    
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}
