// UI Selectors
const tableBody = document.querySelector(".table-body");

// Form Data
const authForm = document.querySelector("#auth-form");
const hmo_id = document.querySelector("#HMO_Id");
const options = document.querySelectorAll("option");
const policy_number = document.querySelector("#policy_number");
const hospital_id = document.querySelector("#hospital_id");
const claim_id = document.querySelector("#claim_id");
const member_number = document.querySelector("#member_number");
const diagnosis = document.querySelector("#diagnosis");
const narration = document.querySelector("#narration");
const item = document.querySelector("#item");

const addRequestBtn = document.querySelector("#add-request");

// Items List
const itemList = document.querySelector(".collection-items");

// Output List
const listOutput = document.querySelector(".list-output");

itemList.style.display = "none";

// SINGLE AUTH REQUEST VIEW AND UPDATE
// Form Data
const authForm_readonly = document.querySelector("#auth-form_readonly");
const hmo_id_readonly = document.querySelector("#HMO_Id_readonly");
const policy_number_readonly = document.querySelector(
  "#policy_number_readonly"
);
const hospital_id_readonly = document.querySelector("#hospital_id_readonly");
const claim_id_readonly = document.querySelector("#claim_id_readonly");
const member_number_readonly = document.querySelector(
  "#member_number_readonly"
);
const diagnosis_readonly = document.querySelector("#diagnosis_readonly");
const narration_readonly = document.querySelector("#narration_readonly");
const item_readonly = document.querySelector("#item_readonly");

// Output List
const listOutputReadonly = document.querySelector(".list-output_readonly");

// UPDATE AND DELETE REQUEST BTNs
const updateRequestBtn = document.querySelectorAll("#update-btn");
const deleteRequestBtn = document.querySelectorAll("#delete-btn");

// Add items to Array then save to localStorage
const items = [];

const addItemsToArray = value => {
  const itemObject = {
    ItemName: value
  };
  items.push(itemObject);
  // Set Item Field to empty
  item.value = "";

  if (localStorage.getItem("items") != null) {
    //  Save Items to Storage
    localStorage.setItem("items", JSON.stringify(items));
  } else if (localStorage.getItem("items") == null) {
    //  Save Items to Storage
    localStorage.setItem("items", JSON.stringify(items));
  }
};

item.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    addItemsToArray(item.value);
    // Get Items from Storage
    let itemFromStorage = JSON.parse(localStorage.getItem("items"));
    // Show List
    itemList.style.display = "block";
    // Create List Data
    const li = document.createElement("li");
    li.className = "collection-item";
    // Iterate Through Output
    itemFromStorage.forEach(item => {
      li.textContent = item.ItemName;
      listOutput.appendChild(li);
    });
  }
});

// Populate Table with GET request from API

const url = `https://bimini-app.herokuapp.com/api/v1/bimini/auth`;
let tableList = "";

