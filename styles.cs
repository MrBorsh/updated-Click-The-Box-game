body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

h1 {
    margin-top: 20px;
}

#game-container {
    position: relative;
    width: 100%;
    height: 500px;
    background-color: #ddd;
    margin: 20px auto;
    overflow: hidden;
}

#box, #orange-box, #golden-box {
    width: 50px;
    height: 50px;
    position: absolute;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
}

#box.blue {
    background-color: #007bff;
}

#orange-box.orange {
    background-color: orange;
}

#golden-box.golden {
    background-color: gold;
    display: none;
}

#score, #high-score, #timer {
    font-size: 24px;
}

#start-button {
    padding: 10px 20px;
    font-size: 18px;
    margin-top: 20px;
    cursor: pointer;
}

#scoreboard {
    margin-top: 30px;
}

#scoreboard h2 {
    margin-bottom: 10px;
}

#scoreboard ul {
    list-style-type: none;
    padding: 0;
}

#scoreboard li {
    background-color: #fff;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
