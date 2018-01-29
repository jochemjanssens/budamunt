const url = `/api/organisations`;

export default {

  select: (token = ``) => {

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    return fetch(`${url}?isActive=true`, {headers})
      .then(r => r.json())
      .catch(err => console.error(err));

  },

  insert: (userId, organisatie, type, street, city) => {

    const method = `POST`;
    const body = new FormData();
    body.append(`userId`, userId);
    body.append(`organisatie`, organisatie);
    body.append(`type`, type);
    body.append(`street`, street);
    body.append(`city`, city);

    return fetch(url, {method, body})
      .then(r => r.json())
      .catch(err => console.error(err));
  }


};
