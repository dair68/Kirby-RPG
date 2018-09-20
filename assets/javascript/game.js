var characterChosen = false;
var opponentChosen = false;
var battleMode = false;
var playerCharacter = null;
var opponent = null;
var numOpponents = 0;
var dead = false;
var announcement;
$(".attack").hide();

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
    Dedede: {
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
        console.log(this);
        var character = $(this).attr("data-character");
        var health = stats[character].health;
        var total = stats[character].totalHealth;
        console.log(stats.character);
        $(this).text(health + "/" + total); 
    });
}

//selecting character
$(".character").on("click", function () {
    //choosing player character at start of game
    if (!characterChosen) {
        playerCharacter = $(this).attr("id");
        // var pictureCopy = $(this).clone();
        // $(".chosen-char").append(pictureCopy);
        console.log("player: " + playerCharacter);

        //moving the fighters to opponents section
        $(".character").each(function () {
            // console.log($(this).attr("id"));
            if ($(this).attr("id") !== playerCharacter) {
                // console.log("appending");
                $(".opponents").append(this);
            }
        })
        characterChosen = true;
        numOpponents = 3;
    }

    //choosing character to fight
    if ($(this).attr("id") !== playerCharacter && !opponentChosen) {
        opponent = $(this).attr("id");
        console.log("opponent: " + opponent);
        $(".attack").show();
        $(".arena").append(this);
        opponentChosen = true;
        battleMode = true;
    }
});

//clicking the attack button
$(".attack").on("click",function() {
    if (battleMode) {
        //moving player character over
        // $()
        //attacking opponent
        stats[opponent].health -= stats[playerCharacter].totalAttack;
        updateHP();

        var message1 = opponent + " loss " + stats[playerCharacter].totalAttack + " hp!"

        $(".message").text(message1);

        // attack stat raises by 6 every hit
        stats[playerCharacter].totalAttack += 6;
        
        //defeated opponent
        if (stats[opponent].health <= 0) {
            var line1 = opponent + " was defeated!"
            $(".attack").hide();
            $(".message").text(line1);
            $("#"+ opponent).hide();
            numOpponents--;

            var line2 = "Congratulations. You Won! \n Press reset to play again.";
            if (numOpponents === 0) {
                $(".message").text(line1 + "\n" + line2);
            }



            battleMode = false;
            opponentChosen = false;
            return;
        }

        //opponent counter-attacks
        // lowerHp(playerCharacter, counterAtk(opponent));
        $(".message")

        stats[playerCharacter].health -= stats[opponent].counter;
        updateHP();

        var message2 = playerCharacter + " loss " + stats[opponent].totalAttack + "hp!"

        $(".message").text(message1 + " \n " + message2);

        //player character dies
        if (stats[playerCharacter].health <= 0) {
            $("#" + playerCharacter).hide();
            $(".attack").hide();
            $(".message").text(playerCharacter + " was defeated! \n Game Over. Click reset to try again");
            battleMode = false;
            opponentChosen = false;
            return;
        }
    }
});

//resets the game
$(".reset-btn").on("click",function() {
    $(".character").each(function() {
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
    $(".characters").append($("#Dedede"));
    $(".characters").append($("#BandanaDee"));

    $(".message").empty();
    $(".attack").hide();

    characterChosen = false;
    opponentChosen = false;
    battleMode = false;
    playerCharacter = null;
    opponent = null;
    numOpponents = 3;
    dead = false;
    updateHP();
});

//running game for first time

updateHP();
// console.log(hp("Marx"));