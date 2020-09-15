import React from 'react';
import preloader from './../../../assets/images/loader.gif';
import styles from './Preloader.module.css';

let Preloader = (props) => {
    return <div className={styles.preloader}>
        <img src={preloader} alt="Загрузка"/>
    </div>
}

export default Preloader;