//classes.js
//classes.js is the JavaScript file that is used to define many different elements in an
//object oriented structure for our Safe House game.  Many of these objects are created as class objects of their
//own, with different elements and methods in them to use for multiple aspects of the game.  There are also functions
//within the file that are used for checking win conditions (which may change in later versions of our code), as well
//as different variables to hold certain things throughout the game


// //Variables to hold the amount of characters that are dead for each affiliation
// var terrorist_dead_count, counter_terrorist_dead_count, neutral_dead_count;



//Variables to hold the allocated amoung of each affiliation in the game
var in_game_terrorist, in_game_counter_terrorist, in_game_neutral;



//Array that will be proceduraly filled with the characters that die in the order they die
var dead_characters = new Array();



//array_shuffle takes any array that it passed to it as a paramter
//and shuffles that said array to have a random order
function array_shuffle(array){
	var j, x, i;
	for (i = array.length; i; i-= 1){
		j = Math.floor(Math.random() * i);
		x = array[i-1];
		array[i-1] = array[j];
		array[j] = x;
	}
}


// //Terrorist_win_condiiton is a function that will check to see if a character
// //of the affiliation terrorist has won the game
// function terrorist_win_condition(player_to_check_for){
// 	if(counter_terrorist_dead_count == in_game_counter_terrorist){
// 		//player_to_check_for wins game
// 		//All the counter terrorists are dead
// 	}
// 	else if(neutral_dead_count == 3){
// 		//player_to_check_for wins game
// 		//3 neutral are dead
// 	}
// 	else{
// 		//They did not win
// 		//break;
// 	}
// }
//
// //counter_terrorist_win_condition is a function that will check to see if a character of
// //the counter terrorist affiliation has won the game
// function counter_terrorist_win_condition(player_to_check_for){
// 	if(terrorist_dead_count == in_game_terrorist){
// 		//player_to_check_for wins game
// 		//all the terrorists are dead
// 	}
// 	else{
// 		//They did not win
// 		//break;
// 	}
// }
//
// //daniel_win_condition is a function that will check to see if the character
// //Daniel Doomsday has won the game
// function daniel_win_condition(player_to_check_for){
// 	//If you are the first player to die, or all terrorists die and you survive
// 	if (dead_characters[0].character.char_name == "Daniel Doomsday"){
// 		//win
// 	}
// 	if (terrorist_dead_count == in_game_terrorist && player_to_check_for.alive == true){
// 		//win
// 	}
// 	//break;
// }
//
//
// //george_win_condition is a function that will check to see if the character
// //Gatherin george has won the game
// function george_win_condition(player_to_check_for){
// 		//If george has 5 or more equipment cards, he wins the game
// 		var i = 0;
// 		var counter = 0;
//
// }
//
// //tori_win_condition is a function that will check to see if the character
// //Totally Tori has won the game
// function tori_win_condition(player_to_check_for){
// 	//When the game ends, Tori wins if she is still alive
// }
//
// //billy_win_condition is a function that will check to see if the character
// //Billy Bad Ass has won the game
// function billy_win_condition(player_to_check_for){
// 	//When you kill a character, you win if the total number of dead characters is 3 or more
// }


//Class player creates a Player object within the Safe House game. Player is for the different amount of
//players that the user chooses to have in the game, and each player has many different elements that it has
class Player{
	constructor(character){
		this.character = character;
		this.player_color = "color";
		this.equipped = new Equipment('blank','blank','blank');
		this.hand = new Array();
		this.revealed = false;
		this.hp = 0;
		this.atk_pts = 0;
		this.alive = true;
		this.type = "none";
		this.current_region = 0;
		this.status = "waiting";
		this.used_special = 0;
		this.won = false;
	}
}

