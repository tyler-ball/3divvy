import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { AuthUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Schema } from '../../amplify/data/resource';
import React from 'react';
import { uploadData } from 'aws-amplify/storage';

import '../styles/marketStyle.css';

const ColorButton = styled(Button)({
    color: 'black',
    borderColor: 'rgb(192, 192, 192)',
    margin: '5px',
    '&:hover': {
        borderColor: 'rgb(192, 192, 192)',
    }
});

function CreateJob({ user }: { user: AuthUser }) {
    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "amt_offered": 0,
        "req_mat": [],
    });

    const client = generateClient<Schema>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Handle Selecting FIle from system
    const [file, setFile] = React.useState();
    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const createJob = async () => {
        if(file == null) {
            alert("Please Select FIle");
            return;
        }
        const newId = uuidv4();
        const timestamp = Date.now();
        const uniqueId = "" + newId + "-" + timestamp + "-" + file.name;
        await client.models.Job.create({
            jobId: uniqueId,
            submitter: user.userId,
            title: formData.title,
            description: formData.description,
            amountOffered: formData.amt_offered,
        });
        alert("LOGGED: " + uniqueId);
        uploadData({
            path: `models/${user.userId}/${uniqueId}`,
            data: file,
        });
        alert("Uploaded!");
    }

    return (
        <div>
            <label>3D Model File</label>
            <input type="file" onChange={handleFileChange} />
            <table>
                <tbody>
                    <tr>
                        <td><label>Title</label></td>
                        <td><input
                            type="text"
                            name="title"
                            value={formData['title']}
                            onChange={handleChange}
                        /></td>
                    </tr>

                    <tr>
                        <td><label>Description</label></td>
                        <td><input
                            type="text"
                            name="description"
                            value={formData['description']}
                            onChange={handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label>Amount Offered</label></td>
                        <td><input
                            type="number"
                            name="amt_offered"
                            step="0.01"
                            value={formData['amt_offered']}
                            onChange={handleChange}
                        /></td>
                    </tr>

                    <tr>
                        <button onClick={createJob}>Create</button>
                    </tr>
                </tbody>
                
            </table>
        </div>
        
        );
}

const FilterBar = () => {
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
            <ColorButton variant="outlined">Create New Job</ColorButton>
        </>
    )
};

export default function Market({ user }: { user: AuthUser }) {
    return (
        <>
            <div className='filter-container'>
                <div className='filter-div'>
                    <FilterBar />
                </div>
                <div className='jobs-list'> Job List</div>
                <p>Job List</p>
                <CreateJob user={user} />
            </div>
        </>
    )
}
