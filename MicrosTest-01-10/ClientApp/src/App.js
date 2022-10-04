import React, {Component} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Layout} from './components/Layout';
import './custom.css';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Categories from "./components/Category/Categories";
import DeleteCategory from "./components/Category/DeleteCategory";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (


            <Routes>

                <Route path={"/"} element={
                    localStorage.getItem('user') ?
                        <Layout children={<Home/>}/> : <Login/>}/>
                <Route path={"/logout"} element={<Logout/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/categories"} element={<Layout children={ <Categories/>}/>}/>
                
                <Route path={"categories/delete"}>
                    <Route path=":id" element={<DeleteCategory/>}/>
                </Route>
            </Routes>


        )
    }
}

