let DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/dxputmc7c/image/upload/v1675964640/Ilolay/favicon-32x32_ump0uf.png';
let HEADER = {
  header: {
    title : 'Chat Bot Sistemas y Tecnologia',
    imageUrl : DEFAULT_IMAGE_URL
  }
};

function createCardResponse(widgets) {
  return {
    cards: [HEADER, {
      sections: [{
        widgets: widgets
      }]
    }]
  };
}