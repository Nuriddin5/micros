// import React from 'react';
// import {Navigate, Route} from 'react-router-dom';
//
// export const PrivateRoute = ({ element: Component, ...rest }) => (
//     <Route {...rest} render={
//         props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )