const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.success) {
    localStorage.setItem("student", JSON.stringify(result.student));

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      timer: 1500,
      showConfirmButton: false,
    });

    window.location.href = "/dashboard.html";
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
    });
  }
});
