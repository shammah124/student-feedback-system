const complaintForm = document.getElementById("complaintForm");

complaintForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = JSON.parse(localStorage.getItem("student"));

  const data = {
    student_id: student.id,
    category: document.getElementById("category").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const response = await fetch("/api/complaints/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  Swal.fire({
    icon: "success",
    title: "Complaint Submitted",
    text: result.message,
  });

  complaintForm.reset();
});
