const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

let inputName = document.querySelector(".modal__input_type_name");
let inputDescription = document.querySelector(".modal__input_type_description");
let displayName = document.querySelector(".profile__name");
let displayDescription = document.querySelector(".profile__description");

const editForm = document.querySelector(".modal__form");
const editModal = document.querySelector("#edit-modal");
const editProfileBtn = document.querySelector(".profile__button-edit");
const closeProfileBtn = document.querySelector(".modal__button-exit");
const submitProfileBtn = document.querySelector(".modal__button-submit");

function updateProfile(evt) {
  evt.preventDefault();
  displayName.textContent = inputName.value;
  displayDescription.textContent = inputDescription.value;
  exitEditModal();
}

function populateFields() {
  inputName.value = displayName.textContent;
  inputDescription.value = displayDescription.textContent;
}

function openEditModal() {
  editModal.classList.add("modal_opened");
  populateFields();
}

function exitEditModal() {
  editModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card-template");
  let cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__caption-description").textContent =
    data.name;

  return cardElement;
}

function renderInitialCards() {
  for (let initialCard of initialCards) {
    let cardElement = getCardElement(initialCard);
    document.querySelector(".cards").appendChild(cardElement);
  }
}

renderInitialCards();

editProfileBtn.addEventListener("click", openEditModal);
closeProfileBtn.addEventListener("click", exitEditModal);
editForm.addEventListener("submit", updateProfile);
