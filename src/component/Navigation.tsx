import {Link, useNavigate} from "react-router";
import "./Navigation.css";
import {LogOut} from "react-feather";


export function Navigation() {
    function handleNavigate() {
        navigate("/")
    }
    const navigate = useNavigate();
    return (
        <>
            <header className="header-main">
                <nav className="flex items-center justify-between px-6 py-4 h-16">
                    <h2 className="text-white text-3xl font-bold">Green Shadow</h2>
                    <div className="flex text-white gap-6 mx-auto">
                        <Link to="/dashboard" className="custom-link">Dashboard</Link>
                        <Link to="/field" className="custom-link">Field</Link>
                        <Link to="/crop" className="custom-link">Crop</Link>
                        <Link to="/staff" className="custom-link">Staff</Link>
                        <Link to="/vehicle" className="custom-link">Vehicle</Link>
                        <Link to="/equipment" className="custom-link">Equipment</Link>
                        <Link to="/logs" className="custom-link">Logs</Link>

                    </div>

                    <button onClick={handleNavigate} className="bg-red-500 shadow-xl rounded-bl-3xl rounded-tr-3xl hover:bg-gray-600">
                        <LogOut/>
                    </button>

                </nav>

            </header>
        </>
    )
}