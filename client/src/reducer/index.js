
const initialState = {
    recipes : [],
    allRecipes : [],
    dietsType : [],
    detail : [],
    notFoundName : false,
    
}

function rootReducer(state=initialState, action){
   
    switch(action.type){


         case 'GET_RECIPES' :
            return{
                ...state,
                recipes : action.payload,
                allRecipes : action.payload
            }
         //--------------------------------------------------
         case 'SEARCH_RECIPE_BY_NAME' :
            let notFound = action.payload;
            if(notFound.length === 0){ //revisarrrrrr si 0 o 1!
                notFound = true;
            } else{notFound = false}

             return{
                 ...state,
                 recipes: action.payload, //las recetas por nombre
                    notFoundName : notFound,
             }
         
         //--------------------------------------------------
         case 'POST_RECIPE' :
             return{
                 ...state,
             }
         //--------------------------------------------------
         case 'FILTER_BY_TYPEDIETS' : 

            const allRecipes = state.allRecipes
            const type_diet = [] //api---> aca tengo guardados los tipos de dieta dela api
            const types = [] // db---> aca tengo guardados los tipos de dieta dela bd
            allRecipes.forEach(e =>{
                if(e.hasOwnProperty('type_diet') && e.type_diet.includes(action.payload)){
                    type_diet.push(e)
                }
                })

             allRecipes.forEach(e =>{
                if(e.hasOwnProperty('types') && e.types.map(t => t.name === action.payload)){
                    types.push(e)
                }
                }) 

            const allTypes= type_diet.concat(types)
            if (allTypes.length){
                return {
                    ...state,
                    recipes : allTypes
                }
            };
            break;
         //--------------------------------------------------

        /*  case 'FILTER_BY_TYPEDIETS' :
             const diets = state.allRecipes
             const recipeFiltered = action.payload === 'all'
              ? diets : 
             diets.filter(recipe=>{
                 let names = recipe.type_diet.map(t => t.name)
                 if(names.includes(action.payload)) return recipe
                 else return null;
             })
             return {
                 ...state,
                 recipes : recipeFiltered

             };

             break; */

         //--------------------------------------------------
         case 'GET_TYPEDIETS' : 
            return{
                ...state,
                dietsType : action.payload
            }
         //--------------------------------------------------
            case 'GET_DETAILS' :
                return{
                    ...state,
                    detail : action.payload

                }
         //--------------------------------------------------
         case 'ORDER_BY_SCORE' :
            let orderArray = action.payload === "asc" ? 
            state.recipes.sort(function (a,b){
                    if(a.healthylevel > b.healthylevel){
                            return 1;
                    }
                    if(b.healthylevel > a.healthylevel){
                            return -1;
                    }
                    return 0;
            }) : 
            state.recipes.sort(function (a,b){
                    if(a.healthylevel > b.healthylevel){
                            return -1;
                    }
                    if(b.healthylevel > a.healthylevel){
                            return 1;
                    }
                    return 0;
            });
            return{
                    ...state,
                    recipes:orderArray
            }
         //-------------------------------------------------
          case 'ORDER_ALPHABET' :
              let orderAlpha = action.payload ==='a-z' ?
                state.recipes.sort(function (a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                            return 1;
                    }
                    if( b.name.toLowerCase() > a.name.toLowerCase()){
                            return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a,b){
                        if( a.name.toLowerCase() > b.name.toLowerCase()){
                                return -1;
                        }
                        if(b.name.toLowerCase() > a.name.toLowerCase()){
                                return 1;
                        }
                        return 0;
                });

                return{
                    ...state,
                    recipes:orderAlpha
                }

         //--------------------------------------------------   
         default:
            return state;



    }


}

export default rootReducer;