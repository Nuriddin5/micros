import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";

const {REACT_APP_API_ENDPOINT} = process.env;


export default function AddCategory() {


    const user = JSON.parse(localStorage.getItem("user"));

    const [categoryName, setCategoryName] = useState("")
    const [isIncome, setIncome] = useState(false)


    const showToastMessage = (message, status) => {
        console.log(message)
        console.log(status)
        if (status === 200) {
            toast.success("Successfully created!", {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(function () {
                window.location.href = '/categories';
            }, 5000)

        } else {
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

        console.log(categoryName);
        console.log(isIncome);

        const url = `${REACT_APP_API_ENDPOINT}/Categories`;
        const token = btoa(`${user.username}:${user.password}`);
        console.log(token);


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `basic ${token}`
            },
            body: JSON.stringify({
                name: categoryName,
                isIncome: isIncome
            })
        };
        try {
            fetch(url, requestOptions)
                .then(response => {
                    let data = response.json();
                    data.then(value => showToastMessage(value, response.status));
                })

        } catch (err) {
            console.log(err);
        }


    };


    const handleChange = (event) => {
        setCategoryName(event.target.value);
    };
    const handleChange2 = (event) => {
        console.log(event.target.value);
        setIncome(event.target.value === "true")
    };


    return (

        <div className="form-v7">
            <div className="page-content">
                <div className="form-v7-content">
                    <form onSubmit={handleSubmit} className="form-detail" action="#" method="post" id="myform">
                        <ToastContainer/>
                        <div className="form-row">
                            <label htmlFor="fullname">CATEGORY NAME</label>
                            <input type="text" name="name" id="your_email" className="input-text"
                                   defaultValue={categoryName}
                                   onChange={handleChange} required
                            />
                        </div>

                        <div className="input-group form-row mb-3">
                            <label htmlFor="inputGroupSelect02">IS INCOME</label>
                            <select className="form-select mt-3 w-100" id="inputGroupSelect02"

                                    defaultValue={isIncome.toString()}
                                    onChange={handleChange2}>
                                {/*<option selected>Choose...</option>*/}
                                <option value="true">True
                                </option>
                                <option value="false">False
                                </option>
                            </select>
                        </div>

                        <div className="form-row-last" style={{justifyContent: "center", display: "flex"}}>
                            <input type="submit" name="register" className="register" value="Add"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

