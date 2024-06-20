import {useEffect, useState} from "react";
import useSnackBar from "../hooks/useSnackBar.ts";
import type {ResultPostType, ResultType} from "../types/resultType.ts";
import {FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField} from "@mui/material";
import useDisciplines from "../hooks/useDisciplines.tsx";
import useParticipants from "../hooks/useParticipants.ts";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
        resultValue: "",
        date: new Date(),
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
        },
    });
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [milliseconds, setMilliseconds] = useState("");
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

    const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinutes(event.target.value);
        const minutesValue = parseFloat(event.target.value) || 0;
        const secondsValue = parseFloat(seconds) || 0;
        setForm({
            ...form,
            resultValue: (minutesValue * 60 + secondsValue).toString(),
        });
    };

    const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeconds(event.target.value);
        const minutesValue = parseFloat(minutes) || 0;
        const secondsValue = parseFloat(event.target.value) || 0;
        setForm({
            ...form,
            resultValue: (minutesValue * 60 + secondsValue).toString(),
        });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editResult === null) {
            return;
        }

        let resultValue;
        if (form.resultType === "Time") {
            const minutesValue = parseFloat(minutes) || 0;
            const secondsValue = parseFloat(seconds) || 0;
            const millisecondsValue = parseFloat(milliseconds) || 0;
            const totalSeconds = minutesValue * 60 + secondsValue + millisecondsValue / 1000;

            // Calculate minutes, seconds, and milliseconds
            const min = Math.floor(totalSeconds / 60);
            const sec = Math.floor(totalSeconds % 60);
            const ms = Math.floor((totalSeconds * 1000) % 1000);

            // Format resultValue as "min:sec.ms"
            resultValue = `${min}:${sec}.${ms}`;
        } else {
            resultValue = form.resultValue;
        }

        const resultDetails = {
            id: editResult.id,
            resultType: form.resultType,
            resultValue: resultValue,
            date: form.date,
            discipline: form.discipline,
            participant: form.participant,
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
                <h2>Opret rediger</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Resultat Type</InputLabel>
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
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            {form.resultType === "Time" ? (
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Minutter"
                                            type="number"
                                            name="minutes"
                                            value={minutes}
                                            onChange={handleMinutesChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Sekunder"
                                            type="number"
                                            name="seconds"
                                            value={seconds}
                                            onChange={handleSecondsChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Milisekunder"
                                            type="number"
                                            name="milliseconds"
                                            value={milliseconds}
                                            onChange={(event) => setMilliseconds(event.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            />
                                    </Grid>
                                </Grid>
                            ) : (
                                <TextField
                                    label="Result Value"
                                    type="number"
                                    name="resultValue"
                                    value={form.resultValue}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Discipline</InputLabel>
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Deltagere</InputLabel>
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
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Dato"
                                type="datetime-local"
                                name="date"
                                value={form.date}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between">
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-start">
                                <Button variant={"contained"} onClick={onClose}>Cancel</Button>
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

export default ResultsForm;