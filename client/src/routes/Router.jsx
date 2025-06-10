import { Route, Routes } from 'react-router-dom';
import Root from '../layout/Root';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Root />}>
        <Route path='/' element={<Home/>}/>
         <Route path='/view-profile' element={<Profile/>}/>
      </Route>
    </Routes>
  );
};

export default Router;
