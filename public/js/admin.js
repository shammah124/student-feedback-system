if (!localStorage.getItem("adminLoggedIn")) {
  window.location.href = "/admin-login.html";
}

async function loadComplaints() {
  const response = await fetch("/api/admin/complaints");

  const complaints = await response.json();
  document.getElementById("totalComplaints").innerText = complaints.length;

  const table = document.getElementById("adminComplaintTable");

  table.innerHTML = "";

  const searchValue =
    document.getElementById("searchInput")?.value?.toLowerCase() || "";

  const filteredComplaints = complaints.filter(
    (c) =>
      c.subject.toLowerCase().includes(searchValue) ||
      c.category.toLowerCase().includes(searchValue),
  );

  filteredComplaints.forEach((complaint) => {
    table.innerHTML += `
            <tr>

                <td>${complaint.id}</td>

                <td>${complaint.fullname}</td>
                
                <td>${complaint.matric_number}</td>

                <td>${complaint.category}</td>

                <td>${complaint.subject}</td>

                <td>${complaint.message}</td>

                <td>

                    <select id="status-${complaint.id}"
                        class="form-control">

                        <option value="Pending"
                            ${complaint.status === "Pending" ? "selected" : ""}>
                            Pending
                        </option>

                        <option value="In Progress"
                            ${complaint.status === "In Progress" ? "selected" : ""}>
                            In Progress
                        </option>

                        <option value="Resolved"
                            ${complaint.status === "Resolved" ? "selected" : ""}>
                            Resolved
                        </option>

                    </select>

                </td>

                <td>

                    <textarea
                        id="response-${complaint.id}"
                        class="form-control"
                        rows="2"
                    >${complaint.admin_response || ""}</textarea>

                </td>

                <td>

                    <button
                        class="btn btn-success btn-sm"
                        onclick="updateComplaint(${complaint.id})"
                    >
                        Update
                    </button>

                </td>

            </tr>
        `;
    if (complaints.length === 0) {
      table.innerHTML = `
        <tr>
            <td colspan="8" class="text-center">
                No complaints available
            </td>
        </tr>
    `;

      return;
    }
  });
}

async function updateComplaint(id) {
  const status = document.getElementById(`status-${id}`).value;

  const admin_response = document.getElementById(`response-${id}`).value;

  const response = await fetch(`/api/admin/complaints/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      admin_response,
    }),
  });

  const result = await response.json();

  Swal.fire({
    text: result.message,
  });

  loadComplaints();
}

loadComplaints();
