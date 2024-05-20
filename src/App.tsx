import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './pages/Home.tsx';
import Market from './pages/Market.tsx';
import NoPage from './pages/NoPage.tsx';
import NavBar from './components/NavBar.jsx';
import Profile from './pages/profile';

function App() {
    return (
        <BrowserRouter>
            <Authenticator>
                {({ signOut, user }) => (
                    <main>
                        {user !== undefined && (
                            <>
                                <NavBar signOut={signOut} />
                                <Routes>
                                    <Route index element={<Home user={user} />} />
                                    <Route path='/home' element={<Home user={user} />} />
                                    <Route path='/market' element={<Market user={user} />} />
                                    <Route path='/profile' element={<Profile signOut={signOut} user={user} />} />
                                    <Route path="*" element={<NoPage />} />
                                </Routes>
                            </>
                        )}
                    </main>
                )}
            </Authenticator>
        </BrowserRouter>
    )
}

export default App;
