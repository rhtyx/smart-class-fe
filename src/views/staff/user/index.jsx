// Chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "components/card/Card";
import Form from "./components/Form";
import InformationCard from "./components/InformationCard";
import SearchCard from "./components/SearchCard";
import Alerts from "./components/Alert";
import LectureCard from "./components/LectureCard";
import { columnsUserClassSchedule } from "./variables/columnsData";
import axios from "axios";

export default function Settings() {
  const [classUserSchedule, setClassUserSchedule] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState({
    id: "",
    rfid: "",
    name: "",
    username: "",
    role: "",
  });
  const [dataStatus, setDataStatus] = useState(0);
  const text = "User";

  const getUser = async () => {
    try {
      axios({
        method: "get",
        url: `//localhost:309/user/${localStorage.getItem('user_id')}`,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      }).then((res) => {
        setUser(res.data.data[0]);
      }).catch((err) => {
        setDataStatus(err.response.status)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const getClassUserSchedule = async (userID) => {
    try {
      axios({
        method: "get",
        url: `//localhost:309/class_schedule/?user_id=${userID}`,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      }).then((res) => {
        console.log(res)
        if (res.data.data === null) {
          setClassUserSchedule([])
        } else {
          setClassUserSchedule(res.data.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('role') !== 'STUDENT') {
      console.log(user.id)
      getClassUserSchedule(user.id)
    } else {
      getUser();
      getClassUserSchedule(localStorage.getItem('user_id'));
    }
  }, [user.id])

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

  const failedGetAlert = () => {
    return (
      <Alerts status="error" isOpen={dataStatus !== 0} setDataStatus={setDataStatus}>
        Not Found
      </Alerts>
    )
  }

  const failedInputAlert = () => {
    return (
      <Alerts status="error" isOpen={dataStatus !== 0} setDataStatus={setDataStatus}>
        {errMessage}
      </Alerts>
    )
  }

  return (
    <Box>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {
          localStorage.getItem('role') !== 'STUDENT' ?
          <>
            {
              dataStatus === 201? successAlert() : failedAlert()
            }
            {
              dataStatus === 422? failedInputAlert() : <></>
            }
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
                      errMessage={errMessage}
                      setErrMessage={setErrMessage} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Card>
            <SearchCard
              setUser={setUser}
              setDataStatus={setDataStatus} />
            {
              dataStatus !== 0 && dataStatus !== 201 && dataStatus !== 422? failedGetAlert() : <></>
            }
          </>
          :
          <></>
        }
        <InformationCard
          user={user} />
        {
          user.id ?
            <LectureCard
              columnsData={columnsUserClassSchedule}
              tableData={classUserSchedule}
              text="Schedule" />
            :
            <></>
        }
      </SimpleGrid>
    </Box>
  );
}
