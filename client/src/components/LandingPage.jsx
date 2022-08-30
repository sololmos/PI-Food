import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/LandingPage.module.css";
import github from "../styles/github.png";
import linkedin from "../styles/linkedin.png"


export default function LandingPage(){
    return (
        <div className={styles.div}>
            <br />
            <h1 className={styles.title}>FOOD APP</h1>
            <br />

            <div className={styles.about}>
                <h2 className={styles.text}> This Food App was created to showcase the knowledge learned through the “Henry” bootcamp. It’s a React - Redux application that uses a back-end express server to get information from the Spoonacular Api. It also uses Sequelize to store the recipes created by the user in a PostgreSQL database. 
                     You can search for recipes, filter/sort them and create your own new recipes! 
                     Thanks for passing by to check out my project!
                    
                </h2>

                <div className={styles.links}>
                <h3 className={styles.textsol} >Sol Olmos </h3>

                <a href="https://github.com/sololmos" target="_blank" rel="noopener noreferrer">
                <img className={styles.iconlinks} src={github} alt='github icon'  width= "40px" height= "40px"/>
                </a>

                <a href="https://www.linkedin.com/in/sol-olmos-fullstackdev-industrialdesigner/" target="_blank" rel="noopener noreferrer">
                <img className={styles.iconlinks} src={linkedin} alt='linkedin icon' width= "40px" height= "40px" />
                </a>
                
                
                </div>
                 


            </div>
        <div className={styles.container}>
            
            <Link className={styles.link} to='/Home'>
                <button className={styles.cssbuttons_io_button}>  Let's cook!
                <div className={styles.icon}>
                    <svg height="24" width="24" viewBox="0 0 24 24"   href="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>
            </Link>


        </div>
        </div>
    )
}