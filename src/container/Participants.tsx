import useParticipants from "../hooks/useParticipants.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import React, {useState} from "react";
import type { ParticipantType} from "../types/participantType.ts";
import {Paper} from "@mui/material";
import useSnackBar from "../hooks/useSnackBar.ts";
import Button from "@mui/material/Button";
import {DataGrid, type GridRenderCellParams} from "@mui/x-data-grid";
import CustomModal from "../components/CustomModal.tsx";
import ParticipantForm from "../components/ParticipantForm.tsx";

function Participants() {
    const {participants, createParticipant, putParticipant, deleteParticipant, isLoading} = useParticipants();
    const [isOpen, setIsOpen] = useState(false);
    const [editParticipant, setEditParticipant] = useState<ParticipantType | null>(null);
    const {showSnackBarSuccess, showSnackBarError} = useSnackBar();


    if (isLoading) {
        return <LoadingSpinner />;
    }

    const openModal = (entity1?: ParticipantType) => {
        if (entity1) {
            setEditParticipant(entity1);
        } else {
            setEditParticipant({
                id: 0,
                name: "",
                gender: "",
                age: 0,
                club: "",
                discipline: []
            });
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteParticipant(id);
            showSnackBarSuccess("Entity1 er slettet");
        } catch (e: unknown) {
            showSnackBarError("Der skete en fejl under sletning af Entity1")
            console.log(e);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Navn', width: 200 },
        { field: 'age', headerName: 'Alder', width: 130 },
        { field: 'gender', headerName: 'Køn', width: 130 },
        { field: 'clubName', headerName: 'Klub', width: 200},
        { field: 'discipline', headerName: 'Disciplin', width: 400, renderCell: (params: GridRenderCellParams) => (
                <span>{params.row.discipline.map(discipline => discipline.name).join(", ")}</span>
            )},
        { field: 'rediger', headerName: 'Rediger', width: 150, renderCell: (params: GridRenderCellParams) => (
                <Button variant={"contained"} onClick={() => openModal(params.row)}>Rediger</Button>
            ),
        },
        { field: 'slet', headerName: 'Slet', width: 150, renderCell: (params: GridRenderCellParams) => (
            <Button variant={"contained"} onClick={() => handleDelete(params.row.id)}>Slet</Button>)
        }
    ];
    return (
        <>
            <Paper elevation={3}
                   sx={{
                       padding: 2,
                       margin: 2,
                       borderRadius: 2,
                   }}>
                <h1>Deltager</h1>
                <div>
                    <DataGrid columns={columns} rows={participants}/>
                </div>
                <Button variant={"contained"} onClick={() => openModal()}>Opret</Button>
                <CustomModal isOpen={isOpen} onRequestClose={closeModal}>
                    <ParticipantForm createParticipant={createParticipant} putParticipant={putParticipant}
                                     closeModal={closeModal} editParticipant={editParticipant}/>
                </CustomModal>
            </Paper>
        </>
    );
}

export default Participants;