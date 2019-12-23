<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">

</head>
<body>
<h1>Login</h1>

<div id="container">
    <form method="post" action="<?php echo base_url(); ?>login_validation">
    Email : <input type="email" name="email"><br>
        <span><?php echo form_error("email"); ?></span>
        Password : <input type="password" name="password"><br>
       <span><?php echo form_error("password"); ?></span>
        <input type="submit" value="submit">

        <?php
        echo $this->session->flashdata("error");
        ?>
    </form>


    <a href="http://localhost/account/welcome/forgotpass"><h1>Forgot Password!!!</h1></a>
    <a href="http://localhost/account/welcome/"><h1>Register!!!</h1></a>



</body>
</html>