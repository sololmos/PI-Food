const { Router } = require('express');
const axios =  require('axios');
const { API_KEY } = process.env;
const {Recipe,Type} = require ('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async ()=>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const apiFood = await apiUrl.data.results.map(el=>{
        return{
            name : el.title,
            id : el.id,
            img : el.image, 
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

// ahora se vienen las rutas
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
        const recipeId = await allRecipes.filter(el=> el.id == id);//consultar .filter(element => element.id.toString() === id)
        recipeId.length ? 
        res.status(200).send(recipeId) :
        res.status(404).send('Not found');
    }
})



 


module.exports = router;
