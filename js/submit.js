const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
let inputs = [fullName, email, subject, message];

const onChange = (e) => {
  let errorTag = document.querySelector(`#${e.target.id}error`);
  if (errorTag) {
    errorTag.remove();
  }
};

const validate = () => {
  let error = false;
  inputs.forEach((input) => {
    input.addEventListener("keydown", onChange);
    let parentElement = input.parentElement;
    let errorTag = document.querySelector(`#${input.id}error`);
    if (errorTag) return;
    let span = document.createElement("span");
    span.id = `${input.id}error`;
    span.innerText = `Required *`;
    span.style.color = `red`;
    if (input.value == "") {
      parentElement.append(span);
      error = true;
    } else error = false;
});
return error
};
const submitBtn = () => {
  let isValid = validate();
  if (isValid) return;

  let body = {
    name: fullName.value,
    email_from: email.value,
    phone: "123456",
    description: message.value,
    source_id: 15,
    active: true,
  };
  axios
    .post("https://vass-cms.vercel.app/api/odoo-crm", body)
    .then(() => {
      let timerInterval;
      Swal.fire({
        title: "Message Send",
        icon: "success",
        html: "We will  contact you shortly ",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          inputs.forEach((input) => (input.value = ""));
        }
      });
    })
    .catch(() => {
      inputs.forEach((input) => (input.value = ""));
    });
};
