import React, { Dispatch, useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    FormControlLabel,
    Checkbox

} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { AuthUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';


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
};

type CreateJobResult = {
    success: boolean;
    message: string;
};

async function CreateJob({ user, formData, modelFile }: { user: AuthUser, formData: FormData, modelFile: File }): Promise<CreateJobResult> {
    console.log(modelFile);
    let colors = [];
    let color, val;
    for ([color, val] of Object.entries(formData.colors)) {
        if (val) {
            colors.push(color);
        }
    }

    let materials = [];
    let material;
    for ([material, val] of Object.entries(formData.materials)) {
        if (val) {
            materials.push(material);
        }
    }

    const client = generateClient<Schema>();

    if (!modelFile) {
        return { success: false, message: 'Could not find selected file.' };
    }


    let { data: new_job, errors: err1 } = await client.models.Job.create({
        submitter: user.userId,
        title: formData.title,
        description: formData.description,
        amountOffered: formData.amt_offered,
        colors: colors,
        requiredMaterials: materials,
        modelSize: modelFile.size
    });
    if (err1) {
        return { success: false, message: 'Failed to create job.' };
    }
    const uniqueId = Date.now() + "-" + modelFile.name;
    const modelFilePath = `models/${user.userId}/${new_job.id}/${uniqueId}`;
    try {
        const response = await uploadData({
            path: `models/${user.userId}/${new_job.id}/${uniqueId}`,
            data: modelFile
        });
    } catch (error) {
        return { success: false, message: 'Error uploading file: ' + error };
    }

    let { data: new_job_with_path, errors: err2 } = await client.models.Job.update({
        id: new_job.id,
        modelFilePath: modelFilePath
    });
    if (err2) {
        return { success: false, message: 'Failed to update job with model path.' };
    }

    return { success: true, message: 'Job created successfully.' };
}

type PopUpProps = {
    showPopUp: boolean,
    setShowPopUp: Dispatch<React.SetStateAction<boolean>>,
    setShowAlert: Dispatch<React.SetStateAction<boolean>>,
    setShowAlertMessage: Dispatch<React.SetStateAction<string>>,
    setAlertType: Dispatch<React.SetStateAction<string>>,
    user: AuthUser,
}

export default function Popup({ showPopUp, setShowPopUp, setShowAlert, setShowAlertMessage, setAlertType, user }: PopUpProps) {

    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "amt_offered": 0,
        'materials': {
            'Plastic': false,
            'Resin': false,
            'CarbonFiber': false
        },
        'colors': {
            'Red': false,
            'White': false,
            'Black': false,
            'Blue': false,
            'Transparent': false
        }
    });

    let onMaterialCheck = (mat, event) => {
        let formDataCopy = JSON.parse(JSON.stringify(formData));
        let checked = event.target.checked;
        formDataCopy.materials[mat] = checked;
        setFormData(formDataCopy);
    }

    let onColorCheck = (col, event) => {
        let formDataCopy = JSON.parse(JSON.stringify(formData));
        let checked = event.target.checked;
        formDataCopy.colors[col] = checked;
        setFormData(formDataCopy);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [modelFile, setFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            //setError(null); // Reset error state on new file selection
            //setSuccessMessage(null); // Reset success message on new file selection
        }
    };

    const handleCreateJob = async () => {
        setShowPopUp(false);
        const result = await CreateJob({ user, formData, modelFile });
        setShowAlert(true);
        setAlertType(result.success ? "success" : "error")
        setShowAlertMessage(result.message);
    }

    const isDisabled = !formData.title || !formData.description || formData.amt_offered <= 0 || !modelFile;

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
                        sx={{ position: 'absolute', right: '10px' }}
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
                        <Grid item sx={{ width: '100%' }}>
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
                        <Grid item sx={{ width: '100%', padding: '15px 0 15px 0' }}>
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
                        <Grid item sx={{ width: '100%' }}>
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
                        <div className='material'>
                            <label>Material</label>
                            <Box className='filters'>
                                {Object.keys(formData.materials).map((mat) => (
                                    <FormControlLabel control={<Checkbox
                                        checked={formData.materials[mat]}
                                        onChange={(e) => { onMaterialCheck(mat, e) }}
                                    />} label={mat} />
                                ))}
                            </Box>
                        </div>
                        <div className='color'>
                            <label>Color</label>
                            <Box className='filters'>
                                {Object.keys(formData.colors).map((col) => (
                                    <FormControlLabel control={<Checkbox
                                        checked={formData.colors[col]}
                                        onChange={(e) => { onColorCheck(col, e) }}
                                    />} label={col} />
                                ))}
                            </Box>
                        </div>

                        <Grid item sx={{ width: '100%' }}>
                            <Button
                                component="label"
                                variant="contained"
                                sx={{ margin: '10px 0 10px 0', display: 'flex' }}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                            {modelFile && (
                                <p>Selected: {modelFile.name}</p>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', justifyContent: 'center' }}
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