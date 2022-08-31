import React from "react";
import styles from "../styles/Paginado.module.css";


export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for (let i=0 ; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }


    return (
        <nav>
            <div className={styles.paginado}>
                {
                    pageNumbers &&  pageNumbers.map(number =>(
                        <span className={styles.number} key={number}>
                        <button className={styles.botonpaginado} onClick={()=>paginado(number)}>{number}</button>
                        </span>
                    ))
                }
            </div>


        </nav>
    )
}