//Class character creates a Character object for use within the Safe House game.  Characters are the different people that
//each player can be assigned to play as throughout the game.  They have different HP values, win conditions, special abilities
//and are randomly assigned to players based upon the proposed distribution that the user has selected from the player select screen
class Character{
	constructor(char_name, hp, img, affiliation, win_condition, special, win_condition_text, special_text){
		this.char_name = char_name;
		this.hp = hp;
		this.img = img;
		this.affiliation = affiliation;
		this.win_condition = win_condition;
		this.special = special;
		this.win_condition_text = win_condition_text;
		this.special_text = special_text;
	}
}


//Class Investigation creates an Investigation card object that can be used throughout the game.  This object is for UI purposes to show
//the card to the user, as well as to place in an array for drawing and discarding purposes
class Investigation{
	constructor(card_type, img, card_text, card_title){
		this.card_type = card_type;
		this.img = img;
		this.card_text = card_text;
		this.card_title = card_title;
	}

}


//Class Action creates an Action card object that can be used throughout the game.  This object is for UI purposes to show
//the card to the user, as well as to place in an array for drawing and discarding purposes
class Action{
	constructor(card_title, img, card_text){
		this.card_title = card_title;
		this.img = img;
		this.card_text = card_text;
	}
}

//Class Equipment creates and Equipment card object that can be used throughout the game.  This object is for UI purposes to show
//the card to the user, as well as to place in an array for drawing and discarding purposes
class Equipment{
	constructor(card_title, img, card_text){
		this.card_title = card_title;
		this.img = img;
		this.card_text = card_text;
	}
}


//These 10 variables are the 10 instances of the 10 characters created in the game.  They are passed their names, HP,
//images, affiliations, win conditions, speical abilities, and then the text that is displayed on the card.
var Ayman = new Character("Ayman al-Zawahiri", 13, "inc/images/character_ayman.JPG", "Terrorist", "terrorist_win_condition", "special", "All the Counter-Terrorist are dead or 3 Neutral are dead.", "Reveal - If you attack a player and inflict 3 or more damage, you heal 2 points of your own damage.");
var Hassan = new Character("Hassan Nasrallah", 11, "inc/images/character_hassan.jpg", "Terrorist", "terrorist_win_condition", "special", "All the Counter-Terrorist are dead or 3 Neutral are dead.", "You may lie when given an Investigation card.  You do not have to reveal yourself to do this.");
//var Osama = new Character("Osama Bin Laden", 14, "inc/images/character_osama.jpg", "Terrorist", "terrorist_win_condition", "special", "All the Counter-Terrorist are dead or 3 Neutral are dead.", "Reveal - When you are attacked, you may counter-attack immediately, once the initial attack resolves.");
var Osama = new Character("Osama Bin Laden", 14, "inc/images/character_osama.jpg", "Terrorist", "terrorist_win_condition", "special", "All the Counter-Terrorist are dead or 3 Neutral are dead.", "Reveal - Once only, fully heal your damage.");
var Sam = new Character("Sam Seal", 14, "inc/images/character_samseal.jpg", "Counter-Terrorist", "counter_terrorist_win_condition", "special", "All the Terrorists are dead.", "Once only, you may choose to double the damage done for your attack.");
var Charlie = new Character("CIA Charlie", 10, "inc/images/character_ciacharlie.jpg", "Counter-Terrorist", "counter_terrorist_win_condition", "special", "All the Terrorists are dead.", "Reveal - When you move you can roll dice as normal or move to an adjacent area.");
var Fred = new Character("FBI Fred", 12, "inc/images/character_fbifred.jpeg", "Counter-Terrorist", "counter_terrorist_win_condition", "special", "All the Terrorists are dead.", "Once only, at the start of your turn, pick any player to inflict a random amount of damage between 1-6.");
var Daniel = new Character("Daniel Doomsday", 12, "inc/images/character_danieldoomsday.png", "Neutral", "win_condition", "special","You are the first character to die OR all the Terrorists are dead and you survive.", "Reveal - If you inflict damage on a known Terrorist you heal 1 damage to yourself.");
var George = new Character("Gatherin' George", 10, "inc/images/character_gatheringeorge.png", "Neutral", "win_condition", "special", "When you have more than 5 equipment cards.", "Reveal - If you inflict 2 or more damage, you may steal an equipment card.");
var Tori = new Character("Totally Tori", 8, "inc/images/character_toritotally.jpg", "Neutral", "win_condition", "special", "When the game ends you're 'like totally still alive'", "Reveal - Once only, fully heal your damage.");
var Billy = new Character("Billy-Bob Badass", 11, "inc/images/character_billybobbadass.jpg", "Neutral", "win_condition", "special", "When you kill a character, you win if the total number of dead characters is 3 or more.", "Reveal - After you attack you may give yourself 2 damage to attack again.");



