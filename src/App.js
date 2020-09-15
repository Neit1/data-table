import React from 'react';
import './App.css';
import DataTableContainer from './components/Table/DataTableContainer';
import { Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => (
        <div className="buttonsWrapper">
          <NavLink to="/littledata"><button className="navButton">Little Data</button></NavLink>
          <NavLink to="/bigdata"><button className="navButton">Big Data</button></NavLink>
        </div>)} />
      <Route path="/littledata" render={() => <DataTableContainer type={"little"} />} />
      <Route path="/bigdata" render={() => <DataTableContainer type={"big"} />} />
    </div>
  );
}

export default App;
