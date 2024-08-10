import { Link as RouterLink } from 'react-router-dom';

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function HeaderLayot() {
    return(
        <>
            {/* Костыль */}
            <Toolbar />
            <AppBar position='fixed' sx={{ bgcolor: 'primary' }}>
                <Container fixed>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                { `Example.tld` }
                            </RouterLink>
                        </Typography>
                        <Button color="inherit" component={RouterLink} to="/auth/register" variant="text">{ 'Регистрация' }</Button>
                        <Button color="inherit" component={RouterLink} to="/auth/login" variant="contained">{ 'Вход' }</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}