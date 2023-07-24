// Recuperation DOM
// input
const inputName = document.getElementById("name");
const inputFirstName = document.getElementById("first-name");
const inputEmail = document.getElementById("email");
const inputNumberStreet = document.getElementById("number-street");
const inputStreet = document.getElementById("street-name");
const selectCity = document.getElementById("city");
const inputPostCode = document.getElementById("post-code");
const inputPassword = document.getElementById("password");
const inputPasswordConfirm = document.getElementById("password2");
const inputSubmit = document.getElementById("submit");
// div
const divName = document.getElementById("name-input");
const divFirstName = document.getElementById("first-name-input");
const divEmail = document.getElementById("mail-input");
const divNumberStreet = document.getElementById("number-street-input");
const divStreet = document.getElementById("street-name-input");
const divCity = document.getElementById("city-input");
const divPostCode = document.getElementById("post-code-input");
const divPassword = document.getElementById("password-input");
const divPasswordConfirm = document.getElementById("password2-input");

// varaible de validation
let nameValid = false;
let firstNameValid = false;
let emailValid = false;
let numberStreetValid = false;
let streetValid = false;
let cityValid = false;
let postCodeValid = false;
let passwordValid = false;
let passwordConfirmValid = false;

// Regex
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexNumberStreet = /^[0-9]+$/;
const regexPostCode = /^[0-9]{5}$/;
const regexPassword = /^(?=.*[A-Z])(?=.*[0-9]).{10,}$/;

//Fonction de generation et de suppression des message d'erreur

function generateMessageError(input, div, message) {
  if (div.children.length > 1) {
    div.removeChild(div.lastChild);
  }
  const messageError = document.createElement("p");
  messageError.classList.add("erreur");
  messageError.innerText = message;
  div.appendChild(messageError);
  input.classList.add("is-invalid");
}
function validateInput(input, div) {
  if (div.children.length > 1) {
    div.removeChild(div.lastChild);
  }
  input.classList.remove("is-invalid");
}

// Fonction de validation

function validateName() {
  if (inputName.value.length < 2 || inputName.value === "") {
    generateMessageError(
      inputName,
      divName,
      "Le nom doit contenir au moins 2 caractères"
    );
    nameValid = false;
  } else {
    validateInput(inputName, divName);
    nameValid = true;
  }
}
function validateFirstName() {
  if (inputFirstName.value.length < 2) {
    generateMessageError(
      inputFirstName,
      divFirstName,
      "Le prénom doit contenir au moins 2 caractères"
    );
    firstNameValid = false;
  } else {
    validateInput(inputFirstName, divFirstName);
    firstNameValid = true;
  }
}
function validateEmail() {
  if (!regexEmail.test(inputEmail.value)) {
    generateMessageError(inputEmail, divEmail, "Email invalide");
    emailValid = false;
  } else {
    validateInput(inputEmail, divEmail);
    emailValid = true;
  }
}
function validateNumberStreet() {
  if (!regexNumberStreet.test(inputNumberStreet.value)) {
    generateMessageError(
      inputNumberStreet,
      divNumberStreet,
      "Le numéro de rue doit être un chiffre"
    );
    numberStreetValid = false;
  } else {
    validateInput(inputNumberStreet, divNumberStreet);
    numberStreetValid = true;
  }
}
function validateStreet() {
  if (inputStreet.value.length < 2) {
    generateMessageError(
      inputStreet,
      divStreet,
      "Le nom de la rue doit contenir au moins 2 caractères"
    );
    streetValid = false;
  } else {
    validateInput(inputStreet, divStreet);
    streetValid = true;
  }
}
function validateCity() {
  if (selectCity.value === "") {
    generateMessageError(selectCity, divCity, "Veuillez saisir une ville");
    cityValid = false;
  } else {
    validateInput(selectCity, divCity);
    cityValid = true;
  }
}
function validatePostCode() {
  if (!regexPostCode.test(inputPostCode.value)) {
    generateMessageError(
      inputPostCode,
      divPostCode,
      "Le code postal doit contenir 5 chiffres"
    );
    postCodeValid = false;
  } else {
    validateInput(inputPostCode, divPostCode);
    postCodeValid = true;
  }
}
function validatePassword() {
  if (!regexPassword.test(inputPassword.value)) {
    generateMessageError(
      inputPassword,
      divPassword,
      "Le mot de passe doit contenir au moins 10 caractères dont une majuscule et un chiffre"
    );
    passwordValid = false;
  } else {
    validateInput(inputPassword, divPassword);
    passwordValid = true;
  }
}
function validatePasswordConfirm() {
  if (inputPasswordConfirm.value === "") {
    generateMessageError(
      inputPasswordConfirm,
      divPasswordConfirm,
      "Veuillez confirmer votre mot de passe"
    );
    passwordConfirmValid = false;
  } else if (inputPasswordConfirm.value !== inputPassword.value) {
    generateMessageError(
      inputPasswordConfirm,
      divPasswordConfirm,
      "Les mots de passe ne sont pas identiques"
    );
    passwordConfirmValid = false;
  } else {
    validateInput(inputPasswordConfirm, divPasswordConfirm);
    passwordConfirmValid = true;
  }
}
// generation des options de la liste déroulante via l'API

