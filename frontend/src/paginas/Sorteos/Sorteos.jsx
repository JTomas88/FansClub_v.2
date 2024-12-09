/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/AppContext";
import { useNavigate } from "react-router-dom";
import { Jumbotron } from "../../componentes/Jumbotron/Jumbotron";
import jumbo_sorteos from "../../assets/imagenes_jumbotron/Jumbo_sorteos.png"
import styles from "./sorteos.module.css"


export const Sorteos = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [datoUsuario, setDatoUsuario] = useState({})


  useEffect(() => {
    actions.obtenerSorteos();
  }, [])

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || !userData.token || !userData.email) {
        navigate('/home');
      } else {
        setDatoUsuario(userData);
      }
    } catch (error) {
      console.error('Error al obtener datos de localStorage:', error);
      navigate('/home');
    }
  }, []);

  const participarEnSorteo = async (sorteoID) => {
    const userID = datoUsuario?.id;

    try {
      await actions.participarEnSorteo(sorteoID, userID);
      alert("Se ha recibido tu participación en el sorteo!");
    } catch (error) {
      alert('Hay un problema con tu participación')
    }
  }



  return (
    <>
      <Jumbotron
        imagenFondo={{
          backgroundImage: `url(${jumbo_sorteos})`,
          backgroundPosition: "center 20%",
        }}
        subtitulo={"Tal vez sólo hay sombras y formas"}
        referencia={"foto"}
      ></Jumbotron>
      <div className="container justify-content-center align-items-center text-center">
        <div className={`${styles.titulo}`}>
          <h1 className={`${styles.titulo}`}>SORTEOS</h1>
        </div>
      </div>

      {/* Contenedor de sorteos */}
      <div
        className={`container d-flex flex-column align-items-start ${styles.tarjeta}`}
        style={{ color: "black" }}
      >
        {store.sorteos && store.sorteos.length > 0 ? (
          store.sorteos.map((sorteo, index) => (
            <div
              key={index}
              className={`${styles.contenedor} p-4 mb-5`}
              style={{
                width: "80%",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                position: "relative",
                paddingBottom: "60px",
              }}
            >

              <div className="row mb-3">
                <div
                  className="col-6"
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingRight: "10px",
                  }}
                >
                  {/* Nombre sorteo */}
                  <h2 className={styles.titular}>{sorteo.sorNombre}</h2>
                  <hr></hr>

                  {/* Periodo participación */}
                  <h4>Periodo para participar</h4>
                  <p>
                    <strong>Fecha Inicio: </strong>
                    {new Date(sorteo.sorFechaInicio).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha Fin: </strong>
                    {new Date(sorteo.sorFechaFin).toLocaleDateString()}
                  </p>

                  {/* Descripción del sorteo */}
                  <h4>Detalles del sorteo</h4>
                  <p className="text-muted">{sorteo.sorDescripcion}</p>
                </div>

                {/* IMAGENES */}
                <div className="col">
                  {sorteo.sorImagen && sorteo.sorImagen.length > 0 ? (
                    (() => {
                      const imagenesSeparadas = sorteo.sorImagen
                        .split(",")
                        .map((img) => img.trim());
                      const recuentoImagenes = imagenesSeparadas.length;

                      if (recuentoImagenes === 1) {
                        return (
                          <div className="d-flex justify-content-center">
                            <img
                              alt="imagen promocional"
                              src={imagenesSeparadas[0]}
                              className="img-fluid mb-5"
                              style={{
                                maxHeight: "400px",
                                objectFit: "cover",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                        );
                      } else if (recuentoImagenes === 2) {
                        return (
                          <div className="d-flex">
                            {imagenesSeparadas.map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                alt={`imagen promocional ${imgIndex + 1}`}
                                src={img}
                                className="img-fluid mb-3 me-2"
                                style={{
                                  width: "48%",
                                  height: "auto",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            ))}
                          </div>
                        );
                      } else if (recuentoImagenes === 3) {
                        return (
                          <div className="d-flex flex-wrap">
                            {imagenesSeparadas.map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                alt={`imagen promocional ${imgIndex + 1}`}
                                src={img}
                                className="img-fluid mb-3 me-2"
                                style={{
                                  width: imgIndex === 0 ? "100%" : "48%",
                                  height: "auto",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            ))}
                          </div>
                        );
                      } else if (recuentoImagenes === 4) {
                        return (
                          <div className="d-flex flex-wrap justify-content-between">
                            {imagenesSeparadas.map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                alt={`imagen promocional ${imgIndex + 1}`}
                                src={img}
                                className="img-fluid mb-3"
                                style={{
                                  width: "48%",
                                  height: "auto",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            ))}
                          </div>
                        );
                      }
                    })()
                  ) : (
                    <p className="text-muted">No hay imágenes disponibles</p>
                  )}
                </div>
              </div>
              <button
                className={styles.flotante}
                onClick={() => participarEnSorteo(sorteo.sorId)}
              >
                Participar
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">No hay entrevistas disponibles.</p>
        )}
      </div>
    </>
  );
}