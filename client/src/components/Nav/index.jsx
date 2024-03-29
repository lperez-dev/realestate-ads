import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../styledComponents/Button";
import { StyledHash, StyledLink } from "../../styledComponents/StyledLink";
import "./Nav.css";
import { useLocation } from "react-router-dom";
import capitalize from "./../../functions/capitalize";
import { useDispatch } from "react-redux/es/exports";
import { getUserById, logout } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import Logo from "../../dumb/Icons/Logo";
import Title from "../../styledComponents/Title";
import { useSelector } from "react-redux";
import LoginController from "../../localStorage/login";
import { SaveName, SaveRange } from './../../localStorage/index';
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const headers = LoginController();
  const range = localStorage.getItem("range");
  const id = localStorage.getItem("id");
  var name = localStorage.getItem("name");
  var lastName = localStorage.getItem("last-name");

  // ********Estado para cambiar el nombre en la nav cuando se actualiza el Perfil*******

  let [changeNavBarName, setchangeNavBarName] = useState(name);
  let [changeNavBarRange, setchangeNavBarRange] = useState(range);
  let userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData.range && userData.name) {
      if (range !== undefined && range !== userData.range) {
        setchangeNavBarRange(userData.range);
        SaveRange(userData.range);
      }
      if (name.length && name !== userData.name) {
        SaveName(userData.name);
        setchangeNavBarName(userData.name);
      }
    }
  }, [userData]);

  // ********************

  useEffect(() => {
    getUserById(id, headers);
  }, [name, lastName, range]);

  const logoutFunction = (e) => {
    e.preventDefault();
    dispatch(logout(id));
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="subContainerCenter">
        <StyledLink to="/">
          <Logo height="20px" width="20px" />
        </StyledLink>
        <StyledLink to={"/home"}>
          <Button>Ver Propiedades</Button>
        </StyledLink>
        {range && range !== "free" && (
          <StyledLink to={"/publicar"}>
            <Button>Publicar</Button>
          </StyledLink>
        )}
      </div>
      <div className="subContainerCenter">
        <li className="items">
          {!location.pathname.split("/")[1] ? (
            <>
              <StyledHash to={"#"}>Inicio</StyledHash>
              <StyledHash to="#how-it-works">Cómo funciona </StyledHash>
              <StyledHash to="#Technologies">Tecnologias usadas </StyledHash>
              <StyledHash to="#agents">Quiénes somos</StyledHash>
            </>
          ) : (
            <>
              {range && range !== "free" && (
                <StyledLink to={"/mispropiedades"}>Mis Propiedades</StyledLink>
              )}
              {range && range === "premium" && (
                <StyledLink to={"/cart"}>Carrito</StyledLink>
              )}
              {range && (
                <StyledLink to={"/favoritos"}>Mis Favoritos</StyledLink>
              )}
              {range && range !== "free" && (
                <StyledLink to={"/calendario"}>Calendario</StyledLink>
              )}
              {range && range === "admin" && (
                <StyledLink to={"/administrador"}>Panel</StyledLink>
              )}
            </>
          )}
        </li>
      </div>
      <div className="subContainerRight">
        {!range && (
          <div>
            {location.pathname.split("/")[1] !== "sesion" && (
              <StyledLink to={"/sesion"}>
                <Button>Iniciar Sesión</Button>
              </StyledLink>
            )}
            {location.pathname.split("/")[1] !== "registro" && (
              <StyledLink to={"/registro"}>
                <Button>Registrarse</Button>
              </StyledLink>
            )}
          </div>
        )}
        {range && (
          <div>
            <Title fontSize="20px" color="#ff765e">
              {capitalize(range)}
            </Title>
            <Title fontSize="20px">¡Hola, {capitalize(name)}!</Title>
            {range && range !== "admin" && (
              <StyledLink to={"/planes"} className="perfil">
                Subscripción
              </StyledLink>
            )}
            {range && (
              <StyledLink to={"/perfil"} className="perfil">
                Perfil
              </StyledLink>
            )}
            <Button
              onClick={(e) => {
                logoutFunction(e);
              }}
            >
              Cerrar Sesión
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