//The following variables are created instances for each Investigation card in the game.  They are passed the card type, the image
//the card text, and then their type of card, which is the card name.
var accuse1 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are a Terrorist.  If so, you receive 1 damage", "accuse1");
var accuse2 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are a Terrorist.  If so, you receive 1 damage", "accuse2");
var accuse3 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are Neutral.  If so, you heal 1 damage (If you have no damage - take one damage instead)", "accuse3");
var accuse4 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are a Terrorist.  If so, you heal 1 damage (If you have no damage - take one instead)", "accuse4");
var accuse5 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are either Neutral or a Terrorist.  If so, you must either give me an equipment card or receive 1 damage", "accuse5");
var accuse6 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are a Counter-Terrorist.  If so, you heal 1 damage (If you have no damage - take one instead)", "accuse6");
//NOTUSED var accuse7 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are either Terrorist or a Counter-Terrorist.  If so, you must either give me an equipment card or receive 1 damage", "accuse7");
//NOTUSED var accuse8 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are either Neutral or a Counter-Terrorist.  If so, you must either give me an equipment card or receive 1 damage", "accuse8");
//NOTUSED var accuse9 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are either Terrorist or a Counter-Terrorist.  If so, you must either give me an equipment card or receive 1 damage", "accuse9");
var accuse10 = new Investigation("Accuse", "inc/images/investigation.png","I bet you are a Counter-Terrorist.  If so, you receive 1 damage.", "accuse10");
var accuse11 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are Neutral.  If so, you receive 1 damage.", "accuse11");
//NOTUSED var reveal1 = new Investigation("Revealed!", "inc/images/revealed.png", "You must show your character card secretly to the current player who gave you this card.", "reveal1");
//NOTUSED var reveal2 = new Investigation("Revealed!", "inc/images/revealed.png", "You must show your character card secretly to the current player who gave you this card.", "reveal2");
//NOTUSED var accuse12 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are either Neutral or a Counter-Terrorist.  If so, you must either give me an equipment card or receive 1 damage.", "accuse12");
var accuse13 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are Neutral.  If so, you receive 1 damage.", "accuse13");
//NOTUSED var accuse14 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are either Neutral or a Terrorist.  If so, you must either give me an equipment card or receive 1 damage.", "accuse14");
var accuse15 = new Investigation("Accuse", "inc/images/investigation.png", "I bet you are a Counter-Terrorist. If so, you receive 1 damage.", "accuse15");


