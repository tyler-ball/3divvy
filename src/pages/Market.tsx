import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import NavBar from '../components/NavBar'
import type { Schema } from '../../../amplify/data/resource';
import { useAuthenticator } from '@aws-amplify/ui-react';

import '../styles/marketStyle.css'

const ColorButton = styled(Button)(({ }) => ({
    color: 'black',
    borderColor: 'rgb(192, 192, 192)',
    margin: '5px',
    '&:hover': {
        borderColor: 'rgb(192, 192, 192)',
    },
}));

function CreateJob() {
	const { user, signOut } = useAuthenticator((context) => [context.user]);
	const [formData, setFormData] = useState({
		"title": "",
		"description": "",
		"amt_offered": 0,
		"req_mat": [],
	});
	
	const client = generateClient<Schema>();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
		  ...formData,
		  [name]: value
		});
	};

	const createJob = async () => {
		const { err, data: new_job } = await client.models.Job.create({
			submitter: user.userId,
			title: formData.title,
			description: formData.description,
			amountOffered: formData.amt_offered,
		});
	}

	return (
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
		</table>);
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
            <div className='colour'>
                <label>Colour</label>
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



export default function Market() {
    return (
        <>
            <div className='filter-container'>
                <div className='filter-div'>
                    <FilterBar />
                </div>
                <div className='jobs-list'> Job List</div>
				<p>Job List</p>
				<CreateJob/>
			</div>
            </div>
        </>
    )
}
