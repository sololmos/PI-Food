import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>

        <Route exact path='/' element={<LandingPage/>} />
        
        <Route exact path='/home' element={<Home/>} />

        <Route exact path='/recipe' element={<RecipeCreate/>} />

        <Route  exact path='/recipes/:id' element={<Detail/>} />



       </Routes>   

    </div>
    </BrowserRouter>
  );
}

export default App;
