// UI Selectors
const tableBody = document.querySelector(".table-body");
// Test table
const testTable = document.querySelector(".test-table");
const testTable_read = document.querySelector(".test-table-readonly");

const testTableBody = document.querySelector(".test-table-body");
const testTableBody_read = document.querySelector(".test-table-body-readonly");

// Treatment Table
const treatmentTable = document.querySelector(".treatment-table");
const treatmentTable_read = document.querySelector(".treatment-table-readonly");

const treatmentTableBody = document.querySelector(".treatment-table-body");
const treatmentTableBody_read = document.querySelector(
  ".treatment-table-body-readonly"
);

// Medications Table
const medTable = document.querySelector(".medication-table");
const medTable_read = document.querySelector(".medication-table-readonly");

const medTableBody = document.querySelector(".medication-table-body");
const medTableBody_read = document.querySelector(
  ".medication-table-body-readonly"
);

// Form Data
const claimForm = document.querySelector("#claim-form");
const hmo_id = document.querySelector("#HMO_Id");
const options = document.querySelectorAll("option");
const policy_number = document.querySelector("#policy_number");
const hospital_id = document.querySelector("#hospital_id");
const claim_id = document.querySelector("#claim_id");
const member_number = document.querySelector("#member_number");

// Readonly FormData
const claimForm_readonly = document.querySelector("#claim-form_readonly");
const hmo_id_readonly = document.querySelector("#HMO_Id_readonly");
// const options_readonly = document.querySelectorAll("option_readonly");
const policy_number_readonly = document.querySelector(
  "#policy_number_readonly"
);
const hospital_id_readonly = document.querySelector("#hospital_id_readonly");
const claim_id_readonly = document.querySelector("#claim_id_readonly");
const member_number_readonly = document.querySelector(
  "#member_number_readonly"
);

// Tests - Name, unit cost and No of units
const testName = document.querySelector("#test-name");
const testName_read = document.querySelector("#test-name-readonly");

const testCost = document.querySelector("#test-unit-cost");
const testCost_read = document.querySelector("#test-unit-cost-readonly");

const testUnits = document.querySelector("#test-units");
const testUnits_read = document.querySelector("#test-units-readonly");

// Treatment - Name, unit cost and No of units
const treatmentName = document.querySelector("#treatment-name");
const treatmentName_read = document.querySelector("#treatment-name-readonly");

const treatmentCost = document.querySelector("#treatment-unit-cost");
const treatmentCost_read = document.querySelector(
  "#treatment-unit-cost-readonly"
);

const treatmentUnits = document.querySelector("#treatment-units");
const treatmentUnits_read = document.querySelector("#treatment-units-readonly");

// Treatment - Name, unit cost and No of units
const medicationName = document.querySelector("#medication-name");
const medicationName_read = document.querySelector("#medication-name-readonly");

const medicationCost = document.querySelector("#medication-unit-cost");
const medicationCost_read = document.querySelector(
  "#medication-unit-cost-readonly"
);

const medicationUnits = document.querySelector("#medication-units");
const medicationUnits_read = document.querySelector(
  "#medication-units-readonly"
);

const addClaimBtn = document.querySelector("#add-claim");
const addClaimRequest = document.querySelector("#add-claim-request");

// Test Section
const addTest = document.querySelector("#add-test");
const updateTest = document.querySelector("#add-test-readonly");
// Treatment Section
const addTreatment = document.querySelector("#add-treatment");
const updateTreatment = document.querySelector("#add-treatment-readonly");
// Medication   Section
const addMedication = document.querySelector("#add-medication");
const updateMedication = document.querySelector("#add-medication-readonly");
// ...
testTable.classList.add("hide");
// testTable_read.classList.add("hide");
// ...
treatmentTable.classList.add("hide");
// treatmentTable_read.classList.add("hide");
// ...
medTable.classList.add("hide");
// medTable_read.classList.add("hide");

// Add items to Array then save to localStorage
const items = [];
const treatments = [];
const medications = [];

// Add Tests
const addTestToClaimsArray = (name, cost, units) => {
  const claimTests = {
    name: name,
    unit_cost: cost,
    units: units
  };
  items.push(claimTests);
  // Set Item Field to empty
  testName.value = "";
  testCost.value = "";
  testUnits.value = "";

  if (localStorage.getItem("claims_test") != null) {
    //  Save claims to Storage
    localStorage.setItem("claims_test", JSON.stringify(items));
  } else if (localStorage.getItem("claims_test") == null) {
    //  Save claims to Storage
    localStorage.setItem("claims_test", JSON.stringify(items));
  }
};

