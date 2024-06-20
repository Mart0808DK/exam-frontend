import UseResults from "../hooks/useResults.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import {DataGrid, type GridRenderCellParams} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {Paper} from "@mui/material";
import useSnackBar from "../hooks/useSnackBar.ts";
import {useState} from "react";
import type {ResultType} from "../types/resultType.ts";
import CustomModal from "../components/CustomModal.tsx";
import ResultsForm from "../components/ResultsForm.tsx";
import {translateResultType} from "../utils/Dictionary.ts";

function Results() {
    const {results, createResult, updateResult, deleteResult, isLoading} = UseResults();
    const {showSnackBarSuccess, showSnackBarError} = useSnackBar();
    const [isOpen, setIsOpen] = useState(false);
    const [editResult, setEditResult] = useState<ResultType | null>(null);


    if (isLoading) {
        return <LoadingSpinner/>;
    }

    const openModal = (result?: ResultType) => {
        if (result) {
            setEditResult(result);
        } else {
            setEditResult({
                id: 0,
                resultType: "",
                resultValue: "",
                date: new Date(),
                discipline: {
                    id: 0,
                    name: "",
                    resultType: "",
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
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteResult(id);
            showSnackBarSuccess("Resultat er slettet");
        } catch (e: unknown) {
            showSnackBarError("Der skete en fejl under sletning af resultat")
            console.log(e);
        }
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'participant', headerName: 'Deltager', width: 200, renderCell: (params: GridRenderCellParams) => (
                <span>{params.value?.name}</span>
            )},
        {field: "resultType", headerName: "Resultat type", width: 200, renderCell: (params: GridRenderCellParams) => translateResultType(params.value)},
        {
            field: 'resultValue',
            headerName: 'Resultat',
            width: 200,
            renderCell: (params: GridRenderCellParams) => {
                let formattedValue = params.row.resultValue;
                if (params.row.resultType === "Time") {
                    formattedValue += " min sek mm";
                } else if (params.row.resultType === "Distance") {
                    formattedValue += " meter";
                } else if (params.row.resultType === "Points") {
                    formattedValue += " ps";
                }
                return <span>{formattedValue}</span>;
            }
        },
        {field: 'discipline', headerName: 'Disciplin', width: 200, renderCell: (params: GridRenderCellParams) => {
                return <span>{params.value?.name}</span>
            }},
        {field: 'date', headerName: 'Dato', width: 200},
        { field: 'rediger', headerName: 'Rediger', width: 150, renderCell: (params: GridRenderCellParams) => (
                <Button variant={"contained"} onClick={() => openModal(params.row)}>Rediger</Button>
            ),
        },
        { field: 'slet', headerName: 'Slet', width: 150, renderCell: (params: GridRenderCellParams) => (
                <Button variant={"contained"} onClick={() => handleDelete(params.row.id)}>Slet</Button>)
        }
    ]
    return (
        <Paper elevation={3}
               sx={{
                   padding: 2,
                   margin: 2,
                   borderRadius: 2,
               }}>
            <h1>Resultater for begivenheder </h1>
            <div>
                <DataGrid columns={columns} rows={results}/>
            </div>
            <Button variant={"contained"} onClick={() => openModal()}>Opret</Button>
            <CustomModal isOpen={isOpen} onRequestClose={closeModal}>
                <ResultsForm onClose={closeModal} createResult={createResult} updateResult={updateResult} editResult={editResult} results={results}></ResultsForm>
            </CustomModal>
        </Paper>
    );
}

export default Results;