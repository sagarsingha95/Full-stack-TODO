import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const isAuth = Boolean(true); //TODO: replace with real auth logic
    
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute