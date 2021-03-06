import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

fairyGateTheme.overrideThemeStyles = ({rhythm}, options) => ({
  'a': {
    textShadow: 'none',
    color: 'black',
    backgroundImage: 'none',
  },
  'a:hover': {
    textDecoration: 'underline'
  },
  'p': {
    color: 'rgb(15, 15, 15)'
  }
})

const typography = new Typography(fairyGateTheme)
export const { scale, rhythm, options } = typography
export default typography
