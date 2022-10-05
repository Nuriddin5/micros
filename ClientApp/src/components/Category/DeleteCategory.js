import {Navigate, useParams} from "react-router-dom";

const {REACT_APP_API_ENDPOINT} = process.env;


export default function DeleteCategory() {
    const user = JSON.parse(localStorage.getItem("user"));


    const {id} = useParams()
    const deleteCategory = async () => {
        const token = btoa(`${user.username}:${user.password}`);
        try {
            const response = await fetch(`${REACT_APP_API_ENDPOINT}/Categories/${id}`, {
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

    deleteCategory();

    return (
        <Navigate to="/categories" replace={true}/>
    )
}

