import { useState, useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import { Mensaje } from "./Mensaje";

import { generarId } from "../helpers";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  gastos,
  setGastos,
  gastoEditar,
  setGastoEditar,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
    }
  }, []);

  const handleCerrar = () => {
    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  const handleModal = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
      return;
    }

    const gastosObj = {
      id: generarId(),
      fecha: Date.now(),
      nombre,
      cantidad,
      categoria,
    };
    if (gastoEditar.id) {
      //Editar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gastoEditar.id ? gastosObj : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      setGastos([...gastos, gastosObj]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="Cerrar" onClick={handleCerrar} />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"} `}
        onSubmit={handleModal}
      >
        <legend> {gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"} </legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el Nombre del Gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Cunato vas a gastar"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro"> Ahorro </option>
            <option value="comida"> Comida </option>
            <option value="casa"> Casa </option>
            <option value="gastos"> Gastos Varios </option>
            <option value="ocio"> Ocio </option>
            <option value="salud"> Salud </option>
            <option value="suscripciones"> Suscripciones </option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? "Editar Gasto" : "Guardar Gasto"}
        />
      </form>
      {mensaje && <Mensaje msj={mensaje} tipo="error" />}
    </div>
  );
};

export default Modal;
