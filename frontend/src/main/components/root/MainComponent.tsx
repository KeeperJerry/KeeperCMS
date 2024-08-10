import { useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function MainComponent() {
    useEffect(() => {
        document.title = 'Главная';
    }, []);

    return(
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">Я не придумал что тут накидать</Typography>
                </Grid>
            </Grid>
        </>
    );
}