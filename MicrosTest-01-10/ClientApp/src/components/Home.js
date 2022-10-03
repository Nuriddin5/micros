import {useState} from "react";


export default function Home() {

    const [user, setUser] = useState({})

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
        </>
    );
}

