import React from "react";
import Header from "../header/header";
import AuthService from "../../authService/auth.service";

export default function LoginPage(props) {
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [warningMessage, setWarningMessage] = React.useState("");

    const { history } = props;

    React.useEffect(() => {
        setWarningMessage("");
    }, [username]);

    React.useEffect(() => {
        setWarningMessage("");
    }, [password]);

    const handleForm_OnSubmit = (e) => {
        e.preventDefault();

        AuthService.login(username, password).then(
            () => {
                history.push({
                    pathname: '/home',
                });
            },
            error => {
                setWarningMessage(error.response.data.message);
            }
        );
    }

    return (
        <div>
            <Header />

            <div>
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="col-md-12">
                                <form className="form" onSubmit={handleForm_OnSubmit}>
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Username:</label><br></br>
                                        <input type="text" className="form-control" required={true} onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">Password:</label><br></br>
                                        <input type="password" className="form-control" required={true} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <input type="submit" value="Login" className="btn btn-info btn-md" />
                                    </div>
                                    {(warningMessage !== "")
                                        ?
                                        <div className="alert alert-warning">
                                            <strong>Warning!</strong> {warningMessage} {"."}
                                        </div>
                                        : null
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
