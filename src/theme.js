import { createMuiTheme } from "@material-ui/core/styles";
const ACCENT_COLOR = "rgb(105, 186, 190)";
const TEXT_COLOR = "rgba(0, 0, 0, 0.768)";

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#80deea",
      light: "#e0f7fa"
    },
    secondary: {
      main: ACCENT_COLOR,
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
    body2: {
      fontFamily: "Roboto",
      marginBottom: "10px",
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
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiChip: {
      root: {
        margin: "0 10px 20px 0",
      },
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
        // width: "370px",
        "& .MuiInput-underline:before": {
          borderBottomColor: ACCENT_COLOR,
        },
        "&:hover": {
          borderBottomColor: ACCENT_COLOR,
        },
      },
    },
    MuiNativeSelect: {
      root: {
        color: "#fff",
      },
      icon: {
        color: "#fff",
      },
    },
    MuiButton: {
      root: {
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: ACCENT_COLOR,
      },
    },
  },
});
