import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    Drawer: {
      sizes: {
        sm: {
          dialog: {
            width: "380px",
          },
        },
      },
    },
  },
});

export default theme;
