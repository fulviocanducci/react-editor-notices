import React, { useState, useEffect } from "react";
import notices from "../services/notices";
import { useHistory } from "react-router-dom";
import { friendlyUrl } from "../utils";
import Loading from "../components/Loading";

function Lista() {
  const [list, setList] = useState([]);
  const history = useHistory();
  function sendPage(id, text) {
    const url = friendlyUrl(text);
    history.push(`ver/${id}/${url}`);
  }
  function sendUpdate(id) {
    history.push(`atualizar/${id}`);
  }
  function loadList() {
    notices
      .list()
      .then((response) => {
        setTimeout(() => {
          setList(response.data);
        }, 500);
      })
      .catch((error) => console.log(error))
      .then(() => {});
  }
  useEffect(() => {
    loadList();
  }, []);

  if (list.length === 0) {
    return <Loading />;
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "20%", textAlign: "center" }}>...</th>
            <th>Titulo</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((l, i) => (
              <tr key={i}>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-info"
                    onClick={() => sendUpdate(l.id)}
                  >
                    Atualizar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => sendPage(l.id, l.title)}
                  >
                    {l.title}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lista;
