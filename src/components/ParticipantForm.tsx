import React, {useEffect, useState} from "react";
import type {ParticipantPostType, ParticipantType} from "../types/participantType.ts";
import {Button, FormControl, MenuItem, Select, type SelectChangeEvent, TextField} from "@mui/material";
import useSnackBar from "../hooks/useSnackBar.ts";
import useDisciplines from "../hooks/useDisciplines.tsx";

type Entity1FormProps = {
    closeModal: () => void;
    createParticipant: (entity1: ParticipantPostType) => void;
    putParticipant: (entity1: ParticipantType) => void;
    editParticipant: ParticipantType | null;

}

function ParticipantForm({closeModal, createParticipant, putParticipant, editParticipant}: Entity1FormProps) {
    const [form, setForm] = useState<ParticipantType>({
        id: 0,
        name: "",
        gender: "",
        age: 0,
        clubName: "",
        discipline: []
    });
    const {showSnackBarSuccess, showSnackBarError} = useSnackBar();
    const {disciplines} = useDisciplines();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        e.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name as string]: e.target.value,
        }));
    }

    const handleSelectChangeDisciplin = (e: SelectChangeEvent<string[]>) => {
        e.preventDefault();
        const selectedDisciplines = disciplines.filter(discipline =>
            e.target.value.includes(discipline.id.toString())
        );
        setForm((prevForm) => ({
            ...prevForm,
            discipline: selectedDisciplines,
        }));
    }

    async function handleCreate(participant: ParticipantPostType) {
        try {
            createParticipant(participant);
            showSnackBarSuccess("Entity1 er oprettet");
            closeModal();
        } catch (error) {
            showSnackBarError("Der skete en fejl under oprettelse af Entity1");
            console.log(error);
        }
    }

    async function handleUpdate(participant: ParticipantType) {
        try {
            putParticipant(participant);
            showSnackBarSuccess("Entity1 er opdateret");
            closeModal();
        } catch (error) {
            showSnackBarError("Der skete en fejl under opdatering af Entity1");
            console.log(error);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editParticipant === null) {
            return;
        }
        const participantDetails = {
            id: editParticipant.id,
            name: form.name,
            gender: form.gender,
            age: form.age,
            clubName: form.clubName,
            discipline: Array.isArray(form.discipline) ? form.discipline.map(disc => ({
                ...disc,
                resultType: 'Time' // This is a placeholder. Update with the actual value.
            })) : []
        };
        console.log(participantDetails)
        if (participantDetails.id) {
            await handleUpdate(participantDetails);
        } else {
            await handleCreate(participantDetails);
        }
    }

    useEffect(() => {
        if (editParticipant !== null) {
            setForm({
                id: editParticipant.id,
                name: editParticipant.name,
                gender: editParticipant.gender,
                age: editParticipant.age,
                clubName: editParticipant.clubName,
                discipline: editParticipant.discipline
            });
        }
    }, [editParticipant]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <TextField sx={{marginBottom: "1rem"}}
                               label="Navn"
                               name={"name"}
                               value={form.name}
                               onChange={event => handleInputChange(event)}
                    />
                </FormControl>

                <FormControl>
                    <Select label={"køn"} name={"gender"} value={form.gender} onChange={handleSelectChange}>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <TextField sx={{marginBottom: "1rem"}}
                               label="Alder"
                               name={"age"}
                               value={form.age}
                               onChange={event => handleInputChange(event)}
                    />
                </FormControl>

                <FormControl>
                    <TextField sx={{marginBottom: "1rem"}}
                               label="KlubNavn"
                               name={"clubName"}
                               value={form.clubName}
                               onChange={event => handleInputChange(event)}
                    />
                </FormControl>
                <FormControl>
                    <Select
                        label={"Disciplin"}
                        name={"discipline"}
                        multiple
                        value={form.discipline.map(disc => disc.id.toString())}
                        onChange={handleSelectChangeDisciplin}
                    >
                        {disciplines.map(discipline => (
                            <MenuItem key={discipline.id} value={discipline.id.toString()}>{discipline.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default ParticipantForm;