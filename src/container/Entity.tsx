import useEntity1 from "../hooks/useEntity1.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import {DataGrid, type GridRenderCellParams} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import type {Entity1Type} from "../types/entity1Type.ts";
import CustomModal from "../components/CustomModal.tsx";
import Entity1Form from "../components/Entity1Form.tsx";
import {Paper} from "@mui/material";
import useSnackBar from "../hooks/useSnackBar.ts";

function Entity() {
    const {entity1, createEntity1, putEntity1, deleteEntity1, isLoading } = useEntity1();
    const [isOpen, setIsOpen] = useState(false);
    const [editEntity1, setEditEntity1] = useState<Entity1Type | null>(null);
    const {showSnackBarSuccess, showSnackBarError} = useSnackBar();


    if (isLoading) {
        return <LoadingSpinner />;
    }

    const openModal = (entity1?: Entity1Type) => {
        if (entity1) {
            setEditEntity1(entity1);
        } else {
            setEditEntity1({
                id: 0,
                name: "",
                email: "",
                age: 0
            });
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteEntity1(id);
            showSnackBarSuccess("Entity1 er slettet");
        } catch (e: unknown) {
            showSnackBarError("Der skete en fejl under sletning af Entity1")
            console.log(e);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Navn', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'age', headerName: 'Alder', width: 130 },
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
                <h1>Entity1</h1>
                <div>
                    <DataGrid columns={columns} rows={entity1}/>
                </div>
                <Button variant={"contained"} onClick={() => openModal()}>Opret</Button>
                <CustomModal isOpen={isOpen} onRequestClose={closeModal}>
                    <Entity1Form editEntity1={editEntity1} createEntity1={createEntity1} updateEntity1={putEntity1}
                                 closeModal={closeModal}/>
                </CustomModal>
            </Paper>
        </>
    );
}

export default Entity;