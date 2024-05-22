import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import { AuthUser } from 'aws-amplify/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import '../styles/homeStyle.css'
import { useEffect, useState } from 'react';

type Job = Schema['Job']['type'];

function formatDate(date_str) {
    let date = new Date(date_str);
    // Extract components from the date object
    let month = date.getMonth() + 1; // Months are zero-indexed
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Pad month, day, hours, and minutes with leading zeros if needed
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Get the last two digits of the year
    year = year.toString().slice(-2);

    // Combine the components into the desired format
    return `${month}/${day}/${year} ${hours}:${minutes}`;
}


function JobsList(props: { jobs: Job[] }) {
    const jobs = props['jobs'];
    return (
        <table className='jobs-tab'>
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Created</td>
                    <td>Amount Offered</td>
                    <td>Description</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
            {jobs.map((job) => {
                return (<tr key={job['id']}>
                    <td>{job['title']}</td>
                    <td>{formatDate(job['createdAt'])}</td>
                    <td>{job['amountOffered']}</td>
                    <td>{job['description']}</td>
                    <td>
                        <Link to={`/home/editJob/${job['id']}`}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Link>
                    </td>
                    <td><FontAwesomeIcon icon={faTrash} /></td>
                    <td></td>
                </tr>);
            }
            )}
            </tbody>
        </table>
    );
}

export function EditJob(props) {
    const job_id = useParams();
    return (<p>Edit</p>);
}

export function DeleteJob(props) {
    return (<p>Delete</p>);
}

export default function () {
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [userJobs, setUserJobs] = useState<Job[]>([]);

    const getUserJobs = async () => {
        const { data: jobs } = await client.models.Job.list({
            filter: {
                submitter: {
                    'eq': user.userId
                }
            },
            authMode: 'userPool'
        });
        setUserJobs(jobs === null ? [] : jobs);
    }

    useEffect(() => { getUserJobs() });

    return (
        <>
        <JobsList jobs={userJobs}/>
        </>
    )
}