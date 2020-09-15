import { dataAPI } from "../api/api";

const SET_DATA = 'SET_DATA';
const SET_RECORD = 'SET_RECORD';
const SET_NEW_RECORD = 'SET_NEW_RECORD';
const ADD_NEW_RECORD = 'ADD_NEW_RECORD';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_DATA_COUNT = 'SET_TOTAL_DATA_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    data: [ ],
    record: {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: {
			streetAddress: '',
			city: '',
			state: '',
			zip: ''
		},
		description: ''
    },
    newrecord: {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
        phone: '',
		address: {
			streetAddress: '',
			city: '',
			state: '',
			zip: ''
		},
		description: ''
    },
    pageSize: 50,
    totalDataCount: 0,
    currentPage: 1,
    isFetching: false
};

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data
            }
        case SET_RECORD:
            return {
                ...state,
                record: {...action.record[0]}
            }
        case SET_NEW_RECORD:
            return {
                ...state,
                newrecord: { ...action.newrecord }
            }
        case ADD_NEW_RECORD:
            return {
                ...state,
                data: [action.newrecord, ...state.data],
                newrecord: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: {
                        streetAddress: '',
                        city: '',
                        state: '',
                        zip: ''
                    },
                    description: ''
                }
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_DATA_COUNT:
            return {
                ...state,
                totalDataCount: action.totalDataCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const setData = (data) => {
    return { 
        type: SET_DATA,
        data
    }
}

export const setRecord = (record) => {
    return { 
        type: SET_RECORD,
        record
    }
}

export const setNewRecord = (newrecord) => {
    return { 
        type: SET_NEW_RECORD,
        newrecord
    }
}

export const addNewRecord = (newrecord) => {
    return { 
        type: ADD_NEW_RECORD,
        newrecord
    }
}

export const setCurrentPage = (currentPage) => {
    return { 
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalDataCount = (totalDataCount) => {
    return { 
        type: SET_TOTAL_DATA_COUNT,
        totalDataCount
    }
}

export const toggleIsFetching = (isFetching) => {
    return { 
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const getData = (currentPage, pageSize, type) => {

    let start_position = (currentPage - 1) * pageSize;
    let end_position = currentPage * pageSize;

    return (dispatch) => {
        dispatch(toggleIsFetching(true));

        dataAPI.getData(type)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setCurrentPage(currentPage));
                dispatch(setData(data.slice(start_position, end_position)));
                dispatch(setTotalDataCount(data.length));
            });
    }
}

export const getRecord = (data, recordId) => {

    return (dispatch) => {
        dispatch(setRecord(data.filter(d => d.id === recordId)));
    }
}

export const setNewRecordToStore = (tmprecord, cellData, type) => {

    if (type === "id") {
        tmprecord.id = cellData;
    } else if (type === "firstName") {
        tmprecord.firstName = cellData;
    } else if (type === "lastName") {
        tmprecord.lastName = cellData;
    } else if (type === "email") {
        tmprecord.email = cellData;
    } else if (type === "phone") {
        tmprecord.phone = cellData;
    }

    return (dispatch) => {
        dispatch(setNewRecord(tmprecord));
    }
}

export const addNewRecordToTable = (record) => {
    return (dispatch) => {
        dispatch(addNewRecord(record));
    }
}

export default dataReducer;