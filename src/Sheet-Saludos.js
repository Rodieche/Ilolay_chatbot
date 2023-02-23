const ObtenerSaludos = () => {
  const id = '17QUVy6-UPnOHYQpLmrIjdn97KtT89hBa18_cfZ913CY';
  const sheet = SpreadsheetApp.openById(id);
  const hoja_saludos = sheet.getSheetByName("Saludos");
  const saludos = hoja_saludos.getRange("A2:B").getValues().filter(r => r[0] != "");
  const req = saludos.map(r => r[0]);
  const res = saludos.map(r => r[1]);
  return {
    request: req,
    response: res
  }
}

const verificarSaludo = (texto) => {
  const saludos = ObtenerSaludos();
  if(saludos.request.includes(texto)){
    const index = saludos.request.indexOf(texto);
    return saludos.response[index];
  }
  return false;
}