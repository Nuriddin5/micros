import {useEffect, useState} from "react";

const {REACT_APP_API_ENDPOINT} = process.env;

export default function Home() {


    const [transactions, setTransactions] = useState([])

    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Transactions/User`;
        const token = btoa(`${user.username}:${user.password}`);
        console.log(token);

        const fetchData = () => {
            const headers = {'Authorization': `basic ${token}`,'Content-Type': 'application/json', 'Accept': 'application/json'}
            try {
                fetch(url, {headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setTransactions(data);
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
                <h2>List of transactions user with username {user.username}</h2>
                <a href="/addTransaction">
                    <button className={"btn btn-success ms-5"}>ADD NEW</button>
                </a>
            </div>

            <div className={"d-flex justify-content-center"}>

            </div>

            <div className={"d-flex justify-content-center mt-5 "}>
                <table className="table table-striped w-75">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Comment</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {transactions.map((value, index) => <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.amount} $</td>
                        <td>{value.isIncome ? 'Income' : 'Expense'} </td>
                        <td>{value.date.toString().substring(0,10)} {value.date.toString().substring(11)}</td>
                        <td>{value.category.name}</td>
                        <td>{value.comment}</td>
                        <td className={"w-25"}>
                            <a href={"/transactions/edit/" + value.id}>
                                <button className={"btn btn-primary mx-3"}>Edit</button>
                            </a>
                            <a href={"/transactions/delete/" + value.id}>
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

