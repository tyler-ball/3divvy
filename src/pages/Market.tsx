import React, { useState, Dispatch, useEffect } from 'react';
import { AuthUser } from 'aws-amplify/auth';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from '../components/PopUp';
import Alert from '@mui/material/Alert';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

import '../styles/marketStyle.css';

const ColorButton = styled(Button)({
    color: 'black',
    borderColor: 'rgb(192, 192, 192)',
    margin: '5px',
    '&:hover': {
        borderColor: 'rgb(192, 192, 192)',
    }
});

type FilterBarProps = {
    setShowPopUp: Dispatch<React.SetStateAction<boolean>>,
}

const FilterBar: React.FC<FilterBarProps> = ({ setShowPopUp }) => {
    return (
        <>
            <div className='material'>
                <label>Material</label>
                <Box className='filters'>
                    <FormControlLabel control={<Checkbox />} label="Plastic" />
                    <FormControlLabel control={<Checkbox />} label="Resin" />
                    <FormControlLabel control={<Checkbox />} label="Carbon Fiber" />
                </Box>
            </div>
            <div className='color'>
                <label>Color</label>
                <Box className='filters'>
                    <FormControlLabel control={<Checkbox />} label="Red" />
                    <FormControlLabel control={<Checkbox />} label="White" />
                    <FormControlLabel control={<Checkbox />} label="Black" />
                    <FormControlLabel control={<Checkbox />} label="Blue" />
                    <FormControlLabel control={<Checkbox />} label="Transparent" />
                </Box>
            </div>
            <div className='min-size'>
                <Box>
                    <TextField
                        id="outlined-number"
                        label="Min Price"
                        type="number"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            </div>
            <div className='max-size'>
                <Box>
                    <TextField
                        id="outlined-number"
                        label="Max Price"
                        type="number"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            </div>
            <ColorButton variant="outlined">Apply Filter</ColorButton>
            <p>----- OR ------</p>
            <ColorButton variant="outlined" onClick={() => setShowPopUp(true)}>Create New Job</ColorButton>
        </>
    )
};

const handleDelete = (index: number): void => {
    console.log('delete clicked ', index)
};

type JobList = Schema['Job']['type'];

export default function Market({ user }: { user: AuthUser }) {
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<string>('');
    const [showAlertMessage, setShowAlertMessage] = useState<string>('');
    const [showDelete, setShowDelete] = useState<boolean>(false); // set true when the new row is created for 1 min
    const [jobsList, setJobsList] = useState<JobList[]>([]);

    useEffect(() => {
        const client = generateClient<Schema>();
        const fetchData = async () => {
            try {
                const { data: jobs } = await client.models.Job.list({
                    authMode: 'userPool'
                });
                setJobsList(jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchData();
    }, [])

    return (
        <>
            <div className='filter-container'>
                <div className='filter-div'>
                    <FilterBar
                        setShowPopUp={setShowPopUp}
                    />
                </div>
                <div className='jobs-list'>
                    <h2>Jobs List</h2>
                    <Divider></Divider>
                    <TableContainer>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Amount Offered ($)</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jobsList.map((row, index) => (
                                    <TableRow
                                        key={row.title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                        <TableCell align="center">{row.amountOffered}</TableCell>
                                        <TableCell>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                </div>
            </div>
            {showPopUp &&
                <Popup
                    showPopUp={showPopUp}
                    setShowPopUp={setShowPopUp}
                    setShowAlert={setShowAlert}
                    setShowAlertMessage={setShowAlertMessage}
                    setAlertType={setAlertType}
                    user={user}
                />
            }
            {showAlert &&
                <Alert variant="filled" severity={alertType} onClose={() => { setShowAlert(false) }} className='alert-message'>
                    {showAlertMessage}
                </Alert>
            }
        </>
    )
}
