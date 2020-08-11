<?php
if(isset($_POST["submit"])){

// check if fields are left empty
if($_POST["fname"]== ""){
    echo "Missing first name field.";
}
if($_POST["lname"]== ""){
    echo "Missing last name field.";
}
if($_POST["email"]== ""){
    echo "Missing email field.";
}
if($_POST["subject"]== ""){
    echo "Missing subject field.";
}
if($_POST["msgBox"]== ""){
    echo "Missing email contents.";
}else{
    $email=$_POST["email"];
    // remove illegal characters from an email
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    // check email address again after sanitizing
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if (!$email){
        echo "You have entered an invalid email to send from.";
    }else{
        $subject = $_POST["subject"];
        $message = $_POST["msgBox"];
    // Set the sender email
        $headers = "From:". $senderEmail . "\r\n";
    // CC the sender
        $headers .= "CC:". $senderEmail . "\r\n";
    // Limit the amount of words and wrap it
        $msgBox = wordwrap($msgBox, 70);
    // Finally send mail by PHP
    mail("marcialararacap@gmail.com", $subject, $msgBox, $headers);
    $success='<div class="alert alert-success">Thank You for the Email! I will reach out as soon as I can!</div>'
    echo $success;
    }
}
?>