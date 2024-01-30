import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../styles/themes.css"


export const NotFound = style({
    backgroundImage: "url('/404.jpg')",
    backgroundPosition: "cover",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    height: "80vh",
    
  })

export const FourTitle = style({
    fontSize: "3rem",
    textAlign: "center",
})
