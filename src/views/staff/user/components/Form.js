import { FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Form(props) {
  const [formValue, setFormValue] = useState({
    id: "",
    rfid: "",
    email: "",
    name: "",
    username: "",
    password: "",
    passcode: "",
    role: 0,
  })

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    formValue.id = formValue.id.toString();
    formValue.role = parseInt(formValue.role, 10)
    
    try {
      axios({
        method: "post",
        url: "//localhost:309/user",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data: formValue,
      }).then((res)=>{
        props.setStatus(res.status);
        setFormValue({
          id: "",
          rfid: "",
          email: "",
          name: "",
          username: "",
          password: "",
          passcode: "",
          role: 0,
        })
      }).catch((err) => {
        props.setStatus(err.response.status)
        props.setErrMessage(err.response.data.error.message)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <FormControl isRequired>
      <FormLabel>NIM / NIP</FormLabel>
      <Input name="id" type="number" placeholder="7 digit / 18 digit" value={formValue.id} onChange={handleChange} />
      <FormLabel>RFID</FormLabel>
      <Input name="rfid" type="number" placeholder="RFID number" value={formValue.rfid} onChange={handleChange} />
      <FormLabel>Email</FormLabel>
      <Input name="email" type='email' placeholder="email123@mail.com" value={formValue.email} onChange={handleChange} />
      <FormLabel>Name</FormLabel>
      <Input name="name" type='text' placeholder="Name N" value={formValue.name} onChange={handleChange} />
      <FormLabel>Username</FormLabel>
      <Input name="username" type='text' placeholder="name123" textTransform={"lowercase"} value={formValue.username} onChange={handleChange} />
      <FormLabel>Password</FormLabel>
      <Input name="password" type='text' placeholder="8 characters minimum" value={formValue.password} onChange={handleChange} />
      <FormLabel>Passcode</FormLabel>
      <Input name="passcode" type='number' placeholder="6 numbers length" max={999999} value={formValue.passcode} onChange={handleChange} />
      <FormLabel>Role</FormLabel>
      <Select name="role" placeholder="Select the role" value={formValue.role} onChange={handleChange}>
        <option value={2}>Lecturer</option>
        <option value={3}>Student</option>
      </Select>
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