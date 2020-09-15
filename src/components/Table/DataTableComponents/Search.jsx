import React, { createRef } from 'react';
import styles from './../DataTable.module.css';

const Search = (props) => {

    let filterTableRows = (e) => {
        props.filterTableRows(searchRef.current.value);
    }

    let searchRef = createRef();

    return (
        <div className={styles.search}>
            <input ref={searchRef} placeholder="Поиск" />
            <br />
            <button onClick={filterTableRows}>Найти</button>
        </div>
    )
}

export default Search;