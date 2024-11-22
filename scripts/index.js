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

const editForm = document.querySelector('[name="edit-profile"]');
const editModal = document.querySelector("#edit-modal");
const editProfileBtn = document.querySelector(".profile__button-edit");
const closeProfileBtn = document.querySelector(".modal__button-exit");
const submitProfileBtn = document.querySelector(".modal__button-submit");

const inputLink = document.querySelector(".modal__input_type_link");
const inputCaption = document.querySelector(".modal__input_type_caption");

const postForm = document.querySelector('[name="new-post"]');
const postModal = document.querySelector("#post-modal");
const newPostBtn = document.querySelector(".profile__button-add");
const closePostBtn = postModal.querySelector(".modal__button-exit");
const submitPostBtn = postModal.querySelector(".modal__button-submit");

const viewModal = document.querySelector("#view-modal");
const closeViewBtn = viewModal.querySelector(".post__exit-btn");

const cards = document.querySelector(".cards");

function updateProfile(event) {
  event.preventDefault();
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

function openNewModal() {
  const postLinkInput = postModal.querySelector(".modal__input_type_link");
  const postCaptionInput = postModal.querySelector(
    ".modal__input_type_caption"
  );

  postLinkInput.value = "";
  postCaptionInput.value = "";
  postModal.classList.add("modal_opened");
}

function exitNewModal() {
  postModal.classList.remove("modal_opened");
}

function openViewModal(event) {
  const selectedCard = event.target.closest(".card");
  const selectedImage = selectedCard.querySelector(".card__image");
  const selectedCaption = selectedCard.querySelector(
    ".card__caption-description"
  );
  const viewedImage = viewModal.querySelector(".post__image");
  const viewedCaption = viewModal.querySelector(".post__caption");

  viewedImage.src = selectedImage.src;
  viewedImage.alt = selectedCaption.textContent;

  viewedCaption.textContent = selectedCaption.textContent;

  viewModal.classList.add("modal_opened");
}

function closeViewModal() {
  viewModal.classList.remove("modal_opened");
}

function toggleLike(event) {
  let likeBtn = event.target;
  if (!likeBtn.classList.contains("like-btn")) {
    likeBtn = likeBtn.closest(".like-btn");
  }
  let likeIcon = likeBtn.querySelector(".like-icon");

  likeBtn.classList.toggle("card__like-btn_not-liked");
  likeBtn.classList.toggle("card__like-btn_is-liked");

  likeIcon.classList.toggle("card__like-icon_not-liked");
  likeIcon.classList.toggle("card__like-icon_is-liked");

  if (likeIcon.classList.contains("card__like-icon_not-liked")) {
    likeIcon.src = "images/like-icon.svg";
    likeIcon.alt = "Like icon";
  } else {
    likeIcon.src = "images/liked-icon.svg";
    likeIcon.alt = "Liked";
  }
}

function deleteCard(event) {
  const cardElement = event.target.closest(".card");

  if (cardElement) {
    cardElement.remove();
  }
}

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card-template");
  let cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__caption-description").textContent =
    data.name;

  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", deleteCard);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", openViewModal);

  const likeBtn = cardElement.querySelector(".like-btn");
  likeBtn.addEventListener("click", toggleLike);

  return cardElement;
}

function addPost(event) {
  event.preventDefault();

  const cardTemplate = document.querySelector("#card-template");
  const newCard = cardTemplate.content.cloneNode(true);

  const caption = inputCaption.value;

  newCard.querySelector(".card__image").src = inputLink.value;
  newCard.querySelector(".card__image").alt = caption;
  newCard.querySelector(".card__caption-description").textContent = caption;

  const deleteBtn = newCard.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", deleteCard);

  const cardImage = newCard.querySelector(".card__image");
  cardImage.addEventListener("click", openViewModal);

  const likeBtn = newCard.querySelector(".like-btn");
  likeBtn.addEventListener("click", toggleLike);

  cards.prepend(newCard);

  exitNewModal();
}

initialCards.forEach(function (initialCard) {
  let cardElement = getCardElement(initialCard);
  cards.appendChild(cardElement);
});

editProfileBtn.addEventListener("click", openEditModal);
closeProfileBtn.addEventListener("click", exitEditModal);
editForm.addEventListener("submit", updateProfile);

newPostBtn.addEventListener("click", openNewModal);
closePostBtn.addEventListener("click", exitNewModal);
postForm.addEventListener("submit", addPost);

closeViewBtn.addEventListener("click", closeViewModal);
