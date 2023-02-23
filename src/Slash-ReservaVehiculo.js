const vehicule_id = '1Cqs3P0ASoss_2ZE1tE7eYfmDbxHKsIGcoixfLAhGXAU';

const getEmpresas = () => {
  const sheet = SpreadsheetApp.openById(vehicule_id);
  const empresas = sheet.getSheetByName("Empresas").getRange("A2:A").getValues().filter(r => r[0] != "").map(r => r[0]);
  return empresas;
}

const getUbicaciones = () => {
  const sheet = SpreadsheetApp.openById(vehicule_id);
  const ubicaciones = sheet.getSheetByName("Ubicaciones").getRange("A2:A").getValues().filter(r => r[0] != "").map(r => r[0]);
  return ubicaciones;
}

const getVehiculos = (empresa = "ilolay", ubicacion = "rafaela") => {
  const sheet = SpreadsheetApp.openById(vehicule_id);
  const vehiculos = sheet.getSheetByName("Vehiculos").getRange("A2:E").getValues().filter(r => (r[0] == ubicacion && r[4] == empresa));
  return vehiculos;
}