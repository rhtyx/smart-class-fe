import React from "react";

// Chakra imports
import { Text, Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  // let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Flex align='center' direction='row'>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='4xl'>
          SMART
        </Text>
        <Text
          color={textColorPrimary}
          fontWeight='light'
          fontSize='3xl'
          p={"0.5"}>
          Class
        </Text>
      </Flex>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
