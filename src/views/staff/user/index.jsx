// Chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, SimpleGrid, Text, Button } from "@chakra-ui/react";
import DevelopmentTable from "views/staff/user/components/DevelopmentTable";
import {
  columnsUser,
} from "views/staff/user/variables/columnsData";
import tableDataDevelopment from "views/staff/user/variables/tableDataDevelopment.json";
import React, { useState } from "react";
import Card from "components/card/Card";
import Form from "./components/Form";
import axios from "axios";
import InformationCard from "./components/InformationCard";

export default function Settings() {
  const [classes, setClasses] = useState([]);
  // const [dataStatus, setDataStatus] = useState(0);
  // const [refresh, setRefresh] = useState(true)
  const text = "User";

  // const successAlert = () => {
  //   return (
  //     <Alers status="success" variant="solid" isOpen={dataStatus === 201} setDataStatus={setDataStatus}>
  //       Success created.
  //     </Alers>
  //   )
  // }

  // const failedAlert = () => {
  //   return (
  //     <Alerts status="error" isOpen={dataStatus !== 0} setDataStatus={setDataStatus}>
  //       Failed created.
  //     </Alerts>
  //   )
  // }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <Card>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  <Text 
                    fontSize='20px'
                    fontWeight='700'>
                    Add {text}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
              <Form />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
        <InformationCard />
      </SimpleGrid>
    </Box>
  );
}
