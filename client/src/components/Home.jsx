// eslint-disable-next-line 
import {useState,useEffect} from  'react';
import { useDispatch , useSelector } from "react-redux";
import { getRecipes, filterByTypeDiets, orderByScore,orderByAlphabet} from "../actions";
// eslint-disable-next-line
import SearchBar from './SearchBar';
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from './Paginado';



export default function Home (){

    const dispatch =useDispatch()
    const allRecipes = useSelector((state)=> state.recipes)
    // eslint-disable-next-line
    const [orden, setOrden] = useState('')

//-------------------------------------PAGINADO
                const [currentPage, setCurrentPage] = useState(1)
                // eslint-disable-next-line 
                const [recipesPerPage, setRecipesPerPage]= useState(9)
                //const [recipesPerPage]= useState(9)
                const indexOfLastRecipe= currentPage * recipesPerPage //9
                const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0
                const currentRecipes= allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

                const paginado= (pageNumber)=>{
                    setCurrentPage(pageNumber)
                }



    useEffect(()=>{
        dispatch(getRecipes());
    },[dispatch])
//-----------------------------------------------MUESTRO RECETAS

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

//-----------------------------------------------FILTRO
    function handlefilterByTypeDiets(e){ 
        dispatch(filterByTypeDiets(e.target.value));
    }
//---------------------------------------------(SORT)ORDER BY SCORE
   function handleorderByScore(e){
       e.preventDefault();
       dispatch(orderByScore(e.target.value));
       setCurrentPage(1); //cuando hago el ordenamiento le digo q me setee la pag 1
       setOrden(`Ordenado${e.target.value}`)
   }
//----------------------------------------------(SORT)ORDER BY ALPHA
    function handleorderByAlphabet(e){
        e.preventDefault();
        dispatch(orderByAlphabet(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado${e.target.value}`)
    }   

//----------------------------------------------ACA RENDERIZO
    return(
        <div>

            <h1>FOOD APP</h1>

            <Link to= '/recipe'> Create a Recipe</Link>

            <button onClick={e => {handleClick(e)}}>
                Refresh recipes
            </button>

            <div>
             {/*----------------------------SEARCHBAR------------------------------- */}

                <SearchBar/>

             {/*-----------------------FILTRO TIPO DE DIETAS----------------- */}

                {/* <select onChange={e=> handlefilterByTypeDiets(e)}>
                    <option value= 'all'>filter by type of diet</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="fodmap friendly">Fodmap Friendly</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo Vegetarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="primal">Primal</option>
                    <option value="vegan">Vegan</option>
                    <option value="whole 30">Whole 30</option>
                </select>  */}

                <select onChange={e=> handlefilterByTypeDiets(e)}>
                    <option value= 'all'>filter by type of diet</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="ketogenic">ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto-vegetarian">Lacto-vegetarian</option>
                    <option value="paleo">Paleolithic</option>
                    <option value="ovo-vegetarian">Ovo-vegetarian</option>
                    <option value="low fodmap">Low fodmap</option>
                    <option value="pescetarian" >Pescetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30" >Whole 30</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                </select> 

             {/*-----------------------ORDER BY SCORE-------------------------- */}
                <select onChange={e=>handleorderByScore(e)}>
                    <option value= 'all'>order by score</option>
                    <option value= 'asc'>from 0 to 100 points</option>
                    <option value= 'des'>from 100 to 0 point</option>
                </select>

             {/*-----------------------ORDER BY ALPHABET-------------------------- */}
                <select onChange={e=>handleorderByAlphabet(e)}>
                    <option value= 'all'>order by alphabet</option>
                    <option value= 'a-z'>A-Z</option>
                    <option value= 'z-a'>Z-A</option>
                </select> 
             {/*----------------------------PAGINADO------------------------------- */}
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />



             {/*----------------------------MUESTRO FOTOS------------------------------- */}
                    <span className='pics'>
                     {currentRecipes?.map((e)=>{
                        return(
                            <div> 
                                <Link to={'/recipes/' + e.id}>
                                <Card name={e.name} img={e.img ? e.img : e.image} type_diet={e.type_diet} key={e.id} />
                                </Link>
                            </div> 
                                );
                            })
                     }
                    </span>

               

            </div>



        </div>
    )


}