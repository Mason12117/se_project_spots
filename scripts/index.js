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
const closeViewBtn = viewModal.querySelector(".post__exit-btn");

const viewedImage = viewModal.querySelector(".post__image");
const viewedCaption = viewModal.querySelector(".post__caption");

const cards = document.querySelector(".cards");

function updateProfile(event) {
  event.preventDefault();
  displayName.textContent = inputName.value;
  displayDescription.textContent = inputDescription.value;
  closeModal(editModal);
}

function populateProfileFields() {
  inputName.value = displayName.textContent;
  inputDescription.value = displayDescription.textContent;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
  closeModal(postModal);
}

initialCards.forEach(function (initialCard) {
  let cardElement = getCardElement(initialCard);
  cards.appendChild(cardElement);
});

editProfileBtn.addEventListener("click", function () {
  openModal(editModal);
  populateProfileFields();
});
closeProfileBtn.addEventListener("click", function () {
  closeModal(editModal);
});
editForm.addEventListener("submit", updateProfile);

newPostBtn.addEventListener("click", function () {
  openModal(postModal);
});
closePostBtn.addEventListener("click", function () {
  closeModal(postModal);
});
postForm.addEventListener("submit", addPost);

closeViewBtn.addEventListener("click", function () {
  closeModal(viewModal);
});
