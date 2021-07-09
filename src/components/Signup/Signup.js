import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //can be batched using useReducer hook
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
        password,
        password_confirmation: password
      };

      const endPoint = "http://206.189.91.54//api/v1/auth/";
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
      const jsonData = await response.json();

      if (response.status === 200) {
        alert("sign up success!");

        //SIGNUP Also returns access data - so user don't need to login after
        // const userData = {
        //   "access-token": response.headers.get("access-token"),
        //   expiry: response.headers.get("expiry"),
        //   uid: response.headers.get("uid"),
        //   id: jsonData.data.id,
        //   client: response.headers.get("client")
        // };
        setLoading(false);
      } else {
        throw {
          //set custom error base on server response
          //catch block will get this
          custom: jsonData?.errors?.full_messages[0] || "failed to signup"
        };
      }
    } catch (err) {
      console.log(err);
      setError(err?.custom || "something went wrong");
      setLoading(false);
    }
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>SIGNUP</h3>
      <p className="signup__status">{isLoading ? "..loading" : "---"}</p>
      <p className="signup__error">{error || "---"}</p>
      <input
        className="signup__input"
        type="email"
        onChange={handleEmailChange}
        value={email}
        placeholder="email"
      />
      <input
        className="signup__input"
        type="password"
        onChange={handlePwChange}
        value={password}
        placeholder="password"
      />
      <button type="submit" className="signup__action">
        SUBMIT
      </button>
    </form>
  );
}