addTest.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    addTestToClaimsArray(testName.value, testCost.value, testUnits.value);

    const tests = JSON.parse(localStorage.getItem("claims_test"));
    // Show Table
    testTable.classList.remove("hide");
    // testTable.classList.add("show");
    //   Table Elements
    testTableBody;
    const tt_row = testTableBody.insertRow();
    const testName_cell = tt_row.insertCell();
    const testCost_cell = tt_row.insertCell();
    const testUnits_cell = tt_row.insertCell();

    tests.forEach(test => {
      testName_cell.innerHTML = test.name;
      testCost_cell.innerHTML = `&#8358; ${test.unit_cost}`;
      testUnits_cell.innerHTML = test.units;
    });
  }
});

// Add Treatments
const addTreatmentToClaimsArray = (name, cost, units) => {
  const claimTreatment = {
    name: name,
    unit_cost: cost,
    units: units
  };
  treatments.push(claimTreatment);
  // Set Item Field to empty
  treatmentName.value = "";
  treatmentCost.value = "";
  treatmentUnits.value = "";

  if (localStorage.getItem("claims_treatment") != null) {
    //  Save claims to Storage
    localStorage.setItem("claims_treatment", JSON.stringify(treatments));
  } else if (localStorage.getItem("claims_treatment") == null) {
    //  Save claims to Storage
    localStorage.setItem("claims_treatment", JSON.stringify(treatments));
  }
};

addTreatment.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    addTreatmentToClaimsArray(
      treatmentName.value,
      treatmentCost.value,
      treatmentUnits.value
    );

    const treatments = JSON.parse(localStorage.getItem("claims_treatment"));
    // Show Table
    treatmentTable.classList.remove("hide");
    // treatmentTable.classList.add("show");
    //   Table Elements
    treatmentTableBody;
    const tt_row = treatmentTableBody.insertRow();
    const treatmentName_cell = tt_row.insertCell();
    const treatmentCost_cell = tt_row.insertCell();
    const treatmentUnits_cell = tt_row.insertCell();

    treatments.forEach(treatment => {
      treatmentName_cell.innerHTML = treatment.name;
      treatmentCost_cell.innerHTML = `&#8358; ${treatment.unit_cost}`;
      treatmentUnits_cell.innerHTML = treatment.units;
    });
  }
});

// Add Medications
const addMedicationToClaimsArray = (name, cost, units) => {
  const claimMedication = {
    name: name,
    unit_cost: cost,
    units: units
  };
  medications.push(claimMedication);
  // Set Item Field to empty
  medicationName.value = "";
  medicationCost.value = "";
  medicationUnits.value = "";

  if (localStorage.getItem("claims_medication") != null) {
    //  Save claims to Storage
    localStorage.setItem("claims_medication", JSON.stringify(medications));
  } else if (localStorage.getItem("claims_medication") == null) {
    //  Save claims to Storage
    localStorage.setItem("claims_medication", JSON.stringify(medications));
  }
};

addMedication.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    addMedicationToClaimsArray(
      medicationName.value,
      medicationCost.value,
      medicationUnits.value
    );

    const medications = JSON.parse(localStorage.getItem("claims_medication"));
    // Show Table
    medTable.classList.remove("hide");
    // medTable.classList.add("show");
    //   Table Elements
    medTableBody;
    const tt_row = medTableBody.insertRow();
    const medicationName_cell = tt_row.insertCell();
    const medicationCost_cell = tt_row.insertCell();
    const medicationUnits_cell = tt_row.insertCell();

    medications.forEach(medication => {
      medicationName_cell.innerHTML = medication.name;
      medicationCost_cell.innerHTML = `&#8358; ${medication.unit_cost}`;
      medicationUnits_cell.innerHTML = medication.units;
    });
  }
});

// Show Tables
const showTablesBtn = document.querySelector("#show-table");
const showTables = () => {
  // Show Table
  if (testTable.classList.contains("hide")) {
    showTablesBtn.textContent = "Hide Tables";
    testTable.classList.remove("hide");
    testTable.classList.add("show");
  } else {
    showTablesBtn.textContent = "Show Tables";
    testTable.classList.add("hide");
  }
  //    Treatment
  if (treatmentTable.classList.contains("hide")) {
    showTablesBtn.textContent = "Hide Tables";
    treatmentTable.classList.remove("hide");
    treatmentTable.classList.add("show");
  } else {
    showTablesBtn.textContent = "Show Tables";
    treatmentTable.classList.add("hide");
  }
  //   //   Med Table
  if (medTable.classList.contains("hide")) {
    showTablesBtn.textContent = "Hide Tables";
    medTable.classList.remove("hide");
    medTable.classList.add("show");
  } else {
    showTablesBtn.textContent = "Show Tables";
    medTable.classList.add("hide");
  }
};

showTablesBtn.addEventListener("click", () => {
  showTables();
});

// Populate Table with GET request from API

