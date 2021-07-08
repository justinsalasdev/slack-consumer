import { useState } from "react";

//HARD CODED PARTIES
const receiverDetails = {
  "access-token": "Ebezl71fGd1HMerZV2miHQ",
  client: "mXb8sNDW9cl_kIkkH_noiw",
  expiry: "1626966070",
  uid: "m2@m.com",
  id: 32 //only needed receiver data to send message
};

const senderDetails = {
  //current user logged in
  //get user detail after Login
  "access-token": "g3c29Tkg2MS23vDdiPiDeQ",
  client: "tdluJrvdfrqEmGV_nCLpvQ",
  expiry: "1626966033",
  uid: "m1@m.com",
  id: 31
};

export default function ChatBar() {
  //state related to chatbar
  const [text, setText] = useState("");

  //states related to sending message - may be merge using useReducer hook
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  function handleTextChange(e) {
    setText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text) {
      //if text is blank
      return;
    }
    try {
      const endPoint = "http://206.189.91.54//api/v1/messages";
      const data = {
        receiver_id: receiverDetails.id,
        receiver_class: "User", //"Channel" when sending to Channel??
        body: text
      };

      const options = {
        method: "post",
        headers: {
          "content-type": "application/json",
          ...senderDetails
        },
        body: JSON.stringify(data)
      };

      setLoading(true);
      const response = await fetch(endPoint, options);
      const jsonData = await response.json();

      if (response.status === 200) {
        alert("message sent");
        console.log(jsonData);
        setLoading(false);
      } else {
        //will go to catch block
        setLoading(false);
        throw { custom: "failed to send message" };
      }
    } catch (err) {
      console.log(err);
      //if not custom error, may be something else
      setError(err?.custom || "something wen't wrong");
      setLoading(false);
    }
  }

  return (
    <form className="chatbar" onSubmit={handleSubmit}>
      <h3>chat bar</h3>
      <p>{error || "---"}</p>
      <input
        type="text"
        className="chatbar__field"
        value={text}
        onChange={handleTextChange}
      />
      <button className="chatbar__action" type="submit">
        {isLoading ? "...sending" : "send"}
      </button>
    </form>
  );
}
