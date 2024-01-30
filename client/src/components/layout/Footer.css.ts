import * as styles from './Footer';
import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../../styles/themes.css"

export const footer = style({
    backgroundColor: "#000000",
    height: "auto",    
    margin: "0 auto",
    width: "100%",
})

export const copy = style({
    color: "#ffffff",

})