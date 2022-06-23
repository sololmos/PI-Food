import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetail } from "../actions";
import { useEffect } from "react";


export default function Detail(){
    //console.log(props)
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetail(id));

    },[id,dispatch])


    const myRecipe = useSelector((state)=>state.detail)
    console.log(myRecipe)


    return(
        <div>
            
            {
                myRecipe.length > 0 ?
                <div>
                    <h2>{myRecipe[0].name}</h2>
                    {/* eslint-disable-next-line  */}
                    <img src={myRecipe[0].img ? myRecipe[0].img : myRecipe[0].image }/>
                    <h3>Sumary :</h3>
                    <h4>  {myRecipe[0].summary}</h4>
                    <h3>Type of dish :</h3>
                    <h4> {myRecipe[0].type_dish}</h4>

                    <h3>Type of Diet :</h3>
                    <h4> {myRecipe[0].type_diet ? myRecipe[0].type_diet +( " ") : myRecipe[0].types.map(el =>el.name + (' ')) }</h4>

                    <h3>Step by step :</h3>
                    <h4> {myRecipe[0].stepbystep}</h4>

                    <h3>healthylevel: {myRecipe[0].healthylevel}</h3>

                </div> : <p>Loading..</p>
            }

            <Link to= '/home'>
                <button>Back</button>
            </Link>


        </div>
    )




}