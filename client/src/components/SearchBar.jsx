import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipeByName } from "../actions";
import styles from "../styles/SearchBar.module.css";


export default function SearchBar(){
    const dispatch= useDispatch(); // me traigo el dispatch
    const [name, setName] = useState("")
    

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchRecipeByName(name))//name lo que esta escribiendo el usuario
        setName("");
    }



 return(
        <div className={styles.container}>
            
                
                        <div className={styles.item}>
                                        <input className={styles.input}
                                        type= 'text'
                                        placeholder ="   Search.."
                                        onChange={(e)=>handleInputChange(e)}
                                        />

                                </div>

                                <div className={styles.item}>
                                    <button className={styles.cssbuttons_io_button_home} 
                                    type='submit' 
                                    onClick={(e)=>handleSubmit(e)}> Search
                                    <div className={styles.icon_home}>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" height="70" width="70"><path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" fill="currentColor"/></svg>
                                    </div>
                                    </button>
                            </div>




            


                    






                                                {/*        <button 
                                                            type='submit' 
                                                            onClick={(e)=>handleSubmit(e)}> Search
                                                        </button> */}
            
        </div>
    )
       

}