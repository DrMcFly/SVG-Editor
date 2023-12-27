<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEC | BlackBolt.Canvas</title>
    <link rel="stylesheet" href="/src/style.css">
    <!-- <link rel="icon" type="image/x-icon" href="/compass.ico"> -->
</head>
<body>

    <!-- <h1>TEC</h1> -->

    <div class="topbar">
        <p>File</p>
        <p>Edit</p>
        <p>Selection</p>
        <p>View</p>
        <img src="/images/settings-3110.png">
        <input type="text" id="name">
        <input type="checkbox" id="construction">
    </div>

    <div class="sidebar">
        <button onclick="lineButton()">L</button>
        <button onclick="circleButton()">C</button>
        <button onclick="rectangleButton()">R</button>
        <button onclick="pathButton()">P</button>
        <!-- <button onclick="hideContextMenu()">M</button> -->
        <button onclick="hideCoords()">H</button>
        <button onclick="clearCanvas()">Cl</button>
        <a onclick="document.getElementById('download').disabled=true; downloadInnerSVG('container')" id="download"><button>D</button></a>
    </div>

    <div id="container" class="container" style="position:fixed; width: 80%; height: auto; margin: auto;">
        <svg height="500px" width="500px" margin="10px" id="canvas" xmlns="http://www.w3.org/2000/svg"></svg>  
    </div>

    <p id="distance" class="distance"></p>
    <input type="range" min="1" max="20" value="5" class="slider" id="snapRange">
    
    <div id="mouseCoords" class="mouseBox">(0, 0)</div>
    <div id="contextMenu" class="contextMenu" style="display: none;">
        <p>Copy</p>
        <p>Paste</p>
        <hr>
        <p>Undo</p>
        <p>Redo</p>
        <hr>
        <p>Quick Actions...</p>
    </div>
    
</body>

<script src="/scripts/index.js"></script>

</html>