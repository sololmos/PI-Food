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
    if(!input.image) { errors.image= 'This field is required'}
    if ( !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)) {errors.image = "Url not exist"}
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
    if(!input.type_diet){errors.type_diet = 'This field is required'}
     



    return errors;
};

export default function RecipeCreate(){
    const dispatch = useDispatch()
    //const history= useHistory()
    const diets= useSelector((state)=> state.dietsType)
    const [errors, setErrors] = useState({
        name : "You need to complete the name",
    });

    const[input, setInput] = useState({
        name : "",
        image : "",
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
            image : "",
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
//--------------------------------------
    return(
     <div className={styles.contenedor}>
            <br></br>

            <div className={styles.itemback}>
            
                    <Link className={styles.link_back} to='/home'>
                        <button className={styles.cssbuttons_io_button_back}>  Back!
                            <div className={styles.icon_back}>
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40"  height="80" width="80"><path d="M17.95 35.9 6 23.95 17.95 12l2.15 2.15-8.3 8.3H42v3H11.8l8.3 8.3Z" fill="currentColor" /></svg>
                            </div>
                        </button>
                    </Link>

            </div>

                <div className={styles.Bigcard}>

                        <div className={styles.card}>

                                <h1  className={styles.title}>Create your recipe!</h1>

                                    <form onSubmit={(e)=>handleSubmit(e)}>


                                            <div className={styles.itemform}>
                                                <label className={styles.label}>Name:</label>
                                                <input className={styles.input} type="text" value={input.name} name='name' onChange={handleChange} />
                                                {errors.name && (
                                                    <p className={styles.errormsg}>{errors.name}</p>
                                                )}
                                            </div>

                                                

                                            <div className={styles.itemform}>
                                                <label className={styles.label} >Image:</label>
                                                <input className={styles.input} type="url" value={input.image} name='image'  onChange={handleChange} />
                                                {errors.image && (
                                                    <p className={styles.errormsg} >{errors.image}</p>
                                                )}
                                            </div>

                                            

                                            <div className={styles.itemform}>
                                                <p className={styles.label}>Summary:</p>

                                                <textarea  className={styles.textareasummary} type="textarea" value={input.summary} name='summary'  onChange={handleChange} autoComplete='off'/>
                                                {errors.summary && (
                                                    <p className={styles.errormsg} >{errors.summary}</p>
                                                )}
                                            </div>

                                            


                                            <div className={styles.itemform}>
                                                <label className={styles.label}>Score:</label>
                                                <input  className={styles.inputR} type="number"  min= "0" max="100" value={input.score} name='score' autoComplete='off'  onChange={handleChange}/>
                                                {errors.score && (
                                                    <p className={styles.errormsg}>{errors.score}</p>
                                                )}
                                            </div>

                                            


                                            <div className={styles.itemform}>
                                                <label className={styles.label} >Healthy:</label>
                                                <input className={styles.inputR}  type="number" min= "0" max="100" value={input.healthylevel} name='healthylevel' autoComplete='off'  onChange={handleChange} />
                                                {errors.healthylevel && (
                                                    <p className={styles.errormsg}>{errors.healthylevel}</p>
                                                )}
                                            </div>

                                            

                                            <div className={styles.itemform}>
                                                <p className={styles.label}>Step by step:</p>
                                                <textarea className={styles.textareasteps} type="textarea" value={input.stepbystep} name='stepbystep' autoComplete='off' onChange={handleChange}/>
                                                {errors.stepbystep && (
                                                    <p className={styles.errormsg}>{errors.stepbystep}</p>
                                                )}
                                            </div>

                                            

                                            <div className={styles.itemform}>
                                                <p className={styles.label}>Type of diet:</p>

                                                <select className={styles.select} onChange={(e)=>handleSelect(e)} >
                                                {diets.map((d)=>(
                                                    <option value={d.name}>{d.name}</option>
                                                ))}

                                                </select>

                                                {errors.type_diet && (
                                                    <p className={styles.errormsg}>{errors.type_diet}</p>
                                                )}

                                            </div>

                                           
                                        

                                            {input.type_diet.map(el=>
                                                <div className={styles.diets}>
                                                    <span>{el}</span>
                                                    <button className={styles.botondiets} onClick={()=>handleDelete(el)}> X </button>
                                                
                                                </div>
                                                
                                                )}


                                                <div>
                                                            {/* 
                                                                <button 
                                                                type="submit"
                                                                disabled={Object.keys(errors).length === 0 ? false : true}
                                                                >
                                                                Create!
                                                                </button> 
                                                            */}


                                                            
                                                            <div className={styles.itemboton}>
                                                                <button className={styles.cssbuttons_io_button_back}
                                                                 type="submit"
                                                                 disabled={Object.keys(errors).length === 0 ? false : true}
                                                                
                                                                 >  Create !
                                                                    <div className={styles.icon_back}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 40 40" height="100" width="100"><path d="M35 44V28h-5.75V12.75q0-3.95 2.4-6.35Q34.05 4 38 4v40Zm-20.75 0V25.6q-2.6-.55-4.425-2.625Q8 20.9 8 18V4h3v14h3.25V4h3v14h3.25V4h3v14q0 2.9-1.825 4.975Q19.85 25.05 17.25 25.6V44Z"/></svg>                                    
                                                                    </div>
                                                                </button>
                                                            </div>
                                                            

                                                            




                                                </div>

                                            

                                    </form>

                                        


                        </div>{/*  divcard */}

                </div> {/* //divBigcard */}




     </div> /* //divContenedor */

    )


}