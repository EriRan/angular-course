export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  }

  login() {
    console.log("Logged in");
    this.loggedIn = true;
  }

  logout() {
    console.log("Logged out");
    this.loggedIn = false;
  }
}
