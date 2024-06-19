import {useSnackbar} from "notistack";
function UseSnackBar() {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackBarSuccess = (message: string) => {
        enqueueSnackbar(message, { variant: "success", preventDuplicate: true, persist: true })
    }

    const showSnackBarError = (message: string) => {
        enqueueSnackbar(message, { variant: "error", preventDuplicate: true, persist: true })
    }

    return {showSnackBarSuccess, showSnackBarError}
}

export default UseSnackBar;