import { generateClient } from 'aws-amplify/data';
import { DataGrid } from '@mui/x-data-grid';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

type Job = Schema['Job']['type'];

const FORMAT_DATE = (date_str) => {
    return format(new Date(date_str), 'MM/dd/yy hh:mm aa');
}
const LIST_FORMATTER = (els) => {
    return (els.length ? els.join(", ") : "None");
}

const MB_FORMATTER = (bytes) => {
    let mb = (bytes / (1024 * 1024));
    return mb.toFixed(2).toString() + " MB";
}


const JOB_COLUMNS: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
    },
    {
        field: 'requiredMaterials',
        headerName: 'Materials',
        width: 150,
        valueFormatter: LIST_FORMATTER
    },
    {
        field: 'colors',
        headerName: 'Colors',
        width: 150,
        valueFormatter: LIST_FORMATTER
    },
    {
        field: 'createdAt',
        headerName: 'Date Posted',
        width: 150,
        valueFormatter: FORMAT_DATE
    },
    {
        field: 'amountOffered',
        headerName: 'Amount Offered',
        width: 150,
    },
    {
        field: 'modelSize',
        headerName: 'Model Size',
        width: 150,
        valueFormatter: MB_FORMATTER
    },
    {
        field: 'contract',
        headerName: 'Status',
        width: 150,
        valueFormatter: (con) => {
            return (con === null) ? "Not contracted" : con.status;
        }
    }
];

export default function JobsTable(props) {
    const filters = props.filters;
    const selectPopup = props.selectPopup;
    const allowDelete = props.allowDelete ?? false;
    const allowEdit = props.allowEdit ?? false;
    const excludeContracted = props.excludeContracted ?? false;
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [jobs, setJobs] = useState([]);
    const [pageTokens, setPageTokens] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [jobsByID, setJobsByID] = useState({});

    const fetchData = async (init, nextPage) => {
        let prevToken = init ? '' : pageTokens[pageTokens.length - 1];
        console.log("PREV TOKEN");
        console.log(prevToken);
        if (init || (hasMorePages && currentPageIndex === pageTokens.length)) {
            const raw_resp = await client.models.Job.list({
                filter: filters,
                limit: 30,
                nextToken: prevToken,
                authMode: 'userPool',
                selectionSet: ['id',
                    'createdAt',
                    'submitter',
                    'title',
                    'description',
                    'amountOffered',
                    'requiredMaterials',
                    'colors',
                    'modelSize',
                    'contract.*']
            });
            let new_jobs = raw_resp.data;
            let nextToken = raw_resp.nextToken;


            setHasMorePages(nextToken != null && new_jobs.length == 10);
            setPageTokens(init ? [nextToken] : [...pageTokens, nextToken]);
            if (init) {
                setJobs(new_jobs.length > 0 ? [new_jobs] : []);
                setCurrentPageIndex(1);
            } else if (new_jobs.length > 0) {
                setJobs([...jobs, new_jobs]);
            }

            let jobs_dict = init ? {} : JSON.parse(JSON.stringify(jobsByID));
            for (let job of new_jobs) {
                jobs_dict[job.id] = job;
            }

            setJobsByID(jobs_dict);
        }

        if (nextPage) {
            setCurrentPageIndex((pi) => pi + 1);
        }
    }

    useEffect(() => { fetchData(true, false); }, [props.filters]);




    if (jobs.length == 0) {
        return (<p>No jobs matching criteria.</p>);
    }

    const handleSelectionChange = (selection) => {
        setSelectedRows(selection);
    };

    return (
        <>
            <DataGrid
                checkboxSelection
                disableMultipleRowSelection={true}
                columns={JOB_COLUMNS}
                rows={jobs[currentPageIndex - 1]}
                onRowSelectionModelChange={handleSelectionChange}
                hideFooter={true}
            />
            {selectedRows.length > 0 && selectPopup(selectedRows[0], jobsByID[selectedRows[0]])}
            <Pagination
                currentPage={currentPageIndex}
                totalPages={pageTokens.length}
                hasMorePages={hasMorePages}
                onPrevious={() => setCurrentPageIndex(currentPageIndex - 1)}
                onNext={() => fetchData(false, true)}
                onChange={(pageIndex) => setCurrentPageIndex(pageIndex)}
            />
        </>);
}
