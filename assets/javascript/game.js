// $(".attack").hide();
// $(".opponents").hide();
// $(".reset").hide();

var characterChosen = false;
var opponentChosen = false;
var playerCharacter;
var opponent;
var numOpponents = 0;
var challenger;

//character stats
var stats = {
    Kirby: {
        health: 35,
        totalHealth: 35,
        attack: 15,
        totalAttack: 15,
        counter: 15
    },
    MetaKnight: {
        health: 27,
        totalHealth: 27,
        attack: 12,
        totalAttack: 12,
        counter: 25
    },
    KingDedede: {
        health: 45,
        totalHealth: 45,
        attack: 20,
        totalAttack: 20,
        counter: 10
    },
    BandanaDee: {
        health: 60,
        totalHealth: 60,
        attack: 5,
        totalAttack: 5,
        counter: 5
    }
}

//updates hp values for all the characters on the screen
function updateHP() {
    $(".hp").each(function () {
        //console.log(this);
        var character = $(this).attr("data-character");
        var health = stats[character].health;
        var total = stats[character].totalHealth;
        //console.log(stats.character);
        $(this).text(health + "/" + total + " HP");
    });
}

//selecting character
$(".character").on("click", function () {
    //choosing player character at start of game
    if (!characterChosen) {
        //click noise
        document.getElementById("click").play();

        playerCharacter = $(this).attr("id");
        console.log("player: " + playerCharacter);

        $(".choose-charac").text("You: ");

        //moving the fighters to opponents section
        $(".opponents").show();
        $(".character").each(function () {
            // console.log($(this).attr("id"));
            if ($(this).attr("id") !== playerCharacter) {
                // console.log("appending");
                $(".rivals").append(this);
            }
        });
        characterChosen = true;
        numOpponents = 3;
    }

    //choosing character to fight
    if ($(this).attr("id") !== playerCharacter && !opponentChosen) {
        //click noise
        document.getElementById("click").play();

        //moving opponent to the arena
        opponent = $(this).attr("id");
        console.log("opponent: " + opponent);
        $(".attack").show();
        if (opponent === "Kirby") {
            challenger = document.getElementById("pixel-kirby");
            $(challenger).show();
        }
        if (opponent === "MetaKnight") {
            challenger = document.getElementById("pixel-knight");
            $(challenger).show();
        }
        if (opponent === "KingDedede") {
            challenger = document.getElementById("pixel-king");
            $(challenger).show();
        }
        if (opponent === "BandanaDee") {
            challenger = document.getElementById("pixel-dee");
            $(challenger).show();
        }
        // $(".challenger").append(this);
        opponentChosen = true;
        battleMode = true;
    }
});

//clicking the attack button
$(".attack").on("click", function () {

    //attacking opponent
    document.getElementById("attack-sound").play();
    stats[opponent].health -= stats[playerCharacter].totalAttack;
    updateHP();

    var atkMessage = playerCharacter + " attacks! ";
    var dmgMessage = opponent + " loses " + stats[playerCharacter].totalAttack + " hp.";
    var message1 = atkMessage + dmgMessage;  

    $(".line1").text(message1);

    // attack stat raises by 6 every hit
    stats[playerCharacter].totalAttack += 6;

    //defeated opponent
    if (stats[opponent].health <= 0) {
        console.log("defeat");
        numOpponents--;
        
        var defeat = opponent + " was defeated!"
        var winMessage = defeat;

        //fighters left
        if (numOpponents > 0) {
            var newFightMessage = " Select another opponent."
            winMessage = defeat + newFightMessage;
        }
        //player defeated everyone
        if (numOpponents === 0) {
            var congrats = "Congratulations. You Won! Click Reset to play again.";
            $(".line3").text(congrats);
            $(".reset").show();
            // winMessage = defeat + congrats;
            // $(".message").text(line1 + "\n" + line2);
        }

        $(challenger).hide();
        $(".attack").hide();
        $(".line2").text(winMessage);
        $("#" + opponent).hide();
        

        // battleMode = false;
        opponentChosen = false;
        return;
    }

    //opponent counter-attacks
    // $(".message")
    // document.getElementById("counter-sound").play();

    stats[playerCharacter].health -= stats[opponent].counter;
    updateHP();

    atkMessage = opponent + " counterattacks! ";
    dmgMessage = playerCharacter + " loses " + stats[opponent].totalAttack + " hp.";
    var message2 = atkMessage + dmgMessage;

    $(".line2").text(message2);

    //player character dies
    if (stats[playerCharacter].health <= 0) {
        $("#" + playerCharacter).hide();
        $(".attack").hide();
        $(".line3").text(playerCharacter + " was defeated! Game Over. Click Reset to try again.");
        $(".reset").show();
        // battleMode = false;
        //opponentChosen = false;
        return;
    }
});

//resets the game
$(".reset").on("click", function () {
    $(".character").each(function () {
        var character = $(this).attr("id");

        $(".characters").append(this);

        //restoring health
        stats[character].health = stats[character].totalHealth;
        //reseting attack
        stats[character].totalAttack = stats[character].attack;
        $(this).show();
    });

    //sorting characters in order
    $(".characters").append($("#Kirby"));
    $(".characters").append($("#MetaKnight"));
    $(".characters").append($("#KingDedede"));
    $(".characters").append($("#BandanaDee"));

    //reseting containers
    $(".choose-charac").text("Choose your character!");
    $(".attack").hide();
    $(".opponents").hide();
    $(".reset").hide();
    $(challenger).hide();

    $(".message").each(function() {
        $(this).empty();
    });

    //reseting variables
    characterChosen = false;
    opponentChosen = false;
    battleMode = false;
    playerCharacter = null;
    opponent = null;
    numOpponents = 3;
    challenger = null;
    updateHP();
});

//running game for first time
updateHP();
//setting music
document.getElementById("background-music").loop = true;
document.getElementById("background-music").volume = 0.5;
document.getElementById("background-music").play();
