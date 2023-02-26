// Chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import DevelopmentTable from "views/staff/lecture/components/DevelopmentTable";
import {
  columnsLecture,
} from "views/staff/lecture/variables/columnsData";
import React, { useEffect, useState } from "react";
import Card from "components/card/Card";
import Form from "./components/Form";
import axios from "axios";
import Alerts from "./components/Alert";
import UpdateCard from "./components/UpdateCard";

export default function Settings() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [lecturers, setLecturers] = useState([])
  const [lectures, setLectures] = useState([]);
  const [dataStatus, setDataStatus] = useState(0);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [formUpdate, setFormUpdate] = useState({
    url: "",
    lecturer_id: "",
    lecture: "",
    sks: "",
  })
  const text = "Lecture";
  
  const getLecture = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "//localhost:309/lecture",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      setLectures(res.data.data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getLecture();
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
                <Form 
                  setStatus={setDataStatus}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  lecturers={lecturers}
                  setLecturers={setLecturers} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
        {
          needUpdate? <UpdateCard
                        text={text}
                        textColor={textColor}
                        setStatus={setDataStatus}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        needUpdate={needUpdate}
                        setNeedUpdate={setNeedUpdate}
                        formUpdate={formUpdate}
                        setFormUpdate={setFormUpdate}
                        lecturers={lecturers} /> : <></>
        }
        <DevelopmentTable
          columnsData={columnsLecture}
          tableData={lectures}
          text={text}
          refresh={refresh}
          setRefresh={setRefresh}
          needUpdate={needUpdate}
          setNeedUpdate={setNeedUpdate}
          formUpdate={formUpdate}
          setFormUpdate={setFormUpdate}
        />
      </SimpleGrid>
    </Box>
  );
}
