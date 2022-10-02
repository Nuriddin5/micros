import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import {ToastContainer} from "react-toastify";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        // <ToastContainer
        //     position="top-right"
        //     autoClose={5000}
        //     hideProgressBar={false}
        //     newestOnTop={false}
        //     closeOnClick
        //     rtl={false}
        //     pauseOnFocusLoss
        //     draggable
        //     pauseOnHover
        // />
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
}
