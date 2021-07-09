import { useEffect, useState } from "react";
import useSWR from "swr";

const endPoint = "http://206.189.91.54//api/v1/users";
const options = {
  headers: {
    //get header data from login response *see Login.js snippet
    Accept: "application/json",
    "access-token": "08v0MnoeqXMwRWGw14yDbw",
    client: "MICRiOHS7JIsl2mfo4bHYw",
    expiry: "1626957231",
    uid: "mail@mail.com"
  }
};

export default function Users() {
  //with swr
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error: swrError } = useSWR([endPoint, options], fetcher, {
    refreshInterval: 1000
  });
  console.log("SWR", data, swrError);

  //can be batched using useReducer hook
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    //Immediately invoked function expressions
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(endPoint, options);
        const jsonData = await response.json();

        if (response.status === 200) {
          console.log(jsonData);
          setUsers(jsonData.data);
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
    <div className="users">
      <h3>USERS</h3>
      <p>{error || "---"}</p>
      {(!isLoading && (
        <ul className="users__list">
          {users.map(({ id, uid }) => {
            return (
              <li key={id} className="users__user">
                {uid}
              </li>
            );
          })}
        </ul>
      )) ||
        "...LOADING"}
    </div>
  );
}
