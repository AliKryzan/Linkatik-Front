import {
  Badge,
  Button,
  createTheme,
  Input,
  Menu,
  PasswordInput,
  rem,
  SegmentedControl,
  Table,
  TableTd,
  TableTh,
  TextInput,
} from "@mantine/core"
import i18n from "../i18n"

const primary = [
  "#fbedff",
  "#ecdaf6",
  "#d6b3e7",
  "#bf89d9",
  "#aa67cd",
  "#9e50c6",
  "#9945c3",
  "#8536ad",
  "#772f9b",
  "#682589",
]
const gray = [
  "#f5f5f5",
  "#f5f2f5",
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#717171",
  "#676465",
  "#5e5457",
]

export const theme = createTheme({
  black: "#1A1D1F",
  colors: {
    primary,
    gray,
  },
  fontFamily:i18n.dir==="ar"?"Tajawal ,Poppins": "Poppins ,Tajawal",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  fontWeight: 400,
  primaryColor: "primary",
  radius: {
    sm: "0.35rem",
    md: "0.55rem",
    lg: "1rem",
    xl: "2rem",
  },

  components: {
    Table: Table.extend({
      defaultProps: {
        color: "primary",
        highlightOnHover: true,
        verticalSpacing: "sm",
      },
    }),
    TableTh: TableTh.extend({
      defaultProps: {
        fw: 400,
      },
    }),
    TableTd: TableTd.extend({
      defaultProps: {
        c: "gray",
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        size: "md",
        radius: "sm",
        fw: 400,
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        classNames: {
          dropdown: "menu-dropdown",
          label: "menu-label",
          item: "menu-item",
        },
        shadow: "lg",
      },
    }),
    Input: Input.extend({
      defaultProps: {
        styles: {
          label: {
            fontWeight: 400,
          },
        },
        size: "md",
        classNames: {
          input: "input",
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          label: {
            fontWeight: 400,
          },
        },
        size: "md",
        classNames: {
          input: "input",
        },
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        classNames: {
          input: "input filled",
        },
      },
    }),
    Button: Button.extend({
      defaultProps: {
        fw: 400,
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        radius: "sm",
        classNames: {
          root: "segment-control-root",
        },
      },
    }),
  },
  defaultRadius: "md",
  fontSizes: {
    xs: rem(11),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    "2xl": rem(28),
  },
  headings: {
    fontWeight: 500,
    sizes: {
      h1: {
        fontSize: rem(44),
        lineHeight: 1.4,
      },
      h2: {
        fontSize: rem(32),
        lineHeight: 1.4,
      },
    },
  },
})
