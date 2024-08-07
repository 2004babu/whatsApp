import React, { createContext, useContext, useState } from "react";

const StatusContext = createContext();

export const useStatusUserList = () => {
  return useContext(StatusContext);
};

export const StatusProvider = ({ children }) => {
  const [statusUser, setStatusUser] = useState([]);
// console.log(statusUser);
  return (
    <StatusContext.Provider value={{  statusUser, setStatusUser }}>
      {children}
    </StatusContext.Provider>
  );
};



// import React, { createContext, useContext, useState } from "react";

// const contextProvider = createContext();

// export const StatusUserList = () => {
//   return useContext(StatusProvider);
// };

// export const StatusProvider = ({ children }) => {
//   const [statusUser, setStatusUser] = useState([]);


//   return (
//     <contextProvider.Provider value={{logo, statusUser, setStatusUser }}>
//       {children}
//     </contextProvider.Provider>
//   );
// }
 
