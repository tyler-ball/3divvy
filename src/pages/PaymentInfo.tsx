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

export function PaymentInfo() {
    const params = useParams();
    const navigate = useNavigate();
    const job_id = params['job_id'];
    const [cardNo, setCardNo] = useState('');
    const [cvc, setCvc] = useState('');
    const [expDate, setExpDate] = useState('');
    const [err, setErr] = useState(false);
    const client = generateClient<Schema>();

    const submitPayment = async () => {
        let apiRetCode = 200;

        if (apiRetCode != 200) {
            setErr(true);
            return;
        }

        const { data: job, get_errors } = await client.models.Job.get({
            id: job_id
        });
        setErr(false);

        if (get_errors) {
            setErr(true);
            return;
        }


        const { data: new_job, upd_errors } =
            await client.models.Job.update({ id: job.id, hasPaid: true });

        if (upd_errors) {
            console.log(upd_errors);
            setErr(true);
            return;
        }

        navigate("/home");
    }

    return (<>
        <div className="min-size">
            <Box>
                <TextField type="text" label={"Card No."}
                    value={cardNo} onChange={(e) => setCardNo(e.target.value)} />
            </Box>
        </div>
        <div className="min-size">
            <Box>
                <TextField type="text" label={"CVC"}
                    value={cvc} onChange={(e) => setCvc(e.target.value)} />
            </Box>
        </div>
        <div className="min-size">
            <Box>
                <TextField type="text" label={"Expiration Date"}
                    value={expDate} onChange={(e) => setExpDate(e.target.value)} />
            </Box>
        </div>
        {err && <p>Error with payment info. Please resubmit</p>}
        <Button onClick={submitPayment}>Submit</Button>
    </>);
}

