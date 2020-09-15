import React from 'react';
import { connect } from 'react-redux';
import { getData, setData, getRecord, setNewRecordToStore, addNewRecordToTable } from "../../redux/dataReducer";
import Preloader from '../common/Preloader/Preloader';
import AddRecordForm from './DataTableComponents/AddRecordForm';
import DataTable from './DataTableComponents/DataTable';
import DescriptionBlock from './DataTableComponents/DescriptionBlock';
import Search from './DataTableComponents/Search';
import styles from './DataTable.module.css';
import { isEmail, isNumber } from '../../utils/validators/validators';

class DataTableContainer extends React.Component {

    state = {
        dataIsNotReversed: true,
        prevType: "",
        filteredTable: null,
        displayForm: "none",
        errorMessage: ""
    }

    componentDidMount() {
        this.props.getData(1, this.props.pageSize, this.props.type);     
    }

    onPageChanged = (pageNumber) => {
        this.props.getData(pageNumber, this.props.pageSize, this.props.type);
        this.setState({
            dataIsNotReversed: true,
            filteredTable: null
        });
    }

    sortData = (data, type) => {
        let typeEqual = true;
        let isNotReversed = true;
        if (this.state.prevType !== type)
        {
            typeEqual = false;
        }
        let tmpdata = [];
        if (type === "id") {
            tmpdata = data.sort((a, b) => a.id > b.id ? 1 : -1);
        } else if (type === "firstName") {
            tmpdata = data.sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1);
        } else if (type === "lastName") {
            tmpdata = data.sort((a, b) => a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1);
        } else if (type === "email") {
            tmpdata = data.sort((a, b) => a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1);
        } else if (type === "phone") {
            tmpdata = data.sort((a, b) => a.phone > b.phone ? 1 : -1);
        }
        if (typeEqual && this.state.dataIsNotReversed) {
            tmpdata.reverse();
            isNotReversed = false;
        } 
        setData(tmpdata);
        this.setState({
            dataIsNotReversed: isNotReversed,
            prevType: type
        });
    }

    handleSubmit = (newrecord) => {
        let errorMessage1 = isNumber(newrecord.id);
        let errorMessage2 = isEmail(newrecord.email);
        let filteredTable = null;
        if (!errorMessage1 && !errorMessage2) {
            this.props.addNewRecordToTable(newrecord);
            errorMessage1 = "";
        }
        else {
            errorMessage1 = errorMessage1 + " " + errorMessage2;
            filteredTable = this.state.filteredTable;
        }
        this.setState({
            filteredTable: filteredTable,
            errorMessage: errorMessage1
        });
    }

    filterTableRows = (text) => {
        let filteredTable = this.props.data.filter(d => {
            let str = d.id + " " + d.firstName + " " + d.lastName + " "
             + d.email + " " + d.phone;
            return str.indexOf(text) !== -1;
        });
        
        this.setState({
            filteredTable
        });
    }

    showAddForm = (displayForm) => {
        this.setState({
            displayForm
        });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <div className={styles.tablePageWrapper}>
                <Search filterTableRows={this.filterTableRows} />
                <AddRecordForm newrecord={this.props.newrecord}
                    setNewRecordToStore={this.props.setNewRecordToStore}
                    addNewRecordToTable={this.props.addNewRecordToTable}
                    handleSubmit={this.handleSubmit} 
                    showAddForm={this.showAddForm}
                    displayForm={this.state.displayForm}
                    errorMessage={this.state.errorMessage} />
                <DataTable totalDataCount={this.props.totalDataCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    data={this.props.data}
                    sortData={this.sortData}
                    getRecord={this.props.getRecord}
                    filteredTable={this.state.filteredTable} />
                <DescriptionBlock record={this.props.record} />
            </div>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        data: state.dataPage.data,
        record: state.dataPage.record,
        newrecord: state.dataPage.newrecord,
        pageSize: state.dataPage.pageSize,
        totalDataCount: state.dataPage.totalDataCount,
        currentPage: state.dataPage.currentPage,
        isFetching: state.dataPage.isFetching
    }
}

export default connect(mapStateToProps, {getData, setData, getRecord,
     setNewRecordToStore, addNewRecordToTable})(DataTableContainer);