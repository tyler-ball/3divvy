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

export function EditContract() {
    const params = useParams();
    const navigate = useNavigate();
    const contract_id = params['contract_id'];
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [contract, setContract] = useState<Contract>({ status: '' });

    const getContract = async () => {
        const { data: contract, errors } = await client.models.Contract.get({
            id: contract_id
        });

        setContract(contract);
    }

    const updateContract = async () => {
        const { data: new_contract, errors } = await client.models.Contract.update(contract);
        if (errors === undefined) {
            navigate("/home");
        }
    }

    useEffect(() => { getContract() }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Kind of a lazy hack. React will only rerender state based
        // on an object if the new object resides at a different place
        // in memory, even if its keys have been changed.
        let contract_copy = JSON.parse(JSON.stringify(contract));
        contract_copy[name] = value;
        setContract(contract_copy);
    };


    return (
        <table>
            <tbody>
                <tr>
                    <td><label>Status</label></td>
                    <td><select id="status" name="status" value={contract['status']} onChange={handleChange}>
                        <option value="Accepted">Accepted</option>
                        <option value="Printing">Printing</option>
                        <option value="Shipped">Shipped</option>
                    </select></td>
                </tr>
                <tr>
                    <td><button onClick={updateContract}>Update</button></td>
                </tr>
            </tbody>
        </table>);
}

