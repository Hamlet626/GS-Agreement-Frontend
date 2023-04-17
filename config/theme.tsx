import { createTheme } from "@mui/material/styles";


export const theme = {
  colors: {
    $primaryMain: "#D9986F",
    // $primaryDark: "#F3DDCE",
    $primaryLight: "#f9f2f2",
    $secondaryMain: "#ac8a76",//"#DED47A",
    // $success: "#DED47A",
    // $info: "#BFECF5",
    // $error: red.A400,
    // $warning: "#664d03",
    $white: "#ffffff",
    $gray: "#C1C1C1",
    $black: "#000000"
  },
  manualGeneratedColors:{
    Light: {
        primary: "#964908", primaryContainer: "#ffdbc8", onPrimaryContainer: "#311300", inversePrimary: "#ffb689", onPrimary: "#ffffff", //primaryVariant: "#964908",
        secondary: "#755846", onSecondary: "#ffffff", secondaryContainer: "#ffdbc8", onSecondaryContainer: "#2b1709", //secondaryVariant: "#755846",
        tertiary: "#616133", onTertiary: "#ffffff", tertiaryContainer: "#e7e5ac", onTertiaryContainer: "#1d1d00",
        error: "#ba1a1a", errorContainer: "#ffdad6", onError: "#FFFFFF",onErrorContainer: "#410002",
        background: "#fffbff", onBackground: "#201a17",
        surface: "#fffbff", onSurface: "#201a17", surfaceVariant: "#f4ded3", onSurfaceVariant: "#52443c",
      inverseSurface: "#362f2b", onInverseSurface: "#fbeee9", surfaceTint: "#964908",
      surfaceContainer:{lest:"#fffbff", ler:"#f9f1f2", md:"#f6edeb", her:"#f3e7e3", elv4:"#f2e5e0", elv5:"#f0e1dc", hest:"#f4ded3"},
        outline: "#84746b", outlineVariant: "#d7c2b8",
        shadow: "#000000", scrim: "#000000",
    },
    Dark: {
        primary: "#ffb689", primaryContainer: "#733500", onPrimaryContainer: "#ffdbc8", inversePrimary: "#964908", onPrimary: "#512300", //primaryVariant: "#ffb689",
        secondary: "#e5bfa9", onSecondary: "#432b1c", secondaryContainer: "#5c4130", onSecondaryContainer: "#ffdbc8", //secondaryVariant: "#e5bfa9",
        tertiary: "#cbc992", onTertiary: "#323209", tertiaryContainer: "#49491e", onTertiaryContainer: "#e7e5ac",
        error: "#ffb4ab", errorContainer: "#93000a", onError: "#690005", onErrorContainer: "#ffdad6",
        background: "#201a17", onBackground: "#ece0da",
        surface: "#201a17", onSurface: "#ece0da", surfaceVariant: "#52443c", onSurfaceVariant: "#d7c2b8",
      inverseSurface: "#ece0da", onInverseSurface: "#201a17", surfaceTint: "#ffb689",
      surfaceContainer:{lest:"#201a17", ler:"#261c16", md:"#291d15", her:"#2c1f15", elv4:"#2e1f15", elv5:"#302014", hest:"#52443c"},
        outline: "#9f8d83", outlineVariant: "#52443c",
        shadow: "#000000", scrim: "#000000",
    }
  },
  shadows: {
    // This shadow style follow the Material UI evelation={5}, it's applied in some Material components
    $mainShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  },
  border: {
    $borderRadius: 10
  }
};

