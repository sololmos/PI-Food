import React , {useState, useEffect} from 'react';
// eslint-disable-next-line
import { Link, useHistory} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import {postRecipe, getTypeDiets } from '../actions';
import styles from "../styles/RecipeCreate.module.css";


function validate(input){
    let errors = {};

    if(!input.name) { errors.name = 'This field is required'}
    if(input.name.length > 100) { errors.name = 'Must contain less than 100 characters'}
    if (!/^[a-zA-Z\s]+$/.test(input.name)) {errors.name = "Should not contain numbers or special characters" }
    if(!input.name){errors.name = 'This field is required'}
    //---------------------------------  
    if(!input.img) { errors.img= 'This field is required'}
    if ( !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.img)) {errors.img = "Url not exist"}
    //---------------------------------
    if(!input.summary){errors.summary = 'This field is required'}
    if(input.summary.length >= 250){errors.summary = 'Must contain less than 250 characters'} 
    //---------------------------------
    if(!input.stepbystep){errors.stepbystep = 'This field is required'}
    if(input.stepbystep.length >= 500){errors.stepbystep = 'Must contain less than 500 characters'} 
    //----------------------------------
    if(!input.score){errors.score = 'This field is required'}
    //----------------------------------
    if(!input.healthylevel){errors.healthylevel = 'This field is required'}
    //----------------------------------
    //if(!input.type_diet){errors.type_diet = 'This field is required'}
     



    return errors;
};

export default function RecipeCreate(){
    const dispatch = useDispatch()
    //const history= useHistory()
    const diets= useSelector((state)=> state.dietsType)
    const [errors, setErrors] = useState({
        name : "you need to complete the name",
    });

    const[input, setInput] = useState({
        name : "",
        img : "",
        summary : "",
        type_diet : [], // no se lo paso por que tngo q hacer la relacion aparte 
        score : 0 ,
        healthylevel : 0,
        stepbystep : "",
       
    }) 

//---------------------------------------------------------------
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }
//---------------------------------------------------------------
    function handleSelect(e){
        setInput({
            ...input,
            type_diet : [...input.type_diet, e.target.value]
        })
    }
//---------------------------------------------------------------
    function handleSubmit(e){
        e.preventDefault();

        console.log(input)

        dispatch(postRecipe(input))

        alert("Recipe created!")

        setInput({
            name : "",
            img : "",
            summary : "",
            type_diet : [], // no se lo paso por que tngo q hacer la relacion aparte 
            score : 0 ,
            healthylevel : 0,
            stepbystep : "",

        })
        //history.push('/home')
    }
//--------------------------------------------------------------
    function handleDelete(el){
        setInput({
            ...input,
            type_diet : input.type_diet.filter(t=> t !==el)

        })
    }

//---------------------------------------------------------------
    useEffect(()=>{
        dispatch(getTypeDiets());
    // eslint-disable-next-line    
    },[]);

    return(
        <div className={styles.contenedor}>
            <br></br>
            
            <Link className={styles.link_back} to='/home'>
                        <button className={styles.cssbuttons_io_button_back}>  Back!
                        <div className={styles.icon_back}>
                            <svg height="24" width="24" viewBox="0 0 24 24"   href="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                        </div>
                        </button>
                    </Link>

  

            <div className={styles.card}>
                    <h1>Create your recipe!</h1>

                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div>
                            <label>Name:</label>
                            <input type="text" value={input.name} name='name' onChange={handleChange} />
                            {errors.name && (
                                <p>{errors.name}</p>
                            )}
                        </div>

                        <br></br>

                        <div>
                            <label>Img:</label>
                            <input type="url" value={input.img} name='img'  onChange={handleChange} />
                            {errors.img && (
                                <p>{errors.img}</p>
                            )}
                        </div>

                        <br></br>

                        <div>
                            <p>Summary:</p>
                            <textarea type="textarea" value={input.summary} name='summary'  onChange={handleChange} autoComplete='off'/>
                            {errors.summary && (
                                <p>{errors.summary}</p>
                            )}
                        </div>

                        <br></br>


                        <div>
                            <label>Score:</label>
                            <input type="range"  min= "0" max="100" value={input.score} name='score' autoComplete='off'  onChange={handleChange}/>
                            {errors.score && (
                                <p>{errors.score}</p>
                            )}
                        </div>

                        <br></br>


                        <div>
                            <label>Healthylevel:</label>
                            <input type="range" min= "0" max="100" value={input.healthylevel} name='healthylevel' autoComplete='off'  onChange={handleChange} />
                            {errors.healthylevel && (
                                <p>{errors.healthylevel}</p>
                            )}
                        </div>

                        <br></br>

                        <div>
                            <p>Step by step:</p>
                            <textarea type="textarea" value={input.stepbystep} name='stepbystep' autoComplete='off' onChange={handleChange}/>
                            {errors.stepbystep && (
                                <p>{errors.stepbystep}</p>
                            )}
                        </div>

                        <br></br>

                        <div>
                            <p>Type of diet:</p>

                            <select onChange={(e)=>handleSelect(e)} >
                            {diets.map((d)=>(
                                <option value={d.name}>{d.name}</option>
                            ))}

                            </select>
                            {errors.type_diet && (
                                <p>{errors.type_diet}</p>
                            )}

                        </div>

                        <br></br>
                    

                        {input.type_diet.map(el=>
                            <div>
                                <p>{el}</p>
                                <button onClick={()=>handleDelete(el)}>X</button>
                            
                            </div>
                            
                            )}


                        <div>
                        <button 
                        type="submit"
                        disabled={Object.keys(errors).length === 0 ? false : true}
                        >
                        Create!
                        </button>

                        </div>

                        


                        

                    


                    </form>

            <br></br>
            <br></br>


             </div>




        </div>
    )


}