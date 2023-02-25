import { Alert, AlertDescription, AlertIcon, Box, CloseButton } from "@chakra-ui/react";
import { useState } from "react";

export default function Alerts(props) {

  const hideAlert = (e) => {
    e.preventDefault();
    props.setDataStatus(0);
  }

  return props.isOpen ? (
    <Alert status={props.status}>
      <AlertIcon />
      <Box>
        <AlertDescription>
          {props.children}
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='flex'
        right={-1}
        top={-1}
        onClick={hideAlert}
      />
    </Alert>
  ) : (<></>)
}