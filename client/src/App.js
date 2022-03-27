import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>

        <Route  path='/' element={<LandingPage/>} />
        
        <Route  path='/home' element={<Home/>} />

       </Routes>   

    </div>
    </BrowserRouter>
  );
}

export default App;
