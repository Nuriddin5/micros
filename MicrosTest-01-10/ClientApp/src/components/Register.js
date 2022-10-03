import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.success(`Success : ${message}`, {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(function () {
                window.location.href = '/login';
            }, 5000)

        } else if (status === 400) {
            toast.error(`Error : ${message}`, {
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(function () {
                window.location.href = window.location.href.split("?")[0]
            }, 5000)
        }

    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(userInfo);


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


    return <div>
        <form onSubmit={handleSubmit}>
            <ToastContainer/>
            <div className="mb-3 mx-5">
                <label htmlFor="formGroupExampleInput" className="form-label">Full Name</label>
                <input name={"fullname"} type="text" className="form-control" id="formGroupExampleInput"
                       placeholder="Maxmudov Rustam" defaultValue={userInfo.fullname}
                       onChange={handleChange} required/>
            </div>

            <div className="mb-3 mx-5 ">
                <label htmlFor="formGroupExampleInput2" className="form-label">Username</label>
                <input name={"username"} type="text" className="form-control" id="formGroupExampleInput2"
                       placeholder="Enter username" defaultValue={userInfo.username}
                       onChange={handleChange} required/>
            </div>

            <div className="mb-3 mx-5">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input name={"password"} type="password" className="form-control" id="exampleInputPassword1"
                       defaultValue={userInfo.password}
                       onChange={handleChange} required/>
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="exampleInputPassword2" className="form-label">Repeat Password</label>
                <input name={"prePassword"} type="password" className="form-control" id="exampleInputPassword2"
                       defaultValue={userInfo.prePassword}
                       onChange={handleChange} required/>
            </div>
            <div className={"d-flex justify-content-center"}>

                <button className="btn btn-primary ">Register</button>
            </div>
            <div className={"d-flex justify-content-center"}>

                <a href={"/login"}>Login, if you have account</a>
            </div>
        </form>
    </div>

}
    
    