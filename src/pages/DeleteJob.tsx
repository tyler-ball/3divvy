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

export function DeleteJob(props) {
    const params = useParams();
    const navigate = useNavigate();
    const job_id = params['job_id'];
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [job, setJob] = useState<Job>({
        'title': '',
        'description': '',
        'amountOffered': 0
    });

    const getJob = async () => {
        const { data: job, errors } = await client.models.Job.get({
            id: job_id
        });

        setJob(job);
    }

    const deleteJob = async () => {
        // TODO clean up uploaded model files
        const { data: new_job, errors } = await client.models.Job.delete({
            id: job_id
        });
        if (errors === undefined) {
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

