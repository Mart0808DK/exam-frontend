import {useEffect, useState} from "react";
import useSnackBar from "../hooks/useSnackBar.ts";
import type {ResultPostType, ResultType} from "../types/resultType.ts";
import {FormControl, MenuItem, Select, type SelectChangeEvent, TextField} from "@mui/material";
import useDisciplines from "../hooks/useDisciplines.tsx";
import useParticipants from "../hooks/useParticipants.ts";
import Button from "@mui/material/Button";

type ResultsFormProps = {
    onClose: () => void;
    createResult: (result: ResultPostType) => void;
    updateResult: (result: ResultType) => void;
    editResult: ResultType | null;
    results: ResultType[];
}

function ResultsForm({onClose, createResult, updateResult, editResult, results}: ResultsFormProps) {
    const [form, setForm] = useState<ResultType>({
        id: 0,
        resultType: "",
        resultValue: 0,
        discipline: {
            id: 0,
            name: "",
            result_type: "",
        },
        participant: {
            id: 0,
            name: "",
            gender: "",
            age: 0,
            clubName: "",
            discipline: []
        }
    });
    const {showSnackBarSuccess, showSnackBarError} = useSnackBar();
    const {disciplines} = useDisciplines();
    const {participants} = useParticipants();

    const handleCreate = (result: ResultPostType) => {
        try {
            createResult(result);
            showSnackBarSuccess("Resultat er oprettet");
        } catch (e: unknown) {
            showSnackBarError("Der skete en fejl under oprettelse af resultat");
            console.log(e);
        }
    }

    const handleUpdate = (result: ResultType) => {
        try {
            updateResult(result);
            showSnackBarSuccess("Resultat er opdateret");
        } catch (e: unknown) {
            showSnackBarError("Der skete en fejl under opdatering af resultat");
            console.log(e);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        if (name === "discipline") {
            const selectedDiscipline = disciplines.find(discipline => discipline.id.toString() === value);
            setForm(prevForm => ({
                ...prevForm,
                discipline: selectedDiscipline || prevForm.discipline,
            }));
        } else if (name === "participant") {
            const selectedParticipant = participants.find(participant => participant.id.toString() === value);
            setForm(prevForm => ({
                ...prevForm,
                participant: selectedParticipant || prevForm.participant,
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editResult === null) {
            return;
        }
        const resultDetails = {
            id: editResult.id,
            resultType: form.resultType,
            resultValue: form.resultValue,
            discipline: form.discipline,
            participant: form.participant

        };
        if (resultDetails.id) {
            handleUpdate(resultDetails);
        } else {
            handleCreate(resultDetails);
        }
        onClose();
    }

    useEffect(() => {
        if (editResult) {
            setForm(editResult);
        }
    }, []);

    const uniqueResultTypes = [...new Set(results.map(result => result.resultType))];

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Select
                        label="Result Type"
                        name="resultType"
                        value={form.resultType}
                        onChange={handleSelectChange}
                    >
                        {uniqueResultTypes.map((resultType) => (
                            <MenuItem key={resultType} value={resultType}>
                                {resultType}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField
                        label="Result Value"
                        type="number"
                        name="resultValue"
                        value={form.resultValue}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <Select
                    label="Discipline"
                    name="discipline"
                    value={form.discipline && form.discipline.id ? form.discipline.id.toString() : ""}
                    onChange={handleSelectChange}
                >
                    {disciplines.map((discipline) => (
                        <MenuItem key={discipline.id} value={discipline.id.toString()}>
                            {discipline.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormControl>
                    <Select
                        label="Participant"
                        name="participant"
                        value={form.participant.id.toString()}
                        onChange={handleSelectChange}
                    >
                        {participants.map((participant) => (
                            <MenuItem key={participant.id} value={participant.id.toString()}>
                                {participant.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type={"submit"} variant={"contained"}>Submit</Button>
            </form>
        </div>
    );
}

export default ResultsForm;