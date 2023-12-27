import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { createContext, useEffect } from "react";

export const DrawerContext = createContext(null);

const DrawerContextProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  // useEffect to close the Drawer when the screen size becomes greater than 768px
  useEffect(() => {
    if (!isSmallerThan768 && isOpen) {
      onClose();
    }
  }, [isSmallerThan768, isOpen, onClose]);
  return (
    <DrawerContext.Provider
      value={{ isOpen, onOpen, onClose, isSmallerThan768 }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
