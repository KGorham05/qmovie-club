$(document).ready(function() {
  // Getting references to our form and inputs
  const loginForm = $("form.login-form");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input"); // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log("login form submit function");
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // LoginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/auth/login", {
      email,
      password,
    })
    .then(function() {
      window.location.replace("/members");
    })
    .catch(function(err) {
      console.log(err);
    });
  }
});
