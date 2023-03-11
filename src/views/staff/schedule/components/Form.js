import { FormControl, FormLabel, Input, Button, Select} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Form(props) {
  const [formValue, setFormValue] = useState({
    lecture_code: "",
    class_id: "",
    start_at: "",
    end_at: "",
  })

  const getLecture = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "//localhost:309/lecture",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      props.setLectures(res.data.data);
      setFormValue({
        lecture_code: "",
        class_id: "",
        start_at: "",
        end_at: "",
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  
  const getClasses = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "//localhost:309/class",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      props.setClasses(res.data.data);
      setFormValue({
        lecture_code: "",
        class_id: "",
        start_at: "",
        end_at: "",
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = () => {
    formValue.lecture_code = formValue.lecture_code.toLocaleUpperCase();
    let start_at = new Date(formValue.start_at);
    start_at.setHours(start_at.getHours() + 7);
    formValue.start_at = start_at.toISOString();
    let end_at = new Date(formValue.end_at);
    end_at.setHours(end_at.getHours() + 7);
    formValue.end_at = end_at.toISOString();
    
    try {
      axios({
        method: "post",
        url: "//localhost:309/class_schedule",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data: formValue,
      }).then((res)=>{
        props.setStatus(res.status);
        setFormValue({
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

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    getLecture();
    getClasses();
  }, [])

  return (
    <FormControl isRequired>
      <FormLabel>Lecture</FormLabel>
      <Select name="lecture_code" placeholder="Select Lecture" value={formValue.lecture_code} onChange={handleChange}>
        {
          props.lectures.map((lecture) => <option value={lecture.code}>{lecture.lecture}</option>)
        }
      </Select>
      <FormLabel>Class</FormLabel>
      <Select name="class_id" placeholder="Select Class" value={formValue.class_id} onChange={handleChange}>
        {
          props.classes.map((classs) => <option value={classs.id}>{classs.name}</option>)
        }
      </Select>
      <FormLabel>Start At</FormLabel>
      <Input name="start_at" type='datetime-local' value={formValue.start_at} onChange={handleChange}></Input>
      <FormLabel>End At</FormLabel>
      <Input name="end_at" type='datetime-local' value={formValue.end_at} onChange={handleChange}></Input>
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