export const materialTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.$primaryMain,
      // dark: theme.colors.$primaryDark,
      light: theme.colors.$primaryLight,
    },
    secondary: {
      main: theme.colors.$secondaryMain,
    },
    // success: {
    //   main: theme.colors.$success,
    // },
    // info: {
    //   main: theme.colors.$info,
    // },
    // error: {
    //   main: theme.colors.$error,
    // },
  },
  shape: {
    borderRadius: theme.border.$borderRadius,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "h2" && {
            fontWeight: 700,
            fontSize: "25px",
            lineHeight: "1.167",
            textTransform: "capitalize",
            marginBottom: "0.35em",
            "&::after": {
              content: "''",
              width: "55px",
              display: "block",
              borderBottom: `6px solid ${theme.colors.$gray}`,
              margin: "8px auto 0",
              ...(ownerState.align === "left" && {
                margin: "8px 0",
              }),
            },
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            size: "large",
          }),
        }),
      },
    },
    MuiTabs:{
      styleOverrides: {
        root: ({ theme }) => ({
          ...{
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
    },
    MuiInputBase:{
      styleOverrides: {
        root: () => ({
          ...{
            backgroundColor: theme.colors.$white,
          },
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme: materialTheme, ownerState }) => 
          
           ({
          ...{
            backgroundColor: ownerState.selected ?  materialTheme.palette.primary.main : theme.colors.$white,
            border: 'none',
            borderRadius: materialTheme.shape.borderRadius,
            fontSize: "0.75rem",
            fontWeight: 600,
            margin: "0 1px",
            textTransform: "none",
            color: `${theme.colors.$black} !important`,
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: () => ({
          ...{
            boxShadow: "none",
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...{
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState}) => {
          let elevation = ownerState.elevation??1;
          return { backgroundColor:
                elevation==0 ? theme.manualGeneratedColors.Light.surfaceContainer.lest:
                    elevation<2 ? theme.manualGeneratedColors.Light.surfaceContainer.ler:
                        elevation<6 ? theme.manualGeneratedColors.Light.surfaceContainer.md:
                            elevation<12 ? theme.manualGeneratedColors.Light.surfaceContainer.her:
                                elevation<16 ? theme.manualGeneratedColors.Light.surfaceContainer.elv4:
                                    elevation<24 ? theme.manualGeneratedColors.Light.surfaceContainer.elv5:
                                        theme.manualGeneratedColors.Light.surfaceContainer.hest
          };
        }
      },
    },
  },
});












/////// =========================  Theme2  ========================= ///////
// by seed fcae65
export const theme2 = {
  colors: {
    $primaryMain: "#fcae65",
    // $primaryDark: "#F3DDCE",
    // $primaryLight: "#FFF7F2",
    $secondaryMain: "#a98b72",
    $tertiaryMain: "#8c9566",
    $neutralMain: "#988f89",
  },
  manualGeneratedColors:{
    Light: {
        primary: "#8d4f00", primaryContainer: "#ffdcc0", onPrimaryContainer: "#2d1600", inversePrimary: "#ffb877", onPrimary: "#ffffff", //primaryVariant: "#8d4f00",
        secondary: "#735943", onSecondary: "#ffffff", secondaryContainer: "#ffdcc0", onSecondaryContainer: "#291706", //secondaryVariant: "#735943",
        tertiary: "#5a6238", onTertiary: "#ffffff", tertiaryContainer: "#dee8b2", onTertiaryContainer: "#181e00",
        error: "#ba1a1a", errorContainer: "#ffdad6", onError: "#ffffff", onErrorContainer: "#410002",
        background: "#fffbff", onBackground: "#201b17",
      surface: "#fffbff", onSurface: "#201b17", surfaceVariant: "#f2dfd1", onSurfaceVariant: "#51443a",
        inverseSurface: "#faefe8", onInverseSurface: "#352f2b", surfaceTint: "#8d4f00",
      surfaceContainer:{lest:"#fffbff", ler:"#f9f2f2", md:"#f6edeb", her:"#f2e8e3", elv4:"#f1e6e0", elv5:"#eee2db", hest:"#f2dfd1"},
      outline: "#837469", outlineVariant: "#d5c3b6",
        shadow: "#000000", scrim: "#000000",
    },
    Dark: {
        primary: "#ffb877", primaryContainer: "#6b3b00", onPrimaryContainer: "#ffdcc0", inversePrimary: "#8d4f00", onPrimary: "#4b2700", //primaryVariant: "#ffb877",
      secondary: "#e2c0a5", onSecondary: "#412c19", secondaryContainer: "#5a422d", onSecondaryContainer: "#ffdcc0", //secondaryVariant: "#e2c0a5",
      tertiary: "#c2cb98", onTertiary: "#2c340e", tertiaryContainer: "#434a23", onTertiaryContainer: "#dee8b2",
      error: "#ffb4ab", errorContainer: "#93000a", onError: "#690005", onErrorContainer: "#ffdad6",
      background: "#201b17", onBackground: "#ece0d9",
      surface: "#201b17", onSurface: "#ece0d9", surfaceVariant: "#51443a", onSurfaceVariant: "#d5c3b6",
      inverseSurface: "#201b17", onInverseSurface: "#ece0d9", surfaceTint: "#ffb877",
      surfaceContainer:{lest:"#201b17", ler:"#2b231b", md:"#31271e", her:"#382c21", elv4:"#3b2e22", elv5:"#3f3124", hest:"#51443a"},
      outline: "#9e8e82", outlineVariant: "#51443a",
      shadow: "#000000", scrim: "#000000",
    }
  }
};