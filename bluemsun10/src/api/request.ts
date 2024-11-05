import axios from 'axios';
 
const request = axios.create({
  baseURL: 'http://106.54.24.243:8080/',
  timeout: 60000,
  headers: {
    'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxODUxOTA0NDkyMDI4MDQ3MzYyIiwicm5TdHIiOiJxZkdxV1BENWRnOFpKRlRZMHdUZ1hJU3dtQ3hBNEdDYiIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MTg1MTkwNDQ5MjAyODA0NzM2MiwidXNlck5hbWUiOiIyMDIzMDE0MDg5IiwiZGVwdElkIjoxODQ4MTk3NTg4MTU2MTUzODU3LCJkZXB0TmFtZSI6IuacrOmDqOagoeWMuiIsImRlcHRDYXRlZ29yeSI6IiJ9.-qBJSYIro3Zq7BBpyuRD_LIP6pmQtQrB8KHk3qyxzIs',
    'clientId': 'e5cd7e4891bf95d1d19206ce24a7b32e'
  }
});
 
export default request;