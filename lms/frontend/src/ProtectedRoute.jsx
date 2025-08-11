
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children}) => {
    const token = localStorage.getItem("admin-token")

    if(!token){
        return <Navigate to="/login" replace />
    }

    return children;
}



export const UserProtectedRoute = ({ children }) =>{
    const token = localStorage.getItem("user-token")

     if(!token){
        return <Navigate to="/login" replace />
    }

    return children;
}

