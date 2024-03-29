import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUserById } from "../../redux/actions";

import altImg from "./img/alt.jpg";

import styles from "./PersonalData.module.css";
import { validate } from "./validate";
import LoginController from "../../localStorage/login";

import Loader from "../../pages/Loader/index";

import capitalize from "./../../functions/capitalize";

import Cloudinary from "../../libs/Cloudinary";
import swal from "sweetalert";

const PersonalData = () => {
  const dispatch = useDispatch();
  let userData = useSelector((state) => state.user);

  const isLoading = useSelector((state) => state.loading);

  const headers = LoginController();

  const [input, setInput] = useState({
    email: "",
    name: "",
    lastName: "",
    birthday: "",
    dni: "",
    telephone: "",
    avatar: "",
  });

  const getImagesResultsCloudinary = (images) => {
    setInput({ ...input, avatar: images });
  };

  const [errors, setErrors] = useState({});

  const userId = localStorage.getItem("id");
  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userData) {
      setInput({ ...input, ...userData });
    }
  }, [userData]);

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

    input.name = input.name.toLowerCase();
    input.lastName = input.lastName.toLowerCase();

    dispatch(updateUserById(userId, input, headers));
    // alert("Datos personales actualizados.");

    swal({
      title: "Cambios en datos personales.",
      text: "Datos personales actualizados con exito.",
      icon: "success",
      button: "Aceptar",
      // timer: "2000",
    }).then(function(){

      dispatch(getUserById(userId));
      localStorage.setItem("name", input.name);
      localStorage.setItem("last-name", input.lastName);
    })

  }

  return (
    <div className={styles.fullContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              <label className={styles.label}>Nombre:</label>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                className={styles.input}
                value={capitalize(input.name)}
                onChange={handleChange}
              />
            </div>
            {errors.name && (
              <span className={styles.errospan}>{errors.name}</span>
            )}
            <div className={styles.inputcontainer}>
              <label className={styles.label}>Apellido:</label>

              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                className={styles.input}
                value={capitalize(input.lastName)}
                onChange={handleChange}
              />
            </div>
            {errors.lastName && (
              <span className={styles.errospan}>{errors.lastName}</span>
            )}
            {/* <div className={styles.inputcontainer}>
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
      </div> */}

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
            {errors.dni && (
              <span className={styles.errospan}>{errors.dni}</span>
            )}
            <div className={styles.inputcontainer}>
              <label className={styles.label}>Teléfono:</label>
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
              <label className={styles.label}>Foto de perfil:</label>

              <Cloudinary getImages={getImagesResultsCloudinary} />
            </div>
            <img
              src={userData.avatar || altImg}
              alt="Sube tu Avatar/Foto"
              className={styles.avatarContainer}
            />
            <button
              className={styles.savebutton}
              type="submit"
              disabled={errors.button}
            >
              Guardar cambios
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PersonalData;
