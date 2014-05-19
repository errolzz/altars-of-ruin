<?php
    
    $error      = $_POST['error'];
    $hero       = $_POST['hero'];
    $heroName   = $_POST['heroName'];
    $token      = $_POST['token'];

    $to         = 'errolzz@gmail.com';
    $subject    = 'AoR Error - [' . $heroName . ']';

    $headers    = "MIME-Version: 1.0\r\n";
    $headers    .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers    .= "From: errors@altarsofruin.com";

    $message    = '<html><body>';
    $message    .= '<h1>More Errors...</h1>';
    $message    .= '<p>'.$error.'</p>';
    $message    .= '<br/>';
    $message    .= '<p>'.$hero.'</p>';
    $message    .= '</body></html>';

    if($token == 'errol666') {
        //mail($to, $subject, $message, $headers);
    }

?>