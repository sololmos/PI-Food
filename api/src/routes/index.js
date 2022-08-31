const { Router } = require('express');
const axios =  require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
//const { API_KEY_2 } = process.env;
//const { API_KEY_3 } = process.env;
//const { API_KEY_4 } = process.env;
const {Recipe,Type} = require ('../db');

//const json = require('../respuesta.json');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//INFO---------------------------------
const getApiInfo = async ()=>{

const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

//const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY_2}&addRecipeInformation=true&number=100`);

//const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY_3}&addRecipeInformation=true&number=100`);

//const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY_4}&addRecipeInformation=true&number=100`);


    const apiFood = await apiUrl.data.results.map(el=>{
        return{
            name : el.title,
            id : el.id,
            image: el.image, 
            summary : el.summary,
            type_dish : el.dishTypes,
            type_diet : el.diets,
            score : el.spoonacularScore,
            healthylevel : el.healthScore,
            stepbystep : el.analyzedInstructions[0]?.steps.map(e => {
                return `${e.number} - ${e.step}`
              })

        }
    });
    return apiFood; //esta función me trae la info de la api

}

const getDbInfo = async ()=> {
    return await Recipe.findAll({
        include : {
            model : Type,
            attributes : ['name'],
            through : {
                attributes : [],
            },
        }
    })
}

const getAllInfo = async ()=>{
    const apiInfo = await  getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = await apiInfo.concat(dbInfo);
    return infoTotal
  
}

//ROUTES:
//RUTA 1 =  listado de las recetas que contengan la palabra ingresada como query parameter

 router.get('/recipes', async (req,res)=>{
    let recipesApi = await getAllInfo();
    const name = req.query.name;

    if(name){
        let recipeName = await recipesApi.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
        res.status(200).send(recipeName) :

        res.status(404).send('Not found');
    } else {
        res.status(200).send(recipesApi)
    };
})
 


//RUTA 2 : el detalle de una receta en particular + tipo de dieta
router.get('/recipes/:id', async (req,res)=>{
    const id= req.params.id;
    const allRecipes = await getAllInfo();
    if(id){
        const recipeId = await allRecipes.filter(el=> el.id == id);
        recipeId.length ? 
        res.status(200).send(recipeId) :
        res.status(404).send('Not found');
    }
})

//RUTA 3 : TRAE EL TIPO D DIETAS
router.get('/types', async (req, res)=>{
   

    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    //const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY_2}&addRecipeInformation=true&number=100`);

    //const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY_3}&addRecipeInformation=true&number=100`);

    //const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY_4}&addRecipeInformation=true&number=100`);
    

     const recipesDiet = apiInfo.data.results.map( el => el.diets);
     const dietflat = recipesDiet.flat(Infinity); // aplano los arrays que tenga dentro
     //console.log(dietflat)
     const dietfilter = new Set(dietflat) // lo filtro para que no se repitan
     const dietsapi = [...dietfilter];
      
     dietsapi.forEach(el=>{
        Type.findOrCreate({
            where : {name : el}
        }) //los guardo en la base de datos

    }) ;
     const allDiets = await Type.findAll();
     res.send(allDiets);

        
})

//RUTA POST DE CREACION
router.post('/recipe', async (req,res)=>{

    let { 
        name,
        image, 
        summary,
        type_dish,
        type_diet,
        score,
        healthylevel,
        stepbystep,
        createdInDb

    } = req.body

    let recipeCreated = await Recipe.create({
        name,
        image, 
        summary,
        type_dish,
        //type_diet, // no se lo paso por que tngo q hacer la relacion aparte 
        score,
        healthylevel,
        stepbystep,
        createdInDb
    })
    let typeDietDb = await Type.findAll({
        where : {name :  type_diet }
    })     

    recipeCreated.addType(typeDietDb);
    res.send('type of diet created!')

})


module.exports = router;
