import UseResults from "../hooks/useResults.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import {DataGrid, type GridRenderCellParams} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {Paper} from "@mui/material";



function Results() {
    const {results, createResult, updateResult, deleteResult, isLoading} = UseResults();
    if (isLoading) {
        return <LoadingSpinner />;
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {field: 'resultType', headerName: 'Type', width: 200},
        {field: 'resultValue', headerName: 'Resultat', width: 200},
        {field: 'participant', headerName: 'Deltager', width: 200, renderCell: (params) => (
                <span>{params.value?.name}</span>
            )},
        {field: 'discipline', headerName: 'Disciplin', width: 600, renderCell: (params) => {
                if (Array.isArray(params.value)) {
                    return params.value.map((discipline: any) => discipline.name).join(", ");
                } else {
                    return '';
                }
            }},
        { field: 'rediger', headerName: 'Rediger', width: 150, renderCell: (params: GridRenderCellParams) => (
                <Button variant={"contained"} onClick={() => openModal(params.row)}>Rediger</Button>
            ),
        },
        { field: 'slet', headerName: 'Slet', width: 150, renderCell: (params: GridRenderCellParams) => (
                <Button variant={"contained"} onClick={() => handleDelete(params.row.id)}>Slet</Button>)
        }
    ]
    return (
        <Paper>
            <div>
                <DataGrid columns={columns} rows={results} pageSize={5}/>
            </div>
        </Paper>
    );
}

export default Results;