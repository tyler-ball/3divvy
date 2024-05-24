import React, { Dispatch, useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { AuthUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface FormData {
    title: string;
    description: string;
    amt_offered: number;
}

type CreateJobResult = {
    success: boolean;
    message: string;
};

async function CreateJob({ user, formData }: { user: AuthUser, formData: FormData }): Promise<CreateJobResult> {
    try {
        const client = generateClient<Schema>();
        await client.models.Job.create({
            submitter: user.userId,
            title: formData.title,
            description: formData.description,
            amountOffered: formData.amt_offered,
        });
        return { success: true, message: 'Job created successfully.' };
    } catch (error) {
        return { success: false, message: 'Failed to create job.' };
    }
}

type PopUpProps = {
    showPopUp: boolean,
    setShowPopUp: Dispatch<React.SetStateAction<boolean>>,
    setShowAlert:Dispatch<React.SetStateAction<boolean>>,
    setShowAlertMessage: Dispatch<React.SetStateAction<string>>,
    setAlertType: Dispatch<React.SetStateAction<string>>,
    user: AuthUser,
}

export default function Popup({ showPopUp, setShowPopUp, setShowAlert, setShowAlertMessage, setAlertType, user }: PopUpProps) {
    
    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "amt_offered": 0,
        "req_mat": [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCreateJob = async() => {
        setShowPopUp(false);
        const result = await CreateJob({ user, formData });
        setAlertType("error")
        if (result.success) {
            setShowAlert(true);
            setAlertType("success")
            setShowAlertMessage(result.message);
        }
    }

    const isDisabled = !formData.title || !formData.description || formData.amt_offered <= 0;

    return (
        <>
            <Dialog 
                open={showPopUp}
                maxWidth="xs"
            >
                <DialogTitle>
                    Create Job
                    <Button
                        onClick={() => setShowPopUp(false)}
                        variant="text"
                        color="error"
                        sx={{position: 'absolute', right: '10px'}}
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
                        <Grid item sx={{width: '100%'}}>
                            <TextField
                                required
                                variant="outlined"
                                label="Title"
                                size="small"
                                name="title"
                                fullWidth
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sx={{width: '100%', padding: '15px 0 15px 0'}}>
                            <TextField
                                required
                                variant="outlined"
                                label="Description"
                                multiline
                                name="description"
                                rows={4}
                                fullWidth
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sx={{width: '100%'}}>
                            <TextField
                                required
                                variant="outlined"
                                label="Amount"
                                type="number"
                                size="small"
                                name="amt_offered"
                                fullWidth
                                value={formData.amt_offered}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sx={{width: '100%'}}>
                            <Button
                                component="label"
                                variant="contained"
                                sx={{margin: '10px 0 10px 0', display: 'flex'}}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{display: 'flex', justifyContent: 'center'}}
                >
                    <Button
                        onClick={handleCreateJob}
                        color="primary"
                        variant="contained"
                        disabled={isDisabled}
                    >
                        Create Job
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}