import { Link as RouterLink } from 'react-router-dom';

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ResetPassController() {
    return(
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <VpnKeyIcon/> */}
            </Avatar>

            <Typography component="h1" variant="h5">
                Восстановление
            </Typography>

            <Box 
                component="form" 
                noValidate 
                //onSubmit={ handleSubmit }
                sx={{ mt: 1 }}
                style={{ width: '100%'}}
            >
                <TextField
                    id="email"
                    name="email"
                    fullWidth
                    margin="normal"
                    required
                    label="Адрес электронной почты"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    //disabled={ isLoading }
                >
                    { `Восстановить` }
                </Button>

                <Grid container>
                    <Grid item={true} xs>
                        <RouterLink to="/auth/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            { `Вспомнили пароль?` }
                        </RouterLink>
                    </Grid>
                    <Grid item={true}>
                        <RouterLink to="/auth/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                            { `Нет аккаунта?` }
                        </RouterLink>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}