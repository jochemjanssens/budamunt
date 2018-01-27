const url = `/api/auth`;

export default {

  auth: (email, password) => {

    const method = `POST`;
    const body = new FormData();

    body.append(`login`, email);
    body.append(`password`, password);
    body.append(`audience`, `tweets-frontend`);

    return fetch(url, {method, body})
      .then(r => r.json())
      .catch(err => console.error(err));
  }


};
