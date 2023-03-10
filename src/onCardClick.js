function onCardClick(event){

  if(event.action.actionMethodName == "cardStepCreatorMikrotik" ){
    const step = Number(event.action.parameters[0].value);
    const steper = JSON.parse(event.action.parameters[1].value)
    return cardStepCreatorMikrotik(step, steper);
  }

  if(event.action.actionMethodName == "cardMerakiPorts" ){
    const serial = event.common.formInputs['Lista de Switches']['']['stringInputs'].value[0];
    return cardMerakiPorts(serial);
  }
}