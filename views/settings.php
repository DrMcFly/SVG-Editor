<?php

session_start();

echo $_SESSION["Setting1"];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
</head>
<body>
    <form action="settings.php" method="post">
    <input type="checkbox" name="Setting1">Setting #1</input> <br>
    <input type="checkbox" name="Setting2">Setting #2</input> <br>
    
    <input type="submit"> <br>
    <?php 
    echo "Setting1: {$_POST["Setting1"]}<br>";
    $_SESSION["Setting1"] = $_POST["Setting1"];
    echo "Setting2: {$_POST["Setting2"]}<br>";
    ?>
    </form>
</body>
</html>