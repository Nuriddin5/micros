import {useState} from "react";


export default function Categories() {

    const [user, setUser] = useState({})
    const [categories, setCategories] = useState([])

    function getUser() {
        if (!localStorage.getItem("user")) {
            window.location.replace("/login")
        }
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user)
        return user
    }
    
    
    
    


    return (

        <>
            <div>
                <button onClick={getUser}>Button</button>
                {user.username}
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </>
    );
}

