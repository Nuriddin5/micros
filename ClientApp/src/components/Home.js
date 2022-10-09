import {useEffect, useState} from "react";

const {REACT_APP_API_ENDPOINT} = process.env;

export default function Home() {


    const [transactions, setTransactions] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [categories, setCategories] = useState([]);


    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Transactions/User`;
        const token = btoa(`${user.username}:${user.password}`);
        console.log(token);

        const fetchData = () => {
            const headers = {
                'Authorization': `basic ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
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

    const handleCategoryName = (event) => {
        setCategoryName(event.target.value)
    };

    const handleIncome = (event) => {
        setIncome(event.target.value === "true")
    };

    const [isIncome, setIncome] = useState()

    // const filteredPersons = transactions.filter(
    //    
    //     transaction => {
    //         return (
    //             transaction
    //                 .category.name
    //                 .toLowerCase()
    //                 .includes(searchField.toLowerCase()) ||
    //             transaction
    //                 .surname
    //                 .toLowerCase()
    //                 .includes(searchField.toLowerCase())
    //         );
    //     }
    // );


    return (

        <div className={"container"}>
            <div className={"d-flex justify-content-center mt-5"}>
                <div><h2>List of transactions user with username {user.username}</h2></div>


                <a href="/addTransaction">
                    <button className={"btn btn-success ms-5"}>ADD NEW</button>
                </a>
            </div>

            <div>
                <div className={"mt-3 d-flex justify-content-around px-5 w-50 m-auto"}>
                    <div>
                        <span className={"mx-1"}>From </span>
                        <input required type="date" id="meeting-time-1"
                               name="meeting-time"
                            // defaultValue={date}
                            // onChange={handleDate}
                        />
                    </div>
                    <div>
                        <span className={"mx-1"}>To </span>
                        <input className={""} required type="date" id="meeting-time-2"
                               name="meeting-time"
                            // defaultValue={date}
                            // onChange={handleDate}
                        />
                    </div>
                </div>

                <div className={"mt-5 d-flex w-50 justify-content-center m-auto"}>

                    <div className="input-group mb-3 mx-1">
                        <label htmlFor="inputGroupSelect02">CATEGORY</label>
                        <select required className="form-select mt-3 w-100" id="category_transaction"
                                name="categoryName"
                                defaultValue={categoryName}
                                onChange={handleCategoryName}>
                            <option>All</option>
                            {categories.map((category, index) =>
                                <option key={index} value={category.name}>{category.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="input-group mb-3 mx-1">
                        <label htmlFor="inputGroupSelect02">IS INCOME</label>
                        <select className="form-select mt-3 w-100" id="is_income_transaction"
                                name="isIncome"
                                defaultValue={isIncome}
                                onChange={handleIncome}>
                            <option>All</option>
                            <option value="true">Income
                            </option>
                            <option value="false">Expense
                            </option>
                        </select>
                    </div>
                </div>
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
                        <td>{value.category.type.name}</td>
                        <td>{value.date.toString().substring(0, 10)} {value.date.toString().substring(11)}</td>
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

