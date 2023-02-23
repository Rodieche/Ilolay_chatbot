const printMenu = () => {
  let id = '17QUVy6-UPnOHYQpLmrIjdn97KtT89hBa18_cfZ913CY';
  let sheet = SpreadsheetApp.openById(id);
  let menu_page = sheet.getSheetByName("Menu");
  let opciones = menu_page.getRange("A2:Z").getValues().filter(r => r[0] != "");
  let menu_builder = "";
  let buttons = [];
  opciones.forEach((option,index) => {
    const button = {
      textButton: {
        text: option[1],
        onClick: {
          "openLink": {
            "url": option[3]
          }
        }
      }
    }
    buttons.push(button);
  });
  var widgets = [{
    textParagraph: {
      text: 'Seleccione su opcion'
    }
  }, {
    buttons: buttons
  }];
  return createCardResponse(widgets);
}