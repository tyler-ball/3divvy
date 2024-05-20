import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="nav">
        <h1 className="site-title">3DIVVY</h1>
        <ul>

          <li><Link to='/'> Home </Link></li>
          <li><Link to='/market'> Marketplace </Link></li>
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
        </ul>
      </nav>
    </>
  )
};