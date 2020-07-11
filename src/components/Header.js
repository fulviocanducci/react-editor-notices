import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Cadastro from "../pages/Cadastro";
import Lista from "../pages/Lista";
import Home from "../pages/Home";
import Ver from "../pages/Ver";
import Atualizar from "../pages/Atualizar";

function Header() {
  return (
    <Router>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          Cadastro de Noticias
        </h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-dark" to="/">
            Home
          </Link>
          <Link className="p-2 text-dark" to="/cadastro">
            Cadastro
          </Link>
          <Link className="p-2 text-dark" to="/lista">
            Lista da Noticias
          </Link>
        </nav>
      </div>
      <div className="container">
        <Switch>
          <Route path="/cadastro">
            <Cadastro />
          </Route>
          <Route path="/lista">
            <Lista />
          </Route>
          <Route path="/ver/:id/:text">
            <Ver />
          </Route>
          <Route path="/atualizar/:id">
            <Atualizar />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Header;
