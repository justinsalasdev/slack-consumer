import { useState } from "react";
import { useUserDispatcher } from "../../managers/userManager";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //can be batched using useReducer hook
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //userManager hooks
  const userDispatch = useUserDispatcher();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePwChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) {
      return;
    }

    try {
      const data = {
        email,
        password
      };

      const endPoint = "http://206.189.91.54//api/v1/auth/sign_in";
      const options = {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      };

      setError(null);
      setLoading(true);
      const response = await fetch(endPoint, options);
      console.log();
      const jsonData = await response.json();

      if (response.status === 200) {
        alert("login success!");
        //save needed access data
        const userData = {
          "access-token": response.headers.get("access-token"),
          expiry: response.headers.get("expiry"),
          uid: response.headers.get("uid"),
          client: response.headers.get("client")
        };

        userDispatch({ type: "save", payload: userData }); //save userData to userContext
        console.log(userData); //may save userData to context to access globally
        setLoading(false);
      } else {
        //throw custom error that will go to catch block
        throw { custom: jsonData?.errors?.[0] || "failed to login" };
      }
    } catch (err) {
      console.log(err);

      //if error is not custom, then it must be something else
      setError(err?.custom || "something wen't wrong");
      setLoading(false);
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>LOGIN</h3>
      <p className="login__status">{isLoading ? "..loading" : "---"}</p>
      <p className="login__error">{error || "---"}</p>
      <input
        className="login__input"
        type="email"
        onChange={handleEmailChange}
        value={email}
        placeholder="email"
      />
      <input
        className="login__input"
        type="password"
        onChange={handlePwChange}
        value={password}
        placeholder="password"
      />
      <button type="submit" className="login__action">
        SUBMIT
      </button>
    </form>
  );
}
