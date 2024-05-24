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
    TableFooter,
    TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
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

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}


type JobList = Schema['Job']['type'];

export default function Market({ user }: { user: AuthUser }) {
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<string>('');
    const [showAlertMessage, setShowAlertMessage] = useState<string>('');
    const [showDelete, setShowDelete] = useState<boolean>(false); // set true when the new row is created for 1 min
    const [jobsList, setJobsList] = useState<JobList[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const client = generateClient<Schema>();

    useEffect(() => {
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
    }, [jobsList])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jobsList.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async(id: string) => {
        try {
            await client.models.Job.delete({'id': id});
            setAlertType('success')
            setShowAlertMessage('Job deleted successfully')
            setShowAlert(true)
        } catch (error) {
            setAlertType('error')
            setShowAlertMessage('Error deleting the job')
            setShowAlert(true)
            console.log('Error while deleting an job: ',error);
        }
    };


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
                                    <TableCell align="right">Action</TableCell>
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
                                        <TableCell align="right">
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={4}
                                        count={jobsList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        slotProps={{
                                            select: {
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            },
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
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
