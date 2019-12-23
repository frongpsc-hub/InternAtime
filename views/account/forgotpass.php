
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">

</head>
<body>
<h1>Forgot Password</h1>


        <form method="post" action="<?php echo base_url(); ?>forgotpass">


               Email : <input type="email" name="email" id="email"  />
                <?php echo form_error('email', '<div class="error">', '</div>')?>
            <br>

               Password :  <input type="password" name="newpass" id="newpass"  />
                <?php echo form_error('newpass', '<div class="error">', '</div>')?>
                <br>

               Confirm Password : <input type="password" name="passconf" id="passconf"  />
                <?php echo form_error('passconf', '<div class="error">', '</div>')?>
<br>

                <button type="submit" class="btn btn-success">Change Password</button>

    </form>
    <a href="http://localhost/account/welcome/login"><h1>Back to Login!!!</h1></a>

</body>
</html>