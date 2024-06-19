import React, {useEffect, useState} from "react";
import type {Entity1PostType, Entity1Type} from "../types/entity1Type.ts";
import {Button, FormControl, TextField} from "@mui/material";
import useSnackBar from "../hooks/useSnackBar.ts";

type Entity1FormProps = {
    closeModal: () => void;
    createEntity1: (entity1: Entity1PostType) => void;
    updateEntity1: (entity1: Entity1Type) => void;
    editEntity1: Entity1Type | null;

}

function Entity1Form({closeModal, createEntity1, updateEntity1, editEntity1}: Entity1FormProps) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: 0,});
    const {showSnackBarSuccess, showSnackBarError} = useSnackBar();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleCreate(entity1: Entity1PostType) {
        try {
            createEntity1(entity1);
            showSnackBarSuccess("Entity1 er oprettet");
            closeModal();
        } catch (error) {
            showSnackBarError("Der skete en fejl under oprettelse af Entity1");
            console.log(error);
        }
    }

    async function handleUpdate(entity1: Entity1Type) {
        try {
            updateEntity1(entity1);
            showSnackBarSuccess("Entity1 er opdateret");
            closeModal();
        } catch (error) {
            showSnackBarError("Der skete en fejl under opdatering af Entity1");
            console.log(error);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editEntity1 === null) {
            return;
        }
        const entity1Details = {
            id: editEntity1.id,
            name: form.name,
            email: form.email,
            age: form.age
        };
        if (editEntity1.id === 0) {
            handleCreate(entity1Details);
        } else {
            handleUpdate(entity1Details);
        }
    }

    useEffect(() => {
        if (editEntity1 !== null) {
            setForm({
                name: editEntity1.name,
                email: editEntity1.email,
                age: editEntity1.age
            });
        }
    }, [editEntity1]);

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <TextField sx={{marginBottom: "1rem"}}
                    label="Navn"
                    name={"name"}
                    value={form.name}
                    onChange={event => handleInputChange(event)}
                />

                <TextField sx={{marginBottom: "1rem"}}
                    label="Email"
                    name={"email"}
                    value={form.email}
                    onChange={event => handleInputChange(event)}/>

                <TextField sx={{marginBottom: "1rem"}}
                    label="Alder"
                    name={"age"}
                    value={form.age}
                    onChange={event => handleInputChange(event)}/>
                <Button type="submit" variant="contained">Submit</Button>
            </FormControl>
        </form>
    )
}

export default Entity1Form;