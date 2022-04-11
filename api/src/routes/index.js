const { Router } = require('express');
const axios =  require('axios');
const { API_KEY } = process.env;
const {Recipe,Type} = require ('../db');

//const json = require('../respuesta.json');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async ()=>{
      
     //prueba
     // const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true`);



//API_KEY_1=cce81d22300243f59df3c3eb0812c37d
//API_KEY_2=0a4f04877cf54d79ad0b60c59824540c
//API_KEY_3=decc54ef414f4104bdfef9525fcffc0f

const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=cce81d22300243f59df3c3eb0812c37d&addRecipeInformation=true&number=100`);

//const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=0a4f04877cf54d79ad0b60c59824540c&addRecipeInformation=true&number=100`);

//const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=decc54ef414f4104bdfef9525fcffc0f&addRecipeInformation=true&number=100`);

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
    //console.log(recipesApi)
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

//RUTA 3 : TRAE EL TIPO D DIETAS
router.get('/types', async (req, res)=>{
    //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=30&addRecipeInformation=true`


    //API_KEY_1=cce81d22300243f59df3c3eb0812c37d
    //API_KEY_2=0a4f04877cf54d79ad0b60c59824540c
    //API_KEY_3=decc54ef414f4104bdfef9525fcffc0f


     const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=cce81d22300243f59df3c3eb0812c37d&addRecipeInformation=true&number=100`);

     //const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=0a4f04877cf54d79ad0b60c59824540c&addRecipeInformation=true&number=100`);

     //const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=decc54ef414f4104bdfef9525fcffc0f&addRecipeInformation=true&number=100`);
  
     const recipesDiet = apiInfo.data.results.map( el => el.diets);
     const dietflat = recipesDiet.flat(Infinity); // aplano los arrays que tenga dentro
     //console.log(dietflat)
     const dietfilter = new Set(dietflat) // lo filtro para que no se repitan
     const dietsapi = [...dietfilter];

     //var dietslink= ['Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Low fodmap','Whole30'];//este array son los del enlace del readme de la pagina de la api

     // -aca los CONCATENO para compararlos
     //var dietsconcat = dietslink.concat(dietsapi);
     //--aca los paso a todos a MINUSCULAS 
     //let newdiets= dietsconcat.map(el =>{return el.toLowerCase()});

     // y aca FILTRO REPITENTES y me quedan 17 tipos de dietas en total 

     //const dietsok = new Set(newdiets);

     //let dietsList= [...dietsok];
     //console.log(dietsList)
     console.log(dietsapi)
     
     //console.log(dietsList) //son 17

     /*  dietsList.forEach(el=>{
         Type.findOrCreate({
             where : {name : el}
         })

     }) ; */
     dietsapi.forEach(el=>{
        Type.findOrCreate({
            where : {name : el}
        })

    }) ;
     const allDiets = await Type.findAll();
     res.send(allDiets);


        
})

//RUTA POST DE CREACION
router.post('/recipe', async (req,res)=>{

    let { 
        name,
        img, 
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
        img, 
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


/* router.get('/blabla', async (req, res) =>{
     // const info = await getAllInfo();
    // res.send(info);
    res.send("<h1> funciona</h1>")
}) */

   
/* 

 { 
        "name": "berejenas con oliva",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRee8KrsQnc307Kz0MxAhvau5kz-Js9ylNLXzOJyQsWvCp-__ZD5uxMnbTISgBQIidAfyA&usqp=CAU",
        "summary": "Es una receta rica",
        "type_dish" : "dinner",
        "type_diet" : ["vegan", "vegetarian"],
        "score": 40,
        "healthylevel": 75,
        "stepbystep": "cortar las berenjenas,cortar el queso,colocarles el queso arriba de la berenjena ,rociar con oliva,meter al microondas",
        "createdInDb" : true

    }

*/
//otra api key 3
//decc54ef414f4104bdfef9525fcffc0f
//https://api.spoonacular.com/recipes/complexSearch/?apiKey=decc54ef414f4104bdfef9525fcffc0f&addRecipeInformation=true&number=100`

module.exports = router;
