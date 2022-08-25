import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import Loading from './components/Loading';
import Detail from './components/Detail';
import NotFoundName from './components/NotFoundName';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>

        <Route exact path='/' element={<LandingPage/>} />
        
        <Route exact path='/home' element={<Home/>} />

        <Route exact path='/loading' element={<Loading/>} />

        <Route exact path='/recipe' element={<RecipeCreate/>} />

        <Route  exact path='/recipes/:id' element={<Detail/>} />

        <Route  exact path='/notfound' element={<NotFoundName/>} />
        



       </Routes>   

    </div>
    </BrowserRouter>
  );
}

export default App;
