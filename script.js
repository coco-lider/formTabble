document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-section");
  const addButton = form.querySelector(".btn-success");
  const tableBody = document.querySelector("tbody");
  const loader = document.querySelector(".loader");

  function loadData() {
    loader.style.display = "block";
    fetch("https://6800f5c881c7e9fbcc41017b.mockapi.io/crud")
      .then((res) => res.json())
      .then((data) => {
        tableBody.innerHTML = "";
        data.forEach((item, index) => {
          const tr = document.createElement("tr");

          const createTd = (label, text) => {
            const td = document.createElement("td");
            td.setAttribute("data-label", label);
            td.textContent = text;
            return td;
          };

          tr.appendChild(createTd("No", index + 1));
          tr.appendChild(createTd("Ism", item.ism));
          tr.appendChild(createTd("Familiya", item.familiya));
          tr.appendChild(createTd("Manzil", item.manzil));
          tr.appendChild(createTd("Tug'ilgan kuni", item.tugilgan_kuni));
          tr.appendChild(createTd("Lavozim", item.lavozim));
          tr.appendChild(createTd("Lavozim turi", item.lavozim_turi));
          tr.appendChild(createTd("Maoshi", item.maosh));
          tr.appendChild(createTd("Uylanganmi", item.uylanganmi));
          tr.appendChild(createTd("Faoliyat", item.faoliyat));

          tableBody.appendChild(tr);
        });
      })
      .catch((err) => {
        console.error("Ma'lumotlarni olishda xatolik:", err);
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }

  loadData();

  addButton.addEventListener("click", function () {
    const inputs = form.querySelectorAll("input");
    const selects = form.querySelectorAll("select");

    const name = inputs[0].value;
    const surname = inputs[1].value;
    const birthDate = inputs[2].value;
    const address = selects[0].value;
    const position = selects[1].value;
    const positionType = selects[2].value;
    const salary = inputs[3].value;
    const married = selects[3].value;
    const activity = selects[4].value;

    if (
      name &&
      surname &&
      birthDate &&
      address &&
      position &&
      positionType &&
      salary &&
      married &&
      activity
    ) {
      const data = {
        ism: name,
        familiya: surname,
        tugilgan_kuni: birthDate,
        manzil: address,
        lavozim: position,
        lavozim_turi: positionType,
        maosh: salary,
        uylanganmi: married,
        faoliyat: activity,
      };

      fetch("https://6800f5c881c7e9fbcc41017b.mockapi.io/crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          loadData();
          inputs.forEach((input) => (input.value = ""));
          selects.forEach((select) => (select.selectedIndex = 0));
        })
        .catch((err) => {
          alert("Xatolik: " + err);
          console.error(err);
        });
    } else {
      alert("Barcha maydonlarni to'ldiring.");
    }
  });
});
