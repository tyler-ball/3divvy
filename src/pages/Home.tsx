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

export function DeleteContract(props) {
    const params = useParams();
    const navigate = useNavigate();
    const contract_id = params['contract_id'];
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [contract, setContract] = useState<Contract>();

    const deleteContract = async () => {
        const { data: new_contract, errors } = await client.models.Contract.delete({
            id: contract_id
        });
        if (errors === undefined) {
            navigate("/home");
        } else {
            console.log(errors);
        }
    }

    return (
        <div>
            <p>Are you sure you want to delete this contract?</p>
            <Button color="primary" onClick={deleteContract}>Delete</Button>
        </div>);
}

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

        const { data: contract, con_errors } = await job.contract();
        console.log("CONTRACT TO PAY");
        console.log(contract)
        const { data: new_con, upd_errors } =
            await client.models.Contract.update({ id: contract.id, paid: "Paid" });

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