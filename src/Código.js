function onMessage(event) {
  const texto = event.message.text;

  // SI INGRESAR UN COMANDO SLASH
  if (event.message.slashCommand) {
    switch (event.message.slashCommand.commandId) {
      case 1:  //menu
        return printMenu();
      case 2: //telegram
        let message2 = texto.replace('/telegram',""); 
        return sendTelegramMessage(event.user.displayName,message2);
      case 3: //interno
        let message3 = texto.replace('/interno ',"");
        return internosPrincipal(message3);
    }
  }

  // SI INGRESA UN TEXTO COMUN
  switch (texto.toLowerCase()) {
    case "menu":
      return printMenu();
    case "mikrotik":
      return cardStepCreatorMikrotik();
    case "meraki":
      return mainMeraki();
    default :
      const respuesta = verificarSaludo(texto.toLowerCase());
      return respuesta? printDefault(respuesta) : printDefault(); 
  }
}

