import React , {useState, useEffect} from 'react';
// eslint-disable-next-line
import { Link, useHistory} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';

import styles from "../styles/Loading.module.css";


export default function Loading(){
  
    return(
       
 <div>
           <h3 className={styles.title}>Loading</h3>

                    <div className={styles.contenedor}>
                    
                        
                    
                    {/*   <h1 className={styles.title}>Loading</h1> */}

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