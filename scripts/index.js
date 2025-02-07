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

let editBool = true;

const inputName = document.querySelector(".modal__input_type_name");
const inputDescription = document.querySelector(
  ".modal__input_type_description"
);
const displayName = document.querySelector(".profile__name");
const displayDescription = document.querySelector(".profile__description");

const editForm = document.forms["edit-profile"];
const editModal = document.querySelector("#edit-modal");
const editProfileBtn = document.querySelector(".profile__button-edit");
const closeProfileBtn = document.querySelector(".modal__button-exit");
const submitProfileBtn = document.querySelector(".modal__button-submit");

const inputLink = document.querySelector(".modal__input_type_link");
const inputCaption = document.querySelector(".modal__input_type_caption");

const postForm = document.forms["new-post"];
const postModal = document.querySelector("#post-modal");
const newPostBtn = document.querySelector(".profile__button-add");
const closePostBtn = postModal.querySelector(".modal__button-exit");
const submitPostBtn = postModal.querySelector(".modal__button-submit");

const viewModal = document.querySelector("#view-modal");
const closeViewBtn = viewModal.querySelector(".modal__button-exit");

const viewedImage = viewModal.querySelector(".post__image");
const viewedCaption = viewModal.querySelector(".post__caption");

const cards = document.querySelector(".cards");

const closeBtns = document.querySelectorAll(".modal__button-exit");

closeBtns.forEach(function (closeBtn) {
  closeBtn.addEventListener("click", function () {
    editBool = false;
    closeModal();
  });
});

function updateProfile(event) {
  event.preventDefault();
  displayName.textContent = inputName.value;
  displayDescription.textContent = inputDescription.value;
  editBool = true;
  closeModal();
  editBool = false;
}

function populateProfileFields() {
  if (editBool) {
    inputName.value = displayName.textContent;
    inputDescription.value = displayDescription.textContent;

    const inputList = [inputName, inputDescription];
    const buttonElement = editForm.querySelector(".modal__button-submit");
    toggleButtonState(inputList, buttonElement, settings);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", keyModalClosure);
  modal.addEventListener("click", overlayModalClosure);
  const modalContainer = modal.querySelector(".modal__container");
  if (modalContainer) {
    modalContainer.addEventListener("click", (evt) => {
      evt.stopPropagation();
    });
  }
}

function closeModal() {
  const openedModal = document.querySelector(".modal_opened");
  openedModal.classList.remove("modal_opened");
  document.removeEventListener("keydown", keyModalClosure);
  openedModal.removeEventListener("click", overlayModalClosure);
}

function keyModalClosure(evt) {
  if (evt.key === "Escape") {
    editBool = false;
    closeModal();
  }
}

function overlayModalClosure(evt) {
  editBool = false;
  closeModal();
}

function openViewModal(event) {
  const selectedCard = event.target.closest(".card");
  const selectedImage = selectedCard.querySelector(".card__image");
  const selectedCaption = selectedCard.querySelector(
    ".card__caption-description"
  );

  viewedImage.src = selectedImage.src;
  viewedImage.alt = selectedCaption.textContent;

  viewedCaption.textContent = selectedCaption.textContent;

  openModal(viewModal);
}

function toggleLike(event) {
  event.target.classList.toggle("card__like-btn_is-liked");
}

function deleteCard(event) {
  const cardElement = event.target.closest(".card");

  if (cardElement) {
    cardElement.remove();
  }
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__caption-description").textContent =
    data.name;

  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", deleteCard);

  cardImage.addEventListener("click", openViewModal);

  const likeBtn = cardElement.querySelector(".like-btn");
  likeBtn.addEventListener("click", toggleLike);

  return cardElement;
}

function addPost(event) {
  event.preventDefault();

  const postData = {
    name: inputCaption.value,
    link: inputLink.value,
  };

  const post = getCardElement(postData);
  cards.prepend(post);

  inputLink.value = "";
  inputCaption.value = "";
  closeModal();
}

initialCards.forEach(function (initialCard) {
  const cardElement = getCardElement(initialCard);
  cards.appendChild(cardElement);
});

editProfileBtn.addEventListener("click", function () {
  openModal(editModal);
  populateProfileFields();
});
editForm.addEventListener("submit", updateProfile);

newPostBtn.addEventListener("click", function () {
  openModal(postModal);
});
postForm.addEventListener("submit", addPost);
