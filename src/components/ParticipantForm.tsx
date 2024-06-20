import React, {useEffect, useState} from "react";
import type {ParticipantPostType, ParticipantType} from "../types/participantType.ts";
import {Button, FormControl, MenuItem, Select, TextField} from "@mui/material";
import useSnackBar from "../hooks/useSnackBar.ts";
import useDisciplines from "../hooks/useDisciplines.tsx";
import Box from "@mui/material/Box";

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
        club: "",
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

    const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        e.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name as string]: e.target.value,
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
            club: form.clubName,
            discipline: form.discipline
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
                    <Select label={"Disciplin"} name={"discipline"} value={form.discipline} onChange={handleSelectChange}>
                        {disciplines.map(discipline => (
                            <MenuItem key={discipline.id} value={discipline.name}>{discipline.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default ParticipantForm;