//These variables are the instances created for each Equipment card in the game. They are passed the cards title, its image, and then the text
//that is shown on the card.
//NOTUSED var compass = new Equipment("Compass", "inc/images/equipment_compass.jpeg", "When you move you may roll twice and choose which result to use.");
//NOTUSED var predatordrone = new Equipment("Predator Drone", "inc/images/equipment_predatordrone.jpg", "If you're a Counter-Terrorist and your attack is successful, you may reveal your identity.  If you do or you are revealed, you do 2 extra points of damage.");
var waterboard = new Equipment("Water Board", "inc/images/equipment_waterboard.jpg", "When you take an Investigation card, you may take two, giving them to the same player or two different players.");
var goodluckcharm = new Equipment("Good Luck Charm", "inc/images/equipment_goodluckcharm.jpg", "You receive no damage from the area 'Mystic East' (You can still heal your own damage if you choose yourself).");
var balancesuit = new Equipment("Balance Suit", "inc/images/equipment_balancesuit.jpeg", "Your attacks do 1 less damage and the damage you take is reduced by 1 per attack.");
//NOTUSED var dufflebag = new Equipment("Duffle Bag", "inc/images/equipment_dufflebag.jpeg", "If you attack and kill another character, you get all their equipment cards.");
//NOTUSED var specialvest = new Equipment("Special Vest", "inc/images/equipment_specialvest.jpg", "You receive no damage from the attack of the following cards: Jihad! Jihad!, Dynamite, or Deadly Surprises.");
var handgun = new Equipment("Handgun", "inc/images/equipment_handgun.jpg", "You may attack into adjacent areas.  If your attack is successful you do 1 extra point of damage.");
var cattleprod = new Equipment("Cattle Prod", "inc/images/equipment_cattleprod.png", "When you take an Investigation card you may take two, giving them to the same player or two players.");
var sniperrifle = new Equipment("Sniper Rifle", "inc/images/equipment_sniperrifle.jpg", "You may attack any area up to two away.  If your attack is successful you do 1 extra point of damage.");
var garrote = new Equipment("Garrote", "inc/images/equipment_garrote.jpg", "If your attack is successful, you give 1 extra point of damage.");
//NOTUSED var machinegun = new Equipment("Machine Gun", "inc/images/equipment_machinegun.jpeg", "You may attack into adjacent areas.  Roll the dice for each character in the area you are attacking.");
var blowgun = new Equipment("Blow Gun", "inc/images/equipment_blowgun.gif", "If your attack is successful, you give 1 extra point of damage.");
//NOTUSED var curseddagger = new Equipment("Cursed Dagger", "inc/images/equipment_curseddagger.jpg", "You must attack another character on your turn if possible.  You do 1D3 - no defense.");


//These variables are each instance of all of the Action cards that will be used in the game.  They are passed strings of their name, the image,
//and the card text to be displayed on the card
var rnr = new Action("R&R", "inc/images/action_rnr.jpeg", "If you are a Counter-Terrorist, you may reveal your identity.  If you do, or if you are already revealed, you heal fully(0 damage).");
//var illhelp = new Action("I'll Help!", "inc/images/action_illhelp.jpeg", "Pick a character (other than you) - Heal 1D6 points of damage.");
var illhelp = new Action("I'll Help!", "inc/images/action_illhelp.jpeg", "Pick a character (other than you) - Heal random 1-6 points of damage.");
//NOTUSED var guardianangel = new Action("Guardian Angel", "inc/images/action_guardianangel.jpg", "You get no damage from another characters' attack until your next turn.");
var luckyday = new Action("It's your lucky day!", "inc/images/action_luckyday.jpeg", "If you are Tori, Charlie, or Hassan, you may reveal yourself.  If you do (or you are already revealed) you fully heal (0 damage).");
var spotted = new Action("Spotted!", "inc/images/action_spotted.jpeg", "If you are Osama or Ayman, you must reveal yourself!");
var firstaid = new Action("First Aid", "inc/images/action_firstaid.jpg", "Heal two points of your damage.");
var judgementday = new Action("Judgement Day", "inc/images/action_judgementday.jpg", "All character's except for you receive 2 points of damage");
//NOTUSED var energyboost = new Action("Energy Boost", "inc/images/action_energyboost.jpeg", "When this turn is over, take another turn!");
//NOTUSED var doctorsvisit = new Action("Doctor's Visit", "inc/images/action_doctorsvisit.jpeg", "Heal any characters HP marker to 4 (You may choose yourself).");
var firstaid2 = new Action("First Aid", "inc/images/action_firstaid2.jpeg", "Heal two points of your damage");
//NOTUSED var dynamite = new Action("Dynamite", "inc/images/action_dynamite.jpeg", "Roll 2D6 and give 3 points of damage to all characters in the area rolled.");
//NOTUSED var jihad = new Action("Jihad!", "inc/images/action_jihad.jpeg", "If you are a Terrorist, you may reveal your identity.  If you do, you can fully heal your damage.");
var deadlysurprise = new Action("Deadly Surprise", "inc/images/action_deadlysurprise.jpeg", "You give 2 points of damage to any character and heal 1 point of your own damage");
var deadlysurprise2 = new Action("Deadly Surprise", "inc/images/action_deadlysurprise2.jpeg", "You give 2 points of damage to any character and heal 1 point of your own damage");
//NOTUSED var thatsnotgood = new Action("That's Not Good", "inc/images/action_thatsnotgood.jpg", "Give one of your equipment cards to another player.  If you have no equipment cards you receive 1 damage.");
var thatsmine = new Action("That's Mine", "inc/images/action_thatsmine.jpg", "You steal an equipment card from any character.");
var deadlysurprise3 = new Action("Deadly Surprise", "inc/images/action_deadlysurprise3.jpg", "You give 2 points of damage to any character and heal 1 point of your own damage.");
//NOTUSED var deadlygame = new Action("Deadly Game", "inc/images/action_deadlygame.jpg", "Pick a character, roll 1D6.  If result is 1-4, they take 3 points of damage, if 5-6 you take 3 points of damage.");
//NOTUSED var jihadjihad = new Action("Jihad! Jihad!", "inc/images/action_jihadjihad.jpeg", "You give two points of damage to any character and receive 2 points of damage yourself.  You can double this if you reveal or are revealed as a terrorist.");