function generateOption() {
  if (postCodeValid) {
    fetch(
      "https://apicarto.ign.fr/api/codes-postaux/communes/" +
        inputPostCode.value
    ).then((response) => {
      // si le code postal n'existe pas dans l'API on affiche un message d'erreur
      if (response.status === 404) {
        generateMessageError(
          inputPostCode,
          divPostCode,
          "Code postal invalide"
        );
        postCodeValid = false;
      } else {
        response.json().then((data) => {
          selectCity.innerHTML = "";
          const option = document.createElement("option");
          option.value = "";
          option.innerText = "Ville";
          selectCity.appendChild(option);
          data.forEach((element) => {
            const option = document.createElement("option");
            option.value = element.nomCommune;
            option.innerText = element.nomCommune;
            selectCity.appendChild(option);
          });
        });
      }
    });
  }
}

// Ecouteurs d'événements pour la validation en temps réel

inputName.addEventListener("input", validateName);
inputFirstName.addEventListener("input", validateFirstName);
inputEmail.addEventListener("input", validateEmail);
inputNumberStreet.addEventListener("input", validateNumberStreet);
inputStreet.addEventListener("input", validateStreet);
inputPostCode.addEventListener("input", () => {
  validatePostCode();
  generateOption();
});
selectCity.addEventListener("input", validateCity);
inputPassword.addEventListener("input", validatePassword);
inputPasswordConfirm.addEventListener("input", validatePasswordConfirm);

// Validation du formulaire

let user = {
  name: "",
  firstName: "",
  email: "",
  numberStreet: "",
  street: "",
  city: "",
  postCode: "",
  password: "",
  passwordConfirm: "",
};

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateName();
  validateFirstName();
  validateEmail();
  validateNumberStreet();
  validateStreet();
  validatePostCode();
  validateCity();
  validatePassword();
  validatePasswordConfirm();
  if (
    nameValid &&
    firstNameValid &&
    emailValid &&
    numberStreetValid &&
    streetValid &&
    postCodeValid &&
    cityValid &&
    passwordValid &&
    passwordConfirmValid
  ) {
    user.name = inputName.value;
    user.firstName = inputFirstName.value;
    user.email = inputEmail.value;
    user.numberStreet = inputNumberStreet.value;
    user.street = inputStreet.value;
    user.city = selectCity.value;
    user.postCode = inputPostCode.value;
    user.password = inputPassword.value;
    user.passwordConfirm = inputPasswordConfirm.value;
    console.log(user);
    form.reset();
    selectCity.innerHTML = "";
    const option = document.createElement("option");
    option.value = "";
    option.innerText = "Ville";
    selectCity.appendChild(option);
  } else {
    console.log("Formulaire non validé");
  }
});
