export default function Login() {
    return <div>
        <form>

            <div className="mb-3 mx-5 ">
                <label htmlFor="formGroupExampleInput2" className="form-label">Username</label>
                <input type="text" className="form-control" id="formGroupExampleInput2"
                       placeholder="Enter username" required/>
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" required/>
            </div>
            <div className={"d-flex justify-content-center"}>

                <button type="submit" className="btn btn-primary ">Login</button>
            </div>
            <div className={"d-flex justify-content-center"}>
                <a href="/register">Register if you haven't account</a>
            </div>

        </form>
    </div>
}