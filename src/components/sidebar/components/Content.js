// chakra imports
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import axios from "axios";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const handleLogout = () => {
    try {
      axios({
        method: "post",
        url: "//localhost:309/auth/logout",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      }).then((res)=>{
        localStorage.removeItem("token");
        window.location.reload();
      })
    } catch (error) {
      console.log(error);
    }
  }

  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>
      <Button m="auto" mb="5" width="80%" colorScheme="red" onClick={handleLogout}>
        Log Out
      </Button>
    </Flex>
  );
}

export default SidebarContent;
