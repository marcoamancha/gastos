import React from 'react'

export const Mensaje = ({msj, tipo}) => {
  return (
  <div className={`alerta ${tipo}`}>{msj}</div>
  )
}
