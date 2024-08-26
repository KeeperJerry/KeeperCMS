import { Link as RouterLink } from 'react-router-dom';

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function RegisterController() {
    return(
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <VpnKeyIcon/> */}
            </Avatar>

            <Typography component="h1" variant="h5">
                Регистрация
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

                <TextField
                    id="password"
                    type="password"
                    name="password"
                    fullWidth
                    margin="normal"
                    required
                    label="Пароль"
                />

                <TextField
                    id="password2"
                    type="password"
                    name="password2"
                    fullWidth
                    margin="normal"
                    required
                    label="Еще раз пароль"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    //disabled={ isLoading }
                >
                    { `Зарегистрировать` }
                </Button>
                
                <Grid container>
                    <Grid item={true} xs>
                        <RouterLink to="/auth/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            { `Есть аккаунт?` }
                        </RouterLink>
                    </Grid>
                    <Grid item={true}>
                        <RouterLink to="/auth/reset-password" style={{ textDecoration: 'none', color: 'inherit' }}>
                            { `Забыли пароль?` }
                        </RouterLink>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}