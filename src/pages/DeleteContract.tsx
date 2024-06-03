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

export function DeleteContract(props) {
    const params = useParams();
    const navigate = useNavigate();
    const contract_id = params['contract_id'];
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [contract, setContract] = useState<Contract>();

    const deleteContract = async () => {
        const { data: deleted_contract, errors: del_contract_errs } = await client.models.Contract.delete({
            id: contract_id
        });
        if (del_contract_errs === undefined) {
            const { data: job, errors: update_job_errs } = await client.models.Job.update({
                id: deleted_contract.jobID,
                hasContract: false
            });
            if (update_job_errs === undefined) {
                navigate("/home");
            } else {
                console.log(update_job_errs);
            }
        } else {
            console.log(del_contract_errs);
        }
    }

    return (
        <div>
            <p>Are you sure you want to delete this contract?</p>
            <Button color="primary" onClick={deleteContract}>Delete</Button>
        </div>);
}