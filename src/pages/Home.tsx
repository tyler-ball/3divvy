import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import { AuthUser } from 'aws-amplify/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch, Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from '@aws-amplify/ui-react';
import {
    FormControlLabel,
    TextField,
    Box,
    Button,
    Checkbox,
    styled,
    Divider,
    IconButton,
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
} from '@mui/material';

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
    <TableContainer>
        <Table>
        <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Time Created</TableCell>
                <TableCell>Amount Offered ($)</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {jobs.map((job) => {
            return (
            <TableRow key={job['id']}>
                <TableCell>{job['title']}</TableCell>
                <TableCell>{formatDate(job['createdAt'])}</TableCell>
                <TableCell>{job['amountOffered']}</TableCell>
                <TableCell>{job['description']}</TableCell>
                <TableCell>
                    <Link to={`/home/editJob/${job['id']}`}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                </TableCell>
                <TableCell>
                    <Link to={`/home/deleteJob/${job['id']}`}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Link>
                </TableCell>
            </TableRow>);
        })}
        </TableBody>
        </Table>
    </TableContainer>
    );
}

export function EditJob(props) {
    const params = useParams();
    const navigate = useNavigate();
    const job_id = params['job_id'];
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [job, setJob] = useState<Job>({
        'title': '',
        'description': '',
        'amt_offered': 0
    });

    const getJob = async () => {
        const { data: job, errors } = await client.models.Job.get({
            id: job_id
        });

        setJob(job);
    }

    const updateJob = async () => {
        const { data: new_job, errors } = await client.models.Job.update(job);
        if(errors === undefined) {
            navigate("/home");
        }
    }

    useEffect(() => { getJob() }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Kind of a lazy hack. React will only rerender state based
        // on an object if the new object resides at a different place
        // in memory, even if its keys have been changed.
        let job_copy = JSON.parse(JSON.stringify(job));
        job_copy[name] = value;
        setJob(job_copy);
    };


    return (
        <table>
           <tbody>
               <tr>
                   <td><label>Title</label></td>
                   <td><input
                       type="text"
                       name="title"
                       value={job['title']}
                       onChange={handleChange}
                   /></td>
               </tr>

               <tr>
                   <td><label>Description</label></td>
                   <td><input
                       type="text"
                       name="description"
                       value={job['description']}
                       onChange={handleChange}
                   /></td>
               </tr>
               <tr>
                   <td><label>Amount Offered</label></td>
                   <td><input
                       type="number"
                       name="amt_offered"
                       step="0.01"
                       value={job['amt_offered']}
                       onChange={handleChange}
                   /></td>
               </tr>
               <tr>
                   <td><button onClick={updateJob}>Update</button></td>
               </tr>
           </tbody>
       </table>);
}

export function DeleteJob(props) {
    const params = useParams();
    const navigate = useNavigate();
    const job_id = params['job_id'];
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [job, setJob] = useState<Job>({
        'title': '',
        'description': '',
        'amt_offered': 0
    });

    const getJob = async () => {
        const { data: job, errors } = await client.models.Job.get({
            id: job_id
        });

        setJob(job);
    }

    const deleteJob = async () => {
        const { data: new_job, errors } = await client.models.Job.delete({
            id: job_id
        });
        if(errors === undefined) {
            navigate("/home");
        } else {
            console.log(errors);
        }
    }

    return (
    <div>
        <p>Are you sure you want to delete job {job['title']}?</p>
        <Button color="primary" onClick={deleteJob}>Delete</Button>
    </div>);
}

export default function () {
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [userJobs, setUserJobs] = useState<Job[][]>([]);
    const [pageTokens, setPageTokens] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);

    const fetchData = async (init, nextPage) => {
        if(init || (hasMorePages && currentPageIndex === pageTokens.length)) {
            const {data: jobs, nextToken} = await client.models.Job.list({
                filter: {
                    submitter: {
                        'eq': user.userId
                    }
                },
                limit: 5,
                nextToken: pageTokens[pageTokens.length - 1],
                authMode: 'userPool'
            });

            if(! nextToken) {
                setHasMorePages(false);
            }
            setPageTokens([...pageTokens, nextToken]);
            setUserJobs([...userJobs, jobs]);
            console.log([...userJobs, jobs]);
            console.log("NEW JOBS");
            console.log(jobs);

        }

        if(nextPage) {
            setCurrentPageIndex((pi) => pi + 1);
        }

    }

    useEffect(() => { fetchData(true, false) }, []);

    if(userJobs.length === 0) {
        return (<p>No jobs yet.</p>);
    }

    return (
        <>
        <JobsList jobs={userJobs[currentPageIndex - 1]}/>
        <Pagination
            currentPage={currentPageIndex}
            totalPages={pageTokens.length}
            hasMorePages={hasMorePages}
            onPrevious={() => setCurrentPageIndex(currentPageIndex - 1)}
            onNext={() => fetchData(false, true)}
            onChange={(pageIndex) => setCurrentPageIndex(pageIndex)}
        />
        </>
    )
}