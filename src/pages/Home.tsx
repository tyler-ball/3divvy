import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../styles/homeStyle.css'
import NavBar from '../components/NavBar.jsx';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { useAuthenticator } from '@aws-amplify/ui-react';



function generate(element: any) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

function JobsList(props) {
	let jobs = props['jobs'];
	return (
	<table>
	<thead>
		<tr>
			<td>Title</td>
			<td>Created</td>
			<td>Amount Offered</td>
			<td>Description</td>
		</tr>
	</thead>
	{jobs.map((job) => {
		return (<tr>
			<td>{job['title']}</td>
			<td>{job['createdAt']}</td>
			<td>{job['amountOffered']}</td>
			<td>{job['description']}</td>
			<td></td>
		</tr>);
	}
	)}
	</table>
	);
}

export default function Home () {
	const { user, signOut } = useAuthenticator((context) => [context.user]);
	const [ userJobs, setUserJobs ] = useState([]);
	const client = generateClient<Schema>();
	console.log("USERID");
	console.log(user.userId);

	const getUserJobs = async () => {
		const { data: jobs, errs } = await client.models.Job.list({
			filter: {
				submitter: {
					'eq': user.userId
				}
			}
		});
		setUserJobs(jobs === null ? [] : jobs);
		console.log("JOBS");
		console.log(jobs);
	}

	useEffect(() => { getUserJobs() }, []);
	

    return (
		<JobsList jobs={userJobs}/>
    )
}