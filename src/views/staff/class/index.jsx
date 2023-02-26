// Chakra imports
import { Box } from "@chakra-ui/react";
import ClassLog from "./classLog";
import Class from "./class";
import { useState } from "react";

export default function Settings() {
  const [classID, setClassID] = useState("");
  const [className, setClassName] = useState("");
  const [seeClassLog, setSeeClassLog] = useState(false);

  return (
    <Box>
      {
        seeClassLog?
          <ClassLog 
            classID={classID}
            className={className}
            setClassID={setClassID}
            seeClassLog={seeClassLog}
            setSeeClassLog={setSeeClassLog} />
          : 
          <Class setClassID={setClassID} setClassName={setClassName} setSeeClassLog={setSeeClassLog} />
      }
    </Box>
  );
}
