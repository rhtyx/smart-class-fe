import { Button, HStack, Input, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { useState } from "react";

export default function SearchCard(props) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const [userID, setUserID] = useState("");

  const getUser = async () => {
    try {
      axios({
        method: "get",
        url: `//localhost:309/user/${userID}`,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      }).then((res) => {
        setUserID("");
        props.setUser(res.data.data[0]);
      }).catch((err) => {
        props.setDataStatus(err.response.status)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    setUserID(e.target.value)
  }

  const handleGet = () => {
    getUser();
  }

  return (
    <Card>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Find User By NIM or NIP
      </Text>
      <HStack>
        <Input name="name" type='number' placeholder="7 digit / 18 digit" value={userID} onChange={handleChange}></Input>
        <Button
          onClick={handleGet}
          me='100%'
          w='140px'
          minW='140px'
          mt={{ base: "20px", "2xl": "auto" }}
          variant='brand'
          fontWeight='500'>
          Get
        </Button>
      </HStack>
    </Card>
  )
}