//The following are arrays of all the of objects put together
//The action array is composed of each action card available in the game.
//var actionArray = [rnr, illhelp, guardianangel, luckyday, spotted, firstaid, judgementday, energyboost, doctorsvisit, firstaid2, dynamite, jihad, deadlysurprise, deadlysurprise2, thatsnotgood, thatsmine, deadlysurprise3, deadlygame, jihadjihad];
var actionArray = [rnr, illhelp, luckyday, spotted, firstaid, judgementday, firstaid2, deadlysurprise, deadlysurprise2, thatsmine, deadlysurprise3];
var new_deck_actionArray = [rnr, illhelp, luckyday, spotted, firstaid, judgementday, firstaid2, deadlysurprise, deadlysurprise2, thatsmine, deadlysurprise3];

//The equipment array is composed of each Equipment card that is available in the game
var equipmentArray = [waterboard, goodluckcharm, balancesuit, handgun, cattleprod, sniperrifle, garrote, blowgun];

//The investigation array is composed of every Investigation card that is available in the game
//var investigationArray = [accuse1, accuse2, accuse3, accuse4, accuse5, accuse6, accuse7, accuse8, accuse9, accuse10, accuse11, accuse12, accuse13, accuse14, accuse15, reveal1, reveal2];
var investigationArray = [accuse1, accuse2, accuse3, accuse4, accuse5, accuse6, accuse10, accuse11, accuse13, accuse15];
var new_deck_investigationArray = [accuse1, accuse2, accuse3, accuse4, accuse5, accuse6, accuse10, accuse11, accuse13, accuse15];

//The Terrorists array is composed of the 3 terrorist characters in the game
//var terroristsArray = [Ayman, Hassan, Osama];
var terroristsArray = [Osama]; // only for testing DELETE AFTER

//The Counter-Terrorist array is composed of the 3 Counter-Terrorist characters available in the game
//var counterterroristArray = [Sam, Charlie, Fred];
var counterterroristArray = [Charlie]; //only for testing DELETE AFTER

//The Neutral array is composed of the 4 Neutral characters that are available in the game
var neutralArray = [Daniel, George, Tori, Billy];


//The Characters Array is a list of all available characters in the game
//var charactersArray = [Ayman, Hassan, Osama, Sam, Charlie, Fred, Daniel, George, Tori, Billy];
var charactersArray = [Osama, Charlie, Daniel, George, Tori, Billy]; // only for testing DELETE AFTER

//These 7 function calls shuffle all the arrays for a random order that can be drawn from.
array_shuffle(charactersArray);
array_shuffle(terroristsArray);
array_shuffle(counterterroristArray);
array_shuffle(neutralArray);
array_shuffle(actionArray);
array_shuffle(equipmentArray);
array_shuffle(investigationArray);

