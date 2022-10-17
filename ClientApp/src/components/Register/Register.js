import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import "./register.css"

const {REACT_APP_API_ENDPOINT} = process.env;


export default function Register() {


    const [userInfo, setUserInfo] = useState({
        fullname: "",
        username: "",
        password: "",
        prePassword: ""
    });

    const handleChange = (event) => {
        setUserInfo({...userInfo, [event.target.name]: event.target.value});
    };

    const showToastMessage = (message, status) => {
        if (status === 200) {
            toast.success(`${message}`, {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(function () {
                window.location.href = '/login';
            }, 5000)

        } else if (status === 400) {
            toast.error(`${message}`, {
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(function () {
                window.location.href = window.location.href.split("?")[0]
            }, 5000)
        }

    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({

                fullname: userInfo.fullname,
                username: userInfo.username,
                password: userInfo.password,
                prePassword: userInfo.prePassword
            })
        };
        try {
            fetch(`${REACT_APP_API_ENDPOINT}/Register`, requestOptions)
                .then(response => {
                    let data = response.json();
                    data.then(value => showToastMessage(value, response.status));
                })

        } catch (err) {
            console.log(err);
        }


    };


    return <div className="form-v7">
        <div className="page-content">
            <div className="form-v7-content">
                <form onSubmit={handleSubmit} className="form-detail" action="#" method="post" id="myform">
                    <ToastContainer/>
                    <div className="form-row">
                        <label htmlFor="fullname">FULLNAME</label>
                        <input type="text" name="fullname" id="your_email" className="input-text"
                               defaultValue={userInfo.fullname}
                               onChange={handleChange} required
                        />
                    </div>

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
                    <div className="form-row">
                        <label htmlFor="prePassword">CONFIRM PASSWORD</label>
                        <input type="password" name="prePassword" id="comfirm_password" className="input-text"
                               defaultValue={userInfo.prePassword}
                               onChange={handleChange} required/>
                    </div>
                    <div className="form-row-last">
                        <input type="submit" name="register" className="register" value="Register"/>
                        <p>Or<a href="/login">Sign in</a></p>
                    </div>

                </form>
            </div>
        </div>
    </div>
}
    
    