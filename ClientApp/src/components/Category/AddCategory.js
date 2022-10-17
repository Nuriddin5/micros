import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";

const {REACT_APP_API_ENDPOINT} = process.env;


export default function AddCategory() {


    const user = JSON.parse(localStorage.getItem("user"));

    const [categoryName, setCategoryName] = useState("")
    const [typeName, setTypeName] = useState()
    const [types, setTypes] = useState([]);

    const showToastMessage = (message, status) => {
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
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${REACT_APP_API_ENDPOINT}/Categories`;
        const token = btoa(`${user.username}:${user.password}`);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `basic ${token}`
            },
            body: JSON.stringify({
                name: categoryName,
                typeName: typeName
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

    const handleCategoryName = (event) => {
        setCategoryName(event.target.value);
    };
    const handleType = (event) => {
        setTypeName(event.target.value)
    };

    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Types`;
        const token = btoa(`${user.username}:${user.password}`);

        const fetchData = () => {
            const headers = {'Authorization': `basic ${token}`}
            try {
                fetch(url, {headers})
                    .then(response => response.json())
                    .then(data => {
                        setTypes(data);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [user.password, user.username]);


    return (
        <div className="form-v7">
            <div className="page-content">
                <div className="form-v7-content">
                    <form onSubmit={handleSubmit} className="form-detail" action="#" method="post" id="myform">
                        <ToastContainer/>

                        <div className="form-row">
                            <label htmlFor="add_category_name">CATEGORY NAME</label>
                            <input type="text" name="name" id="add_category_name" className="input-text"
                                   defaultValue={categoryName}
                                   onChange={handleCategoryName} required
                            />
                        </div>

                        <div className="input-group form-row mb-3">
                            <label htmlFor="type_name_add">TYPE</label>
                            <select className="form-select mt-3 w-100" id="type_name_add"
                                    defaultValue={typeName}
                                    onChange={handleType}>
                                <option>...Choose</option>
                                {types.map((t, index) =>
                                    <option key={index} value={t.name}>{t.name}</option>
                                )}
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

