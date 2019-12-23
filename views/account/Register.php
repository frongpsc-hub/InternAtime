<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
<script>
        function myFunction(event)
        {

            console.log(event);
            console.log(event.target.action);
            document.getElementById('test1').innerHTML = "hello";
            fetch(event.target.action,{
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: new FormData(event.target)

            }).then(function (data)
            {
                console.log(data);

            })
                .then(function (data) {
                    console.log(data);
                    const {success,message} = data;
                    console.log(success,message); //show data
                    if(success){

                    }
                    else {
                        alert(message);
                        document.getElementById('test1').innerHTML = message;
                    }
                })
        }

</script>
</head>

<body>
<h1>Register</h1>

<div id="container">
    <form id="myform"  method="post" action="<?php echo site_url('account/welcome/login_cgi')?>">
    <?php
    if($this->uri->segment(3) == "inserted")
    {
        echo 'Data Inserted';

    }
    ?>
        <br>
        Email : <input type="email" name="email"><br>
        <span><?php echo form_error("email"); ?></span>
        Password : <input type="password" name="password"><br>
        <span><?php echo form_error("password"); ?></span>
        <input type="submit" value="submit">
    </form>
<div id="test1">

</div>

    <a href="http://localhost/account/welcome/login"><h1>Login!!!</h1></a>
    <script>
        const el1 = document.getElementById("myform");
        console.log(el1);
        el1.onsubmit = myFunction;
    </script>

</body>
</html>