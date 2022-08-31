import axios from 'axios';
//import { response } from '../../../api/src/app';

    export function getRecipes(){
        return async function(dispatch){
            var json= await axios.get("http://localhost:3001/recipes");

            return dispatch({
                type: 'GET_RECIPES',
                payload: json.data

            })//traigo todas las recetas
        }
    }

//----------------------------------------ORDENAMIENTO SCORE
    export function orderByScore(payload){
        return{
            type: 'ORDER_BY_SCORE',
            payload
        }
    } 

//----------------------------------------ORDENAMIENTO ALPHABET
    export function orderByAlphabet(payload){
        return{
            type: 'ORDER_ALPHABET',
            payload
        }
    }     
//----------------------------------------funcion para buscar recetas por su nombre

    export function searchRecipeByName(name){ // aca podria ponerle name //payload seria lo mismo
        return async function(dispatch){ 
                try{ 
                        var json = await axios.get('http://localhost:3001/recipes?name='+ name);//y aca podria devolver el name // aca deuelvo payload q seria lo mismo
                        
                        return dispatch({
                                type: 'SEARCH_RECIPE_BY_NAME',
                                payload: json.data
                            }) 
                            
                }catch(error){
                     

                    alert("The recipe does not exist")
                    console.log(error);
                }
        }
    }


//----------------------------------------
    export function filterByTypeDiets(payload){
        //console.log(payload);
        return{
                type: 'FILTER_BY_TYPEDIETS',
                payload,
        }
    }
//--------------------------------------
    export function getTypeDiets(){
        return async function(dispatch){
            var json= await axios.get("http://localhost:3001/types");

            return dispatch({
                type: 'GET_TYPEDIETS',
                payload: json.data

            })//me trae el name de los types diets
        }
    }
//----------------------------------------
    export function getDetail(id){
        return async function(dispatch){
            try{
                //var json= await axios.get('http://localhost:3001/recipes/'+ id);
                var json= await axios.get(`http://localhost:3001/recipes/${id}`);
                //`http://localhost:3001/${id}`
                return dispatch({
                    type : 'GET_DETAILS',
                    payload : json.data
                })
            }
            catch(error){console.log(error)}

        }

    }
//----------------------------------------
    export function postRecipe(payload){
        return async function (dispatch){
            const response = await axios.post("http://localhost:3001/recipe", payload);
            console.log(response)
            return response;
        }
    }

    
    
    
