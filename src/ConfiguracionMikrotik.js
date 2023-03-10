const mikrotik_config_id = "1IbS1z1ub_Jz7Ojt-sbPjzP524I472FmS5JJ5oV3-6ZE";

const getSteps = () => {
  const ConfigFile = SpreadsheetApp.openById(mikrotik_config_id);
  const configuraciones = ConfigFile.getSheetByName("Configuraciones").getRange("A2:D").getValues().filter(r => r[0] != "");
  return configuraciones;
}

const cardStepCreatorMikrotik = (step = 0, steps = []) => {

  const configuraciones = (steps.length > 0)? steps : getSteps();
  const next = (step < configuraciones.length - 1)? step + 1 : null;
  const prev = (step > 0)? step - 1 : null;
  const link = (configuraciones[step][3])? configuraciones[step][3] : null; 
  
  const cardHeader = {
    title: `Paso ${configuraciones[step][0]} de ${configuraciones.length} de la configuracion de Mikrotik`,
  };

  const avatarWidget = {
    textParagraph: {text: `${configuraciones[step][1]}`},
  };

  const avatarImageWidget = (configuraciones[step][2])?{
    image: {
      imageUrl: configuraciones[step][2]
    }
  }: null;

  const ButtonPrev = {
    "text": "Paso anterior",
    "onClick": {
      "action": {
        "function": "cardStepCreatorMikrotik",
        "parameters":[{
          key: 'step',
          value: `${prev}` 
        },{
          key: 'steper',
          value: `${JSON.stringify(configuraciones)}`
        }]
      }
    }
  }

  const ButtonNext = {
    "text": "Paso siguiente",
    "onClick": {
      "action": {
        "function": "cardStepCreatorMikrotik",
        "parameters":[{
          key: "step",
          value: `${next}`
        },{
          key: 'steper',
          value: `${JSON.stringify(configuraciones)}`
        }]
      }
    }
  }

  const ButtonLink = {
    "text": "Enlace",
    "onClick": {
      "openLink": {
        "url": `${configuraciones[step][3]}`
      }
    }
  }

  const buttonList = {
    "buttonList": {
      buttons: [
        (prev)? ButtonPrev : null,
        (link)? ButtonLink: null,
        (next)? ButtonNext: null
      ]
    }
  }

  const divider = {
    "divider": {}
  }

  const avatarSection = {
    widgets: [
      avatarWidget,
      (avatarImageWidget)? avatarImageWidget : null,
      divider,
      buttonList,
    ],
  };

  return {
    cardsV2: [{
      cardId: 'avatarCard',
      card: {
        name: 'Avatar Card',
        header: cardHeader,
        sections: [avatarSection],
      }
    }],
  };


}

