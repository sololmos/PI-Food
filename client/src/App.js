import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>

        <Route  path='/' element={<LandingPage/>} />
        
        <Route  path='/home' element={<Home/>} />

        <Route  path='/recipe' element={<RecipeCreate/>} />



       </Routes>   

    </div>
    </BrowserRouter>
  );
}

export default App;
