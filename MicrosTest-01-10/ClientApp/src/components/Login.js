import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        console.log(userInfo);


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
            // toast.success(`Success : ${message}`, {
            //     position: toast.POSITION.TOP_RIGHT
            // });

         
            window.location.href = '/';


        } else if (status === 400) {
            toast.error(`Error : ${message}`, {
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(function () {
                window.location.href = window.location.href.split("?")[0]
            }, 5000)
        }

    };


    return <div>
        <form onSubmit={handleSubmit}>
            <ToastContainer/>
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
            <div className={"d-flex justify-content-center"}>

                <button type="submit" className="btn btn-primary ">Login</button>
            </div>
            <div className={"d-flex justify-content-center"}>
                <a href="/register">Register if you haven't account</a>
            </div>

        </form>
    </div>
}