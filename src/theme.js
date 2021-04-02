import { createMuiTheme } from "@material-ui/core/styles";
const ACCENT_COLOR = "#5c75f4";
const LIGHT_COLOR = "#bfd7ff";
const DARK_COLOR = "#084ac0";
const TEXT_COLOR = "rgba(0, 0, 0, 0.768)";
const RED_COLOR = '#ff5f56';
const GREEN_COLOR = '#2aff5c'

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: ACCENT_COLOR,
      light: LIGHT_COLOR,
      dark: DARK_COLOR
    },
    secondary: {
      main: RED_COLOR,
      green: GREEN_COLOR,
      contrastText: "#fff"
    }
  },
  breakpoints: {
    values: {
      xs: 660,
      sm: 780,
      md: 860,
      lg: 960,
      xl: 1090,
    },
  },
  typography: {
    fontFamily: "Roboto",
    body1: {
      fontFamily: "Roboto",
      fontSize: "20px",
      marginBottom: "10px",
    },
    body2: {
      fontFamily: "Roboto",
      marginBottom: "10px",
      fontSize: "16px",
    },
    
    h1: {
      fontWeight: "bold",
      fontSize: "40px",
      marginBottom: "20px",
      color: TEXT_COLOR,
    },
    h2: {
      fontWeight: "bold",
      fontSize: "36px",
      marginBottom: "20px",
      color: TEXT_COLOR,
    },
    h3: {
      fontWeight: "bold",
      fontSize: "34px",
      marginBottom: "20px",
      color: TEXT_COLOR,
    },
    h4: {
      fontWeight: "bold",
      fontSize: "26px",
      marginBottom: "20px",
      color: TEXT_COLOR,
    },
    h5: {
      fontWeight: "bold",
      fontSize: "22px",
      marginBottom: "20px",
      color: TEXT_COLOR,
    },
    button: {
      color: TEXT_COLOR,
      fontFamily: "Roboto",
      fontSize: "20px",
      fontWeight: "bold"
    }
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiPaper: {
      root: {
        borderRadius: "4px"
      }
    },
    MuiCard: {
      root: {
        boxShadow: "none",
      },
    },
    MuiTextField: {
      root: {
        borderColor: ACCENT_COLOR,
        marginBottom: "20px",
        "& .MuiInput-underline:before": {
          borderBottomColor: ACCENT_COLOR,
        },
        "&:hover": {
          borderBottomColor: ACCENT_COLOR,
        },
      },
    },
    MuiButton: {
      root: {
        backgroundColor: ACCENT_COLOR,
        borderRadius: "8px",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiInputLabel: {
      root: {
      },
    },
    MuiMenu: {
      paper: {
        background: "#5c75f4",
        borderRadius: "4px"
      }
    },
    MuiSvgIcon: {
      root: {
        color: '#fff'
      }
    },
    MuiSelect: {
      icon: {
        color: '#fff'
      },
      
    },
    MuiInput: {
      root: {
        "&:focus": {
          outline: "none",
        },
        "&:hover": {
          outline: "none",
        },
      }
    },
    MuiButtonBase: {
      root: {
        color: '#fff'
      }
    }
  },
});
