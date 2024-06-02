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

export default function () {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const userJobsFilter = { submitter: { eq: user.userId } };
    const userContractJobsFilter = { 'contract.contractor': { eq: user.userId } };

    const jobSelectPopup = (job_id, job) => {
        return (
            <>
                <Button>
                    <Link to={`/home/deleteJob/${job_id}`}>
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Delete job</span>
                    </Link>
                </Button>
                <Button>
                    <Link to={`/home/editJob/${job_id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Edit job</span>
                    </Link>
                </Button>
                {job.contract && job.contract.status == "Printing" &&
                    <Button>
                        <Link to={`/home/payJob/${job_id}`}>
                            <FontAwesomeIcon icon={faEdit} />
                            <span>Submit Payment</span>
                        </Link>
                    </Button>
                }
            </>)
    }

    const contractSelectPopup = (contract_id) => {
        return (
            <>
                <Button>
                    <Link to={`/home/deleteContract/${contract_id}`}>
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Delete contract</span>
                    </Link>
                </Button>
                <Button>
                    <Link to={`/home/editContract/${contract_id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Edit contract</span>
                    </Link>
                </Button>
            </>)
    }

    return (
        <>
            <h3>Jobs Posted by You</h3>
            <JobsTable filters={userJobsFilter}
                selectPopup={jobSelectPopup}
                allowEdit={true}
                allowDelete={true} />
            <h3>Jobs Accepted By You</h3>
            <ContractsTable filters={userContractJobsFilter}
                selectPopup={contractSelectPopup} />
        </>
    )
}