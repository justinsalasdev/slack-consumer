import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import { useUserDispatcher, useUserState } from "./managers/userManager";
import { useEffect } from "react";

function App() {
  const userState = useUserState(); //use to access userState
  const userDispatch = useUserDispatcher(); //use to be able to dispatch actions against user state

  useEffect(() => {
    //since user state is initially loading, 'this dispatch will retrieve the user from the local storage
    //and set loading to false once complete
    userDispatch({ type: "retrieve" });
  }, []);

  if (userState.isLoading) {
    return <div>...loading</div>;
  }

  return (
    <>
      <Signup />
      <Login />
      <Users />
    </>
  );
}

export default App;
