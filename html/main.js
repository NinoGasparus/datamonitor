const IP = "http://127.0.0.1:6969/"

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const loginClose = document.getElementById('login-close');
    const loginContent = document.getElementById('login-content');

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        loginContent.classList.add("show-login");
      });
    }

    if (loginClose) {
      loginClose.addEventListener('click', () => {
        loginContent.classList.remove('show-login');
      });
    }
  });


