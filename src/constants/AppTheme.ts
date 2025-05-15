import { colorsTuple, createTheme, rem, virtualColor } from '@mantine/core';

const theme = createTheme({
    breakpoints: {
        xxs: "10em",
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
    colors: {

        red: [
            "#fcefed",
            "#f3dcd8",
            "#ebb5ac",
            "#912018",
            "#df6854",
            "#dc533b",
            "#db472d",
            "#c33921",
            "#ae311c",
            "#55160C"
        ],

        green: colorsTuple("#067647"),
        grayLogin: colorsTuple("#94979C"),
        darkGray: colorsTuple("#292929"),
        primaryColor: colorsTuple("#ba2d0b"),
        secondary: colorsTuple("#ba2d0b"),
        primary: virtualColor({
            name: "primary",
            dark: "primaryColor",
            light: "secondary"
        }),
        dashboardBg: colorsTuple("#F9FAFD"),
        chartPassColor: colorsTuple("#05BF44"),
        chartFailColor: colorsTuple("#FF1D28"),
        dataTableHeader: colorsTuple("#FAF2F0"),
        authPagesFooter: colorsTuple("#535862"),

        chartDarkColorDark: colorsTuple("#373A41"),
        chartDarkColorLight: colorsTuple("#99C3D2"),

        chartDarkColor: virtualColor({
            name: "chartDarkColor",
            dark: "chartDarkColorDark",
            light: "chartDarkColorLight"
        }),

        chartPrimaryColorDark: colorsTuple("#2C1C5F"),
        chartPrimaryColorLight: colorsTuple("#227C9D"),

        chartPrimaryColor: virtualColor({
            name: "chartPrimaryColor",
            dark: "chartPrimaryColorDark",
            light: "chartPrimaryColorLight"
        }),

        chartSecondaryColorDark: colorsTuple("#B692F6"),
        chartSecondaryColorLight: colorsTuple("#99C3D2"),

        chartSecondaryColor: virtualColor({
            name: "chartSecondaryColor",
            dark: "chartSecondaryColorDark",
            light: "chartSecondaryColorLight"
        }),

        mainContentBgColorDark: colorsTuple("#13161B"),
        mainContentBgColorLight: colorsTuple("#fff"),

        textSecondary: colorsTuple("#ECECED"),
        textPrimary: colorsTuple("#ffffff"),

        activeLinkBgColorDark: colorsTuple("#22262F"),
        activeLinkBgColorLight: colorsTuple("#0E3442"),

        dividerBorderColorDark: colorsTuple("#22262F"),
        dividerBorderColorLight: colorsTuple("#ECECED"),

        sidebarDarkBg: colorsTuple("#13161B"),
        sidebarLightBg: colorsTuple("#18586F"),

        primaryButtonLightColor: colorsTuple("#18586F"),
        primaryButtonDarkColor: colorsTuple("#7F56D9"),

        primaryButtonColor: virtualColor({
            name: "primaryButtonColor",
            dark: "primary",
            light: "primaryButtonLightColor"
        }),

        greenBadgeFill: colorsTuple("#053321"),
        greenBadgeStroke: colorsTuple("#085D3A"),
        greenBadgeText: colorsTuple("#75E0A7"),

        orangeBadgeFill: colorsTuple("#4E1D09"),
        orangeBadgeStroke: colorsTuple("#93370D"),
        orangeBadgeText: colorsTuple("#FEC84B"),

        blueBadgeFill: colorsTuple("#062C41"),
        blueBadgeStroke: colorsTuple("#065986"),
        blueBadgeText: colorsTuple("#7CD4FD"),

        redBadgeFill: colorsTuple("#55160C"),
        redBadgeStroke: colorsTuple("#912018"),
        redBadgeText: colorsTuple("#FDA29B"),

        lightRedBadgeFill: colorsTuple("#511C10"),
        lightRedBadgeStroke: colorsTuple("#932F19"),
        lightRedBadgeText: colorsTuple("#F7B27A"),

        indigoBadgeFill: colorsTuple("#1F235B"),
        indigoBadgeStroke: colorsTuple("#2D31A6"),
        indigoBadgeText: colorsTuple("#A4BCFD"),

        sideNavBarLinksColor: virtualColor({
            name: "sideNavBarLinksColor",
            dark: "textSecondary",
            light: "textPrimary"
        }),

        mainContentColor: virtualColor({
            name: "mainContentColor",
            dark: "mainContentBgColorDark",
            light: "mainContentBgColorLight"
        }),

        sideNavBar: virtualColor({
            name: "sideNavBar",
            dark: "sidebarDarkBg",
            light: "sidebarLightBg"
        }),

        activeLinkBgColor: virtualColor({
            name: "activeLinkBgColor",
            dark: "activeLinkBgColorDark",
            light: "activeLinkBgColorLight"
        }),

        userButtonBgColor: virtualColor({
            name: "userButtonBgColor",
            dark: "transparent",
            light: "activeLinkBgColorLight"
        }),

        linkColorLight: colorsTuple("#fff"),
        linkColorDark: colorsTuple("#CECFD2"),

        NavbarDividerColor: virtualColor({
            name: "NavbarDividerColor",
            dark: "dividerBorderColorDark",
            light: "dividerBorderColorLight"
        }),

        lightText: colorsTuple("#000"),
        darkText: colorsTuple("#F7F7F7"),

        whiteBlackTextColor: virtualColor({
            name: "whiteBlackTextColor",
            dark: "darkText",
            light: "lightText"
        }),

        lightLabelText: colorsTuple("#000"),
        darkLabelText: colorsTuple("#CECFD2"),

        whiteBlackLabelTextColor: virtualColor({
            name: "whiteBlackLabelTextColor",
            dark: "darkLabelText",
            light: "lightLabelText"
        })

    },
    primaryColor: "primary",
    fontFamily: "inter",
    primaryShade: 9,
    defaultRadius: 8,
    fontSmoothing: true,
    white: "#F7F7F7",

    shadows: {
        md: '2px 2px 10px rgba(0, 0, 0, .10)',
        xl: '5px 5px 3px rgba(0, 0, 0, .10)',
    },

    headings: {
        fontFamily: "inter",
        fontWeight: "200",
        textWrap: 'wrap',
        sizes: {
            h1: { fontSize: rem(32) },
            h2: { fontSize: rem(28) },
            h3: { fontSize: rem(24) },
            h4: { fontSize: rem(20) },
            h5: { fontSize: rem(16) },
            h6: { fontSize: rem(14) }
        }
    },
    components: {
        'Text': {
            styles: {
                root: {
                    color: "var(--mantine-color-whiteBlackTextColor-9)",
                    fontFamily: "inter",
                }
            }
        },
        'Title': {
            styles: {
                root: {
                    color: "var(--mantine-color-whiteBlackTextColor-9)",
                    fontFamily: "inter",
                }
            }
        },
        'Button': {
            styles: {
                root: {
                    fontFamily: "inter",
                    fontSize: 14,
                    borderRadius: "md"
                }
            }
        },
        'Drawer': {
            styles: {
                title: {
                    fontSize: 20,
                    color: "var(--mantine-color-whiteBlackTextColor-9)"
                },
                content: {
                    background: "var(--mantine-color-mainContentColor-9)"
                },
                header: {
                    background: "var(--mantine-color-mainContentColor-9)"
                }
            }
        },
        'Divider': {
            styles: {
                root: {
                    borderColor: "var(--mantine-color-dividerBorderColorDark-9)"
                }
            }
        },
        'InputWrapper': {
            styles: {
                label: {
                    fontSize: 14,
                    color: "var(--mantine-color-whiteBlackLabelTextColor-9)",
                    marginBottom: 8,
                    fontFamily: "inter",
                    fontWeight: 500,
                },
                root: {
                    marginBottom: "0.3rem",
                },
            }
        },
        'Input': {
            styles: {
                input: {
                    height: "2.5rem",
                    background: "transparent",
                    borderColor: "var(--mantine-color-dividerBorderColorDark-9)",
                },
            }
        },
        'Textarea': {
            styles: {
                input: {
                    height: "var(--input-size)"
                }
            }
        },

        'Grid': {
            styles: {
                col: {
                    paddingTop: 0,
                    paddingBottom: 0
                },
                inner: {
                    height: "100%",
                    marginTop: 0,
                    marginBottom: 0
                }
            }
        }
    }
});


export default theme;