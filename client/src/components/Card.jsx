import React from 'react';
//import NotFoundName from './NotFoundName';
import styles from "../styles/Card.module.css";

export default function Card({name, image, type_diet}){

  /*   if(!name){
        
        return(
            <div>
                <NotFoundName></NotFoundName>
            </div>
        )
    } */
    return (
        <div className={styles.container}>

          {/*   <div className={styles.card}>

                    <h3 className={styles.title}>{name}</h3>
                    <h5 className={styles.text}>{type_diet}</h5>
                    <img className={styles.pic} src={image} alt='img not found' width= "200px" height= "200px"/> */}


                         {/*    <span className={styles.card}>

                                <span className={styles.card_details}>
                                    
                                    <p className={styles.text_title}>{name}</p>
                                    <p className={styles.text_body}>{type_diet}</p>
                                    <img className={styles.pic} src={image} alt='img not found' width= "150px" height= "150px"/>

                                </span>

                                     <button className={styles.card_button}>More info</button>


                            </span> */}


                        <span className={styles.card}>
                        <img className={styles.foto} src={image} alt='img not found' width= "150px" height= "150px"/>

                        <span className={styles.card_details}>
                            
                            <p className={styles.text_title}>{name}</p>
                            <p className={styles.text_body}>{type_diet}</p>
                            

                        </span>

                            <button className={styles.card_button}>More info</button>


                        </span>
                            

           {/*  </div> */}
           
        </div>
    )
}
