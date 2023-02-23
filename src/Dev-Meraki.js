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

const getDevices = (organization_id) => {
  const url = `/organizations/${organization_id}/devices`;
  let devices = UrlFetchApp.fetch(`${baseUrl}${url}`,HeadersOptions).getContentText();
  devices = JSON.parse(devices);
  return devices;
}

const getPortStatusBySwitch = (serial = "Q2DX-BPQV-CSYD") => {
  const url = `/devices/${serial}/switch/ports/statuses`;
  let ports = UrlFetchApp.fetch(`${baseUrl}${url}`,HeadersOptions).getContentText();
  ports = JSON.parse(ports);
  return ports
}