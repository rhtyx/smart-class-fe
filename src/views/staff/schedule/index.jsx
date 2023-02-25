// Chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import DevelopmentTable from "views/staff/schedule/components/DevelopmentTable";
import {
  columnsSchedule,
} from "views/staff/schedule/variables/columnsData";
import React, { useEffect, useState } from "react";
import Card from "components/card/Card";
import Form from "./components/Form";
import Alerts from "./components/Alert";
import axios from "axios";
import UpdateCard from "./components/UpdateCard";

export default function Settings() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [lectures, setLectures] = useState([]);
  const [classes, setClasses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [dataStatus, setDataStatus] = useState(0);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [formUpdate, setFormUpdate] = useState({
    url: "",
    lecture_code: "",
    class_id: "",
    start_at: "",
    end_at: "",
  })
  const text = "Schedule";

  const getSchedule = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "//localhost:309/class_schedule",
        headers: {
          "Authorization": "Bearer " + process.env.REACT_APP_TOKEN
        },
      })
      setSchedule(res.data.data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getSchedule();
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
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {
        dataStatus === 201? successAlert() : failedAlert()
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
                lectures={lectures}
                setLectures={setLectures}
                classes={classes}
                setClasses={setClasses} />
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
                        classes={classes}
                        lectures={lectures} /> : <></>
        }
        <DevelopmentTable
          columnsData={columnsSchedule}
          tableData={schedule}
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
