import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Submit from './pages/submit/Submit'
import SimpleLayout from './components/SimpleLayout';
import './App.css';
import DefaultLayout from './components/DefaultLayout';
import ResetPassword from './pages/reset_password/ResetPassword';
import AlterPassword from './pages/alter_password/AlterPassword'; 
import PrivateRouter from './components/PrivateRouter';

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRouter/>}>
              <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
            </Route>
            <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>}/>
            <Route path='/login/submit' element={<SimpleLayout><Submit/></SimpleLayout>}/>
            <Route path='/login/reset-password' element={<SimpleLayout><ResetPassword/></SimpleLayout>}/>
            <Route path='/login/reset-password/alter-password' element={<SimpleLayout><AlterPassword/></SimpleLayout>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
