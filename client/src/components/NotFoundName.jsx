import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/NotFoundName.module.css";
import image from "../styles/fotoerror.jpg";

export default function NotFoundName(){
    return (
        <div className={styles.container}>

         

                <div className={styles.card}>

                {/* <img className={styles.foto} src={image} alt="" width= "500px" height= "350px" /> */}

                    <div className={styles.card_details}>
                       
                       
                        <h2 className={styles.text_title}>upps! Error</h2>

                        <h3 className={styles.text_body}> No results found.</h3>
                       {/*  <img className={styles.foto} src={image} alt="" width= "500px" height= "350px" /> */}
                       

                    </div>
                            <Link  className={styles.link} to= "/home"> 
                            <button className={styles.card_button}>Try again!</button>
                            </Link>

                </div>
                

     
           
        </div>
    )
}
