// EXERCISE 5ext: create a custom theme and apply it to the app
// see https://mui.com/material-ui/customization/theming/

import { createTheme } from "@mui/material/styles";

// A theme will override any defaults, however it will not override any explicit props. 
// For example, if you set the default button variant to 'contained' in the theme, 
// but then use <Button variant='outlined'> in your component, the button will be outlined, not contained.
//  This allows you to set global defaults while still having the flexibility to override them on a case-by-case basis.

export const tealTheme = createTheme({
    palette: {
        primary: { main: '#214D4C', contrastText: '#efefef' },
        secondary: { main: '#3CA899', contrastText: '#ffffff' }
    },
    typography: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        h1: { fontSize: 30 }
    },
    shape: { borderRadius: 0 },
    components: {
        MuiCssBaseline: {
            styleOverrides: `a { color: #3CA899; }`,
        },
        MuiButton: { defaultProps: { variant: 'contained' } },
        MuiTextField: { defaultProps: { variant: 'filled' } }
    }
});