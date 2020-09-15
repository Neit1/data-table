import React from 'react';
import styles from './../DataTable.module.css';
import TableRecord from './TableRecord/TableRecord';

const DataTable = (props) => {

    let rowNumber = 0;
    let tableRowElements = props.data.map(d => {
        let display = "table-row";
        rowNumber++;
        if (props.filteredTable && props.filteredTable.indexOf(d) === -1)
        {
            display = "none";
        }
        return (
            <tr style={{display: `${display}`}} onClick={() => { props.getRecord(props.data, d.id) }} key={rowNumber}>
                <TableRecord  
                id={d.id} firstName={d.firstName} lastName={d.lastName} email={d.email}
                phone={d.phone} />
            </tr>
        )
    });

    let pagesCount = Math.ceil(props.totalDataCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let sortRows = (type) => {
        props.sortData(props.data, type);
    }

    return (
        <>
            <div>
                Страницы: {pages.map(p => {
                    return <span className={(props.currentPage === p && styles.selectedPage) || styles.pages}
                    onClick={(e) => {props.onPageChanged(p);}} key={p}>{p} </span>
                })}
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => {sortRows("id")}}>id</th>
                        <th onClick={() => {sortRows("firstName")}}>firstName</th>
                        <th onClick={() => {sortRows("lastName")}}>lastName</th>
                        <th onClick={() => {sortRows("email")}}>email</th>
                        <th onClick={() => {sortRows("phone")}}>phone</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRowElements}
                </tbody>
            </table>
        </>
    )
}

export default DataTable;