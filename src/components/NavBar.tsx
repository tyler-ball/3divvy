import { UseAuthenticator } from "@aws-amplify/ui-react-core";
import { Link } from "react-router-dom";

import '../styles/navStyle.css';

export default function NavBar({ signOut }: { signOut: UseAuthenticator['signOut'] | undefined }) {
    return (
        <nav className="nav" style={{ "width": "100%" }}>
            <table style={{ "width": "100%" }}>
                <tbody>
                    <tr>
                        <td><Link to='/'>Home</Link></td>
                        <td><Link to='/market'>Marketplace</Link></td>
                        <td>
                            <button
                                onClick={signOut}
                                style={{
                                    margin: '20px',
                                    fontSize: '0.8rem',
                                    padding: '5px 10px',
                                    marginTop: '20px'
                                }}
                            >
                                Sign Out
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </nav>
    )
}