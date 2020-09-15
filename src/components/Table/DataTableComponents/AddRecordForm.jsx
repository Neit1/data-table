import React from 'react';
import styles from './../DataTable.module.css';

const AddRecordForm = (props) => {

    let handleChange = (e, type) => {
        props.setNewRecordToStore(props.newrecord, e.target.value, type);
    }

    let handleSubmit = (e) => {
        props.handleSubmit(props.newrecord);
    }

    let showAddForm = (e) => {
        props.showAddForm("block");
    }

    return (
        <div className={styles.addFormDiv}>
            {props.displayForm === "none"
                ? <button className={styles.addButton} onClick={showAddForm}>Добавить</button>
                : null}
            <form className={styles.addForm} style={{ display: props.displayForm }}>
                <label>
                    id:
                        <input type="text" value={props.newrecord.id} 
                        onChange={(e) => { handleChange(e, "id") }} placeholder="Введите id..." />
                </label>
                <br />
                <label>
                    firstName:
                        <input type="text" value={props.newrecord.firstName}
                        onChange={(e) => { handleChange(e, "firstName") }} placeholder="Введите firstName..." />
                </label>
                <br />
                <label>
                    lastName:
                        <input type="text" value={props.newrecord.lastName}
                        onChange={(e) => { handleChange(e, "lastName") }} placeholder="Введите lastName..." />
                </label>
                <br />
                <label>
                    email:
                        <input type="email" value={props.newrecord.email}
                        onChange={(e) => { handleChange(e, "email") }} placeholder="Введите email..." />
                </label>
                <br />
                <label>
                    phone:
                        <input type="text" value={props.newrecord.phone}
                        onChange={(e) => { handleChange(e, "phone") }} placeholder="Введите phone..." />
                </label>
            </form>
            {props.errorMessage
                ? <div className={styles.errorMessage}>
                    {props.errorMessage}
                </div>
                : null}
            {props.newrecord.id && props.newrecord.firstName && props.newrecord.lastName &&
                props.newrecord.email && props.newrecord.phone
                ? <button className={styles.addToTableButton}
                    style={{ display: props.displayForm }} onClick={handleSubmit}>Добавить в таблицу</button>
                : <button className={styles.addToTableButton} disabled
                    style={{ display: props.displayForm }} onClick={handleSubmit}>Добавить в таблицу</button>}
        </div>
    )
}

export default AddRecordForm;