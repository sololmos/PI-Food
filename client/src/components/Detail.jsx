import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetail } from "../actions";
import { useEffect } from "react";
import styles from "../styles/Detail.module.css";
import Loading from "./Loading";


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
        <div className={styles.padre}>

                    <div className={styles.itemback}>
                                
                                <Link className={styles.link_back} to='/home'>
                                    <button className={styles.cssbuttons_io_button_back}>  Back!
                                        <div className={styles.icon_back}>
                                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40"  height="80" width="80"><path d="M17.95 35.9 6 23.95 17.95 12l2.15 2.15-8.3 8.3H42v3H11.8l8.3 8.3Z" fill="currentColor" /></svg>
                                        </div>
                                    </button>
                                </Link>

                        </div>

            
            {
                myRecipe.length > 0 ?

                <div className={styles.card}>

                    <h2 className={styles.name}>{myRecipe[0].name}</h2>
                    {/* eslint-disable-next-line  */}
                    <img className={styles.pic} src={myRecipe[0].image ? myRecipe[0].image : myRecipe[0].image }/>

                    <h3 className={styles.title}>Summary :</h3>
                    <h3 className={styles.text}>  {myRecipe[0].summary.replace(/<[^>]+>/g, '')}</h3>

              

                    <h3 className={styles.title}>Type of dish :</h3>
                    <h3 className={styles.text}> {myRecipe[0].type_dish}</h3>

                    <h3 className={styles.title}>Type of Diet :</h3>
                    <h3 className={styles.text}> {myRecipe[0].type_diet ? myRecipe[0].type_diet +( ", ") : myRecipe[0].types.map(el =>el.name + (',  ')) }</h3>

                    <h3 className={styles.title}>Step by step :</h3>

                    <h3 className={styles.text} > {myRecipe[0].stepbystep }</h3>

                    <h3 className={styles.title}>healthylevel:</h3>
                    <h3 className={styles.text}>{myRecipe[0].healthylevel } </h3> 

                </div> :   <p> <Loading></Loading></p>
            }




        </div>
    )




}