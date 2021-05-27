import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./AxiosCall";
import jwt_decode from "jwt-decode";

//Providers
import { useAppContext } from "./providers/AppProvider";

//components
import Login from "./components/Login";

export default function Routes() {
    const { user, dispatch } = useAppContext();
    let roles = [];
    if (user.token != "") {
        const decoded = jwt_decode(user.token);
        if (Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
            roles = [...decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]];
        } else {
            roles.push(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
        }
    }

    const refreshToken = async () => {
        let userData = {
            userToken: user.token,
        };
        await api
            .post("/authenticate/refresh", userData)
            .then((res) => {
                dispatch({ type: "login", payload: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Router>
            <div className="osahan-home-page">
                <Switch>
                    <Route path="">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function PrivateRoute({ children, ...rest }) {
    const { user } = useAppContext();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.token !== "" ? children : <Login showForm={true} />
            }
        />
    );
}