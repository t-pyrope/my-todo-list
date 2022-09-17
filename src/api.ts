import axios from "axios";

export const getTodoTypes = () => {
  return axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://procorp.cz/test_01/types.json",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((res) => res.data.data)
    .catch((e) => console.error(e));
};
