import { FormControl, FormLabel, Input, Button, Select } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Form(props) { 
  const [formValue, setFormValue] = useState({
    code: "",
    lecturer_id: "",
    lecture: "",
    sks: "",
  })

  const getLecturer = () => {
    try {
      axios({
        method: "get",
        url: "//localhost:309/user/?role=2",
        headers: {
          "Authorization": "Bearer " + process.env.REACT_APP_TOKEN
        },
      }).then((res)=>{
        props.setLecturers(res.data.data);
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getLecturer()
  }, [])

  const handleSubmit = () => {
    formValue.lecture = formValue.lecture.toLocaleUpperCase();
    formValue.code = formValue.code.toLocaleUpperCase();
    
    try {
      axios({
        method: "post",
        url: "//localhost:309/lecture",
        headers: {
          "Authorization": "Bearer " + process.env.REACT_APP_TOKEN
        },
        data: formValue,
      }).then((res)=>{
        props.setStatus(res.status);
        setFormValue({
          code: "",
          lecturer_id: 0,
          lecture: "",
          sks: "",
        });
        props.setRefresh(!props.refresh);
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <FormControl isRequired>
      <FormLabel>Code</FormLabel>
      <Input name="code" type='text' textTransform={"uppercase"} placeholder="AB123" maxLength={5} value={formValue.code} onChange={handleChange}></Input>
      <FormLabel>Lecturer</FormLabel>
      <Select name="lecturer_id" placeholder="Select Lecturer" value={formValue.lecturer_id} onChange={handleChange}>
        {
          props.lecturers.map((lecturer) => <option value={lecturer.id}>{lecturer.name}</option>)
        }
      </Select>
      <FormLabel>Name</FormLabel>
      <Input name="lecture" type='text' textTransform={"uppercase"} placeholder="DATA CONTROL" value={formValue.lecture} onChange={handleChange}></Input>
      <FormLabel>SKS</FormLabel>
      <Input name="sks" type='number' placeholder="3" max={4} value={formValue.sks} onChange={handleChange}></Input>
      <Button
          onClick={handleSubmit}
          me='100%'
          w='140px'
          minW='140px'
          mt={{ base: "20px", "2xl": "auto" }}
          variant='brand'
          fontWeight='500'>
          Submit
        </Button>
    </FormControl>
  )
}