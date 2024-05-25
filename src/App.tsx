import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './pages/Home.tsx';
import { EditJob, DeleteJob } from './pages/Home.tsx';
import Market from './pages/Market.tsx';
import NoPage from './pages/NoPage.tsx';
import NavBar from './components/NavBar.jsx';
import Profile from './pages/profile';

function App() {
    return (
        <BrowserRouter>
            <Authenticator>
                {({ signOut, user }) => (
                    <main className="container">
                        {user !== undefined && (
                            <>
                                <NavBar signOut={signOut} />
                                <div className="main-div">
                                    <Routes>
                                        <Route index element={<Home />} />
                                        <Route path='/home' element={<Home />} />
                                        <Route path='/home/editJob/:job_id' element={<EditJob />} />
                                        <Route path='/home/deleteJob/:job_id' element={<DeleteJob />} />
                                        <Route path='/market' element={<Market user={user} />} />
                                        <Route path='/profile' element={<Profile user={user} />} />
                                        <Route path="*" element={<NoPage />} />
                                    </Routes>
                                </div>
                            </>
                        )}
                    </main>
                )}
            </Authenticator>
        </BrowserRouter>
    )
}

export default App;
