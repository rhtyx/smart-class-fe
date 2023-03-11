/* eslint-disable */
import {
  Button,
  Flex,
  Icon,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdDownload
} from "react-icons/md";
import axios from "axios";
// Custom components
import Card from "components/card/Card";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;
  const [ CSVData, setCSVData ] = useState("")

  const composeAssignFunc = (url) => {
    const handleAssign = () => {
      try {
        axios({
          method: "post",
          url: url,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        }).then((res) => {
          props.setRefresh(!props.refresh);
        })
      } catch (error) {
        console.log(error.message);
      }
    }

    return handleAssign
  }

  const composeUpdateFunc = (url, lecture_code, class_id, start_at, end_at) => {
    let startAt = new Date(start_at).toISOString();
    let endAt = new Date(end_at).toISOString();
    const handleUpdate = () => {
      props.setNeedUpdate(true);
      props.setFormUpdate({
        url: url,
        lecture_code: lecture_code,
        class_id: class_id,
        start_at: startAt.slice(0, -1),
        end_at: endAt.slice(0, -1),
      })
    }
    return handleUpdate
  }

  const composeDeleteFunc = (id) => {
    let url = `//localhost:309/class_schedule/${id}`;
    const handleDelete = () => {
      try {
        axios({
          method: "delete",
          url: url,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        }).then((res) => {
          props.setRefresh(!props.refresh);
        })
      } catch (error) {
        console.log(error.message);
      }
    }

    return handleDelete
  }

  const composeGetPresenceListFunc = (class_schedule_id) => {
    let url = `//localhost:309/class_schedule/presence_list/?class_schedule_id=${class_schedule_id}`;
    const handleGetPresenceList = () => {
      try {
        axios({
          method: "get",
          url: url,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        }).then((res) => {
          setCSVData(res.data);
        })
      } catch (error) {
        console.log(error.message);
      }
    }

    return handleGetPresenceList
  }

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          {props.text}
        </Text>
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "LECTURE CODE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "CLASS") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "LECTURER") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "START AT") {
                    const dateArray = cell.value.split(" ")
                    let startAt = new Date(`${dateArray[0]} ${dateArray[1]}`);
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {`${startAt.toLocaleString('id-ID', {weekday: 'long'})}, ${startAt.toLocaleTimeString('id-ID')}`}
                      </Text>
                    );
                  } else if (cell.column.Header === "END AT") {
                    const dateArray = cell.value.split(" ")
                    let endAt = new Date(`${dateArray[0]} ${dateArray[1]}`);
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {`${endAt.toLocaleString('id-ID', {weekday: 'long'})}, ${endAt.toLocaleTimeString('id-ID')}`}
                      </Text>
                    );
                  } else if (cell.column.Header === "ACTION") {
                    if (localStorage.getItem('role') === 'STUDENT') {
                      if (!row.original.is_assigned) {
                        const handleAssign = composeAssignFunc(`//localhost:309/class_user_schedule/?class_schedule_id=${row.original.id}`)
                        data = (
                          <Stack direction={"row"} spacing={4} align={"center"}>
                            <Button
                              colorScheme="telegram"
                              color='white'
                              fontSize='sm'
                              fontWeight='500'
                              borderRadius='70px'
                              px='24px'
                              py='5px'
                              onClick={handleAssign}>
                              Assign
                            </Button>
                          </Stack> 
                        )
                      } else {
                        data = (
                          <Text 
                            fontSize='15px'
                            fontWeight='700'
                            color="purple.700">
                            Assigned
                          </Text>
                        )
                      }
                    } else {
                      const fileName = `${row.original.lecture_code}_${row.original.class}.csv`
                      const handleUpdate = composeUpdateFunc(
                        `//localhost:309/class_schedule/${row.original.id}`,
                        row.original.lecture_code,
                        row.original.class_id,
                        row.original.start_at,
                        row.original.end_at,
                      )
                      const handleDelete = composeDeleteFunc(row.original.id)
                      const handleGetPresenceList = composeGetPresenceListFunc(row.original.id)
                      data = (
                        <>
                          <Stack direction={"row"} spacing={4} align={"center"}>
                            <a
                            href={`data:text/csv;charset=utf-8,${CSVData}`}
                            download={fileName} >
                              <Button
                                colorScheme="teal"
                                color='white'
                                fontSize='sm'
                                fontWeight='500'
                                borderRadius='70px'
                                px='16px'
                                py='5px'
                                onClick={handleGetPresenceList} >
                                <Icon
                                  as={MdDownload}
                                  width='20px'
                                  height='20px'
                                  mr="5px"
                                  color='inherit' />
                                Presence List
                              </Button>
                            </a>
                            <Button
                              colorScheme="telegram"
                              color='white'
                              fontSize='sm'
                              fontWeight='500'
                              borderRadius='70px'
                              px='24px'
                              py='5px'
                              onClick={handleUpdate}>
                              Update
                            </Button>
                            <Button
                              colorScheme="red"
                              color='white'
                              fontSize='sm'
                              fontWeight='500'
                              borderRadius='70px'
                              px='24px'
                              py='5px'
                              onClick={handleDelete}>
                              Delete
                            </Button>
                          </Stack>
                        </>
                      );
                    }
                    }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
