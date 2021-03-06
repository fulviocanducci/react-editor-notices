import "jodit/build/jodit.min.css";

import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

import { cssValidOrInvalid } from "../utils";

import notices from "../services/notices";
import Loading from "../components/Loading";

function Atualizar() {
  const [values, setValues] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { createdAt, id } = values;
    notices
      .update({ ...data, createdAt, id }, id)
      .then()
      .catch((error) => console.log(error))
      .then(() => {
        history.push("/lista");
      });
  };

  useEffect(() => {
    notices
      .get(id)
      .then((response) => {
        setTimeout(() => {
          setValues(response.data);
        }, 500);
      })
      .catch((error) => console.log(error))
      .then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (values === null) {
    return <Loading />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="inputEmail">Titulo da noticia:</label>
          <input
            autoFocus={true}
            defaultValue={(values && values.title) || ""}
            name="title"
            type="text"
            className={"form-control" + cssValidOrInvalid(errors, "title")}
            id="inputTitle"
            aria-describedby="titleHelp"
            ref={register({
              required: true,
              maxLength: 300,
            })}
          />
          <small id="titleHelp" className="form-text text-danger">
            {errors.title?.type === "required" && "Digite o titulo ..."}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputSubTitle">Chamado da noticia:</label>
          <input
            name="subTitle"
            defaultValue={(values && values.subTitle) || ""}
            type="text"
            className={"form-control" + cssValidOrInvalid(errors, "subTitle")}
            id="inputChamado"
            aria-describedby="chamadoHelp"
            ref={register({
              required: true,
              maxLength: 300,
            })}
          />
          <small id="chamadoHelp" className="form-text text-danger">
            {errors.subTitle?.type === "required" && "Digite o chamado ..."}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputText">Texto:</label>
          <JoditEditor
            value={(values && values.text) || ""}
            name="text"
            id="inputTexto"
            tabIndex={1}
            ref={register({ required: true })}
          />
          <small id="chamadoHelp" className="form-text text-danger">
            {errors.text?.type === "required" && "Digite o texto ..."}
          </small>
        </div>
        <div className="row mb-5">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary btn-block">
              Atualizar
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              onClick={() => history.push("/lista")}
              className="btn btn-danger btn-block"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Atualizar;
