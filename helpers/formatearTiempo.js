const formatearTiempo = (fecha) => {
  // en segundos
  const segundos = Math.floor((new Date() - fecha) / 1000);

  // en minutos
  const minutos = Math.floor(segundos / 60);

  if (minutos < 1) {
    return "Hace unos segundos";
  }

  if (minutos < 60) {
    return `Hace ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
  }

  // en horas
  const horas = Math.floor(minutos / 60);

  if (horas < 24) {
    return `Hace ${horas} ${horas === 1 ? "hora" : "horas"}`;
  }

  // en dias
  const dias = Math.floor(horas / 24);

  if (dias < 7) {
    return `Hace ${dias} ${dias === 1 ? "dia" : "dias"}`;
  }

  // en semanas
  const semanas = Math.floor(dias / 7);

  if (semanas < 4) {
    return `Hace ${semanas} ${semanas === 1 ? "semana" : "semanas"}`;
  }

  // en meses
  const meses = Math.floor(semanas / 4);

  if (meses < 12) {
    return `Hace ${meses} ${meses === 1 ? "mes" : "meses"}`;
  }

  // en años
  const años = Math.floor(meses / 12);

  return `Hace ${años} ${años === 1 ? "año" : "años"}`;
};

export default formatearTiempo;
