import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import ChatBar from "./components/ChatBar/ChatBar";
import Messages from "./components/Messages/Messages";
import Maker from "./components/Maker/Maker";

function App() {
  return (
    <>
      <Signup />
      <Login />
      <Users />
      <Messages />
      <ChatBar />
      <Maker />
    </>
  );
}

export default App;
