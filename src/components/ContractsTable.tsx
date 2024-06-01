import { generateClient } from 'aws-amplify/data';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import { Pagination } from '@aws-amplify/ui-react';
import { ReactElement, useEffect, useState } from 'react';
import { getUrl } from 'aws-amplify/storage';
import { Button } from '@aws-amplify/ui-react';

const CONTRACT_COLUMNS: GridColDef[] = [
    {
        field: 'job_title',
        headerName: 'Title',
        width: 150,
    },
    {
        field: 'job_description',
        headerName: 'Description',
        width: 150,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
    },
    {
        field: 'model_file_path',
        headerName: 'Download Model',
        renderCell: downloadModelFile,
        width: 150,
    },
    {
        field: 'paid',
        headerName: 'Payment Status',
        width: 150,
    }
];

function downloadModelFile(params: GridRenderCellParams<any, String>): ReactElement {
    if (params.value) {
        return (
            <Button onClick={() =>
                getUrl({
                    path: params.value,
                    options: {
                        validateObjectExistence: true,
                    }
                }).then((modelFile) => {
                    console.log(modelFile.url);
                    window.open(modelFile.url, '_blank');
                })
            }>Download</Button>
        );
    } else {
        return (<>Missing</>);
    }
}

export default function ContractsTable(props) {
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
                filter: {
                    contractor: { eq: user.userId }
                },
                selectionSet: ['id', 'status', 'paid', 'job.*'],
                limit: 30,
                nextToken: pageTokens[pageTokens.length - 1],
                authMode: 'userPool'
            });

            console.log('CONTRACTS:');
            console.log(new_contracts);

            const new_contracts_flattened = new_contracts.map((contract) => ({
                ...contract,
                job_title: contract?.job?.title,
                job_description: contract?.job?.description,
                model_file_path: contract?.job?.modelFilePath
            }))

            console.log('CONTRACTS:');
            console.log(new_contracts[0]?.job)

            if (!nextToken) {
                setHasMorePages(false);
            }
            setPageTokens(init ? [nextToken] : [...pageTokens, nextToken]);
            if (init) {
                setContracts(new_contracts_flattened.length > 0 ? [new_contracts_flattened] : []);
            } else if (new_contracts_flattened.length > 0) {
                setContracts([...contracts, new_contracts_flattened]);
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
