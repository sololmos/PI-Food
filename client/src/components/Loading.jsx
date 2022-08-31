import React from 'react';
import styles from "../styles/Loading.module.css";

export default function Loading(){
 return( 
    <div>
        <h3 className={styles.title}>Loading</h3>

            <div className={styles.contenedor}> 

                    <div className={styles.wrapper}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>

                        <div className={styles.shadow}></div>
                        <div className={styles.shadow}></div>
                        <div className={styles.shadow}></div>
                    
                    </div>
            </div>
    </div>


 )


}