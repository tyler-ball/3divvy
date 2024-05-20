import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from "react-router-dom";
import Home from '../pages/Home';

export default function NavBar(){
	return(
		<nav className="nav" style={{"width": "100%"}}>
		<table style={{"width":"100%", "background-color": "white"}}>
		<tbody>
		<tr>
			<td>
				<Link to='/'>Home</Link></td>
			<td><Link to='/market'>Marketplace</Link></td>
			<td>
				<Authenticator>
					{({ signOut }) => (
						<main>
							<header className='App-header'>
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
							</header>
						</main>
					)}
				</Authenticator>
			</td>
		</tr>
		</tbody>
		</table>
		</nav>
)};