import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import './custom.css';
import {Home} from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (

            <Layout>
                <Routes>

                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>


                </Routes>
            </Layout>


        )
    }
}

