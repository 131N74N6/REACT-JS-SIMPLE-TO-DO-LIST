import React, { Fragment } from 'react';
import ToDoList from './components/ToDo';
import DarkMode from './components/darkmode';
import "./App.css";

function App() {
    return (
        <Fragment>
            <DarkMode>
                <ToDoList/>
            </DarkMode>
        </Fragment>
    )
}

export default App