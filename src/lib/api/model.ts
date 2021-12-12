import axios from 'axios';

export const MODELURL = 'http://35.224.89.32:5000';

export default axios.create({
  baseURL: MODELURL,
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
  },
});
