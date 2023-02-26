import axios from "axios";
import ClassLogTable from "./components/LogTable";
import { columnsClassLog } from "views/staff/class/variables/columnsData";
import { useEffect, useState } from "react";
import Alerts from "./components/Alert";
import Card from "components/card/Card";
import { Text, useColorModeValue } from "@chakra-ui/react";

export default function ClassLog(props) {
  const [isNoLog, setIsNoLog] = useState(false)
  const [tableData, setTableData] = useState([])
  const getClassLog = () => {
    try {
      axios({
        method: "get",
        url: `//localhost:309/class_log/?class_id=${props.classID}`,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      }).then((res) => {
        if (res.data.data.length === 0) {
          setIsNoLog(true)
        } else {
          setTableData(res.data.data);
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    getClassLog();
  }, [props.seeClassLog]);

  const showNoLogCard = () => {
    return (
      <Card>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
            No Log.
          </Text>
      </Card>
    )
  }

  const showLogCard = () => {
    return (
      <ClassLogTable
        tableData={tableData}
        columnsData={columnsClassLog}
        classID={props.classID}
        className={props.className}
        setClassID={props.setClassID}
        seeClassLog={props.seeClassLog}
        setSeeClassLog={props.setSeeClassLog}
      />
    )
  }
  return (
    <>
    { isNoLog? showNoLogCard() : showLogCard() }
    </>
  )
}