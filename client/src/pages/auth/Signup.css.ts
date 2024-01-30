import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../../styles/themes.css"


export const Signup = style({
    maxWidth: "80vw",
    margin: "2rem auto 0 auto",
})

export const loginSpan = style({
    fontWeight: "700",
    marginLeft: "10vw",
    paddingTop: "2rem",
    fontStyle: "italic",

})

export const SignupLink = style({
     textDecoration: "none",
     fontWeight: "600",
     textShadow: "#000000 .5px .5px 1px",
     margin: "2rem 0 0 2rem",
     fontStyle: "italic",
     color: vars.colors.brand,
     ":hover":{
        textDecoration: "underline",
        color: vars.colors.brandDark,
    },
})    

