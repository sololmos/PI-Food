import React from "react";
//import {useState,useEffect} from  'react';
import {useEffect} from  'react';
import { useDispatch , useSelector } from "react-redux";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";


export default function Home (){

    const dispatch =useDispatch()
    const allRecipes = useSelector((state)=> state.recipes)

    useEffect(()=>{
        dispatch(getRecipes());
    })

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());

    }

    return(
        <div>
            <Link to= '/recipe'> Create Recipe</Link>
            <h1>FOOD APP</h1>
            <button onClick={e => {handleClick(e)}}>
                Refresh recipes
            </button>

            <div>
                <select>
                    <option value= 'all'>order by score</option>
                    <option value= 'hig'>high score</option>
                    <option value= 'low'>low score</option>
                </select>

                <select>
                    <option value= 'all'>order by alphabet</option>
                    <option value= 'a-z'>A-Z</option>
                    <option value= 'z-a'>Z-A</option>
                </select> 

                <select>
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
                </select> 

                {
                    allRecipes && allRecipes.map(el=>{
                        return(
                            <Card name={el.name} img= {el.img} type_diet={el.type_diet}/>
                             )
                       })
                }

            </div>



        </div>
    )


}