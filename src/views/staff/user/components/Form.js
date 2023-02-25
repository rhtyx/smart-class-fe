import { FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function Form(props) {
  return (
    <FormControl isRequired>
      <FormLabel>NIM</FormLabel>
        <NumberInput>
          <NumberInputField />
        </NumberInput>
        <FormLabel>Email</FormLabel>
        <Input type='email'></Input>
        <FormLabel>Name</FormLabel>
        <Input type='text'></Input>
        <FormLabel>Username</FormLabel>
        <Input type='text'></Input>
        <FormLabel>Password</FormLabel>
        <Input type='text'></Input>
        <FormLabel>Passcode</FormLabel>
        <Input type='number'></Input>
        <FormLabel>Role</FormLabel>
        <Select placeholder="Select the role">
          <option>Lecturer</option>
          <option>Student</option>
        </Select>
        <Button
          me='100%'
          w='140px'
          minW='140px'
          mt={{ base: "20px", "2xl": "auto" }}
          variant='brand'
          fontWeight='500'
          type={"submit"}>
          Submit
        </Button>
    </FormControl>
  )
}