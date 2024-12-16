import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState} from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Submit from './pages/submit/Submit'
import SimpleLayout from './components/SimpleLayout';
import NotFound from './pages/not_found/NotFound';
import Category from './pages/category/Category';
import Auction from './pages/auction/Auction';
import AuctionPublic from './pages/auction-public/Auctionpublic';
import './App.css';
import DefaultLayout from './components/DefaultLayout';
import ResetPassword from './pages/reset_password/ResetPassword';
import AlterPassword from './pages/alter_password/AlterPassword'; 
import PrivateRouter from './components/PrivateRouter';
import Porfile from './pages/porfile/porfile';
import AccessDanied from './pages/access_danied/access_danied';
import ValidateRegister from './pages/validate_register/ValidateRegister';

function App() {
  
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<PrivateRouter/>}>
              <Route path='porfile' element={<DefaultLayout><Porfile/></DefaultLayout>}/>
              <Route path=' ' element={<DefaultLayout><Home/></DefaultLayout>}/>
             
              
            </Route>
            <Route path='category' element={<DefaultLayout><Category /></DefaultLayout>} />
            <Route path='/auction' element={<DefaultLayout><Auction /></DefaultLayout>} />
            <Route path='validate-user' element={<SimpleLayout><ValidateRegister/></SimpleLayout>}/>
            <Route path='/access-danied' element={<SimpleLayout><AccessDanied/></SimpleLayout>}/>
            <Route path='/not-found' element={<SimpleLayout><NotFound/></SimpleLayout>}/>
            <Route path="/auction-public" element={<AuctionPublic />} />
            <Route path='/' element={<SimpleLayout><Login/></SimpleLayout>}/>
            <Route path='/*' element={<SimpleLayout><Login/></SimpleLayout>} />
            <Route path='/login/submit' element={<SimpleLayout><Submit/></SimpleLayout>}/>
            <Route path='/login/reset-password' element={<SimpleLayout><ResetPassword/></SimpleLayout>}/>
            <Route path='/login/reset-password/alter-password' element={<SimpleLayout><AlterPassword/></SimpleLayout>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
