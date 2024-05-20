import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home.jsx';
import Market from './pages/Market.jsx';
import NoPage from './pages/NoPage.jsx';

const client = generateClient<Schema>();

function App() {
  const [jobs, setJobs] = useState<Array<Schema["Job"]["type"]>>([]);

  useEffect(() => {
    client.models.Job.observeQuery().subscribe({
      next: (data) => setJobs([...data.items]),
    });
  }, []);

  return (
	<BrowserRouter>
    	<Authenticator>
    	  {({ signOut, user }) => (
    	    <main>
			<nav>
				<ul>
					<li><Link to="/home">Home</Link></li>
					<li><Link to="/market">MarketPlace</Link></li>
				</ul>
			</nav>
			<Routes>
			  <Route index element={<Home />} />
			  <Route path='/home' element={<Home />} />
			  <Route path='/market' element={<Market />} />
			  <Route path="*" element={<NoPage />} />
			</Routes>
    	      <h1>{user?.signInDetails?.loginId}'s jobs</h1>
    	      {/* <button onClick={createTodo}>+ new</button> */}
    	      <ul>
    	        {jobs.map((job) => (
    	          <li key={job.id}>{job.title}</li>
    	        ))}
    	      </ul>
    	      <div>
    	        🥳 App successfully hosted. Try creating a new todo.
    	        <br />
    	        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
    	          Review next step of this tutorial.
    	        </a>
    	      </div>
    	      <button onClick={signOut}>Sign out</button>
    	    </main>
    	  )}
    	</Authenticator>
    </BrowserRouter>
  )
}

export default App;
