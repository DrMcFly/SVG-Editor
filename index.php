<?php

session_start();

?>


<!DOCTYPE html>
<html lang="en" class="bg-[#333333]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEC | BlackBolt.Canvas</title>
    <link rel="stylesheet" href="/dist/output.css">
    <!-- <link rel="icon" type="image/x-icon" href="/compass.ico"> -->
</head>
<body>

    <!-- <h1>TEC</h1> -->

    <div name="topbar" class="fixed top-0 left-0 w-[100%] h-8 bg-[#242424] border-b-2 border-gray-800 z-50 shadow-lg">
        <p class="float-left py-[5px] px-[8px] m-0 block text-white hover:bg-gray-700 cursor-pointer">File</p> 
        <p class="float-left py-[5px] px-[8px] m-0 block text-white hover:bg-gray-700 cursor-pointer">Edit</p>
        <p class="float-left py-[5px] px-[8px] m-0 block text-white hover:bg-gray-700 cursor-pointer">Selection</p>
        <p class="float-left py-[5px] px-[8px] m-0 block text-white hover:bg-gray-700 cursor-pointer">View</p>
        <input type="text" id="name">
        <input type="checkbox" id="construction">
        <input type="checkbox" id="light_mode/dark_mode">
        <input type="range" min="1" max="20" value="5" class="slider mt-2" id="snapRange">
    </div>

    <div name="sideBar" class="bg-[#242424] fixed top-0 left-0 w-[50px] h-[1000px] mt-[30px] border-r-2 border-r-gray-800 pt-2 z-40">
        <button class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md" onclick="lineButton()"><img src="/images/Line.svg"></button>
        <button class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md" onclick="circleButton()"><img src="/images/Circle.svg"></button>
        <button class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md" onclick="rectangleButton()"><img src="/images/Rectangle.svg"></button>
        <button class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md" onclick="pathButton()"><img src="/images/Path.svg"></button>
        <!-- <button class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md" onclick="hideCoords()"><img src="/images/Circle.svg"></button> -->
        <button class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md" onclick="clearCanvas()"><img src="/images/Eraser.png"></button>
        <a class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md" onclick="downloadInnerSVG('container')" id="download"><button><img src="/images/Download.svg"></button></a>
        <button class="w-12 text-white hover:bg-gray-700 cursor-pointer float-left p-4 rounded-md"><img class="w-[100%] h-[100%]" src="/images/Settings.svg"></button>
    </div>

    <div id="container">
        <svg height="2000px" width="2000px" id="canvas" xmlns="http://www.w3.org/2000/svg" class="ml-[50px] mt-10"></svg>  
    </div>
    


    <p id="info" class="distance"></p>

    
    
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