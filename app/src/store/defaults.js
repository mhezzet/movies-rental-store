export default {
  token: localStorage.getItem('token'),
  profile: localStorage.getItem('user'),
  isAuth: !!localStorage.getItem('token')
}
