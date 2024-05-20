import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home.tsx';
import Market from './pages/Market.tsx';
import NoPage from './pages/NoPage.tsx';
import NavBar from './components/NavBar.jsx';

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
			<NavBar/>
			<Routes>
			  <Route index element={<Home />} />
			  <Route path='/home' element={<Home />} />
			  <Route path='/market' element={<Market />} />
			  <Route path="*" element={<NoPage />} />
			</Routes>
			</main>
    	  )}
    	</Authenticator>
    </BrowserRouter>
  )

  //return (
  //  	      <h1>{user?.signInDetails?.loginId}'s jobs</h1>
  //  	      {/* <button onClick={createTodo}>+ new</button> */}
  //  	      <ul>
  //  	        {jobs.map((job) => (
  //  	          <li key={job.id}>{job.title}</li>
  //  	        ))}
  //  	      </ul>
  //  	      <div>
  //  	        🥳 App successfully hosted. Try creating a new todo.
  //  	        <br />
  //  	        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
  //  	          Review next step of this tutorial.
  //  	        </a>
  //  	      </div>
  //  	    </main>
  //);
}

export default App;
