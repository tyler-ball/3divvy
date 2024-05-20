import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import NavBar from '../components/NavBar'

import '../styles/marketStyle.css'

const ColorButton = styled(Button)(({ }) => ({
    color: 'black',
    borderColor: 'rgb(192, 192, 192)',
    margin: '5px',
    '&:hover': {
        borderColor: 'rgb(192, 192, 192)',
    },
}));

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
            <NavBar />
            <div className='filter-container'>
                <div className='filter-div'>
                    <FilterBar />
                </div>
                <div className='jobs-list'> Job List</div>
            </div>
        </>
    )
}
