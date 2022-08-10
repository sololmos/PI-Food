import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/LandingPage.module.css";

export default function LandingPage(){
    return (
        <div className={styles.div}>
            <br />
            <h1 className={styles.title}>FOOD APP</h1>
            <br />
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