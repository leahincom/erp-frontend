// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const check = typeof window === 'undefined' ? false : !window.localStorage ? false : true;

export const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // headers: {
  //   'x-auth-token': check && localStorage.getItem('userToken'),
  // },
});
