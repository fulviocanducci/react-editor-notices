import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";

import notices from "../services/notices";

import Loading from "../components/Loading";

function Ver() {
  const [notice, setNotice] = useState(null);
  const history = useHistory();
  let { id } = useParams();
  useEffect(() => {
    (function loadNotice() {
      notices
        .get(id)
        .then((response) =>
          setTimeout(() => {
            setNotice(response.data);
          }, 1000)
        )
        .catch((errors) => console.log(errors))
        .then(() => {});
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (notice === null) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <h1>{notice.title}</h1>
        <div>
          <small>{notice.subTitle}</small>
        </div>
        <hr />
        <p>
          <small>
            Criado em:{" "}
            <Moment format="DD/MM/YYYY HH:mm:ss">{notice.createdAt}</Moment>
          </small>
        </p>
        <div className="mt-3 text-justify">{ReactHtmlParser(notice.text)}</div>
      </div>
      <div className="mt-3 mb-4">
        <button
          onClick={() => history.push("/lista")}
          className="btn btn-primary btn-block"
        >
          voltar
        </button>
      </div>
    </>
  );
}

export default Ver;
