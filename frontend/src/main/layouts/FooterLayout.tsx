import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

export default function FooterLayout() {
    return(
        <Typography
            variant="body2"
            color="text.secondary" 
            align="center"
        >
            { `Все права защищены. © ` }
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{ `Example.tld` }</RouterLink>
            {` ${ new Date().getFullYear() }.`}
        </Typography>
    );
}