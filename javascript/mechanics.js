window.addEventListener("load", loadWelcomeScreen);

function loadWelcomeScreen() {
    console.log("function loadWelcomeScreen()");
    //    hide Instructions screen
    document.querySelector("#instructions").classList.add("hidden");
    //    Unhide welcome screen
    document.querySelector("#welcome").classList.remove("hidden");
    //    TODO Music starts
    //    -> click Play : Game Screen
    document.querySelector("#play_button").addEventListener("click", loadGameScreen);
    //    -> click Instructions : Instructions Screen
    document.querySelector("#instructions_button").addEventListener("click", loadInstructionsScreen);
}

function loadInstructionsScreen() {
    console.log("function loadInstructionsScreen()");
    //    Hide welcome screen
    document.querySelector("#welcome").classList.add("hidden");
    //    Unhide instructions screen
    document.querySelector("#instructions").classList.remove("hidden");
    //    TODO -> click Back to Home
    document.querySelector("#home_button_0").addEventListener("click", loadWelcomeScreen);
}

let lives = 5;
let score = 0;
let gameIsPaused = false;
let gameDuration = 45;

function loadGameScreen() {
    console.log("function loadGameScreen()");
    //    Unhide Game screen
    document.querySelector("#game").classList.remove("hidden");
    //    set length of game
    timeLeft = gameDuration;
    //    calling timer function
    startTimer();
    //    add animation to time bar
    document.querySelector("#time_full").classList.add("time_squeeze");
    //    show start score
    document.querySelector("#score_number").textContent = score;
    //    TODO Start game background sound
    //    -> start mosquitoes
    startMosquito1();
    startMosquito2();
    startMosquito3();
    startMosquito4();
    startMosquito5();
    startMosquito6();
    //    -> start moth
    startMoth();
    //  TODO  -> clicks mute
}

function startTimer() {
//console.log("function startTimer()");
    if (gameIsPaused === false) {
        if (timeLeft === 0) {
            gameWin();
        } else {
            setTimeout(showTime, 1000);
        }
    }
}

function showTime() {
//    console.log("function showTime()");
    if (timeLeft > 0) {
        timeLeft--;
        startTimer();
        document.querySelector("#time_seconds").textContent = timeLeft;
    } else {
        gameWin();
    }
}

function muteSound() {
    console.log("function muteSound()");
    //    TODO Mute sound
    //    TODO Hide Mute button
    //    TODO Unhide unmute button
    //    TODO ->click on Unmute button
}

function unmuteSound() {
    console.log("function unmuteSound()");
    //    TODO Unmute sound
    //    TODO Hide Unmute button
    //    TODO Unhide Mute button
    //    TODO >click on Mute button
}

//Mosquito 1
function startMosquito1() {
    console.log("function startMosquito1()");
    //    add starting position
    document.querySelector("#mosquito_container_1").classList.add("pos_01");
    //    Start mosquito movement animation
    document.querySelector("#mosquito_container_1").classList.add("mosq_move_l_1");
    //    Start mosquito background-image animation
    document.querySelector("#mosquito_fly_l_1").classList.add("change_bg_1");
    //    Start mosquito flying sound
//    document.querySelector("#mosquito_fly_sfx_1").play();
    //    -> kill mosquito
    document.querySelector("#mosquito_fly_l_1").addEventListener("click", killMosquito1);
    //    -> mosquito movement ends
    document.querySelector("#mosquito_container_1").addEventListener("animationiteration", biteMosquito1);
}

