import React, { useState } from "react";
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dialogWrapper: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },

  gridText:{
    width: '100%',    
  },

  closeBtn: {
    position: 'absolute',
    right: '10px',
  }
})

function createJob (title, description, amount) {
  console.log(title, description, amount);
}

export default function Popup(props) {
  const classes = useStyles();
  const {showPopUp, setShowPopUp} = props;
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ amount, setAmount ] = useState('');
  

  return (
    <Dialog open={showPopUp} maxWidth="xs" classes={{paper: classes.dialogWrapper}}>
      <DialogTitle> 
        Create Job 
        <Button 
          onClick={() => setShowPopUp(false)}
          className={classes.closeBtn}
          variant="text"
          color="error"
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent dividers>
          <Grid 
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item className = {classes.gridText}>
              <TextField 
                variant="outlined"
                label="Title"
                size="small"
                fullWidth 
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Grid>
            <Grid item className = {classes.gridText} padding='15px 0 15px 0'>
              <TextField
                variant="outlined"
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Grid>
            <Grid item className = {classes.gridText}>
              <TextField
                variant="outlined"
                label="Amount"
                type="number"
                size="small"
                fullWidth
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                }}
              />
            </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => createJob(title, description, amount)} color="primary" variant="contained">Create Job</Button>
      </DialogActions>
    </Dialog>
  );
}
