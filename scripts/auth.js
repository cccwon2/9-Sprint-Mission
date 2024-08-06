$(function () {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const formId = $("form").attr("id");

  function isValidEmail(email) {
    return emailPattern.test(email);
  }

  $("#email").on("focusout", function () {
    const emailVal = $("#email").val().trim();

    if (!emailVal) {
      $("#email").addClass("error-line");
      $("#empty-email").text("이메일을 입력해주세요.");
      $("#invalid-email").text("");
    } else if (!isValidEmail(emailVal)) {
      $("#email").addClass("error-line");
      $("#empty-email").text("");
      $("#invalid-email").text("잘못된 이메일 형식입니다.");
    } else if (isValidEmail(emailVal)) {
      $("#email").removeClass("error-line");
      $("#empty-email").text("");
      $("#invalid-email").text("");
    }
  });

  /* signup page */
  $("#nickname").on("focusout", function () {
    const nicknameVal = $("#nickname").val().trim();

    if (!nicknameVal) {
      $("#nickname").addClass("error-line");
      $("#empty-nickname").text("닉네임을 입력해주세요.");
    } else {
      $("#nickname").removeClass("error-line");
      $("#empty-nickname").text("");
    }
  });

  $("#password").on("focusout", function () {
    const passwordVal = $("#password").val().trim();

    if (!passwordVal) {
      $("#password").addClass("error-line");
      $("#empty-password").text("비밀번호를 입력해주세요.");
      $("#short-password").text("");
    } else if (passwordVal.length < 8) {
      $("#password").addClass("error-line");
      $("#empty-password").text("");
      $("#short-password").text("비밀번호를 8자 이상 입력해주세요.");
    } else if (passwordVal.length >= 8) {
      $("#password").removeClass("error-line");
      $("#empty-password").text("");
      $("#short-password").text("");
    }
  });

  /* signup page */
  $("#confirmPassword").on("focusout", function () {
    const confirmPasswordVal = $("#confirmPassword").val().trim();

    if (!confirmPasswordVal) {
      $("#confirmPassword").addClass("error-line");
      $("#empty-confirmPassword").text("비밀번호를 다시 한 번 입력해주세요.");
      $("#invalid-confirmPassword").text("");
    } else if (confirmPasswordVal !== $("#password").val()) {
      $("#confirmPassword").addClass("error-line");
      $("#empty-confirmPassword").text("");
      $("#invalid-confirmPassword").text("비밀번호가 일치하지 않습니다.");
    } else if (confirmPasswordVal === $("#password").val()) {
      $("#confirmPassword").removeClass("error-line");
      $("#empty-confirmPassword").text("");
      $("#invalid-confirmPassword").text("");
    }
  });

  $("#password").keydown(function (e) {
    if ($("#password").val().length >= 7) {
      $("#password").removeClass("error-line");
      $("#empty-password").text("");
      $("#short-password").text("");
      $("#loginButton").prop("disabled", false);
    } else {
      $("#loginButton").prop("disabled", true);
    }

    if (formId === "loginForm" && e.keyCode === 13) loginForm();
  });

  /* signup page */
  $("#confirmPassword").keydown(function (e) {
    if ($("#confirmPassword").val().length >= 7) {
      $("#confirmPassword").removeClass("error-line");
      $("#empty-confirmPassword").text("");
      $("#invalid-confirmPassword").text("");
    }
  });

  $("input").change(function (e) {
    if (formId === "loginForm") {
      if (isValidEmail($("#email").val()) && $("#password").val().length >= 8) {
        $("#loginButton").prop("disabled", false);
      } else {
        $("#loginButton").prop("disabled", true);
      }
    } else {
      if (
        isValidEmail($("#email").val()) &&
        $("#confirmPassword").val().length >= 8 &&
        $("#password").val() === $("#confirmPassword").val()
      ) {
        $("#signupButton").prop("disabled", false);
      } else {
        $("#signupButton").prop("disabled", true);
      }
    }
  });

  $("#togglePasswordButton").on("click", function (e) {
    if ($("#togglePasswordIcon").attr("src").endsWith("eye-invisible.svg")) {
      $("#togglePasswordIcon").attr("src", "images/icons/eye-visible.svg");
      $("#password").attr("type", "text");
    } else {
      $("#togglePasswordIcon").attr("src", "images/icons/eye-invisible.svg");
      $("#password").attr("type", "password");
    }
  });

  $("#toggleConfirmPasswordButton").on("click", function (e) {
    if (
      $("#toggleConfirmPasswordIcon").attr("src").endsWith("eye-invisible.svg")
    ) {
      $("#toggleConfirmPasswordIcon").attr(
        "src",
        "images/icons/eye-visible.svg"
      );
      $("#confirmPassword").attr("type", "text");
    } else {
      $("#toggleConfirmPasswordIcon").attr(
        "src",
        "images/icons/eye-invisible.svg"
      );
      $("#confirmPassword").attr("type", "password");
    }
  });

  $("#loginForm").submit((e) => {
    e.preventDefault();
    window.location.href = "items.html";
  });

  $("#signupForm").submit((e) => {
    e.preventDefault();
    window.location.href = "login.html";
  });
});
