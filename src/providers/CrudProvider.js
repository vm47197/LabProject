import React, { useReducer, useContext, createContext } from "react";
const CrudContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return {
        data: action.payload,
      };
    case "insert":
      return {
        data: [...state.data, action.payload],
      };
    case "insertSingle":
      return {
        data: [action.payload],
      };
    case "edit":
      return {
        data: state.data.map((dt) => {
          return Object.values(dt)[0] === Object.values(action.payload)[0]
            ? { ...action.payload }
            : { ...dt };
        }),
      };
    case "delete":
      return {
        data: state.data.filter((dt) => Object.values(dt)[0] !== action.id),
      };
    default:
      return state;
  }
}

export default function CrudProvider({ children }) {
  const [{ data }, dispatchCrud] = useReducer(reducer, { data: [] });
  return (
    <CrudContext.Provider value={{ data, dispatchCrud }}>
      {children}
    </CrudContext.Provider>
  );
}

export const useCrudContext = () => useContext(CrudContext);