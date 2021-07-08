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

      console.log(data);

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

      if (response.status !== 200) {
        setError(jsonData?.errors?.full_messages[0] || "something wen't wrong");
        setLoading(false);
      }

      console.log(jsonData);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
