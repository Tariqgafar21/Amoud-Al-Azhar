const inquiryForm = document.querySelector("#inquiry-form");
const courseSelect = document.querySelector("#course-select");
const courseCards = document.querySelectorAll(".course-card[data-course]");
const formStatus = document.querySelector("#form-status");
const teacherEmail = "ahmadelbassal2@gmail.com";
const inquiryMessage = document.querySelector("#inquiry-message");
const messageCharacterCount = document.querySelector("#message-character-count");

const updateMessageCharacterCount = () => {
  messageCharacterCount.textContent = `${inquiryMessage.value.length} / ${inquiryMessage.maxLength}`;
};

inquiryMessage.addEventListener("input", updateMessageCharacterCount);

const selectCourse = (courseName) => {
  courseSelect.value = courseName;
  courseCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.course === courseName);
  });

  formStatus.textContent = `${courseName} selected. Complete the form to email an inquiry.`;
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth", block: "start" });
};

courseCards.forEach((card) => {
  card.addEventListener("click", () => selectCourse(card.dataset.course));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCourse(card.dataset.course);
    }
  });
});

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(inquiryForm);
  const name = formData.get("name") || "Not provided";
  const email = formData.get("email") || "Not provided";
  const course = formData.get("course") || "Not selected";
  const message = formData.get("message") || "No message added";

  const subject = `Course inquiry: ${course}`;
  const body = [
    "Assalamu alaykum,",
    "",
    "I would like to ask about Amoud Al-Azher Institute.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Course interest: ${course}`,
    "",
    `Message: ${message}`,
    "",
    "Jazakum Allahu khayran."
  ].join("\n");

  const gmailComposeUrl = [
    "https://mail.google.com/mail/",
    `?view=cm&fs=1&to=${encodeURIComponent(teacherEmail)}`,
    `&su=${encodeURIComponent(subject)}`,
    `&body=${encodeURIComponent(body)}`
  ].join("");

  formStatus.textContent = "Opening a prepared Gmail inquiry...";
  window.open(gmailComposeUrl, "_blank", "noopener");
});
