import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loginpage from './Loginpage'
export default function ApplicationRoutes() {
  return (
    <div>
    <div>
        <BrowserRouter>
            <Routes>
              <>
              <Route path='/login' element={<><Loginpage/></>}/>
              </>
                
                
            </Routes>
        </BrowserRouter>

    </div>
</div>
  )
}
