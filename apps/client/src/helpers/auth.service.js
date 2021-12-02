class AuthService {
  getAccessToken() {
    const user = JSON.parse(localStorage.getItem("app"));
    return user?.auth.token;
  }

  get() {
    return JSON.parse(localStorage.getItem("app"));
  }

  set(user) {
    localStorage.setItem("app", JSON.stringify(user));
  }

  remove() {
    localStorage.removeItem("app");
    window.location.reload();
  }
}

export default new AuthService();
