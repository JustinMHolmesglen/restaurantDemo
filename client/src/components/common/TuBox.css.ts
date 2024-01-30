import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const boxSetting = style({
  color: vars.colors.complementary,
  textAlign: "center",
  margin: vars.space['1x'],
  padding: vars.space['4x'],
  
})

export const boxTitle = style({
  position: "absolute",
  fontWeight: vars.fontWeights.bolder,
  fontSize: "4em",
  opacity: "1",
  zIndex: "100",
  textShadow: "2px 2px 5px #ffffff, -2px -2px 5px #ffffff",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  '@media': {
      'screen and (max-width: 768px)': {
        fontSize: "3rem"
      },
    
    }
})

export const boxPara = style({
  position: "absolute",
  fontWeight: vars.fontWeights.bolder,
  fontSize: vars.fontSizes['4x'],
  margin: `${vars.space['4x']} 0`,
  textShadow: "2px 2px 5px #ffffff, -2px -2px 5px #ffffff",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  '@media': {
      'screen and (max-width: 768px)': {
        fontSize: "1.6rem",
        maxWidth: "100%",
        width: "100%",
      },
    
    }
})