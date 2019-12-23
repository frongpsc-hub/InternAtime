<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Welcome to CodeIgniter</title>

    <style type="text/css">

        #template {
            width: 100%;
            height: 100px;
            background: #a61717;
        }
         #content {
            width: 30%;
            height: 600px;
            float: left;
        }

    </style>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

</head>
<body>

<?php
if ($template){
    echo $template;
}
?>
<div id="content"><?php if ($page) { echo $page;}</div>
    <h1>Hello World</h1>

</body>
</html>