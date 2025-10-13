import { BrowserRouter, Routes as RoutesReact, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
const Routes = () => {
  return (
    <BrowserRouter>
        <RoutesReact>
          <Route path="/" element={<Home />} />
         </RoutesReact>
    </BrowserRouter>
  )
}

export default Routes
