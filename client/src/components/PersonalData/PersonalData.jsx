import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";

import styles from "./PersonalData.module.css";
import { validate } from "./validate";

let datosIniniciales = {
  name: "Julian",
  lastname: "Meraviglia",
  birth: "",
  dni: 20000000,
  tel: "0340715333957",
  avatar: "",
};

console.log(localStorage.getItem("id"), "*** ID del Usuario ***");
const userId = localStorage.getItem("id");

const PersonalData = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userById);

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    birthday: "",
    dni: "",
    telephone: "",
    // avatar: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [userId]);

  useEffect(() => {
    setInput({ ...userData });
  }, [userData]);

  //, birthday: "1979-10-15"

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(postPoke(input))
    // alert('Pokemon creado.')
    datosIniniciales = input;
  }

  return (
    <form
      className={styles.container}
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
    >
      <h1 className={styles.title}>Datos</h1>

      <label className={styles.header}>Personales</label>

      <label className={styles.explain}>
        Completa con tus datos personales
      </label>

      <div className={styles.inputcontainer}>
        <label className={styles.label}>Nonbre:</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className={styles.input}
          value={input.name}
          onChange={handleChange}
        />
      </div>
      {errors.name && <span className={styles.errospan}>{errors.name}</span>}
      <div className={styles.inputcontainer}>
        <label className={styles.label}>Apellido:</label>
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          className={styles.input}
          value={input.lastName}
          onChange={handleChange}
        />
      </div>
      {errors.lastName && (
        <span className={styles.errospan}>{errors.lastName}</span>
      )}
      <div className={styles.inputcontainer}>
        <label className={styles.label}>Cumpleaños:</label>
        <input
          type="date"
          name="birthday"
          placeholder="Cumpleaños"
          className={styles.input}
          // disabled={true}
          value={input.birthday}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputcontainer}>
        <label className={styles.label}>DNI:</label>
        <input
          type="number"
          name="dni"
          placeholder="DNI"
          className={styles.input}
          value={input.dni}
          onChange={handleChange}
        />
      </div>
      {errors.dni && <span className={styles.errospan}>{errors.dni}</span>}
      <div className={styles.inputcontainer}>
        <label className={styles.label}>Telefono:</label>
        <input
          type="number"
          name="telephone"
          placeholder="Telefono"
          className={styles.input}
          value={input.telephone}
          onChange={handleChange}
        />
      </div>
      {errors.telephone && (
        <span className={styles.errospan}>{errors.telephone}</span>
      )}
      <div className={styles.inputcontainer}>
        <label className={styles.label}>Avatar:</label>
        <input
          type="text"
          name="avatar"
          placeholder="avatar"
          className={styles.input}
          value={input.avatar}
          disabled={true}
        />
      </div>
      <button
        className={styles.savebutton}
        type="submit"
        disabled={errors.button}
      >
        Guardar cambios
      </button>
    </form>
  );
};

export default PersonalData;
