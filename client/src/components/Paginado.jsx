import React from "react";


export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for (let i=0 ; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }


    return (
        <nav>
            <ul className="paginado">
                {
                    pageNumbers &&  pageNumbers.map(number =>(
                        <li className="number" key={number}>
                        <button className="botonpaginado"onClick={()=>paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>


        </nav>
    )
}

//<a href="/" onClick={()=>paginado(number)}>{number}</a>