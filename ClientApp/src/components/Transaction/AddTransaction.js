import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";

const {REACT_APP_API_ENDPOINT} = process.env;


export default function AddTransaction() {


    const user = JSON.parse(localStorage.getItem("user"));


    const [amount, setAmount] = useState()
    const [date, setDate] = useState()
    const [categoryName, setCategoryName] = useState("")
    const [comment, setComment] = useState("")

    const [categories, setCategories] = useState([]);

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


    const showToastMessage = (message, status) => {
        if (status === 200) {
            toast.success("Successfully created!", {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(function () {
                window.location.href = '/';
            }, 5000)

        } else {
            toast.error(`${message}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }

    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        const url = `${REACT_APP_API_ENDPOINT}/Transactions`;
        const token = btoa(`${user.username}:${user.password}`);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `basic ${token}`
            },
            body: JSON.stringify(
                {
                    amount: amount,
                    date: date,
                    categoryName: categoryName,
                    comment: comment
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

    const handleAmount = (event) => {
        setAmount(parseInt(event.target.value))
    };
    const handleCategoryName = (event) => {
        setCategoryName(event.target.value)
    };
    const handleDate = (event) => {
        setDate(event.target.value)
    };
    const handleComment = (event) => {
        setComment(event.target.value)
    };

    //todo adding one time add

    return (

        <div className="form-v7">
            <div className="page-content">
                <div className="form-v7-content">
                    <form onSubmit={handleSubmit} className="form-detail" action="#" method="post" id="myform">
                        <ToastContainer/>
                        <div className="form-row">
                            <label htmlFor="amount">TRANSACTION AMOUNT</label>
                            <input type="number" name="amount" id="amount" className="input-text"
                                   defaultValue={amount}
                                   onChange={handleAmount} required
                            />
                        </div>

                        <label htmlFor="meeting-time">Choose a time for your appointment:</label>

                        <input required type="datetime-local" id="meeting-time"
                               name="meeting-time" defaultValue={date}
                               onChange={handleDate}/>

                        <div className="input-group form-row mt-3 mb-3">
                            <label htmlFor="inputGroupSelect02">CATEGORY</label>
                            <select required className="form-select mt-3 w-100" id="category_transaction"
                                    name="categoryName"
                                    defaultValue={categoryName}
                                    onChange={handleCategoryName}>
                                <option>...Choose</option>
                                {categories.map((category, index) =>
                                    <option key={index} value={category.name}>{category.name}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-row">
                            <label htmlFor="comment">COMMENT</label>
                            <input type="text" name="comment" id="comment" className="input-text"
                                   defaultValue={comment}
                                   onChange={handleComment}
                            />
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

