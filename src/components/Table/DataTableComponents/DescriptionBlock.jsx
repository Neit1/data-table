import React from 'react';
import styles from './../DataTable.module.css';

const DescriptionBlock = (props) => {
    return (
        <div className={styles.description}>
            Выбран пользователь <b>{props.record.firstName} {props.record.lastName}</b>
            <br />
                Описание:
            <br />
            <textarea readOnly value={props.record.description} />
            <br />
                Адрес проживания: <b>{props.record.address.streetAdress}</b>
            <br />
                Город: <b>{props.record.address.city}</b>
            <br />
                Провинция/штат: <b>{props.record.address.state}</b>
            <br />
                Индекс: <b>{props.record.address.zip}</b>
        </div>
    )
}

export default DescriptionBlock;