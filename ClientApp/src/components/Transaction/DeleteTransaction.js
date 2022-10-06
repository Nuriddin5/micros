import {Navigate, useParams} from "react-router-dom";

const {REACT_APP_API_ENDPOINT} = process.env;


export default function DeleteTransaction() {
    const user = JSON.parse(localStorage.getItem("user"));


    const {id} = useParams()
    const deleteTransaction = async () => {
        const token = btoa(`${user.username}:${user.password}`);
        try {
            const response = await fetch(`${REACT_APP_API_ENDPOINT}/Transactions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `basic ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

        } catch (err) {
            console.log(err)
        }
        // window.location.reload();

    };

    deleteTransaction();

    return (
        <Navigate to="/" replace={true}/>
    )
}