function killMosquito1() {
    console.log("function killMosquito1()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    TODO Play randomly one of the wet clap sounds
    //    remove starting position
    document.querySelector("#mosquito_container_1").classList.remove("pos_01");
    //    Pause movement animation
    document.querySelector("#mosquito_container_1").classList.add("paused");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_l_1").classList.remove("change_bg_1");
    //    HIde mosquito flying class and unhide mosquito flying dead class
    document.querySelector("#mosquito_fly_l_1").classList.add("hidden");
    document.querySelector("#mosquito_fly_dead_1").classList.remove("hidden");
    //    Add a falling animation
    document.querySelector("#mosquito_fly_dead_1").classList.add("fall_1");
    //    pause mosquito flying sound
    document.querySelector("#mosquito_fly_sfx_1").pause();
    //    -> falling ends
    document.querySelector("#mosquito_fly_dead_1").addEventListener("animationend", restartMosquito1);
}

function biteMosquito1() {
    console.log("function biteMosquito1()");
    //    Hide a full blood drop and unhide an empty blood drop
    document.querySelector("#blood_drop_" + lives).classList.remove("drop_full");
    document.querySelector("#blood_drop_" + lives).classList.add("drop_empty");
    //    remove event listeners
    document.querySelector("#mosquito_container_1").removeEventListener("animationiteration", biteMosquito1);
    document.querySelector("#mosquito_fly_l_1").removeEventListener("click", killMosquito1);
    //    TODO Play a  quick suck sound
    //    HIde mosquito flying class and unhide mosquito full class
    document.querySelector("#mosquito_fly_l_1").classList.add("hidden");
    document.querySelector("#mosquito_full_1").classList.remove("hidden");
    //    remove starting position
    document.querySelector("#mosquito_container_1").classList.remove("pos_01");
    //    Add position class
    document.querySelector("#mosquito_container_1").classList.add("pos_1");
    //    Remove movement animation
    document.querySelector("#mosquito_container_1").classList.remove("mosq_move_l_1");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_l_1").classList.remove("change_bg_1");
    //    TODO Remove mosquito flying sound
    //    -> lives = 0 : gameover 1
    lives--;
    console.log("now you have: " + lives + " lives");
    if (lives === 0) {
        gameOver1();
    }
    //    -> splat mosquito
    document.querySelector("#mosquito_full_1").addEventListener("click", splatMosquito1);
}

function splatMosquito1() {
    console.log("function splatMosquito1()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    HIde mosquito full class and unhide mosquito full dead class
    document.querySelector("#mosquito_full_1").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_1").classList.remove("hidden");
    //    remove event listeners
    document.querySelector("#mosquito_full_1").removeEventListener("click", splatMosquito1);
    //    TODO Play a wet hit sound
    //    Add a fadeout animation on the sprite
    document.querySelector("#mosquito_full_dead_1").classList.add("fadeout_mosquito");
    //    -> restart mosquito
    document.querySelector("#mosquito_full_dead_1").addEventListener("animationend", restartMosquito1);
}

function restartMosquito1() {
    console.log("function restartMosquito1()");
    //    Remove all animation and sound classes
    document.querySelector("#mosquito_container_1").classList.value = "";
    document.querySelector("#mosquito_fly_l_1").classList.value = "";
    document.querySelector("#mosquito_fly_dead_1").classList.value = "";
    document.querySelector("#mosquito_full_dead_1").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_1").classList.add("hidden");
    document.querySelector("#mosquito_full_1").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_1").classList.add("hidden");
    //    Offset height of the container
    document.querySelector("#mosquito_container_1").offsetHeight;
    //    ->start mosquito
    startMosquito1();
}

//Mosquito 2
function startMosquito2() {
    console.log("function startMosquito2()");
    //    add starting position
    document.querySelector("#mosquito_container_2").classList.add("pos_02");
    //    Start mosquito movement animation
    document.querySelector("#mosquito_container_2").classList.add("mosq_move_l_2");
    //    Start mosquito background-image animation
    document.querySelector("#mosquito_fly_l_2").classList.add("change_bg_2");
    //    Start mosquito flying sound
//    document.querySelector("#mosquito_fly_sfx_2").play();
    //    -> kill mosquito
    document.querySelector("#mosquito_fly_l_2").addEventListener("click", killMosquito2);
    //    -> mosquito movement ends
    document.querySelector("#mosquito_container_2").addEventListener("animationiteration", biteMosquito2)
    //    TODO -> miss
}

function killMosquito2() {
    console.log("function killMosquito2()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    TODO Play randomly one of the wet clap sounds
    //    remove starting position
    document.querySelector("#mosquito_container_2").classList.remove("pos_02");
    //    Pause movement animation
    document.querySelector("#mosquito_container_2").classList.add("paused");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_l_2").classList.remove("change_bg_2");
    //    HIde mosquito flying class and unhide mosquito flying dead class
    document.querySelector("#mosquito_fly_l_2").classList.add("hidden");
    document.querySelector("#mosquito_fly_dead_2").classList.remove("hidden");
    //    Add a falling animation
    document.querySelector("#mosquito_fly_dead_2").classList.add("fall_1");
    //    pause mosquito flying sound
    document.querySelector("#mosquito_fly_sfx_2").pause();
    //    -> falling ends
    document.querySelector("#mosquito_fly_dead_2").addEventListener("animationend", restartMosquito2);
}

function biteMosquito2() {
    console.log("function biteMosquito2()");
    //    Hide a full blood drop and unhide an empty blood drop
    document.querySelector("#blood_drop_" + lives).classList.remove("drop_full");
    document.querySelector("#blood_drop_" + lives).classList.add("drop_empty");
    //    remove event listeners
    document.querySelector("#mosquito_container_2").removeEventListener("animationiteration", biteMosquito2);
    document.querySelector("#mosquito_fly_l_2").removeEventListener("click", killMosquito2);
    //    TODO Play a  quick suck sound
    //    HIde mosquito flying class and unhide mosquito full class
    document.querySelector("#mosquito_fly_l_2").classList.add("hidden");
    document.querySelector("#mosquito_full_2").classList.remove("hidden");
    //    remove starting position
    document.querySelector("#mosquito_container_2").classList.remove("pos_02");
    //    Add position class
    document.querySelector("#mosquito_container_2").classList.add("pos_2");
    //    Remove movement animation
    document.querySelector("#mosquito_container_2").classList.remove("mosq_move_l_2");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_l_2").classList.remove("change_bg_2");
    //    TODO Remove mosquito flying sound
    //    -> lives = 0 : gameover 1
    lives--;
    console.log("now you have: " + lives + " lives");
    if (lives === 0) {
        gameOver1();
    }
    //    -> splat mosquito
    document.querySelector("#mosquito_full_2").addEventListener("click", splatMosquito2);
}

function splatMosquito2() {
    console.log("function splatMosquito2()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    HIde mosquito full class and unhide mosquito full dead class
    document.querySelector("#mosquito_full_2").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_2").classList.remove("hidden");
    //    remove event listeners
    document.querySelector("#mosquito_full_2").removeEventListener("click", splatMosquito2);
    //    TODO Play a wet hit sound
    //    Add a fadeout animation on the sprite
    document.querySelector("#mosquito_full_dead_2").classList.add("fadeout_mosquito");
    //    -> restart mosquito
    document.querySelector("#mosquito_full_dead_2").addEventListener("animationend", restartMosquito2);
}

function restartMosquito2() {
    console.log("function restartMosquito2()");
    //    Remove all animation and sound classes
    document.querySelector("#mosquito_container_2").classList.value = "";
    document.querySelector("#mosquito_fly_l_2").classList.value = "";
    document.querySelector("#mosquito_fly_dead_2").classList.value = "";
    document.querySelector("#mosquito_full_dead_2").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_2").classList.add("hidden");
    document.querySelector("#mosquito_full_2").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_2").classList.add("hidden");
    //    Offset height of the container
    document.querySelector("#mosquito_container_2").offsetHeight;
    //    ->start mosquito
    startMosquito2();
}

//Mosquito 3
function startMosquito3() {
    console.log("function startMosquito3()");
    //    add starting position
    document.querySelector("#mosquito_container_3").classList.add("pos_03");
    //    Start mosquito movement animation
    document.querySelector("#mosquito_container_3").classList.add("mosq_move_l_3");
    //    Start mosquito background-image animation
    document.querySelector("#mosquito_fly_l_3").classList.add("change_bg_3");
    //    TODO Start mosquito flying sound
    //    -> kill mosquito
    document.querySelector("#mosquito_fly_l_3").addEventListener("click", killMosquito3);
    //    -> mosquito movement ends
    document.querySelector("#mosquito_container_3").addEventListener("animationiteration", biteMosquito3);
    //    TODO -> miss
}

function killMosquito3() {
    console.log("function killMosquito3()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    TODO Play randomly one of the wet clap sounds
    //    remove starting position
    document.querySelector("#mosquito_container_3").classList.remove("pos_03");
    //    Pause movement animation
    document.querySelector("#mosquito_container_3").classList.add("paused");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_l_3").classList.remove("change_bg_3");
    //    HIde mosquito flying class and unhide mosquito flying dead class
    document.querySelector("#mosquito_fly_l_3").classList.add("hidden");
    document.querySelector("#mosquito_fly_dead_3").classList.remove("hidden");
    //    Add a falling animation
    document.querySelector("#mosquito_fly_dead_3").classList.add("fall_1");
    //    TODO Remove mosquito flying sound
    //    -> falling ends
    document.querySelector("#mosquito_fly_dead_3").addEventListener("animationend", restartMosquito3);
}

function biteMosquito3() {
    console.log("function biteMosquito3()");
    //    Hide a full blood drop and unhide an empty blood drop
    document.querySelector("#blood_drop_" + lives).classList.remove("drop_full");
    document.querySelector("#blood_drop_" + lives).classList.add("drop_empty");
    //    remove event listeners
    document.querySelector("#mosquito_container_3").removeEventListener("animationiteration", biteMosquito3);
    document.querySelector("#mosquito_fly_l_3").removeEventListener("click", killMosquito3);
    //    TODO Play a  quick suck sound
    //    HIde mosquito flying class and unhide mosquito full class
    document.querySelector("#mosquito_fly_l_3").classList.add("hidden");
    document.querySelector("#mosquito_full_3").classList.remove("hidden");
    //    remove starting position
    document.querySelector("#mosquito_container_3").classList.remove("pos_03");
    //    Add position class
    document.querySelector("#mosquito_container_3").classList.add("pos_3");
    //    Remove movement animation
    document.querySelector("#mosquito_container_3").classList.remove("mosq_move_l_3");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_l_3").classList.remove("change_bg_3");
    //    TODO Remove mosquito flying sound
    //    -> lives = 0 : gameover 1
    lives--;
    console.log("now you have: " + lives + " lives");
    if (lives === 0) {
        gameOver1();
    }
    //    -> splat mosquito
    document.querySelector("#mosquito_full_3").addEventListener("click", splatMosquito3);
}

function splatMosquito3() {
    console.log("function splatMosquito3()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    HIde mosquito full class and unhide mosquito full dead class
    document.querySelector("#mosquito_full_3").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_3").classList.remove("hidden");
    //    remove event listeners
    document.querySelector("#mosquito_full_3").removeEventListener("click", splatMosquito3);
    //    TODO Play a wet hit sound
    //    Add a fadeout animation on the sprite
    document.querySelector("#mosquito_full_dead_3").classList.add("fadeout_mosquito");
    //    -> restart mosquito
    document.querySelector("#mosquito_full_dead_3").addEventListener("animationend", restartMosquito3);
}

function restartMosquito3() {
    console.log("function restartMosquito3()");
    //    Remove all animation and sound classes
    document.querySelector("#mosquito_container_3").classList.value = "";
    document.querySelector("#mosquito_fly_l_3").classList.value = "";
    document.querySelector("#mosquito_fly_dead_3").classList.value = "";
    document.querySelector("#mosquito_full_dead_3").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_3").classList.add("hidden");
    document.querySelector("#mosquito_full_3").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_3").classList.add("hidden");
    //    Offset height of the container
    document.querySelector("#mosquito_container_3").offsetHeight;
    //    ->start mosquito
    startMosquito3();
}

//Mosquito 4
function startMosquito4() {
    console.log("function startMosquito4()");
    //    add starting position
    document.querySelector("#mosquito_container_4").classList.add("pos_04");
    //    Start mosquito movement animation
    document.querySelector("#mosquito_container_4").classList.add("mosq_move_r_4");
    //    Start mosquito background-image animation
    document.querySelector("#mosquito_fly_r_4").classList.add("change_bg_4");
    //    TODO Start mosquito flying sound
    //    -> kill mosquito
    document.querySelector("#mosquito_fly_r_4").addEventListener("click", killMosquito4);
    //    -> mosquito movement ends
    document.querySelector("#mosquito_container_4").addEventListener("animationiteration", biteMosquito4);
}

function killMosquito4() {
    console.log("function killMosquito4()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    TODO Play randomly one of the wet clap sounds
    //    remove starting position
    document.querySelector("#mosquito_container_4").classList.remove("pos_04");
    //    Pause movement animation
    document.querySelector("#mosquito_container_4").classList.add("paused");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_r_4").classList.remove("change_bg_4");
    //    HIde mosquito flying class and unhide mosquito flying dead class
    document.querySelector("#mosquito_fly_r_4").classList.add("hidden");
    document.querySelector("#mosquito_fly_dead_4").classList.remove("hidden");
    //    Add a falling animation
    document.querySelector("#mosquito_fly_dead_4").classList.add("fall_1");
    //    TODO Remove mosquito flying sound
    //    -> falling ends
    document.querySelector("#mosquito_fly_dead_4").addEventListener("animationend", restartMosquito4);
}

function biteMosquito4() {
    console.log("function biteMosquito4()");
    //    Hide a full blood drop and unhide an empty blood drop
    document.querySelector("#blood_drop_" + lives).classList.remove("drop_full");
    document.querySelector("#blood_drop_" + lives).classList.add("drop_empty");
    //    remove event listeners
    document.querySelector("#mosquito_container_4").removeEventListener("animationiteration", biteMosquito4);
    document.querySelector("#mosquito_fly_r_4").removeEventListener("click", killMosquito4);
    //    TODO Play a  quick suck sound
    //    HIde mosquito flying class and unhide mosquito full class
    document.querySelector("#mosquito_fly_r_4").classList.add("hidden");
    document.querySelector("#mosquito_full_4").classList.remove("hidden");
    //    Add position class
    //    remove starting position
    document.querySelector("#mosquito_container_4").classList.remove("pos_04");
    document.querySelector("#mosquito_container_4").classList.add("pos_4");
    //    Remove movement animation
    document.querySelector("#mosquito_container_4").classList.remove("mosq_move_r_4");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_r_4").classList.remove("change_bg_4");
    //    TODO Remove mosquito flying sound
    //    -> lives = 0 : gameover 1
    lives--;
    console.log("now you have: " + lives + " lives");
    if (lives === 0) {
        gameOver1();
    }
    //    -> splat mosquito
    document.querySelector("#mosquito_full_4").addEventListener("click", splatMosquito4);
}

function splatMosquito4() {
    console.log("function splatMosquito4()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    HIde mosquito full class and unhide mosquito full dead class
    document.querySelector("#mosquito_full_4").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_4").classList.remove("hidden");
    //    remove event listeners
    document.querySelector("#mosquito_full_4").removeEventListener("click", splatMosquito4);
    //    TODO Play a wet hit sound
    //    Add a fadeout animation on the sprite
    document.querySelector("#mosquito_full_dead_4").classList.add("fadeout_mosquito");
    //    -> restart mosquito
    document.querySelector("#mosquito_full_dead_4").addEventListener("animationend", restartMosquito4);
}

function restartMosquito4() {
    console.log("function restartMosquito4()");
    //    Remove all animation and sound classes
    document.querySelector("#mosquito_container_4").classList.value = "";
    document.querySelector("#mosquito_fly_r_4").classList.value = "";
    document.querySelector("#mosquito_fly_dead_4").classList.value = "";
    document.querySelector("#mosquito_full_dead_4").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_4").classList.add("hidden");
    document.querySelector("#mosquito_full_4").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_4").classList.add("hidden");
    //    Offset height of the container
    document.querySelector("#mosquito_container_4").offsetHeight;
    //    ->start mosquito
    startMosquito4();
}

//Mosquito 5
function startMosquito5() {
    console.log("function startMosquito5()");
    //    add starting position
    document.querySelector("#mosquito_container_5").classList.add("pos_05");
    //    Start mosquito movement animation
    document.querySelector("#mosquito_container_5").classList.add("mosq_move_r_5");
    //    Start mosquito background-image animation
    document.querySelector("#mosquito_fly_r_5").classList.add("change_bg_5");
    //    TODO Start mosquito flying sound
    //    -> kill mosquito
    document.querySelector("#mosquito_fly_r_5").addEventListener("click", killMosquito5);
    //    -> mosquito movement ends
    document.querySelector("#mosquito_container_5").addEventListener("animationiteration", biteMosquito5);
}

function killMosquito5() {
    console.log("function killMosquito5()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    TODO Play randomly one of the wet clap sounds
    //    remove starting position
    document.querySelector("#mosquito_container_5").classList.remove("pos_05");
    //    Pause movement animation
    document.querySelector("#mosquito_container_5").classList.add("paused");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_r_5").classList.remove("change_bg_5");
    //    HIde mosquito flying class and unhide mosquito flying dead class
    document.querySelector("#mosquito_fly_r_5").classList.add("hidden");
    document.querySelector("#mosquito_fly_dead_5").classList.remove("hidden");
    //    Add a falling animation
    document.querySelector("#mosquito_fly_dead_5").classList.add("fall_1");
    //    TODO Remove mosquito flying sound
    //    -> falling ends
    document.querySelector("#mosquito_fly_dead_5").addEventListener("animationend", restartMosquito5);
}

function biteMosquito5() {
    console.log("function biteMosquito5()");
    //    Hide a full blood drop and unhide an empty blood drop
    document.querySelector("#blood_drop_" + lives).classList.remove("drop_full");
    document.querySelector("#blood_drop_" + lives).classList.add("drop_empty");
    //    remove event listeners
    document.querySelector("#mosquito_container_5").removeEventListener("animationiteration", biteMosquito5);
    document.querySelector("#mosquito_fly_r_5").removeEventListener("click", killMosquito5);
    //    TODO Play a  quick suck sound
    //    HIde mosquito flying class and unhide mosquito full class
    document.querySelector("#mosquito_fly_r_5").classList.add("hidden");
    document.querySelector("#mosquito_full_5").classList.remove("hidden");
    //    Add position class
    //    remove starting position
    document.querySelector("#mosquito_container_5").classList.remove("pos_05");
    document.querySelector("#mosquito_container_5").classList.add("pos_5");
    //    Remove movement animation
    document.querySelector("#mosquito_container_5").classList.remove("mosq_move_r_5");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_r_5").classList.remove("change_bg_5");
    //    TODO Remove mosquito flying sound
    //    -> lives = 0 : gameover 1
    lives--;
    console.log("now you have: " + lives + " lives");
    if (lives === 0) {
        gameOver1();
    }
    //    -> splat mosquito
    document.querySelector("#mosquito_full_5").addEventListener("click", splatMosquito5);
}

function splatMosquito5() {
    console.log("function splatMosquito5()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    HIde mosquito full class and unhide mosquito full dead class
    document.querySelector("#mosquito_full_5").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_5").classList.remove("hidden");
    //    remove event listeners
    document.querySelector("#mosquito_full_5").removeEventListener("click", splatMosquito5);
    //    TODO Play a wet hit sound
    //    Add a fadeout animation on the sprite
    document.querySelector("#mosquito_full_dead_5").classList.add("fadeout_mosquito");
    //    -> restart mosquito
    document.querySelector("#mosquito_full_dead_5").addEventListener("animationend", restartMosquito5);
}

function restartMosquito5() {
    console.log("function restartMosquito5()");
    //    Remove all animation and sound classes
    document.querySelector("#mosquito_container_5").classList.value = "";
    document.querySelector("#mosquito_fly_r_5").classList.value = "";
    document.querySelector("#mosquito_fly_dead_5").classList.value = "";
    document.querySelector("#mosquito_full_dead_5").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_5").classList.add("hidden");
    document.querySelector("#mosquito_full_5").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_5").classList.add("hidden");
    //    Offset height of the container
    document.querySelector("#mosquito_container_5").offsetHeight;
    //    ->start mosquito
    startMosquito5();
}

//Mosquito 6
function startMosquito6() {
    console.log("function startMosquito6()");
//    add starting position
    document.querySelector("#mosquito_container_6").classList.add("pos_06");
    //    Start mosquito movement animation
    document.querySelector("#mosquito_container_6").classList.add("mosq_move_r_6");
    //    Start mosquito background-image animation
    document.querySelector("#mosquito_fly_r_6").classList.add("change_bg_6");
    //    TODO Start mosquito flying sound
    //    -> kill mosquito
    document.querySelector("#mosquito_fly_r_6").addEventListener("click", killMosquito6);
    //    -> mosquito movement ends
    document.querySelector("#mosquito_container_6").addEventListener("animationiteration", biteMosquito6);
}

function killMosquito6() {
    console.log("function killMosquito6()");
    //    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    TODO Play randomly one of the wet clap sounds
    //    remove starting position
    document.querySelector("#mosquito_container_6").classList.remove("pos_06");
    //    Pause movement animation
    document.querySelector("#mosquito_container_6").classList.add("paused");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_r_6").classList.remove("change_bg_6");
    //    HIde mosquito flying class and unhide mosquito flying dead class
    document.querySelector("#mosquito_fly_r_6").classList.add("hidden");
    document.querySelector("#mosquito_fly_dead_6").classList.remove("hidden");
    //    Add a falling animation
    document.querySelector("#mosquito_fly_dead_6").classList.add("fall_1");
    //    TODO Remove mosquito flying sound
    //    -> falling ends
    document.querySelector("#mosquito_fly_dead_6").addEventListener("animationend", restartMosquito6);
}

function biteMosquito6() {
    console.log("function biteMosquito6()");
    //    Hide a full blood drop and unhide an empty blood drop
    document.querySelector("#blood_drop_" + lives).classList.remove("drop_full");
    document.querySelector("#blood_drop_" + lives).classList.add("drop_empty");
    //    remove event listeners
    document.querySelector("#mosquito_container_6").removeEventListener("animationiteration", biteMosquito6);
    document.querySelector("#mosquito_fly_r_6").removeEventListener("click", killMosquito6);
    //    TODO Play a  quick suck sound
    //    HIde mosquito flying class and unhide mosquito full class
    document.querySelector("#mosquito_fly_r_6").classList.add("hidden");
    document.querySelector("#mosquito_full_6").classList.remove("hidden");
    //    Add position class
    //    remove starting position
    document.querySelector("#mosquito_container_6").classList.remove("pos_06");
    document.querySelector("#mosquito_container_6").classList.add("pos_6");
    //    Remove movement animation
    document.querySelector("#mosquito_container_6").classList.remove("mosq_move_r_6");
    //    Remove background-image animation
    document.querySelector("#mosquito_fly_r_6").classList.remove("change_bg_6");
    //    TODO Remove mosquito flying sound
    //    -> lives = 0 : gameover 1
    lives--;
    console.log("now you have: " + lives + " lives");
    if (lives === 0) {
        gameOver1();
    }
    //    -> splat mosquito
    document.querySelector("#mosquito_full_6").addEventListener("click", splatMosquito6);
}

function splatMosquito6() {
    console.log("function splatMosquito6()");
//    Gain a point
    score++;
    console.log("new score:" + score);
    document.querySelector("#score_number").textContent = score;
    //    HIde mosquito full class and unhide mosquito full dead class
    document.querySelector("#mosquito_full_6").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_6").classList.remove("hidden");
    //    remove event listeners
    document.querySelector("#mosquito_full_6").removeEventListener("click", splatMosquito6);
    //    TODO Play a wet hit sound
    //    Add a fadeout animation on the sprite
    document.querySelector("#mosquito_full_dead_6").classList.add("fadeout_mosquito");
    //    -> restart mosquito
    document.querySelector("#mosquito_full_dead_6").addEventListener("animationend", restartMosquito6);
}

function restartMosquito6() {
    console.log("function restartMosquito6()");
    //    Remove all animation and sound classes
    document.querySelector("#mosquito_container_6").classList.value = "";
    document.querySelector("#mosquito_fly_r_6").classList.value = "";
    document.querySelector("#mosquito_fly_dead_6").classList.value = "";
    document.querySelector("#mosquito_full_dead_6").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_6").classList.add("hidden");
    document.querySelector("#mosquito_full_6").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_6").classList.add("hidden");
    //    Offset height of the container
    document.querySelector("#mosquito_container_6").offsetHeight;
    //    ->start mosquito
    startMosquito6();
}

//Moth
function startMoth() {
    console.log("function startMoth()");
    //    add start position
    document.querySelector("#moth_container_1").classList.add("pos_0");
    //    Start moth movement animation
    document.querySelector("#moth_container_1").classList.add("moth_move_1");
    document.querySelector("#moth").classList.add("moth_flip");
    //    -> click moth
    document.querySelector("#moth").addEventListener("click", killMoth);
    //    -> movement ends
    document.querySelector("#moth_container_1").addEventListener("animationend", restartMoth);
}

function killMoth() {
    console.log("function killMoth()");
    //    Hide a full blood drop and unhide an empty blood drop
    document.querySelector("#blood_drop_" + lives).classList.remove("drop_full");
    document.querySelector("#blood_drop_" + lives).classList.add("drop_empty");
    //    pause moth container
    document.querySelector("#moth_container_1").classList.add("paused");
    document.querySelector("#moth").classList.remove("flip_moth");
    //    remove event listeners
    document.querySelector("#moth").removeEventListener("click", killMoth);
    document.querySelector("#moth_container_1").removeEventListener("animationend", restartMoth);
    //    TODO Play a wet clap followed by a "nooo" sound
    //    Hide moth class and unhide moth dead class
    document.querySelector("#moth").classList.add("hidden");
    document.querySelector("#moth_dead").classList.remove("hidden");
    //    Start a fadeout animation
    document.querySelector("#moth_dead").classList.add("zoom_moth");
    //    Lose a life
    lives--;
    //    -> lives = 0 : gameover 2
    console.log("now you have: " + lives + " lives");
    if (lives == 0) {
        gameOver2();
    }
    //    -> else restart Moth
    document.querySelector("#moth_dead").addEventListener("animationend", restartMoth);
}

function restartMoth() {
    console.log("function restartMoth()");
    //    Remove all animations
    document.querySelector("#moth_container_1").classList.value = "";
    document.querySelector("#moth").classList.value = "";
    document.querySelector("#moth_dead").classList.value = "";
    //    TODO remove sound classes
    //    Hide moth dead and unhide moth class
    document.querySelector("#moth").classList.remove("hidden");
    document.querySelector("#moth_dead").classList.add("hidden");
    //    Offset height
    document.querySelector("#moth_container_1").offsetHeight;
    //    Add a random moth position
    newPathMoth();
}

function newPathMoth() {
    console.log("function newPathMoth()");
    document.querySelector("#moth_container_1").classList.add("pos_0");
    let randPath = Math.floor(Math.random() * 2) + 1;
    console.log("moth_move_" + randPath);
    document.querySelector("#moth_container_1").classList.add("moth_move_" + randPath);
    document.querySelector("#moth").classList.add("moth_flip");
    document.querySelector("#moth").addEventListener("click", killMoth);
    document.querySelector("#moth_container_1").addEventListener("animationend", restartMoth);
}

function pauseAll() {
    console.log("function pauseAll()");
    // Pause all animations (containers)
    document.querySelector("#mosquito_container_1").classList.add("paused");
    document.querySelector("#mosquito_container_2").classList.add("paused");
    document.querySelector("#mosquito_container_3").classList.add("paused");
    document.querySelector("#mosquito_container_4").classList.add("paused");
    document.querySelector("#mosquito_container_5").classList.add("paused");
    document.querySelector("#mosquito_container_6").classList.add("paused");
    document.querySelector("#moth_container_1").classList.add("paused");
    // TODO Pause all spriteAnimations
    document.querySelector("#time_full").classList.add("paused");
    document.querySelector("#mosquito_fly_l_1").classList.add("paused");
    document.querySelector("#mosquito_fly_l_2").classList.add("paused");
    document.querySelector("#mosquito_fly_l_3").classList.add("paused");
    document.querySelector("#mosquito_fly_r_4").classList.add("paused");
    document.querySelector("#mosquito_fly_r_5").classList.add("paused");
    document.querySelector("#mosquito_fly_r_6").classList.add("paused");
    document.querySelector("#mosquito_fly_dead_1").classList.add("paused")
    document.querySelector("#mosquito_fly_dead_2").classList.add("paused")
    document.querySelector("#mosquito_fly_dead_3").classList.add("paused")
    document.querySelector("#mosquito_fly_dead_4").classList.add("paused")
    document.querySelector("#mosquito_fly_dead_5").classList.add("paused")
    document.querySelector("#mosquito_fly_dead_6").classList.add("paused")
    document.querySelector("#mosquito_full_dead_1").classList.add("paused");
    document.querySelector("#mosquito_full_dead_2").classList.add("paused");
    document.querySelector("#mosquito_full_dead_3").classList.add("paused");
    document.querySelector("#mosquito_full_dead_4").classList.add("paused");
    document.querySelector("#mosquito_full_dead_5").classList.add("paused");
    document.querySelector("#mosquito_full_dead_6").classList.add("paused");
    document.querySelector("#moth").classList.add("paused");
    document.querySelector("#moth_dead").classList.add("paused");
}

function unpauseAll() {
    console.log("function unpauseAll()");
    //    remove paused from containers
    document.querySelector("#mosquito_container_1").classList.remove("paused");
    document.querySelector("#mosquito_container_2").classList.remove("paused");
    document.querySelector("#mosquito_container_3").classList.remove("paused");
    document.querySelector("#mosquito_container_4").classList.remove("paused");
    document.querySelector("#mosquito_container_5").classList.remove("paused");
    document.querySelector("#mosquito_container_6").classList.remove("paused");
    //    remove paused sprites
    document.querySelector("#time_full").classList.remove("paused");
    document.querySelector("#moth_container_1").classList.remove("paused");
    document.querySelector("#mosquito_fly_l_1").classList.remove("paused");
    document.querySelector("#mosquito_fly_l_2").classList.remove("paused");
    document.querySelector("#mosquito_fly_l_3").classList.remove("paused");
    document.querySelector("#mosquito_fly_r_4").classList.remove("paused");
    document.querySelector("#mosquito_fly_r_5").classList.remove("paused");
    document.querySelector("#mosquito_fly_r_6").classList.remove("paused");
    document.querySelector("#mosquito_fly_dead_1").classList.remove("paused")
    document.querySelector("#mosquito_fly_dead_2").classList.remove("paused")
    document.querySelector("#mosquito_fly_dead_3").classList.remove("paused")
    document.querySelector("#mosquito_fly_dead_4").classList.remove("paused")
    document.querySelector("#mosquito_fly_dead_5").classList.remove("paused")
    document.querySelector("#mosquito_fly_dead_6").classList.remove("paused")
    document.querySelector("#mosquito_full_dead_1").classList.remove("paused");
    document.querySelector("#mosquito_full_dead_2").classList.remove("paused");
    document.querySelector("#mosquito_full_dead_3").classList.remove("paused");
    document.querySelector("#mosquito_full_dead_4").classList.remove("paused");
    document.querySelector("#mosquito_full_dead_5").classList.remove("paused");
    document.querySelector("#mosquito_full_dead_6").classList.remove("paused");
    document.querySelector("#moth").classList.remove("paused");
    document.querySelector("#moth_dead").classList.remove("paused");
}
    
//Endings
function gameWin() {
    console.log("function gameWin()");
    //    run pause all function
    pauseAll();
    //    Unhide Win screen
    document.querySelector("#game_win").classList.remove("hidden");
    //    Show how many mosquitoes killed
    document.querySelector("#score_final").textContent = score;
    console.log("Game is set to PAUSED");
    // Changing game running status
    gameIsPaused = true;
    //    -> click restart button: reset all and load game
    document.querySelector("#replay_button_1").addEventListener("click", resetAllandPlay);
    //    -> click home button: reset all and got to Home screen
    document.querySelector("#home_button_1").addEventListener("click", resetAllandHome);
}

function gameOver1() {
    console.log("function gameOver1()");
    //    run pause all function
    pauseAll();
    //    Unhide Game over screen
    document.querySelector("#game_over").classList.remove("hidden");
    //    Hide game over 2 class
    document.querySelector("#game_over_bg_2").classList.add("hidden");
    //    Unhide game over 1 class
    document.querySelector("#game_over_bg_1").classList.remove("hidden");
    console.log("Game is set to PAUSED");

    // Changing game running status
    gameIsPaused = true;
    //    -> click restart button: reset all and load game
    document.querySelector("#replay_button_2").addEventListener("click", resetAllandPlay);
    //    -> click home button: reset all and got to Home screen
    document.querySelector("#home_button_2").addEventListener("click", resetAllandHome);
}

function gameOver2() {
    console.log("function gameOver2()");
    //    run pause all function
    pauseAll();
    // Changing game running status
    gameIsPaused = true;
    //    Unhide Game over screen
    document.querySelector("#game_over").classList.remove("hidden");
    //    Hide game over 1 class
    document.querySelector("#game_over_bg_1").classList.add("hidden");
    //    Unhide game over 2 class
    document.querySelector("#game_over_bg_2").classList.remove("hidden");
    console.log("Game is set to PAUSED");
    
    //    -> click restart button: reset all and load game
    document.querySelector("#replay_button_2").addEventListener("click", resetAllandPlay);
    //    -> click home button: reset all and got to Home screen
    document.querySelector("#home_button_2").addEventListener("click", resetAllandHome);
}

function resetAllandPlay() {
    console.log("function resetAllandPlay()");
    unpauseAll();
    console.log("Game is NOT set to PAUSED");
    // Changing game running status
    gameIsPaused = false;
    //    reset lives and points
    lives = 5;
    score = 0;
    //    reset time
    gameDuration = 45;
    //    // Reset game run status to "running"
    //    gameHasEnded = false;
    //    remove time animation
    document.querySelector("#time_full").classList.remove("time_squeeze");
    //    remove all mosquito 1 classes
    document.querySelector("#mosquito_container_1").classList.value = "";
    document.querySelector("#mosquito_fly_l_1").classList.value = "";
    document.querySelector("#mosquito_fly_dead_1").classList.value = "";
    document.querySelector("#mosquito_full_dead_1").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_1").classList.add("hidden");
    document.querySelector("#mosquito_full_1").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_1").classList.add("hidden");
    //    remove all mosquito 2 classes
    document.querySelector("#mosquito_container_2").classList.value = "";
    document.querySelector("#mosquito_fly_l_2").classList.value = "";
    document.querySelector("#mosquito_fly_dead_2").classList.value = "";
    document.querySelector("#mosquito_full_dead_2").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_2").classList.add("hidden");
    document.querySelector("#mosquito_full_2").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_2").classList.add("hidden");
    //    remove all mosquito 3 classes
    document.querySelector("#mosquito_container_3").classList.value = "";
    document.querySelector("#mosquito_fly_l_3").classList.value = "";
    document.querySelector("#mosquito_fly_dead_3").classList.value = "";
    document.querySelector("#mosquito_full_dead_3").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_3").classList.add("hidden");
    document.querySelector("#mosquito_full_3").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_3").classList.add("hidden");
    //    remove all mosquito 4 classes
    document.querySelector("#mosquito_container_4").classList.value = "";
    document.querySelector("#mosquito_fly_r_4").classList.value = "";
    document.querySelector("#mosquito_fly_dead_4").classList.value = "";
    document.querySelector("#mosquito_full_dead_4").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_4").classList.add("hidden");
    document.querySelector("#mosquito_full_4").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_4").classList.add("hidden");
    //    remove all mosquito 5 classes
    document.querySelector("#mosquito_container_5").classList.value = "";
    document.querySelector("#mosquito_fly_r_5").classList.value = "";
    document.querySelector("#mosquito_fly_dead_5").classList.value = "";
    document.querySelector("#mosquito_full_dead_5").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_5").classList.add("hidden");
    document.querySelector("#mosquito_full_5").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_5").classList.add("hidden");
    //    remove all mosquito 6 classes
    document.querySelector("#mosquito_container_6").classList.value = "";
    document.querySelector("#mosquito_fly_r_6").classList.value = "";
    document.querySelector("#mosquito_fly_dead_6").classList.value = "";
    document.querySelector("#mosquito_full_dead_6").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_6").classList.add("hidden");
    document.querySelector("#mosquito_full_6").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_6").classList.add("hidden");
    //    remove all moth classes
    document.querySelector("#moth_container_1").classList.value = "";
    document.querySelector("#moth").classList.value = "";
    document.querySelector("#moth_dead").classList.value = "";
    //    hide dead mosquito
    document.querySelector("#moth_dead").classList.add("hidden");
    //    Offset height of the containers
    document.querySelector("#mosquito_container_1").offsetHeight;
    document.querySelector("#mosquito_container_2").offsetHeight;
    document.querySelector("#mosquito_container_3").offsetHeight;
    document.querySelector("#mosquito_container_4").offsetHeight;
    document.querySelector("#mosquito_container_5").offsetHeight;
    document.querySelector("#mosquito_container_6").offsetHeight;
    document.querySelector("#moth_container_1").offsetHeight;
    //    hide wrong screens
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#game_over_bg_2").classList.add("hidden");
    document.querySelector("#game_over_bg_1").classList.add("hidden");
    document.querySelector("#game_win").classList.add("hidden");
    //    initialize lives time and points
    document.querySelector("#score_number").textContent = score;
    document.querySelector("#blood_drop_1").classList.remove("drop_empty");
    document.querySelector("#blood_drop_1").classList.add("drop_full");
    document.querySelector("#blood_drop_2").classList.remove("drop_empty");
    document.querySelector("#blood_drop_2").classList.add("drop_full");
    document.querySelector("#blood_drop_3").classList.remove("drop_empty");
    document.querySelector("#blood_drop_3").classList.add("drop_full");
    document.querySelector("#blood_drop_4").classList.remove("drop_empty");
    document.querySelector("#blood_drop_4").classList.add("drop_full");
    document.querySelector("#blood_drop_5").classList.remove("drop_empty");
    document.querySelector("#blood_drop_5").classList.add("drop_full");
    //    TODO remove all event listeners
    document.querySelector("#moth").removeEventListener("click", killMoth);
    document.querySelector("#mosquito_fly_l_1").removeEventListener("click", killMosquito1);
    document.querySelector("#mosquito_fly_l_2").removeEventListener("click", killMosquito2);
    document.querySelector("#mosquito_fly_l_3").removeEventListener("click", killMosquito3);
    document.querySelector("#mosquito_fly_r_4").removeEventListener("click", killMosquito4);
    document.querySelector("#mosquito_fly_r_5").removeEventListener("click", killMosquito5);
    document.querySelector("#mosquito_fly_r_6").removeEventListener("click", killMosquito6);
    //    -> go to load game screen
    loadGameScreen();
}

function resetAllandHome() {
    console.log("function resetAllandHome()");
    unpauseAll();
    console.log("Game is NOT set to PAUSED");
    // Changing game running status
    gameIsPaused = false;
    //    reset lives and points
    lives = 5;
    score = 0;
    //    reset time
    gameDuration = 45;
    //    // Reset game run status to "running"
    //    gameHasEnded = false;
    //    remove time animation
    document.querySelector("#time_full").classList.remove("time_squeeze");
    //    remove all mosquito 1 classes
    document.querySelector("#mosquito_container_1").classList.value = "";
    document.querySelector("#mosquito_fly_l_1").classList.value = "";
    document.querySelector("#mosquito_fly_dead_1").classList.value = "";
    document.querySelector("#mosquito_full_dead_1").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_1").classList.add("hidden");
    document.querySelector("#mosquito_full_1").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_1").classList.add("hidden");
    //    remove all mosquito 2 classes
    document.querySelector("#mosquito_container_2").classList.value = "";
    document.querySelector("#mosquito_fly_l_2").classList.value = "";
    document.querySelector("#mosquito_fly_dead_2").classList.value = "";
    document.querySelector("#mosquito_full_dead_2").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_2").classList.add("hidden");
    document.querySelector("#mosquito_full_2").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_2").classList.add("hidden");
    //    remove all mosquito 3 classes
    document.querySelector("#mosquito_container_3").classList.value = "";
    document.querySelector("#mosquito_fly_l_3").classList.value = "";
    document.querySelector("#mosquito_fly_dead_3").classList.value = "";
    document.querySelector("#mosquito_full_dead_3").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_3").classList.add("hidden");
    document.querySelector("#mosquito_full_3").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_3").classList.add("hidden");
    //    remove all mosquito 4 classes
    document.querySelector("#mosquito_container_4").classList.value = "";
    document.querySelector("#mosquito_fly_r_4").classList.value = "";
    document.querySelector("#mosquito_fly_dead_4").classList.value = "";
    document.querySelector("#mosquito_full_dead_4").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_4").classList.add("hidden");
    document.querySelector("#mosquito_full_4").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_4").classList.add("hidden");
    //    remove all mosquito 5 classes
    document.querySelector("#mosquito_container_5").classList.value = "";
    document.querySelector("#mosquito_fly_r_5").classList.value = "";
    document.querySelector("#mosquito_fly_dead_5").classList.value = "";
    document.querySelector("#mosquito_full_dead_5").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_5").classList.add("hidden");
    document.querySelector("#mosquito_full_5").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_5").classList.add("hidden");
    //    remove all mosquito 6 classes
    document.querySelector("#mosquito_container_6").classList.value = "";
    document.querySelector("#mosquito_fly_r_6").classList.value = "";
    document.querySelector("#mosquito_fly_dead_6").classList.value = "";
    document.querySelector("#mosquito_full_dead_6").classList.value = "";
    //    Hide full mosquito, dead flying mosquito and full dead mosquito classes
    document.querySelector("#mosquito_fly_dead_6").classList.add("hidden");
    document.querySelector("#mosquito_full_6").classList.add("hidden");
    document.querySelector("#mosquito_full_dead_6").classList.add("hidden");
    //    remove all moth classes
    document.querySelector("#moth_container_1").classList.value = "";
    document.querySelector("#moth").classList.value = "";
    document.querySelector("#moth_dead").classList.value = "";
    //    hide dead mosquito
    document.querySelector("#moth_dead").classList.add("hidden");
    //    Offset height of the containers
    document.querySelector("#mosquito_container_1").offsetHeight;
    document.querySelector("#mosquito_container_2").offsetHeight;
    document.querySelector("#mosquito_container_3").offsetHeight;
    document.querySelector("#mosquito_container_4").offsetHeight;
    document.querySelector("#mosquito_container_5").offsetHeight;
    document.querySelector("#mosquito_container_6").offsetHeight;
    document.querySelector("#moth_container_1").offsetHeight;
    //    hide wrong screens
    document.querySelector("#game").classList.add("hidden");
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#game_over_bg_2").classList.add("hidden");
    document.querySelector("#game_over_bg_1").classList.add("hidden");
    document.querySelector("#game_win").classList.add("hidden");
    //    initialize lives time and points
    document.querySelector("#score_number").textContent = score;
    document.querySelector("#blood_drop_1").classList.remove("drop_empty");
    document.querySelector("#blood_drop_1").classList.add("drop_full");
    document.querySelector("#blood_drop_2").classList.remove("drop_empty");
    document.querySelector("#blood_drop_2").classList.add("drop_full");
    document.querySelector("#blood_drop_3").classList.remove("drop_empty");
    document.querySelector("#blood_drop_3").classList.add("drop_full");
    document.querySelector("#blood_drop_4").classList.remove("drop_empty");
    document.querySelector("#blood_drop_4").classList.add("drop_full");
    document.querySelector("#blood_drop_5").classList.remove("drop_empty");
    document.querySelector("#blood_drop_5").classList.add("drop_full");
    //    TODO remove all event listeners
    document.querySelector("#moth").removeEventListener("click", killMoth);
    document.querySelector("#mosquito_fly_l_1").removeEventListener("click", killMosquito1);
    document.querySelector("#mosquito_fly_l_2").removeEventListener("click", killMosquito2);
    document.querySelector("#mosquito_fly_l_3").removeEventListener("click", killMosquito3);
    document.querySelector("#mosquito_fly_r_4").removeEventListener("click", killMosquito4);
    document.querySelector("#mosquito_fly_r_5").removeEventListener("click", killMosquito5);
    document.querySelector("#mosquito_fly_r_6").removeEventListener("click", killMosquito6);
    //    -> go to home screen
    loadWelcomeScreen();
}
