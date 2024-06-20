import {Route, Routes} from "react-router-dom";
import Home from "./container/Home.tsx";
import FallBack from "./container/FallBack.tsx";
import Participants from "./container/Participants.tsx";
import Navbar from "./components/Navbar.tsx";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <>
            <SnackbarProvider maxSnack={3} iconVariant={{
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️',

            }} >
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/entity" element={<Participants/>}/>
                    <Route path="/*" element={<FallBack/>}/>
                </Routes>
            </SnackbarProvider>
        </>
    )
}

export default App
