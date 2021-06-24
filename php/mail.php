<?php
include "../env.php";
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$subject = $_POST['subject'];
$captcharesponse = $_POST['captcharesponse'];
$url = "https://www.google.com/recaptcha/api/siteverify?secret=".getenv("SECRET")."&response=$captcharesponse";
$response = file_get_contents($url);

header('Content-Type: application/json');
if ($name === ''){
print json_encode(array('message' => 'Name cannot be empty', 'code' => 0));
exit();
}
if ($email === ''){
print json_encode(array('message' => 'Email cannot be empty', 'code' => 0));
exit();
} else {
if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
print json_encode(array('message' => 'Email format invalid.', 'code' => 0));
exit();
}
}
if ($subject === ''){
print json_encode(array('message' => 'Subject cannot be empty', 'code' => 0));
exit();
}
if ($message === ''){
print json_encode(array('message' => 'Message cannot be empty', 'code' => 0));
exit();
}
$obj = json_decode($response);
if(!$obj->success){
print json_encode(array('message' => 'reCaptcha is wrong', 'code' => 0));
exit();
}
$content="THE BOTANISTS WEBSITE - From: $name \nEmail: $email \nMessage: $message";
$recipient = "the@botanists.band";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'Email successfully sent!', 'code' => 1));
exit();
?>