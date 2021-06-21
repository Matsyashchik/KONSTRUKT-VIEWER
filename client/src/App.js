import 'materialize-css'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";


function App() {
    const {token, userID, login, logout, isAdmin} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{token, userID, login, logout, isAdmin, isAuthenticated}}>
            <BrowserRouter basename='/'>
                {isAuthenticated && <Navbar/>}
                {/*<div className="container">*/}
                    {routes}
                {/*</div>*/}
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
