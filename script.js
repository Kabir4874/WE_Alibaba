document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const passwordRequirements = document.getElementById("passwordRequirements");
  const emailValidIcon = document.getElementById("emailValidIcon");
  const emailInvalidIcon = document.getElementById("emailInvalidIcon");

  // Email validation with regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Email validation on typing
  emailInput.addEventListener("input", function () {
    const emailError = document.getElementById("emailError");
    const email = emailInput.value;

    if (!email) {
      emailError.style.display = "none";
      emailValidIcon.style.display = "none";
      emailInvalidIcon.style.display = "none";
      return;
    }

    if (validateEmail(email)) {
      emailError.style.display = "none";
      emailValidIcon.style.display = "block";
      emailInvalidIcon.style.display = "none";
    } else {
      emailError.style.display = "block";
      emailValidIcon.style.display = "none";
      emailInvalidIcon.style.display = "block";
    }
  });

  // Password validation
  passwordInput.addEventListener("focus", function () {
    passwordRequirements.style.display = "block";
  });

  passwordInput.addEventListener("blur", function () {
    if (!passwordInput.value) {
      passwordRequirements.style.display = "none";
    }
  });

  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const lengthReq = document.getElementById("lengthReq");
    const charReq = document.getElementById("charReq");

    // Check length requirement
    if (password.length >= 6 && password.length <= 20) {
      lengthReq.classList.remove("invalid");
      lengthReq.classList.add("valid");
      lengthReq.querySelector(".requirement-icon").textContent = "✓";
    } else {
      lengthReq.classList.remove("valid");
      lengthReq.classList.add("invalid");
      lengthReq.querySelector(".requirement-icon").textContent = "•";
    }

    // Check character variety requirement
    let charTypes = 0;
    if (/[a-zA-Z]/.test(password)) charTypes++;
    if (/[0-9]/.test(password)) charTypes++;
    if (/[^a-zA-Z0-9]/.test(password)) charTypes++;

    if (charTypes >= 2) {
      charReq.classList.remove("invalid");
      charReq.classList.add("valid");
      charReq.querySelector(".requirement-icon").textContent = "✓";
    } else {
      charReq.classList.remove("valid");
      charReq.classList.add("invalid");
      charReq.querySelector(".requirement-icon").textContent = "•";
    }
  });

  // Confirm password validation
  confirmPasswordInput.addEventListener("input", function () {
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordError.style.display = "block";
    } else {
      confirmPasswordError.style.display = "none";
    }
  });

  // Phone number validation
  phoneNumberInput.addEventListener("input", function () {
    const phoneError = document.getElementById("phoneError");
    if (!/^\d+$/.test(phoneNumberInput.value)) {
      phoneError.style.display = "block";
    } else {
      phoneError.style.display = "none";
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Validate email
    if (!validateEmail(emailInput.value)) {
      document.getElementById("emailError").style.display = "block";
      emailValidIcon.style.display = "none";
      emailInvalidIcon.style.display = "block";
      isValid = false;
    }

    // Validate password
    const password = passwordInput.value;
    if (password.length < 6 || password.length > 20) {
      isValid = false;
    }

    let charTypes = 0;
    if (/[a-zA-Z]/.test(password)) charTypes++;
    if (/[0-9]/.test(password)) charTypes++;
    if (/[^a-zA-Z0-9]/.test(password)) charTypes++;

    if (charTypes < 2) {
      isValid = false;
    }

    // Validate password match
    if (passwordInput.value !== confirmPasswordInput.value) {
      document.getElementById("confirmPasswordError").style.display = "block";
      isValid = false;
    }

    // Validate phone number
    if (!/^\d+$/.test(phoneNumberInput.value)) {
      document.getElementById("phoneError").style.display = "block";
      isValid = false;
    }

    // Validate terms agreement
    if (!document.getElementById("agreeTerms").checked) {
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = document.querySelector(".submit-btn");
      submitBtn.textContent = "Creating Account...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Account created successfully! Welcome to Alibaba.com");
        form.reset();
        submitBtn.textContent = "Create an account";
        submitBtn.disabled = false;
        passwordRequirements.style.display = "none";
        emailValidIcon.style.display = "none";
        emailInvalidIcon.style.display = "none";
      }, 1500);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector(
        '.error-message[style="display: block;"]'
      );
      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });
});
