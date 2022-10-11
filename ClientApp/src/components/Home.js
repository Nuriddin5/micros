import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const {REACT_APP_API_ENDPOINT} = process.env;

export default function Home() {


    const [transactions, setTransactions] = useState([])


    const [searchInfo, setSearchInfo] = useState({
        categoryName: "All",
        typeName: "All",
    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [isTypeSelected, setTypeSelected] = useState(false)
    const [isCategorySelected, setCategorySelected] = useState(false)


    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // console.log(searchParams.get('type'))


    const user = JSON.parse(localStorage.getItem("user"));


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
    }, []);


    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Transactions`;
        const token = btoa(`${user.username}:${user.password}`);

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
                        setTransactions(data);
                    });
            } catch (err) {
                console.log(err);
            }


        };
        fetchData();
    }, []);

    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Categories/`;
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
    }, []);

    const handleSearchInfo = (event) => {

        let name = event.target.name;
        let value = event.target.value;
        console.log(name)
        console.log(value)

        if (name === 'typeName') {
            setSearchInfo({...searchInfo, [name]: value});
            setTypeSelected(value !== 'All')
            value !== 'All' ?
                navigate(`/search?type=${value}`) :
                navigate(`/`)

        } else if (name === 'categoryName') {
            setSearchInfo({...searchInfo, [name]: value});
            setCategorySelected(value !== 'All')
            value !== 'All' ?
                navigate(`/search?category=${value}`) :
                navigate(`/`)
            ;

        }
        // else {
        //     navigate(`/`)
        // }
    };

    console.log(searchInfo)

    function route() {
        const typeName = searchInfo.typeName;
        const categoryName = searchInfo.categoryName;


        if (typeName !== 'All') {
            navigate(`/search?type=${typeName}`)
        } else if (categoryName !== 'All') {
            navigate(`/search?category=${categoryName}`);
        } else {
            navigate(`/`)
        }
    }

    // route()


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
                                defaultValue={searchInfo.categoryName}
                                onChange={handleSearchInfo}>
                            <option>All</option>
                            {categories.map((category, index) =>
                                <option disabled={isTypeSelected} key={index}
                                        value={category.name}>{category.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="input-group mb-3 mx-1">
                        <label htmlFor="inputGroupSelect02">TYPE</label>
                        <select className="form-select mt-3 w-100" id="is_income_transaction"
                                name="typeName"
                                defaultValue={searchInfo.typeName}
                                onChange={handleSearchInfo}>
                            <option>All</option>
                            {types.map((t, index) =>
                                <option disabled={isCategorySelected} key={index} value={t.name}>{t.name}</option>
                            )}
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

