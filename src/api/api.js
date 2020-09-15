import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.filltext.com/'
});

export const dataAPI = {
    getData (type = "little") {
        if (type === "little") {
            return instance.get('?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
            .then(response => {
                return response.data;
            });
        }
        else if (type === "big") {
            return instance.get('?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
            .then(response => {
                return response.data;
            });
        }
        else return -1;
    }
}