const claimUrl = `https://bimini-app.herokuapp.com/api/v1/bimini/claim`;
let tableList = "";

async function getClaimsRequest() {
  try {
    const claimRequest = await fetch(claimUrl);
    const res = await claimRequest.json();
    if (res.status == "success") {
      M.toast({ html: res.message });
    }
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

    // ...

    viewBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.parentElement.parentElement.dataset.id;
        let url = `https://bimini-app.herokuapp.com/api/v1/bimini/claim/${id}`;

        // View Single Request
        const fetchSingleData = () => {
          fetch(url)
            .then(res => res.json())
            .then(usableData => {
              if (usableData.status == "success") {
                let data = usableData.data;

                localStorage.setItem("claim-request", JSON.stringify(data));

                let request = JSON.parse(localStorage.getItem("claim-request"));

                let claims = request.claim;
                if (claims !== null) {
                  let tests = claims.tests;
                  let treatments = claims.treatments;
                  let medications = claims.medications;

                  // Create List Data
                  let table_data_test = "";
                  let table_data_treatment = "";
                  let table_data_med = "";

                  setTimeout(() => {
                    hmo_id_readonly.value = request.hmo_id;
                    hospital_id_readonly.value = request.hospital_id;
                    claim_id_readonly.value = request.claim_id;
                    policy_number_readonly.value = request.policy_number;
                    member_number_readonly.value = request.member_number;

                    // Test
                    tests.forEach(test => {
                      let outputList;
                      if (test == null) {
                        outputList = "";
                      } else {
                        outputList = `
                        <tr data-id="">
                            <td>${test.Name}</td>
                            <td>&#8358; ${test.Unit_Cost}</td>
                            <td>${test.Units}</td>
                        </tr>
                    `;
                      }
                      table_data_test += outputList;
                      testTableBody_read.innerHTML = table_data_test;
                    });
                    // Treatment
                    treatments.forEach(treatment => {
                      let outputList;
                      if (treatment == null) {
                        outputList = "";
                      } else {
                        outputList = `
                        <tr data-id="">
                            <td>${treatment.Name}</td>
                            <td>&#8358; ${treatment.Unit_Cost}</td>
                            <td>${treatment.Units}</td>
                        </tr>
                    `;
                      }
                      table_data_treatment += outputList;
                      treatmentTableBody_read.innerHTML = table_data_treatment;
                    });
                    // Medication
                    medications.forEach(medication => {
                      let outputList;
                      if (medication == null) {
                        outputList = "";
                      } else {
                        outputList = `
                        <tr data-id="">
                            <td>${medication.Name}</td>
                            <td>&#8358; ${medication.Unit_Cost}</td>
                            <td>${medication.Units}</td>
                        </tr>
                    `;
                      }
                      table_data_med += outputList;
                      medTableBody_read.innerHTML = table_data_med;
                    });

                    M.updateTextFields();
                    modalInstance.open();
                  }, 1500);
                }
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

getClaimsRequest();

// Get Form Data and Send New Request (POST)
let optionValue = "";
function getValueFromOption() {
  const value = hmo_id.options[hmo_id.selectedIndex].value;
  optionValue = value;
}

hmo_id.addEventListener("change", () => {
  getValueFromOption();
});

const claimRequestData = JSON.parse(localStorage.getItem("claim-request"));

// POST A REQUEST
const postRequest = formData => {
  fetch(claimUrl, {
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

addClaimRequest.addEventListener("click", () => {
  const formData = {
    policy_number: policy_number.value,
    claim_id: claim_id.value,
    member_number: member_number.value,
    hospital_id: hospital_id.value,
    hmo_id: optionValue,
    claim: {
      tests: JSON.parse(localStorage.getItem("claims_test")),
      treatments: JSON.parse(localStorage.getItem("claims_treatment")),
      medications: JSON.parse(localStorage.getItem("claims_medication"))
    }
  };
  postRequest(formData);
  // console.log(formData);
});

// Update
// UPDATE A REQUEST
const updateID = claimRequestData.id;
const requestArr = claimRequestData.items;

const updateRequest = (formData, id) => {
  fetch(`${claimUrl}/${id}`, {
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

// Update Tests
const updateTestToClaimsArray = (name, cost, units) => {
  const updateClaimTests = {
    name: name,
    unit_cost: cost,
    units: units
  };
  items.push(updateClaimTests);
  // Set Item Field to empty
  testName_read.value = "";
  testCost_read.value = "";
  testUnits_read.value = "";

  if (localStorage.getItem("claims_test_update") != null) {
    //  Save claims to Storage
    localStorage.setItem("claims_test_update", JSON.stringify(items));
  } else if (localStorage.getItem("claims_test_update") == null) {
    //  Save claims to Storage
    localStorage.setItem("claims_test_update", JSON.stringify(items));
  }
};

updateTest.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    updateTestToClaimsArray(
      testName_read.value,
      testCost_read.value,
      testUnits_read.value
    );

    const tests = JSON.parse(localStorage.getItem("claims_test_update"));
    // Show Table
    testTable_read.classList.remove("hide");
    // testTable.classList.add("show");
    //   Table Elements
    testTableBody;
    const tt_row = testTableBody_read.insertRow();
    const testName_cell = tt_row.insertCell();
    const testCost_cell = tt_row.insertCell();
    const testUnits_cell = tt_row.insertCell();

    tests.forEach(test => {
      testName_cell.innerHTML = test.name;
      testCost_cell.innerHTML = `&#8358; ${test.unit_cost}`;
      testUnits_cell.innerHTML = test.units;
    });
  }
});

// Update Treatments
updateTreatmentToClaimsArray = (name, cost, units) => {
  const updateClaimTreatment = {
    name: name,
    unit_cost: cost,
    units: units
  };
  treatments.push(updateClaimTreatment);
  // Set Item Field to empty
  treatmentName_read.value = "";
  treatmentCost_read.value = "";
  treatmentUnits_read.value = "";

  if (localStorage.getItem("claims_treatment_update") != null) {
    //  Save claims to Storage
    localStorage.setItem("claims_treatment_update", JSON.stringify(treatments));
  } else if (localStorage.getItem("claims_treatment_update") == null) {
    //  Save claims to Storage
    localStorage.setItem("claims_treatment_update", JSON.stringify(treatments));
  }
};

updateTreatment.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    updateTreatmentToClaimsArray(
      treatmentName.value,
      treatmentCost.value,
      treatmentUnits.value
    );

    const treatments = JSON.parse(
      localStorage.getItem("claims_treatment_update")
    );
    // Show Table
    treatmentTable_read.classList.remove("hide");
    // treatmentTable.classList.add("show");
    //   Table Elements
    treatmentTableBody;
    const tt_row = treatmentTableBody_read.insertRow();
    const treatmentName_cell = tt_row.insertCell();
    const treatmentCost_cell = tt_row.insertCell();
    const treatmentUnits_cell = tt_row.insertCell();

    treatments.forEach(treatment => {
      treatmentName_cell.innerHTML = treatment.name;
      treatmentCost_cell.innerHTML = `&#8358; ${treatment.unit_cost}`;
      treatmentUnits_cell.innerHTML = treatment.units;
    });
  }
});

// Update Medications
const updateMedicationToClaimsArray = (name, cost, units) => {
  const updateClaimMedication = {
    name: name,
    unit_cost: cost,
    units: units
  };
  medications.push(updateClaimMedication);
  // Set Item Field to empty
  medicationName_read.value = "";
  medicationCost_read.value = "";
  medicationUnits_read.value = "";

  if (localStorage.getItem("claims_medication_update") != null) {
    //  Save claims to Storage
    localStorage.setItem(
      "claims_medication_update",
      JSON.stringify(medications)
    );
  } else if (localStorage.getItem("claims_medication_update") == null) {
    //  Save claims to Storage
    localStorage.setItem(
      "claims_medication_update",
      JSON.stringify(medications)
    );
  }
};

updateMedication.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    updateMedicationToClaimsArray(
      medicationName.value,
      medicationCost.value,
      medicationUnits.value
    );

    const medications = JSON.parse(
      localStorage.getItem("claims_medication_update")
    );
    // Show Table
    medTable_read.classList.remove("hide");
    // medTable.classList.add("show");
    //   Table Elements
    medTableBody;
    const tt_row = medTableBody_read.insertRow();
    const medicationName_cell = tt_row.insertCell();
    const medicationCost_cell = tt_row.insertCell();
    const medicationUnits_cell = tt_row.insertCell();

    medications.forEach(medication => {
      medicationName_cell.innerHTML = medication.name;
      medicationCost_cell.innerHTML = `&#8358; ${medication.unit_cost}`;
      medicationUnits_cell.innerHTML = medication.units;
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
    claim: {
      tests: JSON.parse(localStorage.getItem("claims_test_update")),
      treatments: JSON.parse(localStorage.getItem("claims_treatment_update")),
      medications: JSON.parse(localStorage.getItem("claims_medication_update"))
    }
    // items: requestArr.concat(JSON.parse(localStorage.getItem("single_items")))
  };
  if (e.target.parentElement.classList.contains("left-side-btn")) {
    if (e.target.classList.contains("update-btn")) {
      //   console.log(formData);
      updateRequest(formData, updateID);
    }
  }
});

// DELETE A REQUEST
const deleteID = claimRequestData.id;

const deleteRequest = id => {
  fetch(`${claimUrl}/${id}`, {
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
