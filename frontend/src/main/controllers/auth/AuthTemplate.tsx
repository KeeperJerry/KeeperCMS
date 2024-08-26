import { useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import AuthTemplateModels from "../../models/AuthTemplateModels";
import bgImage from '../../../assets/bgAuth.png';
import FooterComponent from "../../components/FooterComponent";

export default function AuthTemplate(prop: AuthTemplateModels) {
    const title = prop.title;

    useEffect(() => {
        document.title = `${title}`;
    }, [title]);
    
    return(
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item={true}
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${ bgImage })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Grid 
                item={true}
                xs={12} 
                sm={8} 
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                    my: 8,
                    mx: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    { prop.element }
                </Box>

                <FooterComponent/>
            </Grid>
        </Grid>
    );
}