var players_3 = new Array(3);
players_3[0] = new Player(terroristsArray[0]);
players_3[1] = new Player(counterterroristArray[0]);
players_3[2] = new Player(neutralArray[0]);
array_shuffle(players_3);
players_3.unshift(new Player(charactersArray[0]));

var players_4 = new Array(4);
players_4[0] = new Player(terroristsArray[0]);
players_4[1] = new Player(counterterroristArray[0]);
players_4[2] = new Player(terroristsArray[1]);
players_4[3] = new Player(counterterroristArray[1]);
array_shuffle(players_4);
players_4.unshift(new Player(charactersArray[0]));

var players_5 = new Array(5);
players_5[0] = new Player(terroristsArray[0]);
players_5[1] = new Player(counterterroristArray[0]);
players_5[2] = new Player(terroristsArray[1]);
players_5[3] = new Player(counterterroristArray[1]);
players_5[4] = new Player(neutralArray[0]);
array_shuffle(players_5);
players_5.unshift(new Player(charactersArray[0]));

var players_6 = new Array(6);
players_6[0] = new Player(terroristsArray[0]);
players_6[1] = new Player(counterterroristArray[0]);
players_6[2] = new Player(terroristsArray[1]);
players_6[3] = new Player(counterterroristArray[1]);
players_6[4] = new Player(neutralArray[0]);
players_6[5] = new Player(neutralArray[1]);
array_shuffle(players_6);
players_6.unshift(new Player(charactersArray[0]));

var players_7_1 = new Array(7);
players_7_1[0] = new Player(terroristsArray[0]);
players_7_1[1] = new Player(counterterroristArray[0]);
players_7_1[2] = new Player(terroristsArray[1]);
players_7_1[3] = new Player(counterterroristArray[1]);
players_7_1[4] = new Player(neutralArray[0]);
players_7_1[5] = new Player(neutralArray[1]);
players_7_1[6] = new Player(neutralArray[2]);
array_shuffle(players_7_1);
players_7_1.unshift(new Player(charactersArray[0]));

var players_7_2 = new Array(7);
players_7_2[0] = new Player(terroristsArray[0]);
players_7_2[1] = new Player(counterterroristArray[0]);
players_7_2[2] = new Player(terroristsArray[1]);
players_7_2[3] = new Player(counterterroristArray[1]);
players_7_2[4] = new Player(neutralArray[0]);
players_7_2[5] = new Player(neutralArray[1]);
players_7_2[6] = new Player(counterterroristArray[2]);
array_shuffle(players_7_2);
players_7_2.unshift(new Player(charactersArray[0]));

var players_8_1 = new Array(6);
players_8_1[0] = new Player(terroristsArray[0]);
players_8_1[1] = new Player(counterterroristArray[0]);
players_8_1[2] = new Player(terroristsArray[1]);
players_8_1[3] = new Player(counterterroristArray[1]);
players_8_1[4] = new Player(neutralArray[0]);
players_8_1[5] = new Player(neutralArray[1]);
players_8_1[6] = new Player(terroristsArray[2]);
players_8_1[7] = new Player(counterterroristArray[2]);
array_shuffle(players_8_1);
players_8_1.unshift(new Player(charactersArray[0]));

var players_8_2 = new Array(8);
players_8_2[0] = new Player(terroristsArray[0]);
players_8_2[1] = new Player(counterterroristArray[0]);
players_8_2[2] = new Player(terroristsArray[1]);
players_8_2[3] = new Player(counterterroristArray[1]);
players_8_2[4] = new Player(neutralArray[0]);
players_8_2[5] = new Player(neutralArray[1]);
players_8_2[6] = new Player(counterterroristArray[2]);
players_8_2[7] = new Player(terroristsArray[2]);
array_shuffle(players_8_2);
players_8_2.unshift(new Player(charactersArray[0]));
