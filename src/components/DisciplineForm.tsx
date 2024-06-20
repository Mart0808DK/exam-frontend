import type {DisciplinePostType, DisciplineType} from "../types/disciplineType.ts";
import React, {useEffect, useState} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type DisciplineFormProps = {
    closeModal: () => void;
    createDiscipline: (discipline: DisciplinePostType) => void;
    updateDiscipline: (body: DisciplineType) => void;
    editDiscipline: DisciplineType | null;
    snackBarSuccess: (message: string) => void;
    snackBarError: (message: string) => void;
}

function DisciplineForm({closeModal, createDiscipline, updateDiscipline, editDiscipline, snackBarSuccess, snackBarError}: DisciplineFormProps) {
    const [form, setForm] = useState<DisciplineType>({
        id: 0,
        name: "",
        resultType: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    }

    const handleCreate = async (discipline: DisciplinePostType) => {
        try {
            createDiscipline(discipline);
            snackBarSuccess("Disciplin er oprettet");
            closeModal();
        } catch (error) {
            snackBarError("Der skete en fejl under oprettelse af disciplin");
            console.error(error);
        }
    }

    const handleUpdate = async (body: DisciplineType) => {
        try {
            updateDiscipline(body);
            snackBarSuccess("Disciplin er opdateret");
            closeModal();
        } catch (error) {
            snackBarError("Der skete en fejl under opdatering af disciplin");
            console.error(error);
        }
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        e.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name as string]: e.target.value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editDiscipline?.id) {
            handleUpdate(form);
        } else {
            handleCreate(form);
        }
    }

    useEffect(() => {
        if (editDiscipline) {
            setForm(editDiscipline);
        }
    }, [editDiscipline]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Opret rediger</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    label="Navn"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <FormControl fullWidth={true}>
                                <InputLabel>ResultatType</InputLabel>
                                <Select
                                    label="ResultatType"
                                    name="resultType"
                                    value={form.resultType}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value={"Time"}>Time</MenuItem>
                                    <MenuItem value={"Distance"}>Distance</MenuItem>
                                    <MenuItem value={"Points"}>Points</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between">
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-start">
                                <Button variant={"contained"} onClick={closeModal}>Cancel</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button type={"submit"} variant={"contained"}>Submit</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default DisciplineForm;