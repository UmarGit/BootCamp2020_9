import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router'
import Home from  './views/Home'
import Reports from  './views/Reports'
import NewData from  './views/NewData'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/reports-go' element={<Reports navigate={true} />}/>
                <Route path='/reports-back' element={<Reports navigate={false} />}/>
                <Route path='/transaction/add' element={<NewData />}/>
            </Routes>
        </div>
    );
}

export default App;
