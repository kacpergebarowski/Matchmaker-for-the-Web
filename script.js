// Constants
const IDEAL_ANSWERS = [5, 4, 5, 4, 3];
const QUESTIONS = [
  "I enjoy trying new foods.",
  "I like staying up late.",
  "Traveling is very important to me.",
  "I enjoy outdoor activities.",
  "I like planning things in advance."
];

const TRUE_LOVE_THRESHOLD = 85;
const FRIEND_THRESHOLD = 60;
const POINTS_PER_DIFFERENCE = 5;

// Validate function required by assignment
function validate(value, questionNumber) {
  const errorElement = document.getElementById(`error${questionNumber}`);

  if (value === "" || isNaN(value)) {
    errorElement.textContent = "Please enter a number from 1 to 5.";
    return false;
  }

  const num = Number(value);

  if (num < 1 || num > 5) {
    errorElement.textContent = "Answer must be between 1 and 5.";
    return false;
  }

  errorElement.textContent = "";
  return true;
}

document.getElementById("matchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let userAnswers = [];
  let isValid = true;

  // Validate all answers
  for (let i = 1; i <= 5; i++) {
    const value = document.getElementById(`q${i}`).value;

    if (!validate(value, i)) {
      isValid = false;
    } else {
      userAnswers.push(Number(value));
    }
  }

  if (!isValid) {
    document.getElementById("results").classList.add("hidden");
    return;
  }

  let totalDifference = 0;
  let summaryHTML = "<ul>";

  for (let i = 0; i < 5; i++) {
    const difference = Math.abs(userAnswers[i] - IDEAL_ANSWERS[i]);
    totalDifference += difference;

    summaryHTML += `<li><strong>${QUESTIONS[i]}</strong><br>Compatibility difference: ${difference}</li><br>`;
  }

  summaryHTML += "</ul>";

  const finalCompatibility = 100 - (totalDifference * POINTS_PER_DIFFERENCE);

  let remark = "";
  if (finalCompatibility >= TRUE_LOVE_THRESHOLD) {
    remark = "😍 True Love! You might be a perfect match!";
  } else if (finalCompatibility >= FRIEND_THRESHOLD) {
    remark = "😊 Possible Friends! There is some good compatibility here.";
  } else {
    remark = "🏃 Run Away! This may not be the best match.";
  }

  document.getElementById("questionSummary").innerHTML = summaryHTML;
  document.getElementById("finalScore").textContent =
    `Overall Compatibility Score: ${finalCompatibility}%`;
  document.getElementById("remark").textContent = remark;
  document.getElementById("results").classList.remove("hidden");
});
