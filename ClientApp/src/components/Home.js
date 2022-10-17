import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const {REACT_APP_API_ENDPOINT} = process.env;

export default function Home() {


    const [transactions, setTransactions] = useState([])
    const [filterInfo, setFilterInfo] = useState({
        categoryName: "all",
        typeName: "all",
        startDate: '',
        endDate: '',

    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [isTypeSelected, setTypeSelected] = useState(false)
    const [isCategorySelected, setCategorySelected] = useState(false)
    const [url, setUrl] = useState('')


    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    let typeSearchParam = searchParams.get('type');
    let categorySearchParam = searchParams.get('category');
    let startDateSearchParam = searchParams.get('startDate');
    let endDateSearchParam = searchParams.get('endDate');


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
    }, [user.password, user.username]);


    useEffect(() => {
        // let baseUrl = `${REACT_APP_API_ENDPOINT}/Transactions`;
        let url = `${REACT_APP_API_ENDPOINT}/Transactions?`;

        const currentParams = Object.fromEntries([...searchParams]);

        console.log(currentParams);

        for (const param in currentParams) {
            if (url.charAt(url.length - 1) === '?') {
                url = url + `${param}=${currentParams[param]}`;
            } else {
                url = url + `&${param}=${currentParams[param]}`;
            }
            console.log(`${param}: ${currentParams[param]}`);
        }


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
                        console.log(data);
                        setTransactions(data);
                    });

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [searchParams, user.password, user.username]);


    useEffect(() => {
        const url = `${REACT_APP_API_ENDPOINT}/Categories/`;
        const token = btoa(`${user.username}:${user.password}`);
        console.log(token);


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

    const handleFilterInfo = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        console.log(name)
        console.log(value)
        console.log(url);

        changeUrlAndNavigate(url, name, value)
    };

    function changeUrlAndNavigate(url, name, value) {
        let newUrl;

        setFilterInfo({...filterInfo, [name]: value});

        if (!url.includes(name)) {
            newUrl = url === '' || url === '/'
                ? url + `search?${name}=${value}`
                : url + `&${name}=${value}`
        } else if (url.indexOf('&', url.indexOf(name)) === -1) {
            let index;
            index = url.indexOf(name)
            if (value === 'all') {
                newUrl = url.charAt(index - 1) === '?' ?
                    url.substring(0, index - 7) :
                    url.substring(0, index - 1)
            } else {
                newUrl = url.substring(0, index) + `${name}=${value}`
            }
        } else {
            let index;
            index = url.indexOf(name)
            if (value === 'all') {
                let lastIndex = url.indexOf('&', index)
                newUrl = url.substring(0, index) + url.substring(lastIndex + 1)
            } else {
                let lastIndex = url.indexOf('&', index)
                newUrl = url.substring(0, index) + `${name}=${value}` + url.substring(lastIndex)
            }
        }

        if (newUrl.charAt(0) !== '/') {
            newUrl = '/' + newUrl;
        }

        setUrl(newUrl);
        navigate(newUrl)
    }


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
                        <input className={''} required type="date" id="startDate"
                               name="startDate"
                               defaultValue={filterInfo.startDate}
                               onChange={handleFilterInfo}
                        />
                    </div>
                    <div>
                        <span className={"mx-1"}>To </span>
                        <input className={""} required type="date" id="endDate"
                               name="endDate"
                               defaultValue={filterInfo.endDate}
                               onChange={handleFilterInfo}
                        />
                    </div>
                </div>

                <div className={"mt-5 d-flex w-50 justify-content-center m-auto"}>

                    <div className="input-group mb-3 mx-1">
                        <label htmlFor="inputGroupSelect02">CATEGORY</label>
                        <select required className="form-select mt-3 w-100" id="category_transaction"
                                name="categoryName"
                                defaultValue={filterInfo.categoryName}
                                onChange={handleFilterInfo}>
                            <option value={'all'}>All</option>
                            {categories.map((category, index) =>
                                <option
                                    // disabled={isTypeSelected}
                                    key={index}
                                    value={category.name}>{category.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="input-group mb-3 mx-1">
                        <label htmlFor="inputGroupSelect02">TYPE</label>
                        <select className="form-select mt-3 w-100" id="is_income_transaction"
                                name="typeName"
                                defaultValue={filterInfo.typeName}
                                onChange={handleFilterInfo}>
                            <option value={'all'}>All</option>
                            {types.map((t, index) =>
                                <option
                                    // disabled={isCategorySelected}
                                    key={index} value={t.name}>{t.name}</option>
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

