import { generateClient } from 'aws-amplify/data';
import { DataGrid } from '@mui/x-data-grid';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import { Pagination } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

const CONTRACT_COLUMNS: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'job',
        valueGetter: (params) => params.title,
        headerName: 'Title',
        width: 150,
    },
    {
        field: 'job',
        valueGetter: (params) => params.description,
        headerName: 'Description',
        width: 150,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
    }
];

export default function ContractsTable(props) {
    const filters = props.filters;
    const selectPopup = props.selectPopup;
    const client = generateClient<Schema>();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [contracts, setContracts] = useState([]);
    const [pageTokens, setPageTokens] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);

    const fetchData = async (init, nextPage) => {
        if (init || (hasMorePages && currentPageIndex === pageTokens.length)) {

            const { data: new_contracts, nextToken } = await client.models.Contract.list({
                // filter: filters,
                selectionSet: ['id', 'status', 'job.*'],
                limit: 30,
                nextToken: pageTokens[pageTokens.length - 1],
                authMode: 'userPool'
            });

            // console.log('CONTRACTS:');
            // console.log(new_contracts[0].job)

            if (!nextToken) {
                setHasMorePages(false);
            }
            setPageTokens(init ? [nextToken] : [...pageTokens, nextToken]);
            if (init) {
                setContracts(new_contracts.length > 0 ? [new_contracts] : []);
            } else if (new_contracts.length > 0) {
                setContracts([...contracts, new_contracts]);
            }
        }

        if (nextPage) {
            setCurrentPageIndex((pi) => pi + 1);
        }
    }

    useEffect(() => { fetchData(true, false); }, [props.filters]);




    if (contracts.length == 0) {
        return (<p>No jobs Accepted.</p>);
    }

    const handleSelectionChange = (selection) => {
        setSelectedRows(selection);
    };

    return (
        <>
            <DataGrid
                checkboxSelection
                disableMultipleRowSelection={true}
                columns={CONTRACT_COLUMNS}
                rows={contracts[currentPageIndex - 1]}
                onRowSelectionModelChange={handleSelectionChange}
            />
            {selectedRows.length > 0 && selectPopup(selectedRows[0])}
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
