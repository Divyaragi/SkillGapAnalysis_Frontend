import { createContext, useState } from "react";

const RowDataContext = createContext();

export const RowDataProvider = ({ children }) => {
  const [rowData, setRowData] = useState([]);

  return (
    <RowDataContext.Provider value={{ rowData, setRowData }}>
      {children}
    </RowDataContext.Provider>
  );
};

export default RowDataContext;
