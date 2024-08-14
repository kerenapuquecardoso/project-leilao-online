import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Submit from './pages/submit/Submit'
import SimpleLayout from './components/SimpleLayout';
import './App.css';
import DefaultLayout from './components/DefaultLayout';

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
            <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>}/>
            <Route path='/login/submit' element={<SimpleLayout><Submit/></SimpleLayout>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
