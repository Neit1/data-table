import React from 'react';

const TableRecord = (props) => {

    return (
        <>
            <td>{props.id}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
        </>
    )
}

export default TableRecord;