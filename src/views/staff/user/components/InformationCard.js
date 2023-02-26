// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "./Information";

// Assets
export default function InformationCard(props) {
  const { ...rest } = props;

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
          title={props.user.id.toString().length > 7 ? "NIP" : "NIM"}
          value={props.user.id}
        />
        <Information
          boxShadow={cardShadow}
          title='email'
          value={props.user.email}
        />
        <Information
          boxShadow={cardShadow}
          title='Name'
          value={props.user.name}
        />
        <Information
          boxShadow={cardShadow}
          title='Username'
          value={props.user.username}
        />
        <Information
          boxShadow={cardShadow}
          title='Role'
          value={props.user.role}
        />
      </SimpleGrid>
    </Card>
  );
}
