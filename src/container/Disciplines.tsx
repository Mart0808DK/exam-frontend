import UseDisciplines from "../hooks/useDisciplines.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import {DataGrid, type GridRenderCellParams} from "@mui/x-data-grid";
import {useState} from "react";
import type {DisciplineType} from "../types/disciplineType.ts";
import Button from "@mui/material/Button";
import {Paper} from "@mui/material";
import CustomModal from "../components/CustomModal.tsx";
import DisciplineForm from "../components/DisciplineForm.tsx";
import useSnackBar from "../hooks/useSnackBar.ts";
import {translateResultType} from "../utils/Dictionary.ts";

function Disciplines() {
    const {disciplines, createDiscipline, updateDiscipline, isLoading} = UseDisciplines();
    const [isOpen, setIsOpen] = useState(false);
    const [editDiscipline, setEditDiscipline] = useState<DisciplineType | null>(null);
    const {showSnackBarSuccess, showSnackBarError} = useSnackBar();

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    const openModal = (discipline?: DisciplineType) => {
        if (discipline) {
            setEditDiscipline(discipline);
        } else {
            setEditDiscipline({
                id: 0,
                name: "",
                resultType: "",
            });
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {field: "name", headerName: "Navn", width: 200},
        {field: "resultType", headerName: "Resultat type", width: 200, renderCell: (params: GridRenderCellParams) => translateResultType(params.value)},
        {field: "Rediger", headerName: "Rediger", width: 200, renderCell: (params: GridRenderCellParams) => (
                <Button variant={"contained"} onClick={() => openModal(params.row)}>Rediger</Button>
            )},
    ];
    return (
        <>
            <Paper elevation={3}
                   sx={{
                       padding: 2,
                       margin: 2,
                       borderRadius: 2,
                   }}>
                <h1>Discipliner</h1>
                <div>
                    <DataGrid columns={columns} rows={disciplines}/>
                </div>
                <Button variant={"contained"} onClick={() => openModal()}>Opret</Button>
                <CustomModal isOpen={isOpen} onRequestClose={closeModal}>
                    <DisciplineForm closeModal={closeModal} createDiscipline={createDiscipline} updateDiscipline={updateDiscipline} editDiscipline={editDiscipline} snackBarError={showSnackBarError} snackBarSuccess={showSnackBarSuccess} />
                </CustomModal>
            </Paper>

        </>
    );
}

export default Disciplines;