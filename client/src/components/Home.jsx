// eslint-disable-next-line 
import {useState,useEffect} from  'react';
import { useDispatch , useSelector } from "react-redux";
import { getRecipes, filterByTypeDiets, orderByScore,orderByAlphabet} from "../actions";
import styles from "../styles/Home.module.css";
// eslint-disable-next-line
import SearchBar from './SearchBar';
import { Link } from "react-router-dom";
import Card from "./Card";
import Loading from "./Loading"
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
        window.location.reload(); //me refresca tmb los filtro y orndenamientos
        /* dispatch(getRecipes()); *///esto solo me resetea las resetas
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
    <div className={styles.padre}>

        <h1 className={styles.title}>FOOD APP</h1>

            <div className={styles.div}>

              {/*   <h1 className={styles.title}>FOOD APP</h1> */}

                        <div className={styles.itemrefresh}>
                            <button className={styles.cssbuttons_io_button_home} onClick={e => {handleClick(e)}}> Refresh recipes!
                                <div className={styles.icon_home}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"  height="70" width="70"><path d="M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V8h3v12.7H27.3v-3h8.4q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q4.15 0 7.6-2.375 3.45-2.375 4.8-6.275h3.1q-1.45 5.25-5.75 8.45Q29.45 40 24 40Z" fill="currentColor"/></svg>
                                </div>
                            </button>
                        </div>

                        <div className={styles.itemsearch}>
                        <SearchBar/>
                        </div>

                            <div className={styles.itemcreate}>
                                <Link className={styles.link_home} to='/recipe'>
                                    <button className={styles.cssbuttons_io_button_home}>  Create a recipe!
                                    <div className={styles.icon_home}>
                                        <svg height="24" width="24" viewBox="0 0 24 24"   href="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                                    </div>
                                    </button>
                                </Link>
                            </div>

                            
                                <div className={styles.filters}>                                       
                                            {/*-----------------------FILTRO TIPO DE DIETAS----------------- */}

                                                <select className={styles.select} onChange={e=> handlefilterByTypeDiets(e)}>
                                                    <option value= 'all'> Filter by type of diet</option>
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
                                                <select className={styles.select} onChange={e=>handleorderByScore(e)}>
                                                    <option value= 'all'> Order by score</option>
                                                    <option value= 'asc'>from 0 to 100 points</option>
                                                    <option value= 'des'>from 100 to 0 point</option>
                                                </select>

                                            {/*-----------------------ORDER BY ALPHABET-------------------------- */}
                                                <select className={styles.select} onChange={e=>handleorderByAlphabet(e)}>
                                                    <option value= 'all'> Order by alphabet</option>
                                                    <option value= 'a-z'>A-Z</option>
                                                    <option value= 'z-a'>Z-A</option>
                                                </select> 
                                            
                                 </div>  {/*-----------------------FIN  FILTROS----------------- */}            



                                            {/*----------------------------MUESTRO FOTOS------------------------------- */}
                                                   {/*  <div className={styles.fotos}>
                                                            {
                                                             currentRecipes?.map((e)=>{
                                                                return(
                                                                    <div> 
                                                                        <Link to={'/recipes/' + e.id}>
                                                                        <Card name={e.name} img={e.img ? e.img : e.image} type_diet={e.type_diet} key={e.id} />
                                                                        </Link>
                                                                    </div> 
                                                                        );
                                                                        
                                                                    }) 
                                                            }
                                                    </div> */}

                                



                                            <div className={styles.paginado} > {/*----------------------------PAGINADO------------------------------- */}
                                                <Paginado
                                                    recipesPerPage={recipesPerPage}
                                                    allRecipes={allRecipes.length}
                                                    paginado={paginado}
                                                />
                                            </div>  {/*----------------------------PAGINADO------------------------------- */}
                                                     

                                             <div className={styles.containerfotos}> {/*------------------------------------------MUESTRO FOTOS------------------------------- */}

                                                {currentRecipes.length ?
                                                    currentRecipes.map(e => {
                                                        return (
                                                            <span className={styles.fotos}>
                                                                <Link className={styles.link_fotos} to={"/recipes/" + e.id}>
                                                                <Card name={e.name} image={e.image ? e.image : e.image} type_diet={e.type_diet} key={e.id} />
                                                                </Link>
                                                            </span>
                                                                )
                                                            }) : 
                                                                <div className={styles.loader}>                                                                           
                                                                <Loading> </Loading>
                                                                </div>
                                                 }

                                             </div>







            </div>

    </div>           

/* ----------------CUT-------------------- */
    )


}