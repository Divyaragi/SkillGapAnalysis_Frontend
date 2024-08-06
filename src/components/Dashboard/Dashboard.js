import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loginpage from '../login/Loginpage'
export default function Dashboard() {
  return (
    <>
    <div>
        <BrowserRouter>
            <Routes>
              <Route path='/login' element={<><Loginpage/></>}/>
                              
            </Routes>
        </BrowserRouter>

    </div>
</>
  )
}
