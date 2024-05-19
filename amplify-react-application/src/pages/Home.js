import React from 'react';
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
import '../styles/homeStyle.css'
import NavBar from '../components/NavBar';


export default function Home({signInDetails, accessToken}) {
    const requestItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"];
    const jobItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"];

    if (accessToken){
        console.log('Hi this is accessToken: ', accessToken);
    }
    return (
        <>
            <NavBar />
            <div className='home-container'>
                <div className="request-container">
                    <h2>My Requests</h2>
                    <div className='list-container'>
                        <List >
                            {requestItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={item}
                                        />
                                    </ListItem>
                                    {index < requestItems.length - 1 && <Divider variant="middle" component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                </div>
                <div className="jobs-container">
                    <h2>My Jobs</h2>
                    <div className='list-container'>
                        <List>
                            {jobItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={item}
                                        />
                                    </ListItem>
                                    {index < jobItems.length - 1 && <Divider variant="middle" component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
            
        </>
    )
}