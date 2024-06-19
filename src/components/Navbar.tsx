import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PortraitIcon from '@mui/icons-material/Portrait';
import { useNavigate } from "react-router-dom";
import {blue} from "@mui/material/colors";

/**
 * Navbar component.
 */
export default function Navbar() {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: "none",
                borderBottom: `1px solid`,
                marginBottom: "1rem",
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": {
                            color: blue[500],
                        }
                    }}
                    onClick={() => navigate("/")}
                >
                    <Box
                        component="span"
                    >
                    Martin Emil Nielsen Eksamen
                    </Box>

                    <Box
                        component="span"
                    >

                    </Box>

                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Hjem">
                        <IconButton
                            component={Link}
                            to="/"
                        >
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="entity">
                        <IconButton
                            component={Link}
                            to="/entity"
                        >
                            <PortraitIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}