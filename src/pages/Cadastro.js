import "jodit/build/jodit.min.css";

import React from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { cssValidOrInvalid } from "../utils";

import notices from "../services/notices";

function Cadastro() {
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    notices
      .add(data)
      .then((response) => {})
      .catch((error) => console.log(error))
      .then(() => {
        history.push("/lista");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="inputEmail">Titulo da noticia:</label>
          <input
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
            name="text"
            id="inputTexto"
            ref={register({ required: true })}
          />
          <small id="chamadoHelp" className="form-text text-danger">
            {errors.text?.type === "required" && "Digite o texto ..."}
          </small>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
