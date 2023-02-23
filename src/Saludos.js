/**
 * FUNCION QUE CORRE CUANDO SE AÑADE EL BOT A UN ESPACIO O A UNA CONVERSACION
 */

function onAddToSpace(event) {
  var message = "";
  if (event.space.singleUserBotDm) {
    message = `Hola, ${event.user.displayName}, un gusto saludarte, por favor ingresa la palabra *Menu* o presiona en el + (a la izquierda) para mostrarte las opciones!`;
  } else {
    message = `Gracias por incluirme en su conversacion en ${event.space.displayName ? event.space.displayName : "este chat"}`;
  }

  if (event.message) {
    // Bot added through @mention.
    message = message + " y me dijiste: \"" + event.message.text + "\"";
  }

  return { "text": message };
}

/**
 * FUNCION QUE CORRE CUANDO SE ELIMINA AL BOT DEL ESPACIO
 */

const onRemoveFromSpace = (event) => {
  console.info("Bot removed from ",
      (event.space.name ? event.space.name : "this chat"));
}