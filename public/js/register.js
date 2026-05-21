const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    fullname: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    matric_number: document.getElementById("matric").value,
    password: document.getElementById("password").value,
  };

  if (data.password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Weak Password",
      text: "Password must be at least 6 characters",
    });

    return;
  }
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  Swal.fire({
    icon: "success",
    title: "Success",
  });

  if (result.message === "Registration successful") {
    window.location.href = "/login.html";
  }
});
