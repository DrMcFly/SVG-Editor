<?php

    session_start();

    
    // if($_POST["Setting1"] != "") {
    //     $_SESSION["Setting1"] = $_POST["Setting1"];
    // }
    
    $_SESSION["Setting1"] = $_POST["Setting1"];
    $_SESSION["Setting2"] = $_POST["Setting2"];

    echo "SESSION: {$_SESSION["Setting1"]}<br>";
    echo "POST: {$_POST["Setting1"]}<br>";
    if (isset($_POST["Setting1"])) {
        echo "isset";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
</head>
<body>
    <a href="/views/index.php"><button>Back</button></a>
    <form  method="post" action="settings.php">
    
    <input type="checkbox" name="Setting1" <?php if ($_SESSION["Setting1"] == 'on') echo "checked"; ?>>Setting #1</input> <br>
    <input type="checkbox" name="Setting2" <?php if ($_SESSION["Setting2"] == 'on') echo "checked"; ?>>Setting #2</input> <br>
    <!-- <input type="checkbox" name="Setting2" >Setting #2</input> <br> -->
    <input type="submit" value="Apply"><br>
    <?php ?>
    </form>
</body>

<script>

</script>

<script src="/scripts/settings.js"></script>

</html>