// Form Data
const enrollmentForm = document.querySelector("#enrollment-form");
const hmo_id = document.querySelector("#HMO_Id");
const policy_number = document.querySelector("#policy_number");
const hospital_id = document.querySelector("#hospital_id");
const member_number = document.querySelector("#member_number");

// SINGLE AUTH REQUEST VIEW AND UPDATE
// Form Data
const enrollmentForm_readonly = document.querySelector(
  "#enrollment-form_readonly"
);
const hmo_id_readonly = document.querySelector("#HMO_Id_readonly");
const policy_number_readonly = document.querySelector(
  "#policy_number_readonly"
);
const hospital_id_readonly = document.querySelector("#hospital_id_readonly");
const member_number_readonly = document.querySelector(
  "#member_number_readonly"
);

// Add Enrollment Button
const addEnrollmentBtn = document.querySelector("#add-enrollment");
const addEnrollmentRequest = document.querySelector("#add-enrollment-request");

// Table
const enrollmentTable = document.querySelector(".enrollment-table");
const enrollmentTableBody = document.querySelector(".enrollment-table-body");

// Populate Table with GET request from API

const enrollmentUrl = `https://bimini-app.herokuapp.com/api/v1/bimini/enrollment`;
let tableList = "";

async function getEnrollmentRequest() {
  try {
    const enrollmentRequest = await fetch(enrollmentUrl);
    const res = await enrollmentRequest.json();
    if (res.status == "success") {
      M.toast({ html: res.message });
    }
    const listData = res.data;

    if (listData !== null) {
      listData.forEach(list_data => {
        if (list_data.status == null) {
          list_data.status = "Pending";
        }

        let tableData = `
                <tr data-id="${list_data.id}">
                    <td>${list_data.hmo_id}</td>
                    <td>${list_data.hospital_id}</td>
                    <td>${list_data.policy_number}</td>
                    <td>${list_data.member_number}</td>
                    <td>${list_data.status}</td>
                    <td><a class="btn red lighten-1 select-id" href="#" id="view-btn">View</a></td>
                </tr>
            `;

        tableList += tableData;

        enrollmentTableBody.innerHTML = tableList;
      });
    }

    // VIEW BTN ON TABLE
    const viewBtn = document.querySelectorAll("#view-btn");

    const modal_in = document.querySelector("#modal2");

    const modalInstance = M.Modal.getInstance(modal_in);

    // ...

    viewBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.parentElement.parentElement.dataset.id;
        let url = `https://bimini-app.herokuapp.com/api/v1/bimini/enrollment/${id}`;

        // View Single Request
        const fetchSingleData = () => {
          fetch(url)
            .then(res => res.json())
            .then(usableData => {
              if (usableData.status == "success") {
                let data = usableData.data;

                localStorage.setItem(
                  "enrollment-request",
                  JSON.stringify(data)
                );

                let request = JSON.parse(
                  localStorage.getItem("enrollment-request")
                );
                setTimeout(() => {
                  hmo_id_readonly.value = request.hmo_id;
                  hospital_id_readonly.value = request.hospital_id;
                  policy_number_readonly.value = request.policy_number;
                  member_number_readonly.value = request.member_number;

                  M.updateTextFields();
                  modalInstance.open();
                }, 1500);
              }
            });
        };

        setTimeout(() => {
          fetchSingleData();
        }, 1000);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

getEnrollmentRequest();

// Get Form Data and Send New Request (POST)
let optionValue = "";
function getValueFromOption() {
  const value = hmo_id.options[hmo_id.selectedIndex].value;
  optionValue = value;
}

hmo_id.addEventListener("change", () => {
  getValueFromOption();
});

// POST ENROLLMENT REQ
const enrollmentRequestData = JSON.parse(
  localStorage.getItem("enrollment-request")
);

// POST A REQUEST
const postRequest = formData => {
  fetch(enrollmentUrl, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status == "success") {
        M.toast({ html: data.message });
        window.location.reload();
      }
    });
};

addEnrollmentRequest.addEventListener("click", () => {
  const formData = {
    policy_number: policy_number.value,
    member_number: member_number.value,
    hospital_id: hospital_id.value,
    hmo_id: optionValue
  };
  postRequest(formData);
  //   console.log(formData);
});

// UPDATE A REQUEST
const enrollmentID = enrollmentRequestData.id;

const updateRequest = (formData, id) => {
  fetch(`${enrollmentUrl}/${id}`, {
    headers: {
      "content-type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status == "success") {
        M.toast({ html: data.message });
        window.location.reload();
      }
    });
};

// Update a single Request
document.addEventListener("click", e => {
  const formData = {
    policy_number: policy_number_readonly.value,
    member_number: member_number_readonly.value,
    hospital_id: hospital_id_readonly.value,
    hmo_id: hmo_id_readonly.value
  };
  if (e.target.parentElement.classList.contains("left-side-btn")) {
    if (e.target.classList.contains("update-btn")) {
      updateRequest(formData, enrollmentID);
    }
  }
});

// DELETE A REQUEST
const deleteID = enrollmentRequestData.id;

const deleteRequest = id => {
  fetch(`${enrollmentUrl}/${id}`, {
    headers: {
      "content-type": "application/json"
    },
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      if (data.status == "success") {
        M.toast({ html: data.message });
        window.location.reload();
      }
    });
};

// deleteRequest(3);
// Update a single Request
document.addEventListener("click", e => {
  if (e.target.parentElement.classList.contains("left-side-btn")) {
    if (e.target.classList.contains("delete-btn")) {
      deleteRequest(deleteID);
    }
  }
});
