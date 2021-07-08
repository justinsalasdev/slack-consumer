import { useEffect, useState } from "react";

const receiver = {
  id: 32
};

const loggedInUser = {
  "access-token": "Q7h2aN07TFCt1J5UJF3E8A",
  client: "IWStMJ7NjixPmLPQAiG6wQ",
  expiry: "1626967169",
  id: 31,
  uid: "m1@m.com"
};

export default function Messages() {
  //can be batched using useReducer hook
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const endPoint = `http://206.189.91.54//api/v1/messages?receiver_class=User&receiver_id=${receiver.id}&sender_id=${loggedInUser.id}`;
    const options = {
      headers: {
        cors: "no-cors",
        //get header data from login response *see Login.js snippet
        "access-token": "Q7h2aN07TFCt1J5UJF3E8A",
        client: "IWStMJ7NjixPmLPQAiG6wQ",
        expiry: "1626967169",
        uid: "m1@m.com"
      }
    };

    //Immediately invoked function expressions
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(endPoint, options);
        const jsonData = await response.json();

        if (response.status === 200) {
          console.log(jsonData);
          setMessages(jsonData.data.messages);
          setLoading(false);
        } else {
          //catch will get this error
          throw { custom: "failed to get users" };
        }
      } catch (err) {
        console.log(err);
        //if other than custom error, must be something else
        setError(err?.custom || "something went wrong");
        setLoading(false);
      }
    })(); //invocation here
  }, []);

  return (
    <div className="messages">
      <h3>Chat Box</h3>
      <pre>[messages of m1@m.com and m2@m.com : m1 perspective]</pre>
      {(!isLoading && (
        <ul className="messages__list">
          {messages.map(message => {
            return (
              <li key={message.id} className="messages__message">
                {message.body}
              </li>
            );
          })}
        </ul>
      )) ||
        "...loading"}
    </div>
  );
}
