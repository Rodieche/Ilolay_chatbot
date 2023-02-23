const printDefault= (text) => {
  text = (text)? text: 'No entendi muy bien lo que quisiste decir, ingresa la palabra *Menu* para continuar';
  var widgets = [{
    "textParagraph": {
      "text": text
    }
  }];
  return createCardResponse(widgets);
}