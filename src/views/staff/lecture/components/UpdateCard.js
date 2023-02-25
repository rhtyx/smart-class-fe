import { Button, Flex, FormControl, FormLabel, Input, Select, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";

export default function UpdateCard(props) {
    const selectedOption = () => {
    const res = props.lecturers.map((lecturer) => {
      if (lecturer.id === props.formUpdate.lecturer_id) {
        return (
          <option value={lecturer.id} selected>{lecturer.name}</option>
        )
      } else {
        return (
          <option value={lecturer.id}>{lecturer.name}</option>
        )
      }
    })

    return res
  }

  const handleUpdate = () => {
    props.formUpdate.lecture = props.formUpdate.lecture.toLocaleUpperCase();
    props.formUpdate.lecturer_id = props.formUpdate.lecturer_id.toString(); 
    
    try {
      axios({
        method: "put",
        url: props.formUpdate.url,
        headers: {
          "Authorization": "Bearer " + process.env.REACT_APP_TOKEN
        },
        data: props.formUpdate,
      }).then((res)=>{
        props.setNeedUpdate(!props.needUpdate);
        props.setFormUpdate({
          url: "",
          lecturer_id: "",
          lecture: "",
          sks: "",
        });
        props.setRefresh(!props.refresh);
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleCancel = () => {
    props.setNeedUpdate(!props.needUpdate);
  }

  const handleChange = (e) => {
    props.setFormUpdate({
      ...props.formUpdate,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card px='25px'>
      <Flex justify='space-between' mb='20px' align='center'>
        <Text
          color={props.textColor}
          fontSize='22px'
          fontWeight='700'>
          Update {props.text}
        </Text>
      </Flex>
      <FormControl isRequired>
        <FormLabel>Lecturer</FormLabel>
        <Select name="lecturer_id" onChange={handleChange}>
          {
            selectedOption()
          }
        </Select>
        <FormLabel>Name</FormLabel>
        <Input name="lecture" type='text' textTransform={"uppercase"} placeholder="DATA CONTROL" value={props.formUpdate.lecture} onChange={handleChange}></Input>
        <FormLabel>SKS</FormLabel>
        <Input name="sks" type='number' placeholder="3" max={4} value={props.formUpdate.sks} onChange={handleChange}></Input>
        <Stack direction={"row"} spacing={4} align='center' pt={5}>
          <Button
            colorScheme="telegram"
            onClick={handleUpdate}
            w='140px'
            minW='140px'
            fontWeight='500'>
            Update
          </Button>
          <Button
            colorScheme="red"
            onClick={handleCancel}
            w='140px'
            minW='140px'
            fontWeight='500'>
            Cancel
          </Button>
        </Stack>
      </FormControl>
    </Card>
  )
}