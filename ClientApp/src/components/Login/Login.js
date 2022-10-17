import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'

const {REACT_APP_API_ENDPOINT} = process.env;


export default function Login() {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        setUserInfo({...userInfo, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                username: userInfo.username,
                password: userInfo.password,
            })
        };
        try {
            fetch(`${REACT_APP_API_ENDPOINT}/login`, requestOptions)
                .then(response => {
                    let data = response.json();
                    data.then(value => showToastMessage(value, response.status));
                })

        } catch (err) {
            console.log(err);
        }


    };

    const showToastMessage = (message, status) => {
        if (status === 200) {
            const data = JSON.stringify({
                username: userInfo.username,
                password: userInfo.password,
            })
            localStorage.setItem("user", data);
            window.location.href = '/';
        } else if (status === 400) {
            toast.error(`${message}`, {
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(function () {
                window.location.href = window.location.href.split("?")[0]
            }, 5000)
        }

    };


    return <div className="form-v7">
        <div className="page-content">
            <div className="form-v7-content2">
                <form onSubmit={handleSubmit} className="form-detail" action="#" method="post" id="myform">
                    <ToastContainer/>

                    <div className="form-row">
                        <label htmlFor="username">USERNAME</label>
                        <input type="text" name="username" id="username" className="input-text"
                               defaultValue={userInfo.username}
                               onChange={handleChange} required/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" name="password" id="password" className="input-text"
                               defaultValue={userInfo.password}
                               onChange={handleChange} required/>
                    </div>
                    <div className="form-row-last">
                        <input type="submit" name="register" className="register" value="Login"/>
                        <p>Or<a href="/register">Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
}