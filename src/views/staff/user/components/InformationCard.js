// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "./Information";

// Assets
export default function InformationCard(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        User Information
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='ID'
          value='Stanford University'
        />
        <Information
          boxShadow={cardShadow}
          title='RFID'
          value='English, Spanish, Italian'
        />
        <Information
          boxShadow={cardShadow}
          title='Name'
          value='Product Design'
        />
        <Information
          boxShadow={cardShadow}
          title='Name'
          value='Google, Facebook'
        />
        <Information
          boxShadow={cardShadow}
          title='Username'
          value='Simmmple Web LLC'
        />
        <Information
          boxShadow={cardShadow}
          title='Role'
          value='20 July 1986'
        />
      </SimpleGrid>
    </Card>
  );
}
