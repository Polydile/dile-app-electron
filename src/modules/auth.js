import axios from "axios";

export const auth = () => {
  axios.post('http://localhost/api/auth/register', {
    name: 'Miguel',
    email: 'kk3@example.com',
    password: '1234qwer',
  })
    .then( (res) => {
      console.log(res.data);
    })
    .catch( err => console.log(err.response.data.errors) );
}

export const login = async () => {
  try {
    const res = await axios.post('http://localhost/api/auth/login', {
      name: 'Miguel',
      email: 'kk3@example.com',
      password: '1234qwer',
    })
    return res.data;
  } catch(err){
    console.log(err.response.data.errors);
  }
}