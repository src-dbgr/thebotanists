function validateForm() {
  var name = document.getElementById("name").value;
  if (name == "") {
    document.getElementById("messagestatus").innerHTML = "Name cannot be empty";
    return false;
  }
  var email = document.getElementById("email").value;
  if (email == "") {
    document.getElementById("messagestatus").innerHTML =
      "Email cannot be empty";
    return false;
  } else {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      document.getElementById("messagestatus").innerHTML =
        "Email format invalid";
      return false;
    }
  }
  var subject = document.getElementById("subject").value;
  if (subject == "") {
    document.getElementById("messagestatus").innerHTML =
      "Subject cannot be empty";
    return false;
  }
  var message = document.getElementById("message").value;
  if (message == "") {
    document.getElementById("messagestatus").innerHTML =
      "Message cannot be empty";
    return false;
  }
  var captcharesp = grecaptcha.getResponse();
  if (captcharesp.length == 0) {
    document.getElementById("messagestatus").innerHTML =
      "reCaptcha required - Make sure you are no bot ;)";
    return false;
  }

  document.getElementById("messagestatus").innerHTML = "Sending...";
  formData = {
    name: $("input[name=name]").val(),
    email: $("input[name=email]").val(),
    subject: $("input[name=subject]").val(),
    message: $("textarea[name=message]").val(),
    captcharesponse: captcharesp
  };

  $.ajax({
    url: "../php/mail.php",
    type: "POST",
    data: formData,
    success: function(data, textStatus, jqXHR) {
      $("#messagestatus").text(data.message);
      if (data.code)
        //If mail was sent successfully, reset the form.
        $("#contact-form")
          .closest("form")
          .find("input[type=text], textarea")
          .val("");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $("#messagestatus").text(jqXHR);
    }
  });
}
