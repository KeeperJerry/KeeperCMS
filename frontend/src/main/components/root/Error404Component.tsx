import { useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Error404Component() {
    useEffect(() => {
        document.title = 'Не найдено';
    }, []);

    return(
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 0,
            }}
        >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h1" align="center">404</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">Ничего не найдено!</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="body1" align="center" color="text.secondary">К сожалению, по данному адресу ничего не найдено! Пожалуйста, вернитесь на главную страницу!</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <center>
                            <Button component={RouterLink} to="/" variant="contained" sx={{ width: '50%', align: 'center' }}>{ 'Вернуться' }</Button>
                        </center>
                    </Grid>
                </Grid>
        </Box>
    );
}