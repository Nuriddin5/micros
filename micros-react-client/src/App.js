import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import './custom.css';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Categories from "./components/Category/Categories";
import DeleteCategory from "./components/Category/DeleteCategory";
import AddCategory from "./components/Category/AddCategory";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (

            <BrowserRouter>
                <Routes>

                    <Route path={"/"} element={
                        localStorage.getItem('user') ?
                            <Layout children={<Home/>}/> : <Login/>}/>
                    <Route path={"/logout"} element={<Logout/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/categories"} element={<Layout children={<Categories/>}/>}/>
                    <Route path={"/addCategory"} element={<Layout children={<AddCategory/>}/>}/>

                    <Route path={"categories/delete"}>
                        <Route path=":id" element={<DeleteCategory/>}/>
                    </Route>


                </Routes>
            </BrowserRouter>


        )
    }
}

