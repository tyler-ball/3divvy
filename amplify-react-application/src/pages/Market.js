import React, { useState } from 'react';
import { 
    FormControlLabel,
    TextField,
    Box,
    Button,
    Checkbox,
    styled, 
    List,
    ListItem,
    ListItemText,
    IconButton,
    ListSubheader
} from '@mui/material';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../components/NavBar';
import '../styles/marketStyle.css';
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

const handleDelete = (index) => {
    console.log('delete clicked ', index)
};


export default function Market() {
    const [secondary, setSecondary] = React.useState(false);
    const [ showPopUp, setShowPopUp ] = useState(false);
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [showDelete, setShowDelete] = useState(false); // set true when the new row is created for 1 min
 
    return (
        <>
            <NavBar />
            <div className='filter-container'>
                <div className='filter-div'>
                    <FilterBar 
                        setShowPopUp={setShowPopUp}
                    />
                </div>
                <div className='jobs-list'>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            Pending Printer Jobs
                            </ListSubheader>
                        }
                    >
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    secondaryAction={ showDelete &&
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                        <DeleteIcon />
                                        </IconButton>
                                    }
                                    >
                                    <ListItemText
                                        primary={item}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                                {index < items.length - 1 && <Divider variant="middle" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </div>
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
