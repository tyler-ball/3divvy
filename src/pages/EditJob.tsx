import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from '@aws-amplify/ui-react';
import {
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    FormControlLabel,
    TextField,
    Box,
    Button,
} from '@mui/material';
import '../styles/homeStyle.css'
import JobsTable from '../components/JobsTable.tsx';
import ContractsTable from '../components/ContractsTable.tsx';
import { useEffect, useState } from 'react';

type Job = Schema['Job']['type'];
type Contract = Schema['Contract']['type'];

export function EditJob() {
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
        if (errors === undefined) {
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

