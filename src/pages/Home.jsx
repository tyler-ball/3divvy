import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../styles/homeStyle.css'
import NavBar from '../components/NavBar.jsx';


function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

export default function Home () {
    return (
        <>
            <div className="request-container">
                <h2>My Requests</h2>
                <div className='list-container'>
                    <List >
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>
                        )}
                    </List>
                </div>
            </div>
            <div className="jobs-container">
                <h2>My Jobs</h2>
                <div className='list-container'>
                    <List>
                        {generate(
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                            />
                            </ListItem>
                        )}
                    </List>
                </div>
            </div>
        </>
    )
}