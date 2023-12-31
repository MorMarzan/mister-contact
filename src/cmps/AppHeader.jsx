import { NavLink } from 'react-router-dom'
import logo from '../../public/logo.svg'

export function AppHeader() {
    return (
        <header className="app-header">
            <h1>Mister Contact</h1>
            {/* <img src={logo} /> */}

            <nav className="app-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/contact">Contacts</NavLink>
            </nav>
        </header>
    )
}
