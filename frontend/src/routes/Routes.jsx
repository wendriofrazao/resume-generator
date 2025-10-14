import { BrowserRouter, Routes as RoutesReact, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import {LoginNRegister} from '../pages/LoginNRegister'
import {DashBoard} from '../pages/DashBoard'
// import { Editation } from '../pages/Editation'


const Routes = () => {
  return (
    <BrowserRouter>
        <RoutesReact>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path='/auth' element={<LoginNRegister/>} />
          {/* <Route path='/edit' element={<Editation/>} /> */}
        </RoutesReact>
    </BrowserRouter>
  )
}

export default Routes