async function getAuthRequests() {
  try {
    const authRequests = await fetch(url);
    const res = await authRequests.json();
    const listData = res.data;

    listData.forEach(list_data => {
      if (list_data.status == null) {
        list_data.status = "Pending";
      }

      let tableData = `
    <tr data-id="${list_data.id}">
        <td>${list_data.hmo_id}</td>
        <td>${list_data.hospital_id}</td>
        <td>${list_data.claim_id}</td>
        <td>${list_data.policy_number}</td>
        <td>${list_data.member_number}</td>
        <td>${list_data.status}</td>
        <td><a class="btn red lighten-1 select-id" href="#" id="view-btn">View</a></td>
    </tr>
`;

      tableList += tableData;

      tableBody.innerHTML = tableList;
    });

    // VIEW BTN ON TABLE
    const viewBtn = document.querySelectorAll("#view-btn");

    const modal_in = document.querySelector("#modal2");

    const modalInstance = M.Modal.getInstance(modal_in);

    viewBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.parentElement.parentElement.dataset.id;
        let url = `https://bimini-app.herokuapp.com/api/v1/bimini/auth/${id}`;

        // View Single Request
        const fetchSingleData = () => {
          fetch(url)
            .then(res => res.json())
            .then(usableData => {
              if (usableData.status == "success") {
                let data = usableData.data;

                localStorage.setItem("auth-request", JSON.stringify(data));

                let request = JSON.parse(localStorage.getItem("auth-request"));

                let items = request.items;
                // Create List Data
                let li_data = "";
                // Iterate Through Output
                items.forEach(item => {
                  let outputList;
                  if (item == null) {
                    outputList = "";
                  } else {
                    outputList = `
                                <li class="collection-item">${item.ItemName}</li>
                            `;
                  }
                  li_data += outputList;
                  listOutputReadonly.innerHTML = li_data;
                });

                setTimeout(() => {
                  hmo_id_readonly.value = request.hmo_id;
                  hospital_id_readonly.value = request.hospital_id;
                  claim_id_readonly.value = request.claim_id;
                  policy_number_readonly.value = request.policy_number;
                  member_number_readonly.value = request.member_number;
                  narration_readonly.value = request.narration;
                  diagnosis_readonly.value = request.diagnosis;

                  M.updateTextFields();
                  M.textareaAutoResize($("#diagnosis_readonly"));
                  M.textareaAutoResize($("#narration_readonly"));
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

getAuthRequests();

// Get Form Data and Send New Request (POST)
let optionValue = "";
function getValueFromOption() {
  const value = hmo_id.options[hmo_id.selectedIndex].value;
  optionValue = value;
}

hmo_id.addEventListener("change", () => {
  getValueFromOption();
});

const authRequestData = JSON.parse(localStorage.getItem("auth-request"));

// POST A REQUEST
const postRequest = formData => {
  fetch(url, {
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

addRequestBtn.addEventListener("click", () => {
  const formData = {
    claim_id: claim_id.value,
    policy_number: policy_number.value,
    member_number: member_number.value,
    hospital_id: hospital_id.value,
    hmo_id: optionValue,
    diagnosis: diagnosis.value,
    narration: narration.value,
    items: JSON.parse(localStorage.getItem("items"))
  };
  postRequest(formData);
});

// UPDATE A REQUEST
const updateID = authRequestData.id;
const requestArr = authRequestData.items;

const updateRequest = (formData, id) => {
  fetch(`${url}/${id}`, {
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

const addItemsToUpdateArray = value => {
  const itemObject = {
    ItemName: value
  };
  items.push(itemObject);
  // Set Item Field to empty
  item_readonly.value = "";

  if (localStorage.getItem("single_items") != null) {
    //  Save Items to Storage
    localStorage.setItem("single_items", JSON.stringify(items));
  } else if (localStorage.getItem("single_items") == null) {
    //  Save Items to Storage
    localStorage.setItem("single_items", JSON.stringify(items));
  }
};

item_readonly.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    addItemsToUpdateArray(item_readonly.value);
    // Get Items from Storage
    let itemFromStorage = JSON.parse(localStorage.getItem("single_items"));
    // Show List
    itemList.style.display = "block";
    // Create List Data
    const li = document.createElement("li");
    li.className = "collection-item";
    // Iterate Through Output
    itemFromStorage.forEach(item => {
      li.textContent = item.ItemName;
      listOutputReadonly.appendChild(li);
    });
  }
});

// Update a single Request
document.addEventListener("click", e => {
  const formData = {
    claim_id: claim_id_readonly.value,
    policy_number: policy_number_readonly.value,
    member_number: member_number_readonly.value,
    hospital_id: hospital_id_readonly.value,
    hmo_id: hmo_id_readonly.value,
    diagnosis: diagnosis_readonly.value,
    narration: narration_readonly.value,
    items: requestArr.concat(JSON.parse(localStorage.getItem("single_items")))
  };
  if (e.target.parentElement.classList.contains("left-side-btn")) {
    if (e.target.classList.contains("update-btn")) {
      //   console.log(formData);
      updateRequest(formData, updateID);
    }
  }
});

// DELETE A REQUEST
const deleteID = authRequestData.id;

const deleteRequest = id => {
  fetch(`${url}/${id}`, {
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
