// Chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, SimpleGrid, Text } from "@chakra-ui/react";
import DevelopmentTable from "views/staff/class/components/DevelopmentTable";
import {
  columnsClass,
} from "views/staff/class/variables/columnsData";
import React, { useEffect, useState } from "react";
import Card from "components/card/Card";
import Form from "./components/Form";
import Alerts from "./components/Alert";
import axios from "axios";

export default function Settings() {
  const [classes, setClasses] = useState([]);
  const [dataStatus, setDataStatus] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const text = "Class";

  const getClasses = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "//localhost:309/class",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      setClasses(res.data.data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getClasses();
  }, [refresh])

  const successAlert = () => {
    return (
      <Alerts status="success" variant="solid" isOpen={dataStatus === 201} setDataStatus={setDataStatus}>
        Success created.
      </Alerts>
    )
  }

  const failedAlert = () => {
    return (
      <Alerts status="error" isOpen={dataStatus !== 0} setDataStatus={setDataStatus}>
        Failed created.
      </Alerts>
    )
  }

  return (
    <Box>
      {
        dataStatus === 201? successAlert(): failedAlert()
      }
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
                <Form setStatus={setDataStatus} refresh={refresh} setRefresh={setRefresh}/>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
        <DevelopmentTable
          columnsData={columnsClass}
          tableData={classes}
          text={text}
          refresh={refresh} 
          setRefresh={setRefresh}
        />
      </SimpleGrid>
    </Box>
  );
}
