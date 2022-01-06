import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../../../hooks/useAuth";


const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading,admin } = useAuth();
    if (isLoading) {
        return <Spinner animation="border" variant="success" className="" />
    }
    return (
        <Route
            {...rest}
            render={({ location }) => (user.email && admin) ? children : <Redirect
                to={{
                    pathname: "/",
                    state: { from: location }
                }}
            ></Redirect>

            }
        >

        </Route>
    );
};

export default AdminRoute;