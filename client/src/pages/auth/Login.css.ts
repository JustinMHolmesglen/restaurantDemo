import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../../styles/themes.css"


export const Login = style({
    maxWidth: "80vw",
    margin: "2rem auto 0 auto",
})

export const loginSpan = style({
    fontWeight: "700",
    marginLeft: "10vw",
    paddingTop: "2rem",
    fontStyle: "italic",

})

export const loginLink = style({
     textDecoration: "none",
     fontWeight: "600",
     fontStyle: "italic",
     textShadow: "#000000 .5px .5px 1px",
     margin: "2rem 0 0 2rem",
     color: vars.colors.brand,
     ":hover":{
        textDecoration: "underline",
        color: vars.colors.brandDark,
    },
})    
