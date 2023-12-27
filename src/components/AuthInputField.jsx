import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const AuthInputField = ({ props }) => {
  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <Input {...props.input} autoComplete="off" focusBorderColor="green.200" />
    </FormControl>
  );
};

export default AuthInputField;
