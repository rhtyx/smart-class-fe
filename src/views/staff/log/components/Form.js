import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Form(props) {
  const [formValue, setFormValue] = useState({
    name: "",
  })

  const handleSubmit = () => {
    try {
      axios({
        method: "post",
        url: "//localhost:309/class",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data: formValue,
      }).then((res)=>{
        props.setStatus(res.status);
        setFormValue({
          name: ""
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
      <FormLabel>Name</FormLabel>
      <Input name="name" type='text' placeholder="Class Code" value={formValue.name} onChange={handleChange}></Input>
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