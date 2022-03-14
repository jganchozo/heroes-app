import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../auth/authContext'

export const PrivateRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);
    const { pathname, search } = useLocation();

    localStorage.setItem('lastPath', `${pathname}${search}`);

    return (
        <>
            { user.logged && children }
            { !user.logged && <Navigate to={'/login'} /> }
        </>
    )
}