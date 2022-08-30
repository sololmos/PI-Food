import React from 'react';
import styles from "../styles/Card.module.css";

export default function Card({name, image, type_diet}){


    return (
    <div className={styles.container}>

        <span className={styles.card}>
        <img className={styles.foto} src={image} alt='img not found' width= "150px" height= "150px"/>

        <span className={styles.card_details}>  
            <p className={styles.text_title}>{name}</p>
            <p className={styles.text_body}>{type_diet}</p>
        </span>
            <button className={styles.card_button}>More info</button>
        </span>
                      
    </div>
    )
}
