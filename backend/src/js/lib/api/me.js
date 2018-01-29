const url = `/api/me`;

export default {

  select: (token = ``) => {

    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });

    return fetch(`${url}?isActive=true`, {headers})
      .then(r => r.json())
      .catch(err => console.error(err));

  }
};
