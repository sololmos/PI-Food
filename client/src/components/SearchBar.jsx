import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipeByName } from "../actions";


export default function SearchBar(){
    const dispatch= useDispatch(); // me traigo el dispatch
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchRecipeByName(name))//name lo que esta escribiendo el usuario
    }



    return(
        <div>
            <input 
              type= 'text'
              placeholder="Search.."
              onChange={(e)=>handleInputChange(e)}
             />

             <button 
                type='submit' 
                onClick={(e)=>handleSubmit(e)}> Search </button>
            
        </div>
    )
       

}