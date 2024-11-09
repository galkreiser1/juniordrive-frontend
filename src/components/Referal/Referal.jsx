import UserTable from "../Table/table";

import { Button, Box, Heading } from "@chakra-ui/react";
import Filter from "../shared/Filter/Filter";
import { useState } from "react";

const Referal = () => {
  const [showTable, setShowTable] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const hideTableHandler = () => {
    setShowTable((prevShowTable) => {
      const newShowTable = !prevShowTable;
      if (newShowTable === false) {
        setSelectedCompany("");
      }
      return newShowTable;
    });
  };

  return (
    <>
      {!showTable && (
        <Filter
          hideTableHandler={hideTableHandler}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />
      )}
      {showTable && (
        <UserTable
          hideTableHandler={hideTableHandler}
          selectedCompany={selectedCompany}
        />
      )}
    </>
  );
};

export default Referal;
