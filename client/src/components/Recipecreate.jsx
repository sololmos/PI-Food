import React , {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import {postRecipe, getTypeDiets } from '../actions';


export default function RecipeCreate(){
    const dispatch = useDispatch()
    //const history= useHistory()
    const diets= useSelector((state)=> state.dietsType)

    const[input, setInput] = useState({
        name : "",
        img : "",
        summary : "",
        type_dish : "",
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
            type_dish : "",
            type_diet : [], // no se lo paso por que tngo q hacer la relacion aparte 
            score : 0 ,
            healthylevel : 0,
            stepbystep : "",

        })
        //history.push('/home')
    }


//---------------------------------------------------------------
    useEffect(()=>{
        dispatch(getTypeDiets());
        
    },[]);

    return(
        <div>
            <Link to='/home' ><button>Back</button></Link>
            <h1>Create your recipe!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name='name' onChange={handleChange} />
                </div>

                <div>
                    <label>Img:</label>
                    <input type="text" value={input.img} name='img'  onChange={handleChange} />
                </div>

                <div>
                    <label>Summary:</label>
                    <input type="text" value={input.summary} name='summary'  onChange={handleChange}/>
                </div>

                <div>
                    <label>type dish:</label>
                    <input type="text" value={input.type_dish} name='type_dish'  onChange={handleChange} />
                </div>

                <div>
                    <label>score:</label>
                    <input type="number" value={input.score} name='score'  onChange={handleChange}/>
                </div>

                <div>
                    <label>healthylevel:</label>
                    <input type="number" value={input.healthylevel} name='healthylevel'  onChange={handleChange} />
                </div>

                <div>
                    <label>stepbystep:</label>
                    <input type="text" value={input.stepbystep} name='stepbystep'  onChange={handleChange}/>
                </div>

                <div>
                    <label>type_diet:</label>
                     <select onChange={(e)=>handleSelect(e)} >
                     {diets.map((d)=>(
                        <option value={d.name}>{d.name}</option>
                     ))}

                     </select>


                    {/* <input type="text" value={input.type_diet} name='type_diet' /> */}

                </div>
                <ul><li>{input.type_diet.map(el=> el + " ,")}</li></ul>


                <button type='submit'>Create recipe!</button>

               


            </form>

        </div>
    )


}