import { Button, Flex, FormControl, FormLabel, Input, Select, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";

export default function UpdateCard(props) {
  const selectedLectureOption = () => {
    const res = props.lectures.map((lecture) => {

      if (lecture.code === props.formUpdate.lecture_code) {
        return (
          <option value={lecture.code} selected>{lecture.lecture}</option>
        )
      } else {
        return (
          <option value={lecture.code}>{lecture.lecture}</option>
        )
      }
    })

    return res
  }

  const selectedClassOption = () => {
    const res = props.classes.map((classs) => {
      if (classs.id === props.formUpdate.class_id) {
        return (
          <option value={classs.id} selected>{classs.name}</option>
        )
      } else {
        return (
          <option value={classs.id}>{classs.name}</option>
        )
      }
    })

    return res
  }

  const handleUpdate = () => {
    props.formUpdate.start_at = new Date(props.formUpdate.start_at).toISOString();; 
    props.formUpdate.end_at = new Date(props.formUpdate.end_at).toISOString();; 
    
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
          lecture_code: "",
          class_id: "",
          start_at: "",
          end_at: "",
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

  console.log(props.formUpdate)
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
        <FormLabel>Lecture Code</FormLabel>
        <Select name="lecture_code" onChange={handleChange}>
          {
            selectedLectureOption()
          }
        </Select>
        <FormLabel>Class</FormLabel>
        <Select name="class_id" onChange={handleChange}>
          {
            selectedClassOption()
          }
        </Select>
        <FormLabel>Start At</FormLabel>
        <Input name="start_at" type='datetime-local' value={props.formUpdate.start_at} onChange={handleChange}></Input>
        <FormLabel>End At</FormLabel>
        <Input name="end_at" type='datetime-local' value={props.formUpdate.end_at} onChange={handleChange}></Input>
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