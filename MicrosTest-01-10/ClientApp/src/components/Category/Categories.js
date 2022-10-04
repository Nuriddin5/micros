import {useEffect, useState} from "react";

const {REACT_APP_API_ENDPOINT} = process.env;


export default function Categories() {

    const [categories, setCategories] = useState([])

    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Categories/User`;
        const token = btoa(`${user.username}:${user.password}`);
        console.log(token);


        const fetchData = () => {
            const headers = {'Authorization': `basic ${token}`}
            try {
                fetch(url, {headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setCategories(data);
                    });
            } catch (err) {
                console.log(err);
            }


        };
        fetchData();
    }, []);


    return (

        <div className={"container"}>
            <div className={"d-flex justify-content-center mt-5"}>
                <h2>List of categories user with username {user.username}</h2>
                <a href="/addCategory"> <button className={"btn btn-success ms-5"}>ADD NEW</button></a>
            </div>

            <div className={"d-flex justify-content-center"}>

            </div>

            <div className={"d-flex justify-content-center mt-5 "}>
                <table className="table table-striped w-75">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">IsIncome</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {categories.map((value, index) => <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.name}</td>
                        <td>{value.isIncome.toString()}</td>
                        <td className={"w-25"}>
                            <button className={"btn btn-primary mx-3"}>Edit</button>
                            <a href={"/categories/delete/" + value.id}>
                                <button className={"btn btn-danger"}>Delete</button>
                            </a>

                        </td>
                    </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

