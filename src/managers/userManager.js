import { createContext, useContext, useReducer } from "react";

const stateContext = createContext();
const dispatchContext = createContext();

//when app starts, loading is true until app determines if there's a userData saved in local storage
const initialState = { user: null, isLoading: true };
/*
  user when not null: 
  user: {
    'access-token', e.g FSasA8xadsfasjaasd
    'client: e.g. XSasA813sjaasd
    'uid': api used email as uid
    'id': number such as 1 2 3 ... etc
  }
  }
 */

//the Provider that will wrap the components who needs to use this global user State
export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export function useUserDispatcher() {
  /*
  use to update user state through actions 'available in reducer'
  USAGE
  import {useUserDispatcher} from '* path to userManager' 

  const userDispatch [or whatever name you like] = useUserDispatcher()

  *see available actions in reducer

  dispatch({type:'load'})//action without payload
  
  dispatch({type:'save', payload:userData}) //userData from login 
 */
  const contextValue = useContext(dispatchContext);
  if (typeof contextValue === "undefined") {
    throw new Error(`User dispatch must be used within user provider`);
  }
  return contextValue;
}

//use function to use userState
export function useUserState() {
  /*
  use to get user state from userManager
  USAGE
  import {useUserState} from '* path to userManager' 

  const userState [or whatever name you like] = useUserState()

  e.g
  const user = userState.user
  const isUserLoading = userState.isLoading
  const userId = userState.user.uid
 */
  const contextValue = useContext(stateContext);
  if (typeof contextValue === "undefined") {
    throw new Error(`User state must be used within user provider`);
  }
  return contextValue;
}

function reducer(state, action) {
  switch (action.type) {
    case "retrieve":
      const localUser = localStorage.getItem("user");
      if (localUser) {
        return { ...state, user: JSON.parse(localUser), isLoading: false };
      } else {
        return { ...state, isLoading: false };
      }

    case "load":
      return { ...state, isLoading: true };

    case "save":
      const userString = JSON.stringify(action.payload);
      localStorage.setItem("user", userString);
      return { ...state, user: action.payload, isLoading: false };

    case "delete":
      localStorage.removeItem("user");
      return { ...initialState, isLoading: false };

    default:
      console.log("user action does not exist");
      return state;
  }
}
