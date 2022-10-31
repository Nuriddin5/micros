import {useEffect, useState} from "react";

const {REACT_APP_API_ENDPOINT} = process.env;

export default function Categories() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Categories`;
        const token = btoa(`${user.username}:${user.password}`);

        const fetchData = () => {
            const headers = {'Authorization': `basic ${token}`}
            try {
                fetch(url, {headers})
                    .then(response => response.json())
                    .then(data => {
                        setCategories(data);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [user.password, user.username]);

    return (

        <div className={"container"}>
            <div className={"d-flex justify-content-center mt-5"}>
                <h2>List of categories user with username {user.username}</h2>
                <a href="/addCategory">
                    <button className={"btn btn-success ms-5"}>ADD NEW</button>
                </a>
            </div>

            <div className={"d-flex justify-content-center mt-5 w-75 m-auto"}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Type</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {categories.map((value, index) => <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.name}</td>
                        <td>{value.type.name}</td>
                        <td className={"w-25"}>
                            <a href={"/categories/edit/" + value.id}>
                                <button className={"btn btn-primary mx-3"}>Edit</button>
                            </a>
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

