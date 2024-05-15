import React, { useState } from 'react';
import { Grid, Label,
    FormControlLabel, TextField, Box, Button, Checkbox, styled, 
    FormControl} from '@mui/material';
import NavBar from '../components/NavBar'

import '../styles/marketStyle.css'
import Popup from '../components/Popup';

const ColorButton = styled(Button)(({ }) => ({
    color: 'black',
    borderColor: 'rgb(192, 192, 192)',
    margin: '5px',
    '&:hover': {
        borderColor: 'rgb(192, 192, 192)',
    },
}));

const FilterBar = ({setShowPopUp}) => {
  
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
            <ColorButton variant="outlined" onClick={() => {setShowPopUp(true)}}>Create New Job</ColorButton>
        </>
    )
};

export default function Market() {
    const [columnsToUpsert, setColumnsToUpsert] = useState([]);
    const [ showPopUp, setShowPopUp ] = useState(false);

    return (
        <>
            <NavBar />
            <div className='filter-container'>
                <div className='filter-div'>
                    <FilterBar 
                        setShowPopUp={setShowPopUp}
                    />
                </div>
                <div className='jobs-list'> Job List</div>
            </div>
            {showPopUp && 
                <Popup 
                    showPopUp = {showPopUp}
                    setShowPopUp={setShowPopUp}
                />
            }
        </>
    )
}
