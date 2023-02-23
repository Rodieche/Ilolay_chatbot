const internos_sheet_id = "1_sGWf0zmwNgcnPK2315OA6B7YVtF8UQBoum7FMdgNuE";
const internos_sheet_name = "InternosPortal";

const insternoByNumber = (interno) => {
  const interno_sheet = SpreadsheetApp.openById(internos_sheet_id).getSheetByName(internos_sheet_name);
  const usuario = interno_sheet.getRange("A:E").getValues().filter(r => r[4] == interno);
  return (usuario.length > 0)? usuario : -1
}

const internoByUser = (data) => {
  const name_legajo = data.toString().toUpperCase();
  const interno_sheet = SpreadsheetApp.openById(internos_sheet_id).getSheetByName(internos_sheet_name);
  let usuario = interno_sheet.getRange("A:E").getValues().filter(r => r[4] != "");
  const nombres = usuario.filter(r => r[0].includes(name_legajo));
  return (nombres.length > 0)? nombres : -1;
}

const cardInfoCreator = (info) => {

  let card = [];

  info.forEach(i => {
    const data = {}
    data.name = i[0];
    data.legajo = i[1];
    data.ubicacion = i[2];
    data.puesto = i[3];
    data.interno = i[4];

    let cardInfo = {
      "cardId": "unique-card-id",
      "card": {
        "header": {
          "title": data.name,
          "subtitle": data.puesto,
          "imageUrl":
          "https://res.cloudinary.com/dxputmc7c/image/upload/v1675964640/Ilolay/favicon-32x32_ump0uf.png",
          "imageAltText": "Avatar of ilolay",
        },
        "sections": [
          {
            "header": "Contact Info",
            "collapsible": false,
            "uncollapsibleWidgetsCount": 1,
            "widgets": [
              {
                "decoratedText": {
                  "startIcon": {
                    "knownIcon": "BOOKMARK",
                  },
                  "text": data.ubicacion,
                }
              },
              {
                "decoratedText": {
                  "startIcon": {
                    "knownIcon": "PHONE",
                  },
                  "text": data.interno.toString(),
                }
              },
            ],
          },
        ],
      },
    }

    card.push(cardInfo);

  });

  return {
  "cardsV2": card,
}


}

const internosPrincipal = (info) => {
  const dato = Number(info);
  let usuarios;
  if(isNaN(dato)){
    usuarios = internoByUser(info);
  }else{
    usuarios = insternoByNumber(dato);
  }
  if(usuarios == -1){
    var widgets = [{
      "textParagraph": {
        "text": "El interno indicado no esta registrado, por favor vuelva a internarlo"
      }
    }];
    return createCardResponse(widgets);
  }
  return cardInfoCreator(usuarios);
}

