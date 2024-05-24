import { UseAuthenticator } from "@aws-amplify/ui-react-core";
import { Link } from "react-router-dom";

import '../styles/navStyle.css';

export default function NavBar({ signOut }: { signOut: UseAuthenticator['signOut'] | undefined }) {
    return (
        <nav className="nav-bar">
            <h1 className="site-title">3DIVVY</h1>
            <table>
                <tbody>
                    <tr>
                        <td><Link to='/'>Home</Link></td>
                        <td><Link to='/market'>Marketplace</Link></td>
                        <td><Link to='/profile'>Profile</Link></td>
                    </tr>
                </tbody>
            </table>
            <button
                className="sign-out-button"
                onClick={signOut}
            >
                Sign Out
            </button>
        </nav>
    )
}