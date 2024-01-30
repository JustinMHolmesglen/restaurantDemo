import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from "../../styles/themes.css";


export const logo = style({
    width: "30%",
    marginLeft: vars.space['1x'],
    borderRadius: "5%",
    opacity: "1"
    

})

export const navbar = style({
    fontFamily: vars.fonts.brand,
    backgroundColor: vars.colors.primary,
    padding: vars.space['3x'],
    transition: "background 0.2s ease-in, color 0.2s ease-in",
    boxShadow: "rgba(0,0,0,0.05) 0px 1px 2px 0px"
})

export const brandLink = style({
    display: 'flex',
    flexDirection: 'row',
    gap: vars.space['2x'],
    alignItems: "center",
    textTransform: "uppercase"
})

export const logoTextBox = style({
    display: "flex",
    flexDirection: "column",
})

export const brand = style({
    fontWeight: "900",
    fontSize: "200%"
})

export const navLink = style({
    color: vars.colors.complementary,
    fontSize: vars.fontSizes["3x"],
    textTransform: "uppercase",
    transition: "0.2s ease-in",
    ":hover": {
        color: vars.colors.brandDark
    }
})