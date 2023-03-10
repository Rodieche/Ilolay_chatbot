const ApiKey = '9dd72ff6ecfa41723deffb45b8a3b79975863b02';
const baseUrl = 'https://api.meraki.com/api/v1';
const HeadersOptions = {
  'headers': {
    'X-Cisco-Meraki-API-Key': ApiKey
  }
}

const getOrganizations = () => {
  const url = '/organizations'
  let organizations = UrlFetchApp.fetch(`${baseUrl}${url}`,HeadersOptions).getContentText();
  organizations = JSON.parse(organizations)[0];
  return organizations;
}

const getDevices = (organization_id = "980490") => {
  const url = `/organizations/${organization_id}/devices`;
  let devices = UrlFetchApp.fetch(`${baseUrl}${url}`,HeadersOptions).getContentText();
  devices = JSON.parse(devices);
  return devices;
}

const getPortStatusBySwitch = (serial = "Q2DX-BPQV-CSYD") => {
  const url = `/devices/${serial}/switch/ports`;
  let ports = UrlFetchApp.fetch(`${baseUrl}${url}`,HeadersOptions).getContentText();
  ports = JSON.parse(ports);
  return ports
}

const getNetworks = (organization_id = "980490") => {
  const url = `/organizations/${organization_id}/networks`;
  let networks = UrlFetchApp.fetch(`${baseUrl}${url}`,HeadersOptions).getContentText();
  networks = JSON.parse(networks);
  return networks;
}

const clientsbyNetwork = (network_id) => {
  const url = `/networks/${network_id}/clients`;
  const perPage = 1000
  let clients = UrlFetchApp.fetch(`${baseUrl}${url}?perPage=${perPage}`,HeadersOptions).getContentText();
  clients = JSON.parse(clients);
//  console.log(clients);
  return clients
}

// ==========================================================================================================

const cardMerakiListSwitch = (switchList = []) => {
  
  const cardHeader = {
    title: "Seleccion de Switch"
  };

  const avatarWidget = {
    textParagraph: {text: `Seleccione el Switch`},
  };

  const selectWidget = {
    selectionInput: {
      "name": "Lista de Switches",
      "label": "Switch",
      "type": "DROPDOWN",
      "items": switchList.map(r =>  {
        return {
          "text": r['name'],
          "value": r['serial'],
          "selected": false,
        }
      }),
      "onChangeAction": {
        "function": "cardMerakiPorts",
        "persistValues": true,
        "loadIndicator": "SPINNER"
      }
    }
  }

  const avatarSection = {
    widgets: [
      avatarWidget,
      selectWidget
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

// ===================================================================================================

const cardMerakiPorts = (serial) => {
  const ports = getPortStatusBySwitch(serial);

  //console.log(ports);

  const cardHeader = {
    title: "Lista de Puertos"
  };

  const gridWidget = {
    "grid": {
      "title": "Puertos",
      "items": ports.map(r => {
        return {
          "title": `Puerto: ${r['portId']} | Name: ${r['name']} | Enabled: ${r['enabled']} | Tipo: ${r['type']} | VLAN: ${r['vlan']}`,
          "textAlignment": "LEFT"
        }
      }),
      "borderStyle": {
        "type": "STROKE"
      }
    }
  }

  const avatarSection = {
    widgets: [
      gridWidget
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

// ====================================================================================================

const mainMeraki = () => {
  const organizations = getOrganizations();
  const switches = getDevices(organizations.id);
  return cardMerakiListSwitch(switches);
}

// =====================================================================================================

const findUser = (infoUser = "64:00:6a:11:d2:ac") => {
  const organizations = getOrganizations();
  const networks = getNetworks(organizations.id);
  const bella_italia_id = networks.filter(r => r['name'] == "Bella Italia")[0]['id'];
  let clients = clientsbyNetwork(bella_italia_id);
  clients = clients.filter(r => r['mac'] == infoUser || r['ip'] == infoUser || r['description'] == infoUser)
  console.log(clients);
  return clients
}