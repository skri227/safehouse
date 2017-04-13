//game.js
//Main javascript file for the game. This file contains code
//to setup the game screen and also contains all of the game rules.

//Global window screen size
var window_w = 0;
var window_h = 0;

//fastclick add on snippet to enable touch screen fast click input
if ('addEventListener' in document)
{
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

//Jquery loading screen fade out
$(window).load(function(){
   function show_loading_screen(){
      $('#loading_overlay_container').fadeOut();
   };
   window.setTimeout( show_loading_screen, 5000 ); // 5 seconds
})

//Snippet to disable iPad screen rotation
window.shouldRotateToOrientation = function(degrees) {
 return true;
}

//Function to reset the game back to the first screen.
function reset_game()
{
	//indow.location.href = "index.html";
  location.reload();
}

//Shows the zoomed card screen overlay and populates
//the content using the given card object.
function show_zoomed_card(card)
{
	var x = document.getElementById("card_overlay");
	x.getElementsByTagName("h1")[0].innerHTML = card.card_title;
	x.getElementsByTagName("img")[0].src = card.img;
	x.getElementsByTagName("p")[0].innerHTML = card.card_text;
	document.getElementById("show_card_overlay_container").style.visibility = "visible";
}

//Hides the zoomed card screen overlay
function hide_zoomed_card()
{
	document.getElementById("show_card_overlay_container").style.visibility = "hidden";
}

//Shows view card screen overlay. Same as zoomed card but doesn't
//contain state logic for game.
function show_view_card(card)
{
	var x = document.getElementById("view_overlay");
	x.getElementsByTagName("h1")[0].innerHTML = card.card_title;
	x.getElementsByTagName("img")[0].src = card.img;
	x.getElementsByTagName("p")[0].innerHTML = card.card_text;
	document.getElementById("view_card_overlay_container").style.visibility = "visible";

  //game.exec_state('equip_card_to_player');
}

//Hides view card screen
function hide_view_card()
{
	document.getElementById("view_card_overlay_container").style.visibility = "hidden";
}

//Moves card area to left by 50 pixels
function card_area_scroll_left()
{
	var elmnt = document.getElementById("cards_area");
	elmnt.scrollLeft -= 50;
}

//Moves card area to right by 50 pixels
function card_area_scroll_right()
{
	var elmnt = document.getElementById("cards_area");
	elmnt.scrollLeft += 50;
}

//Function for player select.
//input id and selection and code will toggle correct display to show to user.
function player_select_btn_toggle(id, selection)
{
	// var x = document.getElementById("player_" + id + "_select");
	// if(selection == "player")
	// {
	// 	x.getElementsByTagName("*")[1].className = "player_select_btn_selected";
	// 	x.getElementsByTagName("*")[2].className = "player_select_btn_not_selected";
	// 	x.getElementsByTagName("*")[3].className = "player_select_btn_not_selected";
	// }
	// else if(selection == "cpu")
	// {
	// 	x.getElementsByTagName("*")[1].className = "player_select_btn_not_selected";
	// 	x.getElementsByTagName("*")[2].className = "player_select_btn_selected";
	// 	x.getElementsByTagName("*")[3].className = "player_select_btn_not_selected";
	// }
	// else
	// {
	// 	x.getElementsByTagName("*")[1].className = "player_select_btn_not_selected";
	// 	x.getElementsByTagName("*")[2].className = "player_select_btn_not_selected";
	// 	x.getElementsByTagName("*")[3].className = "player_select_btn_selected";
	// }
}

//Sets up the number of players screen
function num_of_players_screen_setup()
{
	document.getElementById("start_menu").style.display = "none";
	document.getElementById("player_select_screen").style.display = "initial";
	document.getElementsByClassName("num_of_players")[0].style.display = "initial";
	document.getElementsByClassName("select_players")[0].style.display = "none";
}

//Sets up the player select screen
function player_select_screen_setup(players)
{
	document.getElementById("start_menu").style.display = "none";
	document.getElementById("player_select_screen").style.display = "initial";
	document.getElementsByClassName("num_of_players")[0].style.display = "none";
	document.getElementsByClassName("select_players")[0].style.display = "initial";

	if(players == 3)
	{
		document.getElementById("player_4_select").style.display = "none";
		document.getElementById("player_5_select").style.display = "none";
		document.getElementById("player_6_select").style.display = "none";
		document.getElementById("player_7_select").style.display = "none";
		document.getElementById("player_8_select").style.display = "none";


    //game.player_array[1] = new Player(charactersArray[i]);
	}
	else if(players == 4)
	{
		document.getElementById("player_5_select").style.display = "none";
		document.getElementById("player_6_select").style.display = "none";
		document.getElementById("player_7_select").style.display = "none";
		document.getElementById("player_8_select").style.display = "none";
	}
	else if(players == 5)
	{
		document.getElementById("player_6_select").style.display = "none";
		document.getElementById("player_7_select").style.display = "none";
		document.getElementById("player_8_select").style.display = "none";
	}
	else if(players == 6)
	{
		document.getElementById("player_7_select").style.display = "none";
		document.getElementById("player_8_select").style.display = "none";
	}
	else if(players == 7)
	{
		document.getElementById("player_8_select").style.display = "none";
	}

	//Set number of players in game object
	game.num_of_players = players;

  if(game.num_of_players == 3)
    game.player_array = players_3;
  else if(game.num_of_players == 4)
    game.player_array = players_4;
  else if(game.num_of_players == 5)
    game.player_array = players_5;
  else if(game.num_of_players == 6)
    game.player_array = players_6;
  else if(game.num_of_players == 71)
    game.player_array = players_7_1;
  else if(game.num_of_players == 72)
    game.player_array = players_7_2
  else if(game.num_of_players == 81)
    game.player_array = players_8_1;
  else if(game.num_of_players == 82)
    game.player_array = players_8_2;

  if(game.num_of_players == 71 || game.num_of_players == 72)
    game.num_of_players = 7;

  if(game.num_of_players == 81 || game.num_of_players == 82)
    game.num_of_players = 8;

}

//Sets up the main game screen.
function game_screen_setup()
{
	document.getElementsByTagName("BODY")[0].style.textAlign = "initial";
	document.getElementsByTagName("BODY")[0].style.backgroundImage = "none";

	document.getElementById("start_menu").style.display = "none";
	document.getElementById("player_select_screen").style.display = "none";
	document.getElementById("game").style.display = "initial";

  document.getElementById("select_player_overlay_container").style.display = "none";
  document.getElementById("select_options_overlay_container").style.display = "none";
  document.getElementById("select_zone_overlay_container").style.display = "none";
  //document.getElementById("attack_select_player_overlay_container").style.display = "none";
  //document.getElementById("invest_select_player_overlay_container").style.display = "none";

  document.getElementById("action_roll_btn").style.display = "initial";
  document.getElementById("action_draw_btn").style.display = "none";
  document.getElementById("action_attack_btn").style.display = "none";
  document.getElementById("action_special_btn").style.display = "none";
  document.getElementById("action_end_turn_btn").style.display = "none";
  document.getElementById("action_adjacent_btn").style.display = "none";
  document.getElementById("action_special_roll_btn").style.display = "none";

  document.getElementById("card_area_scroll_left").style.display = "none";
  document.getElementById("card_area_scroll_right").style.display = "none";

  document.getElementById("revealed_box").style.display = "none";

  document.getElementById("next_player_end_game_btn").style.display = "none";

	canvas_init();
	renderer.setSize( container_width, container_height );
	camera.aspect = container_width / container_height;
	camera.updateProjectionMatrix();
}

//Shows the in game menu.
function game_menu_screen_overlay(player)
{
	var x = document.getElementById("game_menu_overlay_container");
	function show_game_menu_screen(){
		$('#game_menu_overlay_container').fadeIn();
	};
	window.setTimeout( show_game_menu_screen, 100 ); // 200ms
}

//Hides the in game menu
function hide_game_menu_screen_overlay()
{
	function hide_game_menu_screen(){
		$('#game_menu_overlay_container').fadeOut();
	};
	window.setTimeout( hide_game_menu_screen, 200 ); // 200ms
}

//Shows the next player screen to hide the prev players identity.
function next_player_screen_overlay(player, player_color)
{
	var x = document.getElementById("next_player_overlay_container");
	x.getElementsByTagName("h3")[0].innerHTML = "PASS TO PLAYER " + player;
  //x.display = "initial";
	x.style.display = "initial";
	function show_next_player_screen(){
		$('#next_player_overlay_container').fadeIn();
	};
	window.setTimeout( show_next_player_screen, 0 ); // 200ms
}

//Hides next player screen
function hide_next_player_screen_overlay()
{
	function hide_next_player_screen(){
		$('#next_player_overlay_container').fadeOut();
	};
	window.setTimeout( hide_next_player_screen, 200 ); // 200ms
}

//Shows screen for drawing a card.
function draw_card_screen_overlay(invest, equip, onetime)
{
  document.getElementById("draw_invest_card").style.display = 'none';
  document.getElementById("draw_equip_card").style.display = 'none';
  document.getElementById("draw_onetime_card").style.display = 'none';

  if(invest == 1)
    document.getElementById("draw_invest_card").style.display = 'inline-block';
  if(equip == 1)
    document.getElementById("draw_equip_card").style.display = 'inline-block';
  if(onetime == 1)
    document.getElementById("draw_onetime_card").style.display = 'inline-block';

	var x = document.getElementById("draw_card_overlay_container");
	function show_draw_card_screen(){
		$('#draw_card_overlay_container').fadeIn();
	};
	window.setTimeout( show_draw_card_screen, 100 ); // 200ms
}

//Hides drawing card screen
function hide_draw_card_screen_overlay()
{
	function hide_draw_card_screen(){
		$('#draw_card_overlay_container').fadeOut();
	};
	window.setTimeout( hide_draw_card_screen, 200 ); // 200ms
}

//Shows select player screen.
function show_select_player_screen(selection)
{
  document.getElementById("select_player_overlay_container").style.display = "initial";

  //Initially turn all player btns off
  for(var i = 1; i <= 8; i++)
  {
    var player_string = 'select_player_' + i + '_btn';
    document.getElementById(player_string).style.display = "none";
  }

  if(selection == undefined)
	{
      for(var i = 1; i <= game.num_of_players; i++)
      {
        var player_string = 'select_player_' + i + '_btn';
        if(i != game.current_player && game.player_array[i].alive == true)
        {
          document.getElementById(player_string).style.display = "initial";
        }
      }
  }
  else if(selection == 'all')
  {
      for(var i = 1; i <= game.num_of_players; i++)
      {
        var player_string = 'select_player_' + i + '_btn';
        if(game.player_array[i].alive == true)
        {
          document.getElementById(player_string).style.display = "initial";
        }
      }
  }
  else if(selection == 'attacking')
  {
      var be_attacked = false;
      for(var i = 1; i <= game.num_of_players; i++)
      {
        var player_string = 'select_player_' + i + '_btn';
        var r = game.player_array[game.current_turn].current_region;
        var y = game.player_array[i].current_region;
        if(i <= game.num_of_players && i != game.current_turn && game.player_array[i].current_region != 7 && game.player_array[i].alive == true)
        {
          // var r = game.player_array[game.current_turn].current_region;
          // var y = game.player_array[i].current_region;
          if(r == 4 || r == 5)
          {
            if(y == 4 || y == 5)
            {
              be_attacked = true;	
              document.getElementById(player_string).style.display = "initial";
            }

            if(game.player_array[game.current_turn].equipped.card_title == 'Handgun')
            {
              if(y == 2 || y == 3 || y == 6)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
            else if(game.player_array[game.current_turn].equipped.card_title == 'Sniper Rifle')
            {
              if(y == 2 || y == 3 || y == 6 || y == 8)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
          }
          else if(r == 2 || r == 3)
          {
            if(y == 2 || y == 3)
            {
              be_attacked = true;
              document.getElementById(player_string).style.display = "initial";
            }

            if(game.player_array[game.current_turn].equipped.card_title == 'Handgun')
            {
              if(y == 4 || y == 5)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
            else if(game.player_array[game.current_turn].equipped.card_title == 'Sniper Rifle')
            {
              if(y == 4 || y == 5 || y == 6)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
          }
          else if(r == 6)
          {
            if(y == 6)
            {
              be_attacked = true;
              document.getElementById(player_string).style.display = "initial";
            }

            if(game.player_array[game.current_turn].equipped.card_title == 'Handgun')
            {
              if(y == 4 || y == 5 || y == 8)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
            else if(game.player_array[game.current_turn].equipped.card_title == 'Sniper Rifle')
            {
              if(y == 4 || y == 5 || y == 8 || y == 2 || y == 3 || y == 9 || y == 10)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
          }
          else if(r == 8)
          {
            if(y == 8)
            {
              be_attacked = true;
              document.getElementById(player_string).style.display = "initial";
            }

            if(game.player_array[game.current_turn].equipped.card_title == 'Handgun')
            {
              if(y == 6 || y == 9 || y == 10)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
            else if(game.player_array[game.current_turn].equipped.card_title == 'Sniper Rifle')
            {
              if(y == 6 || y == 9 || y == 10 || y == 4 || y == 5 || y == 11 || y == 12)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
          }
          else if(r == 9 || r == 10)
          {
            if(y == 9 || y == 10)
            {
              be_attacked = true;
              document.getElementById(player_string).style.display = "initial";
            }

            if(game.player_array[game.current_turn].equipped.card_title == 'Handgun')
            {
              if(y == 8 || y == 11 || y == 12)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
            else if(game.player_array[game.current_turn].equipped.card_title == 'Sniper Rifle')
            {
              if(y == 8 || y == 11 || y == 12 || y == 6)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
          }
          else if(r == 11 || r == 12)
          {
            if(y == 11 || y == 12)
            {
              be_attacked = true;
              document.getElementById(player_string).style.display = "initial";
            }

            if(game.player_array[game.current_turn].equipped.card_title == 'Handgun')
            {
              if(y == 9 || y == 10)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
            else if(game.player_array[game.current_turn].equipped.card_title == 'Sniper Rifle')
            {
              if(y == 9 || y == 10 || y == 8)
              {
                be_attacked = true;
                document.getElementById(player_string).style.display = "initial";
              }
            }
          }
        }
      }

      if(be_attacked == false)
      {
        hide_select_player_screen();
        game.add_info_message(game.current_turn, 'There is no one you can attack');
        game.next_state = 'turn_3';
        game.exec_state();
      }
      else
      {
        game.show_roll_btn();
        game.add_info_message(game.current_turn, 'Roll for damage.');
      }

      game.be_attacked = be_attacked;
  }
  else if(selection == 'region_stealing')
  {
      var found_player = false;
      for(var i = 1; i <= game.num_of_players; i++)
      {
        var player_string = 'select_player_' + i + '_btn';
        if(i != game.current_player && game.player_array[i].hand.length > 0 && game.player_array[i].alive == true)
        {
          found_player = true;
          document.getElementById(player_string).style.display = "initial";
        }
      }

      if(found_player == false)
      {
        game.add_info_message(game.current_turn, 'No one has any cards!');
        hide_select_player_screen();
      }
  }
}

//Hides select player screen
function hide_select_player_screen()
{
	document.getElementById("select_player_overlay_container").style.display = "none";
}

//Start of select zone screen S17
function show_select_zone_screen() {
  	document.getElementById("select_zone_overlay_container").style.display = "initial";

	//initially hide all zone buttons. There is no button for 3, 5, 10, or 12 because those are the second numbers in the given zone
	document.getElementById("select_zone_2_btn").style.display = "none";
	document.getElementById("select_zone_4_btn").style.display = "none";
	document.getElementById("select_zone_6_btn").style.display = "none";
	document.getElementById("select_zone_7_btn").style.display = "none";
	document.getElementById("select_zone_8_btn").style.display = "none";
	document.getElementById("select_zone_9_btn").style.display = "none";
	document.getElementById("select_zone_11_btn").style.display = "none";
	
	
        var current = game.player_array[game.current_turn].current_region;
	if (current == 2 || current == 3) { // 2/3 is only bordered by 4
		document.getElementById("select_zone_4_btn").style.display = "initial";
		game.add_info_message(this.current_turn, 'Currently Zone 2');
	}
	else if (current == 4 || current == 5) { // 4/5 is borderd by 2/3 and 6
		document.getElementById("select_zone_2_btn").style.display = "initial";
		document.getElementById("select_zone_6_btn").style.display = "initial";
		game.add_info_message(this.current_turn, 'Currently Zone 4');
	}
	else if (current == 6) { // 6 is borderd by 4/5, 7, and 8
		document.getElementById("select_zone_4_btn").style.display = "initial";
		document.getElementById("select_zone_7_btn").style.display = "initial";
		document.getElementById("select_zone_8_btn").style.display = "initial";
		game.add_info_message(this.current_turn, 'Currently Zone 6');
	}
	else if (current == 7) { //7 is bordered by 6 and 8
		document.getElementById("select_zone_6_btn").style.display = "initial";
		document.getElementById("select_zone_8_btn").style.display = "initial";
		game.add_info_message(this.current_turn, 'Currently Zone 7');
	}
	else if (current == 8) {// 8 is bordered by 6, 7, and 9/10
		document.getElementById("select_zone_6_btn").style.display = "initial";
		document.getElementById("select_zone_7_btn").style.display = "initial";
		document.getElementById("select_zone_9_btn").style.display = "initial";
		game.add_info_message(this.current_turn, 'Currently Zone 8');
	}
	else if (current == 9 || current == 10) { // 9/10 is bordered by 8 and 11/12
		document.getElementById("select_zone_8_btn").style.display = "initial";
		document.getElementById("select_zone_11_btn").style.display = "initial";
		game.add_info_message(this.current_turn, 'Currently Zone 9');
	}
	else if (current == 11 || current == 12) { // only bordered by 9/10
		document.getElementById("select_zone_9_btn").style.display = "initial";
		game.add_info_message(this.current_turn, 'Currently Zone 11');
	}
	else {
		game.add_info_message(this.current_turn, 'You broke it, this should not happen.');
	}
	
}


function hide_select_zone_screen()
{
	document.getElementById("select_zone_overlay_container").style.display = "none";
	game.add_info_message(this.current_turn, 'Hiding select_zone_screen()');
}

//Shows general options screen
//This is a customizable screen that shows custom text for each button
//and the header text.
function show_select_options_screen(header, option_1, option_2, option_3)
{
  if(header == undefined)
    document.getElementById("select_option_header").style.display = "none";
  else
    document.getElementById("select_option_header").innerHTML = header;

  if(option_1 == undefined)
      document.getElementById("select_option_1_btn").style.display = "none";
  else
    document.getElementById("select_option_1_btn").innerHTML = option_1;

  if(option_2 == undefined)
    document.getElementById("select_option_2_btn").style.display = "none";
  else
    document.getElementById("select_option_2_btn").innerHTML = option_2;

  if(option_3 == undefined)
    document.getElementById("select_option_3_btn").style.display = "none";
  else
    document.getElementById("select_option_3_btn").innerHTML = option_1;

	document.getElementById("select_options_overlay_container").style.display = "initial";
}

//Hides general selection screen
function hide_select_options_screen()
{
  //Reset displays
  document.getElementById("select_option_header").style.display = "initial";
  document.getElementById("select_option_1_btn").style.display = "initial";
  document.getElementById("select_option_2_btn").style.display = "initial";
  document.getElementById("select_option_3_btn").style.display = "initial";

  //hide screen
	document.getElementById("select_options_overlay_container").style.display = "none";
}

//Sets up the main game layout. Calculates box sizes according to how big the
//the screen size is.
function game_layout_setup()
{
	window_w = window.innerWidth;
	window_h = window.innerHeight;

	var border_width = (window_w * .005);

	//Body border
	document.getElementsByTagName("BODY")[0].style.border = "black " + "solid " + border_width + "px";


	//Show Card Overlay Container
	//document.getElementById("show_card_overlay_container").style.border = "orange " + "solid " + border_width + "px";
	//document.getElementById("show_card_overlay_container").style.top = "0px";
	//document.getElementById("show_card_overlay_container").style.left = "0px";
	//document.getElementById("show_card_overlay_container").style.width = Math.floor(border_width + (window_w * 1)) + "px";
	//document.getElementById("show_card_overlay_container").style.height = Math.floor(border_width + (window_h * 1)) + "px";

	//Menu Button Container
	// document.getElementById("menu_container").style.top = Math.floor(border_width + (window_h * .02)) + "px";
	// document.getElementById("menu_container").style.left = Math.floor(border_width + (window_w * .01)) + "px";
	//document.getElementById("menu_container").style.width = Math.floor(border_width + (window_w * .06)) + "px";
	//document.getElementById("menu_container").style.height = Math.floor(border_width + (window_h * .04)) + "px";

  //Current player box
  //document.getElementById("current_player_box").style.bottom = Math.floor(border_width + (window_h * .28)) + "px";

  //Player color box
  document.getElementById("player_color_box").style.bottom = Math.floor(border_width + (window_h * .28)) + "px";

	//Zoom Button Container
	document.getElementById("zoom_container").style.bottom = Math.floor(border_width + (window_h * .28)) + "px";

	// document.getElementById("zoom_container").style.right = Math.floor(border_width + (window_w * .02)) + "px";
	// document.getElementById("zoom_container").style.width = Math.floor(border_width + (window_w * .06)) + "px";
	// document.getElementById("zoom_container").style.height = Math.floor(border_width + (window_h * .04)) + "px";

	//Player Container
	document.getElementById("player_container").style.border = "black " + "solid " + border_width + "px";
	document.getElementById("player_container").style.bottom = Math.floor(border_width + 0) + "px";
	document.getElementById("player_container").style.left = Math.floor(border_width + 0) + "px";
	document.getElementById("player_container").style.width = Math.floor(border_width + (window_w * .35)) + "px";
	document.getElementById("player_container").style.height = Math.floor(border_width + (window_h * .24)) + "px";

	//Cards Container
	document.getElementById("cards_container").style.border = "black " + "solid " + border_width + "px";
	document.getElementById("cards_container").style.bottom = Math.floor(border_width + 0) + "px";
	document.getElementById("cards_container").style.left = Math.floor(border_width + (window_w * .36)) + "px";
	document.getElementById("cards_container").style.width = Math.floor(border_width + (window_w * .47)) + "px";
	document.getElementById("cards_container").style.height = Math.floor(border_width + (window_h * .24)) + "px";

	//Action Container
	document.getElementById("action_container").style.border = "black " + "solid " + border_width + "px";
	document.getElementById("action_container").style.bottom = Math.floor(border_width + 0) + "px";
	document.getElementById("action_container").style.left = Math.floor(border_width + (window_w * .84)) + "px";
	document.getElementById("action_container").style.width = Math.floor(border_width + (window_w * .14)) + "px";
	document.getElementById("action_container").style.height = Math.floor(border_width + (window_h * .24)) + "px";

	//Canvas Container
	//document.getElementById("canvas_container").style.border = "black " + "solid " + border_width + "px";
	//document.getElementById("canvas_container").style.top = Math.floor(border_width + 0) + "px";
	//document.getElementById("canvas_container").style.left = Math.floor(border_width + (window_w * 0)) + "px";
	//document.getElementById("canvas_container").style.width = Math.floor(border_width + (window_w * .99)) + "px";
	//document.getElementById("canvas_container").style.height = Math.floor(border_width + (window_h * .77)) + "px";
}

//Calls game layout setup everytime the screen is resized.
$( window ).resize(function() {
  game_layout_setup();
  container_height = $("#canvas_container").height()
  container_width = $("#canvas_container").width()
  renderer.setSize( container_width, container_height );
  camera.aspect = container_width / container_height;
  camera.updateProjectionMatrix();

});

//Main game class
//This class contains everything needed to make the game run from setting up
//the screens to how the game rules work.
class Game{
	constructor()
	{
    //Shuffle characters up
		array_shuffle(charactersArray);

    //Assign characters
		this.player_array = new Array(9);
		//for(var i = 1; i <= this.player_array.length; i++)
			//this.player_array[i] = new Player(charactersArray[i]);

    //State machine initial values.
	this.last_state='start_game';
    this.current_state = 'start_game';
    this.next_state = 'start_game';

    //Object variables
		this.num_of_players = 0; //Number of players
		this.current_player = 1; //Current on screen player
    this.current_turn = 1; //Current players turn
    this.num_of_rotations = 0; //Number of turns that have happened
    this.selected_player; //Selected player
    this.selected_zone; //Selected zone
    this.current_attacking_player = 0; //Player attacking
    this.current_defending_player = 0; //Player defending
    this.current_attacking_player_pts = 0; //Attacking pts
    this.current_defending_player_pts = 0; //Defending pts
    this.has_attacked = 0;
    this.be_attacked = false;
    this.selected_option = 0;

    //Used for sam's special
    this.double_damage= 0;

    //this.drawn_invest_card = new Investigation();
    this.drawn_invest_card; //Current drawn Investigation card
    this.drawn_equip_card; //Current equip card
    this.drawn_action_card; //Current drawn action card
    this.used_equip_card = 0;
	}

  //Called when user clicks start game. This simply starts the state machine.
  start()
  {
    this.exec_state();
  }

  //Contains every state for state machine.
  exec_state(state)
  {
    if(state == undefined)
    {
      this.current_state = this.next_state;
      state = this.current_state;
    }

    if(state != 'start_game')
    {
      this.check_win_or_dead();
    }

    switch(state)
    {
      case 'start_game':
        this.next_state = 'turn_0';
        var player_color_array = ['padding', 'white', 'red', 'green', 'blue', 'orange', 'purple', 'yellow', 'black'];
        //For graphics
        var players_playing_colors = new Array(this.num_of_players);
        for(var i = 1; i <= this.num_of_players; i++)
        {
          this.player_array[i].player_color = player_color_array[i];
          players_playing_colors.push(player_color_array[i]);
        }
        for(var i = 1; i <= 8; i++)
        {
          var color_string = 'player_' + i + '_color_box';
          if(i > this.num_of_players)
            document.getElementById(color_string).style.display = "none";
        }
        setDamage(players_playing_colors)
        game_screen_setup();
        //testing game
        //this.player_array[2].character = Daniel;
        //this.player_array[2].alive = true;
        //this.player_array[2].hp = this.player_array[2].character.hp;

        this.exec_state();
        break;
      case 'turn_0':
        if(this.player_array[this.current_turn].alive == false)
          this.exec_state('turn_4');
		this.last_state=state;
        
        this.switch_player(this.current_turn);
        document.getElementById('current_player_id').innerHTML = this.current_player;
        document.getElementById('current_player_box_color').style.color = this.player_array[this.current_turn].player_color;
        document.getElementById('current_player_box_color').innerHTML = this.player_array[this.current_turn].player_color.toUpperCase();
        this.check_win_or_dead();
        this.has_attacked = 0;
        this.be_attacked = false;
        this.add_info_message(this.current_turn, 'Starting your turn.');
	if(this.player_array[this.current_player].character.char_name == 'CIA Charlie' && this.player_array[this.current_player].used_special == 1) {
		this.show_charlie_special_move_btn();
		this.add_info_message(this.current_turn, 'Click "ROLL" to roll and move your player or "ADJACENT" to move to an adjacent zone.');
	}
    	else {
		this.show_roll_btn();
		this.add_info_message(this.current_turn, 'Click "ROLL" to roll and move your player.');
		this.next_state = 'turn_1';
	}
        
        if(this.player_array[this.current_turn].hand.length > 0)
          this.add_info_message(this.current_turn, 'You can change your equipment card before you roll.');
        break;
      case 'turn_1':
	this.last_state=state;
	rollWhiteDice(this.player_array[this.current_turn].player_color);
	this.player_array[this.current_turn].current_region = dice1Value + dice2Value;
	this.add_info_message(this.current_player, 'You rolled a ' + this.player_array[this.current_turn].current_region + '!');
	var r = this.player_array[this.current_player].current_region;

			if(r == 2 || r == 3 || r == 4 || r == 5 || r == 6 || r == 8)
			{
			  this.next_state = 'draw_card_0';
			  this.show_draw_btn();
			  this.add_info_message(this.current_turn, 'Click "DRAW" to choose a card.');
			}
			else if(r == 11 || r == 12)
			{
			  var anyone_have_cards = false;
			  for(var i = 1; i <= this.num_of_players; i++)
			  {
				if(this.player_array[i].hand.length > 0)
				  anyone_have_cards = true;
			  }
			  if(anyone_have_cards == true)
				this.exec_state('steal_region_0');
			  else
				this.next_state = 'turn_2';
				this.exec_state();
			}
			else if(r == 9 || r == 10)
			{
			  this.exec_state('damage_region_0');
			}
			else
			{
			  this.next_state = 'turn_3';
			  this.exec_state();
			}
        this.check_win_or_dead();
        break;
      case 'turn_2':
        this.next_state = 'turn_3';
		    this.show_general_btn(this.last_state);
		    this.last_state=state;
        this.exec_state();
        break;
      case 'turn_3':
    		if(this.last_state=="turn_1")
    		{
    	      this.show_general_btn(this.last_state);
    		}
    		this.add_info_message(this.current_turn, 'You can now attack a player, select a card to equip, use your special, or end your turn.');
        this.next_state = 'turn_4';
		    this.last_state=state;
        break;
      case 'turn_4':
        this.next_state = 'turn_0';
        if(this.player_array[this.current_turn].alive == true)
          this.add_info_message(this.current_turn, 'Ended your turn.<br><br>');
        if(this.current_turn == this.num_of_players)
        {
          this.current_turn = 1;
          this.num_of_rotations++;
        }
        else
          this.current_turn++;
        this.current_player = this.current_turn;
        this.check_win_or_dead();
		this.last_state=state;
        this.exec_state();
        break;
      
	//Special state for Charlie's movement
      case 'charlie_movement_0':
   	this.add_info_message(this.current_turn, "ADJACENT worked");
	this.last_state = state;
	show_select_zone_screen(); // shows charlie the options of the adjacent zones and sets this.selected_zone to choice

	this.player_array[this.current_turn].current_region = this.selected_zone;	    
    	var new_region = this.player_array[this.current_turn].current_region;
	this.add_info_message(this.current_turn, 'You picked Zone ' + this.selected_zone +'.');	    
		    
	if(new_region == 2 || new_region == 3 || new_region == 4 || new_region == 5 || new_region == 6 || new_region == 8)
	{
	  	this.next_state = 'draw_card_0';
	  	this.show_draw_btn();
	  	this.add_info_message(this.current_turn, 'Click "DRAW" to choose a card.');
	}
	else if(new_region == 11 || new_region == 12)
	{
	  	var anyone_have_cards = false;
	  	for(var i = 1; i <= this.num_of_players; i++)
	  	{
			if(this.player_array[i].hand.length > 0) {
		  		anyone_have_cards = true;
			}
	  	}
	  	if(anyone_have_cards == true) {
			this.exec_state('steal_region_0');
		}
	  	else {
			this.next_state = 'turn_2';
			this.exec_state();
		}
	}
	else if(new_region == 9 || new_region == 10)
	{
	  	this.exec_state('damage_region_0');
	}
	else
	{
	  	this.next_state = 'turn_3';
	  	this.exec_state();
	}
 	this.check_win_or_dead();
	break;
		    
      //Draw
      case 'draw_card_0':
        this.next_state = 'draw_card_1';
        if(this.player_array[this.current_turn].current_region == 2 || this.player_array[this.current_turn].current_region == 3)
        {
          if(equipmentArray.length > 0)
          {
            draw_card_screen_overlay(1,1,1);
          }
          else {
            draw_card_screen_overlay(1,0,1);
          }
          this.check_win_or_dead();
        }

        else if(this.player_array[this.current_turn].current_region == 4 || this.player_array[this.current_turn].current_region == 5)
          draw_card_screen_overlay(1,0,0);
        else if(this.player_array[this.current_turn].current_region == 6)
        {
          if(equipmentArray.length > 0)
          {
            draw_card_screen_overlay(0,1,0);
          }
          else {
            this.add_info_message(this.current_turn, 'No more equipment cards to draw.');
            this.exec_state();
          }
          this.check_win_or_dead();
        }
        else if(this.player_array[this.current_turn].current_region == 8)
          draw_card_screen_overlay(0,0,1);
		this.last_state=state;
        this.check_win_or_dead();
        break;
      case 'draw_card_1':
        this.next_state = 'turn_2';
        hide_draw_card_screen_overlay();
        this.check_win_or_dead();
		      this.last_state=state;
        this.exec_state();
        break;

      //Draw invest card only
      case 'draw_invest_card_only':
        this.next_state = 'draw_card_1';
        draw_card_screen_overlay(1,0,0);
		      this.last_state=state;
        this.check_win_or_dead();
        break;

      case 'steal_region_0':
        this.next_state = 'steal_region_1';
        show_select_player_screen('region_stealing');
        this.add_info_message(this.current_turn, 'Select which player to steal card from.');
        this.check_win_or_dead();
        break;
      case 'steal_region_1':
	    this.last_state=state;
        this.next_state = 'turn_2';
        hide_select_player_screen();
        this.steal_equip_card();
        this.check_win_or_dead();
		    this.last_state=state;
        //this.add_info_message(this.current_turn, 'Select which player to steal card from.');
        this.exec_state();
        break;

      case 'damage_region_0':
        this.next_state = 'damage_region_1';
        show_select_options_screen("DAMAGE OR HEAL A PLAYER?", "HEAL", "DAMAGE");
		this.last_state=state;
        this.check_win_or_dead();
        break;
      case 'damage_region_1':
        this.next_state = 'damage_region_2';
        hide_select_options_screen();
        if(this.selected_option == 1)
        {
          this.add_info_message(this.current_turn, 'Select player to heal.');
          show_select_player_screen('all');
        }
        else
        {
          this.add_info_message(this.current_turn, 'Select player to damage.');
          show_select_player_screen();
        }
		this.last_state=state;
        this.check_win_or_dead();
        break;
      case 'damage_region_2':
	    this.last_state=state;
        this.next_state = 'damage_region_3';
        hide_select_player_screen();
        if(this.selected_option == 1)
        {
          if(this.player_array[this.selected_player].hp != 0)
          {
              //this.player_array[this.selected_player].hp = this.player_array[this.selected_player].hp - 1;
              moveDamage(this.player_array[this.selected_player].player_color, -1);
          }
        }
        else
        {
            //this.player_array[this.selected_player].hp = this.player_array[this.selected_player].hp + 1;
            moveDamage(this.player_array[this.selected_player].player_color, 2);
        }
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;
      case 'damage_region_3':
	    this.last_state=state;
        this.next_state = 'turn_2';
        this.exec_state();
        break;


      //Attacking
      case'attack_0': // After Attack is pressed
        if(this.player_array[this.current_turn].current_region == 7)
        {
          this.add_info_message(this.current_turn, 'You cannot attack while in safehouse.');
        }
        else if(this.has_attacked == 0)
        {
          this.next_state = 'attack_1';
          this.add_info_message(this.current_turn, 'Select which player to attack.');
          //show_attack_select_player_screen();
          show_select_player_screen('attacking');
          if(this.be_attacked == true)
            this.has_attacked = 1;
        }
        else
        {
          this.add_info_message(this.current_player, 'You cannot attack. You\'re already attacking, being attacked, or already attacked.');
        }
		this.last_state=state;
        this.check_win_or_dead();
        break;
      case 'attack_1': //Roll for attacker damage
        this.next_state = 'attack_2';
        rollOneRedDice();
        this.show_defense_pass_btn();
        this.current_attacking_player_pts = dice1Value;
        this.current_attacking_player = this.current_turn;
        this.current_defending_player = this.selected_player;
        this.add_info_message(this.current_player, 'You rolled a ' + this.current_attacking_player_pts + '!');
        this.add_info_message(this.current_turn, 'Press "PASS TO DEFENSE" and pass to defending player.');
        //ADD WAIT FOR DICE ROLL!!!
		    this.last_state=state;
        this.check_win_or_dead();
        break;
      case 'attack_2': //Transition to Defender
        this.next_state = 'attack_3';
        this.switch_player(this.selected_player);
        this.show_roll_btn();
        this.add_info_message(this.current_player, 'You are being attacked by Player ' + this.current_turn + '! They rolled a ' + this.current_attacking_player_pts + '. \rRoll to defend!.');
		    this.last_state=state;
        this.check_win_or_dead();
        break;
      case 'attack_3': // Roll for Defense
        this.next_state = 'attack_4';
        rollOneGreenDice();
        this.current_defending_player_pts = dice1Value;
        this.add_info_message(this.current_player, 'You rolled a ' + this.current_defending_player_pts + '!');
        this.show_offense_pass_btn(this.player_array[this.current_defending_player].character.char_name);
        var damage = 0;

        //Check if Balance Suit is equipped
        if(this.player_array[this.current_defending_player].equipped.card_title == 'Balance Suit' || this.player_array[this.current_attacking_player].equipped.card_title == 'Balance Suit')
          damage = (this.current_attacking_player_pts - this.current_defending_player_pts) - 1;
        else
          damage = (this.current_attacking_player_pts - this.current_defending_player_pts);

        //Check if Good Luck Charm is equipped
        if((this.player_array[this.current_player].current_region == 9 || this.player_array[this.current_player].current_region == 10) && this.player_array[this.current_player].equipped.card_title == 'Good Luck Charm')
        {
            this.add_info_message(this.current_player, 'You have "Good Luck Charm" equipped! You take no damage!');
        }
        else
        {
            if(this.current_attacking_player_pts > this.current_defending_player_pts)
            {
              //Check if Garrote or Blow Gun is equipped
              if(this.player_array[this.current_turn].equipped.card_title == 'Garrote' || this.player_array[this.current_turn].equipped.card_title == 'Blow Gun')
                damage=damage+1;

              //Check if Hand Gun or Sniper Rifle is equipped
              if(this.player_array[this.current_turn].equipped.card_title == 'Sniper Rifle' || this.player_array[this.current_turn].equipped.card_title == 'Handgun')
                damage=damage+1;

              this.double_damage = damage; //Used for sam's special
              moveDamage(this.player_array[this.current_player].player_color, damage);
              //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + damage;
              this.add_info_message(this.current_player, 'You lost the attack! You took ' + damage + ' point(s) of damage.');
              this.add_info_message(this.current_turn, 'You won the attack! You gave ' + damage + ' damage to Player ' + this.current_player + '.');

              var total_hp = this.player_array[this.current_player].character.hp;
              document.getElementById("player_hp").innerHTML = total_hp - this.player_array[this.current_player].hp;
            }
            else
            {
              this.add_info_message(this.current_player, 'You won the attack! You lost 0 point(s) of health.');
              this.add_info_message(this.current_turn, 'You lost the attack! You gave 0 damage to Player ' + this.current_player + '.');
            }

        }
		    this.last_state=state;
        this.check_win_or_dead();
        this.add_info_message(this.current_player, 'Press "PASS TO OFFENSE" and pass to attacking player.');
        //ADD WAIT FOR DICE ROLL!!!
        break;
      case 'attack_4': // Transition back to attacker
	    this.last_state=state;
        this.next_state = 'turn_2';
        //this.add_info_message(this.current_turn, 'You BlANK your attack! You gave BLANK damage to BLANK');
		this.last_state=state;
        this.check_win_or_dead();
        this.switch_player(this.current_turn);
        this.exec_state();
        break;

      //Specials
      case 'special_0':
        switch(this.player_array[this.current_player].character.char_name)
        {
          case 'Ayman al-Zawahiri':
            this.next_state = 'ayman_special_0';
            break;
          case 'Hassan Nasrallah':
            this.next_state = 'hassan_special_0';
            break;
          case 'Osama Bin Laden':
            this.next_state = 'tori_special_0';
            break;
          case 'Sam Seal':
            this.next_state = 'sam_special_0';
            break;
          case 'CIA Charlie':
            this.next_state = 'charlie_special_0';
            break;
          case 'FBI Fred':
            this.next_state = 'fred_special_0';
            break;
          case 'Daniel Doomsday':
            this.next_state = 'daniel_special_0';
            break;
          case 'Gatherin\' George':
            this.next_state = 'george_special_0';
            break;
          case 'Totally Tori':
            this.next_state = 'tori_special_0';
            break;
          case 'Billy-Bob Badass':
            this.next_state = 'billy_special_0';
            break;
        }
		this.last_state=state;
        this.exec_state();
        break;

      case 'ayman_special_0':
        this.next_state = 'turn_3';
        //this.next_state = 'ayman_special_1';
        if(this.player_array[this.current_player].used_special == 1)
        {
          this.add_info_message(this.current_player, "You've already used your special");
        }
        else if(this.has_attacked == 0)
        {
          this.add_info_message(this.current_player, "You must attack first");
        }
        else if(this.current_player != this.current_turn)
        {
          this.add_info_message(this.current_player, "You can only use this special during your turn");
        }
        else if((this.current_attacking_player_pts - this.current_defending_player_pts) < 3)
        {
          this.add_info_message(this.current_player, "You must inflict 3 or more damage to use this special");
        }
        else
        {
          this.reveal_player();
          this.player_array[this.current_player].used_special = 1;
          //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 2;
          moveDamage(this.player_array[this.current_player].player_color, -2); // Heals Ayman 2 damage points
          this.add_info_message(this.current_player, "You've used your special!");
        }
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      case 'hassan_special_0':
        this.next_state = 'turn_3';
        this.add_info_message(this.current_player, "You can only use your special when you see the 'LIE' button. You have no limit on your special.");
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      case 'sam_special_0':
        this.next_state = 'turn_3';
        //this.next_state = 'ayman_special_1';
        if(this.player_array[this.current_player].used_special == 1)
        {
          this.add_info_message(this.current_player, "You've already used your special");
        }
        else if(this.has_attacked == 0)
        {
          this.add_info_message(this.current_player, "You must attack first");
        }
        else if(this.current_player != this.current_turn)
        {
          this.add_info_message(this.current_player, "You can only use this special during your turn");
        }
        else if(this.current_attacking_player_pts <= this.current_defending_player_pts)
        {
          this.add_info_message(this.current_player, "You must win the attack to use this special");
        }
        else
        {
	  this.reveal_player();
          this.player_array[this.current_player].used_special = 1;
          //this.player_array[this.current_defending_player].hp = this.player_array[this.current_defending_player].hp + this.double_damage;
          moveDamage(this.player_array[this.current_defending_player].player_color, this.double_damage);
          this.add_info_message(this.current_player, "You've used your special!");
	  this.double_damage = 0; // reset double damage to 0
        }
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      case 'fred_special_0':
		this.last_state=state;
        this.next_state = 'fred_special_1';
        if(this.player_array[this.current_player].used_special == 1)
        {
          this.add_info_message(this.current_player, "You've already used your special");
          this.next_state = 'turn_3';
          this.exec_state();
        }
        else if(this.has_attacked != 0)
        {
          this.add_info_message(this.current_player, "You can only use this special before an attack");
          this.next_state = 'turn_3';
          this.exec_state();
        }
        else if(this.current_player != this.current_turn)
        {
          this.add_info_message(this.current_player, "You can only use this special during your turn");
          this.next_state = 'turn_3';
          this.exec_state();
        }
        else
        {
          show_select_player_screen();
        }
        break;
      case 'fred_special_1':
        this.next_state = 'turn_3';
        hide_select_player_screen();
        var damage = (Math.floor(Math.random() * 6) + 1);
        //this.player_array[this.selected_player].hp = this.player_array[this.selected_player].hp + damage;
        moveDamage(this.player_array[this.selected_player].player_color, damage);
	this.reveal_player();
        this.player_array[this.current_player].used_special = 1;
        this.add_info_message(this.current_player, "You used your special!");
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      case 'daniel_special_0':
        this.next_state = 'turn_3';
        //this.next_state = 'daniel_special_1';
        if(this.player_array[this.current_player].used_special == 1)
        {
          this.add_info_message(this.current_player, "You've already used your special");
        }
        else if(this.has_attacked == 0)
        {
          this.add_info_message(this.current_player, "You must attack first");
        }
        else if(this.current_player != this.current_turn)
        {
          this.add_info_message(this.current_player, "You can only use this special during your turn");
        }
        else if(this.current_attacking_player_pts > this.current_defending_player_pts)
        {
          this.add_info_message(this.current_player, "You must win the attack to use this special");
        }
        else if(this.player_array[this.current_defending_player].revealed == false)
        {
          this.add_info_message(this.current_player, "Player must be revealed");
        }
        else if(this.player_array[this.current_defending_player].character.affiliation == "Counter-Terrorist" || this.player_array[this.current_defending_player].character.affiliation == "Neutral")
        {
          this.add_info_message(this.current_player, "Player must be a Terrorist");
        }
        else
        {
          if(this.player_array[this.current_player].hp > 0)
          {
            this.reveal_player();
            this.player_array[this.current_player].used_special = 1;
            //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 1;
            moveDamage(this.player_array[this.current_player].player_color, -1);
            this.add_info_message(this.current_player, "You've used your special!");
          }
          else{
            this.add_info_message(this.current_player, "Player has full health!");
          }

        }
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      case 'george_special_0':
        this.next_state = 'turn_3';
        //this.next_state = 'george_special_1';
        if(this.player_array[this.current_player].used_special == 1)
        {
          this.add_info_message(this.current_player, "You've already used your special");
        }
        else if(this.has_attacked == 0)
        {
          this.add_info_message(this.current_player, "You must attack first");
        }
        else if(this.current_player != this.current_turn)
        {
          this.add_info_message(this.current_player, "You can only use this special during your turn");
        }
        else if((this.current_attacking_player_pts - this.current_defending_player_pts) >= 2)
        {
          this.add_info_message(this.current_player, "You must inflict 2 or more damage to use this special");
        }
        else
        {
          if(this.player_array[this.current_defending_player].hand.length > 0)
          {
            this.reveal_player();
            this.player_array[this.current_player].used_special = 1;
            this.steal_equip_card();
            this.add_info_message(this.current_player, "You've used your special!");
          }
          else {
            this.add_info_message(this.current_player, "Player has no equipment cards!");
          }

        }
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      case 'billy_special_0':
        //this.next_state = 'ayman_special_1';
        this.next_state = 'turn_3';
        if(this.player_array[this.current_player].used_special == 1)
        {
          this.add_info_message(this.current_player, "You've already used your special");
        }
        else if(this.has_attacked == 0)
        {
          this.add_info_message(this.current_player, "You must attack first");
        }
        else if(this.current_player != this.current_turn)
        {
          this.add_info_message(this.current_player, "You can only use this special during your turn");
        }
        else
        {
          this.reveal_player();
          this.player_array[this.current_player].used_special = 1;
          this.has_attacked = 0;
          this.be_attacked = false;
	  moveDamage(this.player_array[this.selected_player].player_color, 2); // billy takes 2 damage to use special

          this.add_info_message(this.current_player, "You may now attack again!");
          this.add_info_message(this.current_player, "You've used your special!");
        }
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;
	
      case 'charlie_special_0':	// reveal and allows charlie to move to an adjacent zone instead of rolling
 	this.next_state = 'turn_3';
	if(this.player_array[this.current_player].used_special == 1)
    	{
	   this.add_info_message(this.current_player, "You've already used your special");
    	}
        else if (this.current_player != this.current_turn) 
    	{
	    this.add_info_message(this.current_player, "You've can only use this special during your turn");
    	}
    	else 
    	{
	    this.reveal_player();
	    this.player_array[this.current_player].used_special = 1;
	    this.add_info_message(this.current_player, "You've used your special!");
    	}
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;
	
      case 'tori_special_0':
        //this.next_state = 'ayman_special_1';
        this.next_state = 'turn_3';
        if(this.player_array[this.current_player].used_special == 1)
        {
          this.add_info_message(this.current_player, "You've already used your special");
        }
        else if(this.current_player != this.current_turn)
        {
          this.add_info_message(this.current_player, "You can only use this special during your turn");
        }
        else
        {
          if(this.player_array[this.current_player].hp > 0)
          {
            this.reveal_player();
            // for(var i = 0; i < this.player_array[this.current_player].hp; i++)
            //   moveDamage(this.player_array[this.current_player].player_color, -1);
            resetDamage(this.player_array[this.current_player].player_color);
            this.player_array[this.current_player].hp = 0;
            this.player_array[this.current_player].used_special = 1;
            this.add_info_message(this.current_player, "You used your special!");
          }
          else{
            this.add_info_message(this.current_player, "Your health is full!");
          }
        }
		this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      //Investigation
      case 'invest_0':
        hide_draw_card_screen_overlay();
        if(investigationArray.length > 0)
        {
          this.drawn_invest_card = investigationArray[0];
          investigationArray.shift();
        }
        else
        {
          investigationArray = new_deck_investigationArray;
          array_shuffle(investigationArray);
          this.drawn_invest_card = investigationArray[0];
          investigationArray.shift();
        }
        switch(this.drawn_invest_card.card_title)
        {
          case 'accuse1':
            this.next_state = 'accuse1_0';
            break;
          case 'accuse2':
            this.next_state = 'accuse1_0';
            break;
          case 'accuse3':
            this.next_state = 'accuse3_0';
            break;
          case 'accuse4':
            this.next_state = 'accuse4_0';
            break;
          case 'accuse5':
            this.next_state = 'accuse5_0';
            break;
          case 'accuse6':
            this.next_state = 'accuse6_0';
            break;
          case 'accuse7':
            this.next_state = 'accuse7_0';
            break;
          case 'accuse8':
            this.next_state = 'accuse8_0';
            break;
          case 'accuse9':
            this.next_state = 'accuse9_0';
            break;
          case 'accuse10':
            this.next_state = 'accuse10_0';
            break;
          case 'accuse11':
            this.next_state = 'accuse11_0';
            break;
          case 'accuse12':
            this.next_state = 'accuse12_0';
            break;
          case 'accuse13':
            this.next_state = 'accuse11_0';
            break;
          case 'accuse14':
            this.next_state = 'accuse14_0';
            break;
          case 'accuse15':
            this.next_state = 'accuse10_0';
            break;
          case 'reveal1':
            this.next_state = 'reveal1_0';
            break;
          case 'reveal2':
            this.next_state = 'reveal2_0';
            break;
          default:
            this.next_state = 'draw_card_1';
            break;
        }
		      this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      case 'invest_1':
		    this.last_state=state;
        if((this.player_array[this.current_player].equipped.card_title == 'Water Board' || this.player_array[this.current_player].equipped.card_title == 'Cattle Prod') && this.used_equip_card == 0)
        {
          this.used_equip_card = 1;
          this.exec_state('invest_2');
        }
        else
        {
          this.used_equip_card = 0;
          this.exec_state('turn_2');
        }
        break;
      case 'invest_2':
        this.next_state = 'draw_invest_card_only';
		      this.last_state=state;
        this.show_draw_btn();
        this.check_win_or_dead();
        break;

      //One Time Action
      case 'one_time_0':
		    this.last_state=state;
        break;

      //Equipment
      case 'equip_0':
        this.next_state = 'equip_1';
        hide_draw_card_screen_overlay();
        if(equipmentArray.length > 0)
        {
          this.drawn_equip_card = equipmentArray[0];
          equipmentArray.shift();
        }
        else
          this.add_info_message(this.current_turn, 'Sorry, no more equipment cards to draw!');



        /*switch(this.drawn_equip_card.card_title)
        {
          case 'Compass':
            this.next_state = 'equip_1';
            this.drawn_invest_card =
            this.add_card_to_hand()
            break;
          default:
            this.next_state = 'draw_card_1';
            break;
        }*/
        show_zoomed_card(this.drawn_equip_card);
        this.add_card_to_hand();
        //this.exec_state();
		this.last_state=state;
        this.check_win_or_dead();
        break;
      case 'equip_1':
        hide_zoomed_card();
		this.last_state=state;
        this.exec_state('turn_2');
        break;

      case 'equip_card_to_player':
		this.last_state=state;
        show_view_card(game.drawn_equip_card);
        //Do equip stuff
        break;

      case 'select_option_1':
        this.selected_option = 1;
		    this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;
      case 'select_option_2':
        this.selected_option = 2;
		    this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;
      case 'select_option_3':
        this.selected_option = 3;
		    this.last_state=state;
        this.check_win_or_dead();
        this.exec_state();
        break;

      //Investigation accuse card - I bet you are a Terrorist.  If so, you receive 1 damage
      //Show card and wait for user to click card
      case 'accuse1_0':
        this.next_state = 'accuse1_1';
        hide_draw_card_screen_overlay();
        show_zoomed_card(this.drawn_invest_card);
        this.add_info_message(this.current_player, 'Click card to use it.');
		    this.last_state=state;
        this.check_win_or_dead();
        break;
      //Let player select who to investigate.
      case 'accuse1_1':
        this.next_state = 'accuse1_2';
        hide_zoomed_card();
        this.add_info_message(this.current_player, 'Select player to investigate.');
        show_select_player_screen();
		    this.last_state=state;
        this.check_win_or_dead();
        break;
      //Switch to the player selected. If player can lie, show lie btn.
      case 'accuse1_2':
        this.next_state = 'accuse1_3';
        this.switch_player(this.selected_player);
        this.add_info_message(this.current_player, "Player " + this.current_turn + ": " + this.drawn_invest_card.card_text);
        if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
        {
          this.add_info_message(this.current_player, "You can lie! Press 'TAKE 1 DAMAGE' or 'LIE'.");
          show_select_options_screen("YOU'RE BEING INVESTIGATED AS BEING A TERRORIST! SELECT AN OPTION.", 'TAKE ONE DAMAGE', 'LIE');
        }
        else
        {
          if(this.player_array[this.current_player].character.affiliation == 'Terrorist')
          {
            this.add_info_message(this.current_player, "You cannot lie! Press 'TAKE 1 DAMAGE'.");
            show_select_options_screen("YOU'RE BEING INVESTIGATED AS BEING A TERRORIST!", "TAKE 1 DAMAGE");
          }
          else
          {
            this.add_info_message(this.current_player, "You cannot lie but you're not a Terrorist! Press 'OK'.")
            show_select_options_screen("YOU'RE BEING INVESTIGATED AS BEING A TERRORIST!", "OK");
          }
        }
		    this.last_state=state;
        this.check_win_or_dead();
        break;
      //Calculate damage then switch back to current turn player.
      case 'accuse1_3':
        hide_select_options_screen();
        if(this.selected_option == 2)
          this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
        else
        {
          if(this.player_array[this.current_player].character.affiliation == 'Terrorist')
          {
            //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
            moveDamage(this.player_array[this.current_player].player_color, 1);
          }
        }
		    this.last_state=state;
        this.check_win_or_dead();
        this.switch_player(this.current_turn);
        this.exec_state('invest_1');
        break;

      //Investigation accuse card
      //"I bet you are Neutral.
      //If so, you heal 1 damage
      //(If you have no damage - take one damage instead)
      //Show card and wait for user to click card
      case 'accuse3_0':
        this.next_state = 'accuse3_1';
        hide_draw_card_screen_overlay();
        show_zoomed_card(this.drawn_invest_card);
        this.add_info_message(this.current_player, 'Click card to use it.');
		    this.last_state=state;
        this.check_win_or_dead();
        break;
      //Let player select who to investigate.
      case 'accuse3_1':
        this.next_state = 'accuse3_2';
        hide_zoomed_card();
        this.add_info_message(this.current_player, 'Select player to investigate.');
		    this.last_state=state;
        show_select_player_screen();
        this.check_win_or_dead();
        break;
      case 'accuse3_2':
          this.next_state = 'accuse3_3';
          this.switch_player(this.selected_player);
          this.add_info_message(this.current_player, "Player " + this.current_turn + ": " + this.drawn_invest_card.card_text);
          if(this.player_array[this.current_player].character.char_name == "Hassan Nasrallah"){
            this.add_info_message(this.current_player, "You can lie! Press 'HEAL/TAKE 1 DAMAGE' or 'LIE'");
            show_select_options_screen("YOU'RE BEING INVESTIGATED AS BEING A NEUTRAL! SELECT AN OPTION. (YOU TAKE DAMAGE INSTEAD OF HEAL IF YOU HAVE NO DAMAGE)", 'HEAL/TAKE 1 DAMAGE', 'LIE');
          }
          else{
            if(this.player_array[this.current_player].character.affiliation == 'Neutral'){
              this.add_info_message(this.current_player, "You cannot lie! Press 'HEAL/TAKE 1 DAMAGE'.");
              show_select_options_screen("YOU'RE BEING INVESTIGATED AS BEING A NEUTRAL! (YOU TAKE DAMAGE INSTEAD OF HEAL IF YOU HAVE NO DAMAGE)", "HEAL/TAKE 1 DAMAGE");
            }
            else{
              this.add_info_message(this.current_player, "You cannot lie, but you are not Neutral.  Press 'OK'.")
              show_select_options_screen("YOU'RE BEING INVESTIGATED AS BEING A NEUTRAL!", "OK");
            }
          }
		      this.last_state=state;
          this.check_win_or_dead();
          break;
      case 'accuse3_3':
          hide_select_options_screen();
          if(this.selected_option == 2){
            if(this.player_array[this.current_player].hp == 0){
              //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
              moveDamage(this.player_array[this.current_player].player_color, 1);
            }
            else{
              //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 1;
              moveDamage(this.player_array[this.current_player].player_color, -1);
            }
          }
          else{
            if(this.player_array[this.current_player].character.affiliation == 'Neutral'){
              if(this.player_array[this.current_player].hp == 0){
                //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
                moveDamage(this.player_array[this.current_player].player_color, 1);
              }
              else{
                //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 1;
                moveDamage(this.player_array[this.current_player].player_color, -1);
              }
            }
          }
		      this.last_state=state;
          this.check_win_or_dead();
          this.switch_player(this.current_turn);
          this.exec_state('invest_1');
          break;

        //Investigation accuse card
        //"I bet you are Terrorist.
        //If so, you heal 1 damage
        //(If you have no damage - take one damage instead)
        //Show card and wait for user to click card
        case 'accuse4_0':
          this.next_state = 'accuse4_1';
          hide_draw_card_screen_overlay();
          show_zoomed_card(this.drawn_invest_card);
          this.add_info_message(this.current_player, 'Click card to use it.');
		      this.last_state=state;
          this.check_win_or_dead();
          break;
        //Let player select who to investigate.
        case 'accuse4_1':
          this.next_state = 'accuse4_2';
          hide_zoomed_card();
          this.add_info_message(this.current_player, 'Select player to investigate.');
		  this.last_state=state;
          show_select_player_screen();
          break;
        case 'accuse4_2':
            this.next_state = 'accuse4_3';
			this.last_state=state;
            this.switch_player(this.selected_player);
            this.add_info_message(this.current_player, "Player " + this.current_turn + ": " + this.drawn_invest_card.card_text);
            if(this.player_array[this.current_player].character.char_name == "Hassan Nasrallah"){
              this.add_info_message(this.current_player, "You can lie! Press 'OK' or 'Lie'");
              show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST! SELECT AN OPTION.(YOU TAKE DAMAGE INSTEAD OF HEAL IF YOU HAVE NO DAMAGE)", 'HEAL/TAKE 1 DAMAGE', 'LIE');
            }
            else{
              if(this.player_array[this.current_player].character.affiliation == 'Terrorist'){
                this.add_info_message(this.current_player, "You cannot lie! Press 'HEAL/TAKE 1 DAMAGE'.");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST! (YOU TAKE DAMAGE INSTEAD OF HEAL IF YOU HAVE NO DAMAGE).", "HEAL/TAKE 1 DAMAGE");
              }
              else{
                this.add_info_message(this.current_player, "You cannot lie, but you are not Terrorist.  Press 'OK'.");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST!", "OK");
              }
            }
            break;
        case 'accuse4_3':
            hide_select_options_screen();
            if(this.selected_option == 2){
              this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
            }
            else{
              if(this.player_array[this.current_player].character.affiliation == 'Terrorist'){
                if(this.player_array[this.current_player].hp == 0){
                  //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
                  moveDamage(this.player_array[this.current_player].player_color, 1);
                }
                else{
                  //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 1;
                  moveDamage(this.player_array[this.current_player].player_color, -1);
                }
              }
            }
			      this.last_state=state;
            this.check_win_or_dead();
            this.switch_player(this.current_turn);
            this.exec_state('invest_1');
            break;

        //Investigation accuse card - I bet you are either Neutral or a Terrorist.  If so, you must either give me an equipment card or receive 1 damage
        //Show card and wait for user to click card
        case 'accuse5_0':
          this.next_state = 'accuse5_1';
		      this.last_state=state;
          hide_draw_card_screen_overlay();
          show_zoomed_card(this.drawn_invest_card);
          this.add_info_message(this.current_player, 'Click card to use it.');
          break;
        //Let player select who to investigate.
        case 'accuse5_1':
          this.next_state = 'accuse5_2';
          hide_zoomed_card();
          this.add_info_message(this.current_player, 'Select player to investigate.');
		      this.last_state=state;
          show_select_player_screen();
          break;
        //Switch to the player selected. If player can lie, show lie btn.
        case 'accuse5_2':
          this.next_state = 'accuse5_3';
          this.switch_player(this.selected_player);
          this.add_info_message(this.current_player, "Player " + this.current_turn + ": " + this.drawn_invest_card.card_text);
          if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
          {
            this.add_info_message(this.current_player, "You can lie! Select an option or press 'LIE'.");
            //Check if players hand is empty
            //If empty, then only show take 1 damage and lie buttons
            if(this.player_array[this.current_player].hand.length != 0)
              show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST OR NEUTRAL! SELECT AN OPTION.", 'TAKE 1 DAMAGE', 'LIE', 'GIVE EQUIPMENT CARD');
            else
              show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST OR NEUTRAL! SELECT AN OPTION.", 'TAKE 1 DAMAGE', 'LIE');
          }
          else
          {
            if(this.player_array[this.current_player].character.affiliation == 'Terrorist' || this.player_array[this.current_player].character.affiliation == 'Neutral')
            {
              this.add_info_message(this.current_player, "You cannot lie! Select an option.");
              //Check if players hand is empty
              //If empty, then only show take 1 damage and lie buttons
              if(this.player_array[this.current_player].hand.length != 0)
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST OR NEUTRAL! SELECT AN OPTION.", 'TAKE 1 DAMAGE', 'GIVE EQUIPMENT CARD');
              else
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST OR NEUTRAL! SELECT OPTION.", 'TAKE 1 DAMAGE');
            }
            else
            {
                this.add_info_message(this.current_player, "You cannot lie, but you don't need to! Press 'OK'.");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A TERRORIST OR NEUTRAL! SELECT OPTION.", 'OK');
            }
          }
		        this.last_state=state;
          break;
        //Calculate damage then switch back to current turn player.
        case 'accuse5_3':
          hide_select_options_screen();
          if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
          {
            if(this.selected_option == 1){
              //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
              moveDamage(this.player_array[this.current_player].player_color, 1);
            }
            else if(this.selected_option == 2)
            {
              //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
              //moveDamage(this.player_array[this.current_player].player_color, 1);
            }
            else
              this.steal_equip_card();
          }
          else if(this.player_array[this.current_player].character.affiliation == 'Terrorist' || this.player_array[this.current_player].character.affiliation == 'Neutral')
          {
            if (this.selected_option == 1)
            {
              //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
              moveDamage(this.player_array[this.current_player].player_color, 1);
            }
            else
              this.steal_equip_card();
          }
          else
            this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
          this.last_state=state;
          this.check_win_or_dead();
          this.switch_player(this.current_turn);
          this.exec_state('invest_1');
          break;

          //Investigation accuse card
          //"I bet you are Counter-Terrorist.
          //If so, you heal 1 damage
          //(If you have no damage - take one damage instead)
          //Show card and wait for user to click card
          case 'accuse6_0':
            this.next_state = 'accuse6_1';
			this.last_state=state;
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_invest_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
            break;
          //Let player select who to investigate.
          case 'accuse6_1':
            this.next_state = 'accuse6_2';
            hide_zoomed_card();
            this.add_info_message(this.current_player, 'Select player to investigate.');
			this.last_state=state;
            show_select_player_screen();
            break;
          case 'accuse6_2':
              this.next_state = 'accuse6_3';
              this.switch_player(this.selected_player);
              this.add_info_message(this.current_player, "Player " + this.current_turn + ": " + this.drawn_invest_card.card_text);
              if(this.player_array[this.current_player].character.char_name == "Hassan Nasrallah"){
                this.add_info_message(this.current_player, "You can lie! Press 'HEAL/TAKE 1 DAMAGE' or 'LIE'");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A COUNTER-TERRORIST! SELECT AN OPTION.(YOU TAKE DAMAGE INSTEAD OF HEAL IF YOU HAVE NO DAMAGE)", 'HEAL/TAKE 1 DAMAGE', 'LIE');
              }
              else{
                if(this.player_array[this.current_player].character.affiliation == 'Counter-Terrorist'){
                  this.add_info_message(this.current_player, "You cannot lie! Press 'HEAL/TAKE 1 DAMAGE'.");
                  show_select_options_screen("YOU'RE BEING INVESTIGATED AS A COUNTER-TERRORIST! (YOU TAKE DAMAGE INSTEAD OF HEAL IF YOU HAVE NO DAMAGE)", "HEAL/TAKE 1 DAMAGE");
                }
                else{
                  this.add_info_message(this.current_player, "You cannot lie, but you are not Counter-Terrorist.  Press 'OK'.")
                  show_select_options_screen("YOU'RE BEING INVESTIGATED AS A COUNTER-TERRORIST!", "OK");
                }
              }
			        this.last_state=state;
              break;
          case 'accuse6_3':
              hide_select_options_screen();
              if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
              {
                if(this.selected_option == 2)
                {
                  if(this.player_array[this.current_player].hp != 0)
                    moveDamage(this.player_array[this.current_player].player_color, -1);
                  else
                    moveDamage(this.player_array[this.current_player].player_color, 1);
                  //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
                  //moveDamage(this.player_array[this.current_player].player_color, -1);
                }
              }
              else
              {
                if(this.player_array[this.current_player].character.affiliation == 'Counter-Terrorist')
                {
                  //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
                  if(this.player_array[this.current_player].hp != 0)
                    moveDamage(this.player_array[this.current_player].player_color, -1);
                  else
                    moveDamage(this.player_array[this.current_player].player_color, 1);
                }
              }
              // if(this.selected_option == 2){
              //   this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
              // }
              // else{
              //   if(this.player_array[this.current_player].character.affiliation == 'Counter-Terrorist'){
              //     if(this.player_array[this.current_player].hp == 0){
              //       //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
              //       moveDamage(this.player_array[this.current_player].player_color, 1);
              //     }
              //     else{
              //       //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 1;
              //       moveDamage(this.player_array[this.current_player].player_color, -1);
              //     }
              //   }
              // }
			        this.last_state=state;
              this.check_win_or_dead();
              this.switch_player(this.current_turn);
              this.exec_state('invest_1');
              break;

          //Investigation accuse card - I bet you are a Counter-Terrorist.  If so, you receive 1 damage
          //Show card and wait for user to click card
          case 'accuse10_0':
            this.next_state = 'accuse10_1';
			      this.last_state=state;
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_invest_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
            break;
          //Let player select who to investigate.
          case 'accuse10_1':
            this.next_state = 'accuse10_2';
			      this.last_state=state;
            hide_zoomed_card();
            this.add_info_message(this.current_player, 'Select player to investigate.');
            show_select_player_screen();
            break;
          //Switch to the player selected. If player can lie, show lie btn.
          case 'accuse10_2':
            this.next_state = 'accuse10_3';
            this.switch_player(this.selected_player);
            this.add_info_message(this.current_player, "Player " + this.current_turn + ": " + this.drawn_invest_card.card_text);
            if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
            {
              this.add_info_message(this.current_player, "You can lie! Press 'TAKE 1 DAMAGE' or 'LIE'.");
              show_select_options_screen("YOU'RE BEING INVESTIGATED AS A COUNTER-TERRORIST! SELECT AN OPTION.", 'TAKE 1 DAMAGE', 'LIE');
            }
            else
            {
              if(this.player_array[this.current_player].character.affiliation == 'Counter-Terrorist')
              {
                this.add_info_message(this.current_player, "You cannot lie! Press 'TAKE 1 DAMAGE'.");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A COUNTER-TERRORIST!", "TAKE 1 DAMAGE");
              }
              else
              {
                this.add_info_message(this.current_player, "You cannot lie, but you're not a Counter-Terrorist! Press 'OK'.");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A COUNTER-TERRORIST!", "OK");
              }
            }
			this.last_state=state;
            break;
          //Calculate damage then switch back to current turn player.
          case 'accuse10_3':
            hide_select_options_screen();
            if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
            {
              if(this.selected_option == 2)
              {
                //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
                moveDamage(this.player_array[this.current_player].player_color, 1);
              }
            }
            else
            {
              if(this.player_array[this.current_player].character.affiliation == 'Counter-Terrorist')
              {
                //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
                moveDamage(this.player_array[this.current_player].player_color, 1);
              }
            }
			      this.last_state=state;
            this.check_win_or_dead();
            this.switch_player(this.current_turn);
            this.exec_state('invest_1');
            break;

          //Investigation accuse card - I bet you are a Neutral.  If so, you receive 1 damage
          //Show card and wait for user to click card
          case 'accuse11_0':
            this.next_state = 'accuse11_1';
			      this.last_state=state;
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_invest_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
            break;
          //Let player select who to investigate.
          case 'accuse11_1':
            this.next_state = 'accuse11_2';
			      this.last_state=state;
            hide_zoomed_card();
            this.add_info_message(this.current_player, 'Select player to investigate.');
            show_select_player_screen();
            break;
          //Switch to the player selected. If player can lie, show lie btn.
          case 'accuse11_2':
		    this.last_state=state;
            this.next_state = 'accuse11_3';
            this.switch_player(this.selected_player);
            this.add_info_message(this.current_player, "Player " + this.current_turn + ": " + this.drawn_invest_card.card_text);
            if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
            {
              this.add_info_message(this.current_player, "You can lie! Press 'TAKE 1 DAMAGE' or 'LIE'.");
              show_select_options_screen("YOU'RE BEING INVESTIGATED AS A NEUTRAL! SELECT AN OPTION.", 'TAKE 1 DAMAGE', 'LIE');
            }
            else
            {
              if(this.player_array[this.current_player].character.affiliation == 'Neutral')
              {
                this.add_info_message(this.current_player, "You cannot lie! Press 'TAKE 1 DAMAGE'.");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A NEUTRAL!", "TAKE 1 DAMAGE");
              }
              else
              {
                this.add_info_message(this.current_player, "You cannot lie but you're not a Neutral! Press 'OK'.");
                show_select_options_screen("YOU'RE BEING INVESTIGATED AS A NEUTRAL!", "OK");
              }
            }
            break;
          //Calculate damage then switch back to current turn player.
          case 'accuse11_3':
            hide_select_options_screen();
            if(this.player_array[this.current_player].character.char_name ==  "Hassan Nasrallah")
            {
              if(this.selected_option == 2)
              {
                //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 0;
                moveDamage(this.player_array[this.current_player].player_color, 1);
              }
            }
            else
            {
              if(this.player_array[this.current_player].character.affiliation == 'Neutral')
              {
                //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp + 1;
                moveDamage(this.player_array[this.current_player].player_color, 1);
              }
            }
			      this.last_state=state;
            this.check_win_or_dead();
            this.switch_player(this.current_turn);
            this.exec_state('invest_1');
            break;

          //Investigation
          case 'action_0':
            hide_draw_card_screen_overlay();
            if(actionArray.length > 0)
            {
              this.drawn_action_card = actionArray[0];
              actionArray.shift();
            }
            else
            {
              actionArray = new_deck_actionArray;
              array_shuffle(actionArray);
              this.drawn_action_card = actionArray[0];
              actionArray.shift();
            }
            switch(this.drawn_action_card.card_title)
            {
              case 'R&R':
                this.next_state = 'action_rnr_0';
                break;
              case 'I\'ll Help!':
                this.next_state = 'action_illhelp_0';
                break;
              case 'Guardian Angel':
                this.next_state = 'action_guardianangel_0';
                break;
              case 'It\'s your lucky day!':
                this.next_state = 'action_luckyday_0';
                break;
              case 'Spotted!':
                this.next_state = 'action_spotted_0';
                break;
              case 'First Aid':
                this.next_state = 'action_firstaid_0';
                break;
              case 'Judgement Day':
                this.next_state = 'action_judgementday_0';
                break;
              case 'Energy Boost':
                this.next_state = 'action_energyboost_0';
                break;
              case 'Doctor\'s Visit':
                this.next_state = 'action_doctorsvisit_0';
                break;
              case 'Dynamite':
                this.next_state = 'action_dynamite_0';
                break;
              case 'Jihad!':
                this.next_state = 'action_jihad_0';
                break;
              case 'Deadly Surprise':
                this.next_state = 'action_deadlysurprise_0';
                break;
              case 'That\'s Not Good"':
                this.next_state = 'action_thatsnotgood_0';
                break;
              case 'That\'s Mine':
                this.next_state = 'action_thatsmine_0';
                break;
              case 'Deadly Game':
                this.next_state = 'action_deadlygame_0';
                break;
              case 'Jihad! Jihad!':
                this.next_state = 'action_jihadjihad_0';
                break;
              default:
                this.next_state = 'draw_card_1';
                break;
            }
			this.last_state=state;
            this.exec_state()
            break;

          //Action card
          //If you are a Counter-Terrorist, you may reveal your identity.  If you do, or if you are already revealed, you heal fully(0 damage).
          case 'action_rnr_0':
            this.next_state = 'action_rnr_1';
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_action_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
			this.last_state=state;
            break;
          case 'action_rnr_1':
            this.next_state = 'action_rnr_2';
            hide_zoomed_card();
			this.last_state=state;
            if(this.player_array[this.current_player].character.affiliation == 'Counter-Terrorist' && this.player_array[this.current_player].revealed == false)
              show_select_options_screen("REVEAL YOUR IDENTITY?", 'REVEAL', 'NO');
            else if(this.player_array[this.current_player].character.affiliation != 'Counter-Terrorist')
            {
              this.add_info_message(this.current_player, 'Sorry, you\'re not a Counter-Terrorist.');
              this.exec_state('turn_2');
            }
            else
              this.exec_state();
            break;
          case 'action_rnr_2':
            hide_select_options_screen();
			this.last_state=state;
            if(this.selected_option == 1 || this.player_array[this.current_player].revealed == true)
            {
              this.reveal_player();
              this.add_info_message(this.current_player, 'You have healed fully.');
              // for(var i = 0; i < this.player_array[this.current_player].hp; i++)
              //   moveDamage(this.player_array[this.current_player].player_color, -1);
              resetDamage(this.player_array[this.current_player].player_color);
              this.player_array[this.current_player].hp = 0;
            }
            this.check_win_or_dead();
            this.exec_state('turn_2');
            break;

          //Action Card
          //Pick a character (other than you) - Heal random 1-6 points of damage.
          case 'action_illhelp_0':
            this.next_state = 'action_illhelp_1';
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_action_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
			this.last_state=state;
            break;
          case 'action_illhelp_1':
            this.next_state = 'action_illhelp_2';
            hide_zoomed_card();
            show_select_player_screen();
			this.last_state=state;
            break;
          case 'action_illhelp_2':
            this.next_state = 'turn_2';
            hide_select_player_screen();
            var damage = (Math.floor(Math.random() * 6) + 1);
            //this.player_array[this.selected_player].hp = this.player_array[this.selected_player].hp - damage;
            moveDamage(this.player_array[this.selected_player].player_color, (-1 * damage));
            var message_string = "You healed Player " + this.selected_player + ".";
            this.add_info_message(this.current_player, message_string);
			this.last_state=state;
            this.check_win_or_dead();
            this.exec_state();
            break;

          //Action card
          //If you are Tori, Charlie, or Hassan, you may reveal yourself.  If you do (or you are already revealed) you fully heal (0 damage).
          case 'action_luckyday_0':
            this.next_state = 'action_luckyday_1';
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_action_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
			this.last_state=state;
            break;
          case 'action_luckyday_1':
            this.next_state = 'action_luckyday_2';
            hide_zoomed_card();
			this.last_state=state;
            var name = this.player_array[this.current_player].character.char_name;
            if((name == 'Totally Tori' || game == 'CIA Charlie' || game == 'Hassan Nasrallah') && this.player_array[this.current_player].revealed == false)
              show_select_options_screen("REVEAL YOUR IDENTITY?", 'REVEAL', 'NO');
            else if(name != 'Totally Tori' || game != 'CIA Charlie' || game != 'Hassan Nasrallah')
            {
              this.add_info_message(this.current_player, 'Sorry, you can\'t use this card.');
              this.exec_state('turn_2');
            }
            else
              this.exec_state();
            this.check_win_or_dead();
            break;
          case 'action_luckyday_2':
            hide_select_options_screen();
            if(this.selected_option == 1 || this.player_array[this.current_player].revealed == true)
            {
              this.reveal_player();
              this.add_info_message(this.current_player, 'You have healed fully.');
              // for(var i = 0; i < this.player_array[this.current_player].hp; i++)
              //   moveDamage(this.player_array[this.current_player].player_color, -1);
              resetDamage(this.player_array[this.current_player].player_color);
              this.player_array[this.current_player].hp = 0;
            }
			this.last_state=state;
            this.check_win_or_dead();
            this.exec_state('turn_2');
            break;

          //Action card
          //If you are Osama or Ayman, you must reveal yourself!
          case 'action_spotted_0':
            this.next_state = 'action_spotted_1';
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_action_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
			this.last_state=state;
            break;
          case 'action_spotted_1':
            hide_zoomed_card();
            var name = this.player_array[this.current_player].character.char_name;
            if(name == 'Ayman al-Zawahiri' || game == 'Osama Bin Laden')
              this.reveal_player();
			this.last_state=state;
            this.check_win_or_dead();
            this.exec_state('turn_2');
            break;

          //Action card
          //Heal two points of your damage.
          case 'action_firstaid_0':
            this.next_state = 'action_firstaid_1';
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_action_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
			this.last_state=state;
            break;
          case 'action_firstaid_1':
            hide_zoomed_card();
            //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 2;
            moveDamage(this.player_array[this.current_player].player_color, -2);
			this.last_state=state;
            this.check_win_or_dead();
            this.exec_state('turn_2');
            break;

          //Action card
          //All character's except for you receive 2 points of damage
          case 'action_judgementday_0':
            this.next_state = 'action_judgementday_1';
            hide_draw_card_screen_overlay();
            show_zoomed_card(this.drawn_action_card);
            this.add_info_message(this.current_player, 'Click card to use it.');
			this.last_state=state;
            break;
          case 'action_judgementday_1':
            hide_zoomed_card();
            for(var i = 1; i <= this.num_of_players; i++)
            {
              if(this.player_array[this.current_player].character.char_name != this.player_array[i].character.char_name)
              {
                //this.player_array[i].hp = this.player_array[i].hp + 2;
                moveDamage(this.player_array[i].player_color, 2);
              }
            }
			this.last_state=state;
            this.check_win_or_dead();
            this.exec_state('turn_2');
            break;


            //Action Card
            //You steal an equipment card from any character.
            case 'action_thatsmine_0':
              this.next_state = 'action_thatsmine_1';
              hide_draw_card_screen_overlay();
              show_zoomed_card(this.drawn_action_card);
              this.add_info_message(this.current_player, 'Click card to use it.');
			         this.last_state=state;
              break;
            case 'action_thatsmine_1':
              this.next_state = 'action_thatsmine_2';
              hide_zoomed_card();
			         this.last_state=state;
              show_select_player_screen();
              break;
            case 'action_thatsmine_2':
              this.next_state = 'turn_2';
              hide_select_player_screen();
              if(this.player_array[this.selected_player].hand.length > 0)
              {
                this.steal_equip_card();
                var message_string = "You stole a card from Player " + this.selected_player + ".";
                this.add_info_message(this.current_player, message_string);
              }
              else{
                var message_string = "Player " + this.selected_player + " has no cards.";
                this.add_info_message(this.current_player, message_string);
              }
			  this.last_state=state;
              this.check_win_or_dead();
              this.exec_state();
              break;

            //Action Card
            //You give 2 points of damage to any character and heal 1 point of your own damage.
            case 'action_deadlysurprise_0':
              this.next_state = 'action_deadlysurprise_1';
              hide_draw_card_screen_overlay();
              show_zoomed_card(this.drawn_action_card);
              this.add_info_message(this.current_player, 'Click card to use it.');
			  this.last_state=state;
              break;
            case 'action_deadlysurprise_1':
              this.next_state = 'action_deadlysurprise_2';
              hide_zoomed_card();
			  this.last_state=state;
              show_select_player_screen();
              break;
            case 'action_deadlysurprise_2':
              this.next_state = 'turn_2';
              hide_select_player_screen();
              //this.player_array[this.selected_player].hp = this.player_array[this.selected_player].hp + 2;
              moveDamage(this.player_array[this.selected_player].player_color, 2);
              //this.player_array[this.current_player].hp = this.player_array[this.current_player].hp - 1;
              moveDamage(this.player_array[this.current_player].player_color, -1);
			  this.last_state=state;
              this.check_win_or_dead();
              this.exec_state();
              break;
    }
  }

  //Adds custom message to the players side log
  add_info_message(player, message)
  {
    var x = '<div class="info_message_item"><span class="info_message_item_dot">*  </span><span class="info_message_item_text">';
    var y = '</span></div>'
    $("#info_messages_player_" + player).append(x + message + y);

    var objDiv = document.getElementById("info_messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  //Reveals a character
  reveal_player()
  {
    document.getElementById("revealed_box").style.display = "initial";

    if(this.player_array[this.current_player].revealed != true)
    {
      var name = this.player_array[this.current_player].character.char_name;
      var affiliation = this.player_array[this.current_player].character.affiliation;
      var reveal_player = '<div id="player_' + this.current_player + '_revealed" class="player_revealed">PLAYER ' +  this.current_player + ': ' + affiliation + ' - ' + name + '</div>';
      $("#revealed_box").append(reveal_player);
    }

    this.player_array[this.current_player].revealed = true;
  }

  //Switches player. Shows next player screen and sets up the screen for
  //that player.
  switch_player(player)
  {
    this.current_player = player;
    next_player_screen_overlay(this.current_player, "black");

    var total_hp = this.player_array[this.current_player].character.hp;
    var damage = this.player_array[this.current_player].hp;
    document.getElementById("player_hp").innerHTML = total_hp - damage;

    document.getElementById('current_player_id').innerHTML = this.current_player;
    document.getElementById('current_player_box_color').style.color = this.player_array[this.current_player].player_color;
    document.getElementById('current_player_box_color').innerHTML = this.player_array[this.current_player].player_color.toUpperCase();

    //Show players hand
    this.display_hand();

    //Hide all info messages, then show correct info messages
    document.getElementById("info_messages_player_1").style.display = "none";
    document.getElementById("info_messages_player_2").style.display = "none";
    document.getElementById("info_messages_player_3").style.display = "none";
    document.getElementById("info_messages_player_4").style.display = "none";
    document.getElementById("info_messages_player_5").style.display = "none";
    document.getElementById("info_messages_player_6").style.display = "none";
    document.getElementById("info_messages_player_7").style.display = "none";
    document.getElementById("info_messages_player_8").style.display = "none";
    document.getElementById("info_messages_player_" + this.current_player).style.display = "initial";

    document.getElementById("player_type").innerHTML = this.player_array[this.current_player].character.affiliation;
    document.getElementById("player_name").innerHTML = this.player_array[this.current_player].character.char_name;
    document.getElementById("player_image").src = this.player_array[this.current_player].character.img;
    document.getElementById("player_win_condition_text").innerHTML = this.player_array[this.current_player].character.win_condition_text;
    document.getElementById("player_special_condition_text").innerHTML = this.player_array[this.current_player].character.special_text;

  }

  //Shows roll btn and hides other buttons
  show_roll_btn()
  {
    document.getElementById("action_offense_pass_btn").style.display = "none";
    document.getElementById("action_defense_pass_btn").style.display = "none";
    document.getElementById("action_roll_btn").style.display = "initial";
    document.getElementById("action_draw_btn").style.display = "none";
    document.getElementById("action_attack_btn").style.display = "none";
    document.getElementById("action_special_btn").style.display = "none";
    document.getElementById("action_end_turn_btn").style.display = "none";
    document.getElementById("action_adjacent_btn").style.display = "none";
    document.getElementById("action_special_roll_btn").style.display = "none";
	  
  }

  //Shows draw btn and hides other buttons
  show_draw_btn()
  {
    document.getElementById("action_roll_btn").style.display = "none";
    document.getElementById("action_defense_pass_btn").style.display = "none";
    document.getElementById("action_offense_pass_btn").style.display = "none";
    document.getElementById("action_attack_btn").style.display = "none";
    document.getElementById("action_special_btn").style.display = "none";
    document.getElementById("action_end_turn_btn").style.display = "none";
    document.getElementById("action_adjacent_btn").style.display = "none";
    document.getElementById("action_special_roll_btn").style.display = "none";
	setTimeout(function(){
    document.getElementById("action_draw_btn").style.display = "initial"; },7000);
  }

  //Shows pass to defense button for attacking phase
  show_defense_pass_btn(){
    document.getElementById("action_roll_btn").style.display = "none";
    document.getElementById("action_draw_btn").style.display = "none";
    document.getElementById("action_attack_btn").style.display = "none";
    document.getElementById("action_special_btn").style.display = "none";
    document.getElementById("action_end_turn_btn").style.display = "none";
    document.getElementById("action_offense_pass_btn").style.display = "none";
    document.getElementById("action_adjacent_btn").style.display = "none";
    document.getElementById("action_special_roll_btn").style.display = "none";
	setTimeout(function(){
    document.getElementById("action_defense_pass_btn").style.display = "initial"; },3500);
  }

  show_offense_pass_btn(character){
    document.getElementById("action_roll_btn").style.display = "none";
    document.getElementById("action_draw_btn").style.display = "none";
    document.getElementById("action_attack_btn").style.display = "none";
    document.getElementById("action_special_btn").style.display = "none";
    document.getElementById("action_end_turn_btn").style.display = "none";
    document.getElementById("action_defense_pass_btn").style.display = "none";
    document.getElementById("action_adjacent_btn").style.display = "none";
    document.getElementById("action_special_roll_btn").style.display = "none";
  setTimeout(function(){
    document.getElementById("action_offense_pass_btn").style.display = "initial";
    if(character=='Osama Bin Laden'){
      document.getElementById("action_special_btn").style.display = "initial";
    }
    },3500);
  }

  //Shows general btns and hides other buttons
  show_general_btn(previous_state)
  {
    document.getElementById("action_offense_pass_btn").style.display = "none";
    document.getElementById("action_defense_pass_btn").style.display = "none";
    document.getElementById("action_roll_btn").style.display = "none";
    document.getElementById("action_draw_btn").style.display = "none";
    document.getElementById("action_adjacent_btn").style.display = "none";
    document.getElementById("action_special_roll_btn").style.display = "none";
  	if(previous_state=="turn_1"){
  	  setTimeout(function(){
  	  document.getElementById("action_attack_btn").style.display = "initial";
  	  document.getElementById("action_special_btn").style.display = "initial";
        document.getElementById("action_end_turn_btn").style.display = "initial";},7000);
  	}
  	else if(previous_state == "damage_region_3"){
  	  setTimeout(function(){
  	  document.getElementById("action_attack_btn").style.display = "initial";
  	  document.getElementById("action_special_btn").style.display = "initial";
        document.getElementById("action_end_turn_btn").style.display = "initial";},4000);
  	}
  	else{
  	  document.getElementById("action_attack_btn").style.display = "initial";
  	  document.getElementById("action_special_btn").style.display = "initial";
        document.getElementById("action_end_turn_btn").style.display = "initial";
  	}
  }

  show_charlie_special_move_btn()
  {	
    document.getElementById("action_adjacent_btn").style.display = "initial";
    document.getElementById("action_special_roll_btn").style.display = "initial";
    document.getElementById("action_roll_btn").style.display = "none";
    document.getElementById("action_offense_pass_btn").style.display = "none";
    document.getElementById("action_defense_pass_btn").style.display = "none";
    document.getElementById("action_draw_btn").style.display = "none";
    document.getElementById("action_attack_btn").style.display = "none";
    document.getElementById("action_special_btn").style.display = "none";  
    document.getElementById("action_end_turn_btn").style.display = "none";
  }
		
  //Sets the game objects select player variable and hides the select player screen.
  select_player(player)
  {
    this.selected_player = player;
    hide_select_player_screen();
    //hide_attack_select_player_screen();
    //hide_invest_select_player_screen();
    if(this.next_state != 'attack_1')
      this.exec_state();
  }

  select_zone(zone) //S17
  {
	this.selected_zone = zone;
	hide_select_zone_screen();
	this.next_state = this.last_state;

  }

  //Display hand for current player
  display_hand()
  {
    //Create Arrows and remove beginning text.
    if(this.player_array[this.current_player].hand.length == 0)
    {
      document.getElementById("card_area_beginning_text").style.display = "initial";
      document.getElementById("card_area_scroll_left").style.display = "none";
      document.getElementById("card_area_scroll_right").style.display = "none";
    }
    else
    {
      document.getElementById("card_area_beginning_text").style.display = "none";
      document.getElementById("card_area_scroll_left").style.display = "initial";
      document.getElementById("card_area_scroll_right").style.display = "initial";
    }

    //Empty current hand, if exist
    document.getElementById('cards_area').innerHTML = '';

    for(var i = 0; i < this.player_array[this.current_player].hand.length; i++)
    {
      var header = this.player_array[this.current_player].hand[i].card_title;
      var img = this.player_array[this.current_player].hand[i].img;
      var text = this.player_array[this.current_player].hand[i].card_text;
      var onclickfunction = '';

      switch(header)
      {
        case 'Compass':
          onclickfunction = 'compass';
          break;
        case 'Predator Drone':
          onclickfunction = 'predatordrone';
          break;
        case 'Water Board':
          onclickfunction = 'waterboard';
          break;
        case 'Good Luck Charm':
          onclickfunction = 'goodluckcharm';
          break;
        case 'Balance Suit':
          onclickfunction = 'balancesuit';
          break;
        case 'Duffle Bag':
          onclickfunction = 'dufflebag';
          break;
        case 'Special Vest':
          onclickfunction = 'specialvest';
          break;
        case 'Handgun':
          onclickfunction = 'handgun';
          break;
        case 'Cattle Prod':
          onclickfunction = 'cattleprod';
          break;
        case 'Sniper Rifle':
          onclickfunction = 'sniperrifle';
          break;
        case 'Garrote':
          onclickfunction = 'garrote';
          break;
        case 'Machine Gun':
          onclickfunction = 'machinegun';
          break;
        case 'Blow Gun':
          onclickfunction = 'blowgun';
          break;
        case 'Cursed Dagger':
          onclickfunction = 'curseddagger';
          break;

      }

      //for(var i = 0; i < this.player_array[this.current_player].hand.length; i++)
      //{
        if(this.player_array[this.current_player].hand[i].card_title == this.player_array[this.current_player].equipped.card_title)
          document.getElementById('cards_area').innerHTML += '<div class="card_selected card card_equip" onclick="game.equip_card_to_player(' + onclickfunction + ')"><h1>' + header + '</h1><img src="' + img + '"></img><p>' + text + '</p></div>';
        else
          document.getElementById('cards_area').innerHTML += '<div class="card card_equip" onclick="game.equip_card_to_player(' + onclickfunction + ')"><h1>' + header + '</h1><img src="' + img + '"></img><p>' + text + '</p></div>';
      //}

      //document.getElementById('cards_area').innerHTML += '<div class="card card_equip" onclick="game.equip_card_to_player(' + onclickfunction + ')"><h1>' + header + '</h1><img src="' + img + '"></img><p>' + text + '</p></div>';
      //document.getElementById('cards_area').innerHTML += '<div class="card card_equip" onclick="game.exec_state(\'equip_card_to_player\')"><h1>' + header + '</h1><img src="' + img + '"></img><p>' + text + '</p></div>';
    }
  }

  //Adds a card to the players hand.
  add_card_to_hand()
  {
    //this.drawn_equip_card = compass;
    this.player_array[this.current_player].hand.push(this.drawn_equip_card);

    var last = this.player_array[this.current_player].hand.length - 1;
    var header = this.player_array[this.current_player].hand[last].card_title;
    var img = this.player_array[this.current_player].hand[last].img;
    var text = this.player_array[this.current_player].hand[last].card_text;
    var onclickfunction = '';

    switch(this.drawn_equip_card.card_title)
    {
      case 'Compass':
        onclickfunction = 'compass';
        break;
      case 'Predator Drone':
        onclickfunction = 'predatordrone';
        break;
      case 'Water Board':
        onclickfunction = 'waterboard';
        break;
      case 'Good Luck Charm':
        onclickfunction = 'goodluckcharm';
        break;
      case 'Balance Suit':
        onclickfunction = 'balancesuit';
        break;
      case 'Duffle Bag':
        onclickfunction = 'dufflebag';
        break;
      case 'Special Vest':
        onclickfunction = 'specialvest';
        break;
      case 'Handgun':
        onclickfunction = 'handgun';
        break;
      case 'Cattle Prod':
        onclickfunction = 'cattleprod';
        break;
      case 'Sniper Rifle':
        onclickfunction = 'sniperrifle';
        break;
      case 'Garrote':
        onclickfunction = 'garrote';
        break;
      case 'Machine Gun':
        onclickfunction = 'machinegun';
        break;
      case 'Blow Gun':
        onclickfunction = 'blowgun';
        break;
      case 'Cursed Dagger':
        onclickfunction = 'curseddagger';
        break;

    }

    //document.getElementById('cards_area').innerHTML += '<div class="card card_equip" onclick="game.exec_state(\'equip_card_to_player\')"><h1>' + header + '</h1><img src="' + img + '"></img><p>' + text + '</p></div>';
    document.getElementById('cards_area').innerHTML += '<div class="card card_equip" onclick="game.equip_card_to_player(' + onclickfunction + ')"><h1>' + header + '</h1><img src="' + img + '"></img><p>' + text + '</p></div>';
    //show_view_card

    /*
    //document.getElementById('cards_area').innerHTML += '<div class="card card_equip" onclick="show_view_card(game.drawn_equip_card)"><h1>Test Card Name</h1><img src="http://the-toast.net/wp-content/uploads/2015/06/taken.jpg"></img><p>When you take an Investigation card you may take two, giving them to the same player or two players.</p></div>';
    document.getElementById('cards_area').innerHTML += '<div class="card card_equip" onclick="game.exec_state(\'equip_card_to_player\')"><h1>Test Card Name</h1><img src="http://the-toast.net/wp-content/uploads/2015/06/taken.jpg"></img><p>When you take an Investigation card you may take two, giving them to the same player or two players.</p></div>';
    */

    //Create Arrows and remove beginning text.
    document.getElementById("card_area_beginning_text").style.display = "none";
    document.getElementById("card_area_scroll_left").style.display = "initial";
    document.getElementById("card_area_scroll_right").style.display = "initial";
  }

  equip_card_to_player(card)
  {
    show_view_card(card);

    this.player_array[this.current_player].equipped = card;
    this.display_hand();
  }

  steal_equip_card()
  {
    var stolen_card = new Equipment();
    if(this.player_array[this.selected_player].hand.length > 0)
    {
      stolen_card = this.player_array[this.selected_player].hand[0];
      if(stolen_card.card_title == this.player_array[this.selected_player].equipped.card_title)
          this.player_array[this.selected_player].equipped = new Equipment();
      this.player_array[this.selected_player].hand.shift();
      this.player_array[this.current_turn].hand.push(stolen_card);
      this.display_hand();
    }
  }

  check_win_or_dead()
  {
    //Find dead players
    for(var i = 1; i <= this.num_of_players; i++)
    {
      var affiliation = this.player_array[i].character.affiliation;
      var name = this.player_array[i].character.char_name;
      if(this.player_array[i].hp == this.player_array[i].character.hp && this.player_array[i].alive == true)
      {
        this.player_array[i].alive = false;
        playerDied(this.player_array[i].player_color);
        if(this.player_array[i].revealed == true)
        {
          var player_id = 'player_' + i + '_revealed';
          document.getElementById(player_id).innerHTML = '<div id="player_' + i + '_revealed" class="player_revealed">Dead - PLAYER ' +  i + ': ' + affiliation + ' - ' + name + '</div>';
        }
        else
        {
          document.getElementById("revealed_box").style.display = "initial";
          var reveal_player = '<div id="player_' + i + '_revealed" class="player_revealed">Dead - PLAYER ' +  i + ': ' + affiliation + ' - ' + name + '</div>';
          $("#revealed_box").append(reveal_player);
        }

      }
    }

    var won_players = new Array();

    var terrorist_dead_count = 0;
    var counter_terrorist_dead_count = 0;
    var neutral_dead_count = 0;

    var total_terrorist = 0;
    var total_counter_terrorist = 0;
    var total_neutral = 0;

    //Count total players and dead players
    for(var i = 1; i <= this.num_of_players; i++)
    {
      var affiliation = this.player_array[i].character.affiliation;
      var is_alive = this.player_array[i].alive;
      var name = this.player_array[i].character.char_name;
      if(affiliation == 'Counter-Terrorist')
        total_counter_terrorist++;
      else if(affiliation == 'Terrorist')
        total_terrorist++;
      else if(affiliation == 'Neutral')
        total_neutral++;

      if(affiliation == 'Counter-Terrorist' && is_alive == false)
        counter_terrorist_dead_count++;
      else if(affiliation == 'Terrorist' && is_alive == false)
        terrorist_dead_count++;
      else if(affiliation == 'Neutral' && is_alive == false)
        neutral_dead_count++;
    }

    //Win conditions
    for(var i = 1; i <= this.num_of_players; i++)
    {
      var affiliation = this.player_array[i].character.affiliation;
      var is_alive = this.player_array[i].alive;
      var name = this.player_array[i].character.char_name;

      //Win condition for Ayman al-Zawahiri, Hassan Nasrallah, Osama Bin Laden
      if((total_counter_terrorist == counter_terrorist_dead_count || counter_terrorist_dead_count >= 3) && total_counter_terrorist > 0 && counter_terrorist_dead_count > 0)
      {
        if((name == 'Ayman al-Zawahiri' || name == 'Hassan Nasrallah' ||  name == 'Osama Bin Laden') && is_alive == true)
          won_players.push(this.player_array[i]);
      }

      //Win condition for Sam Seal, CIA Charlie, FBI Fred
      if((total_terrorist == terrorist_dead_count) && total_terrorist > 0 && terrorist_dead_count > 0)
      {
        if((name == 'Sam Seal' || name == 'CIA Charlie' ||  name == 'FBI Fred') && is_alive == true)
          won_players.push(this.player_array[i]);
      }

      if(name == 'Daniel Doomsday' && this.num_of_players != 4)
      {
        //First to die
        if(neutral_dead_count == 1 && terrorist_dead_count == 0 && counter_terrorist_dead_count == 0 && is_alive == false)
          won_players.push(this.player_array[i]);

        //All terrorist dead and he lives
        if(total_terrorist == terrorist_dead_count && is_alive == true)
          won_players.push(this.player_array[i]);
      }

      if(name == 'Gatherin\' George' && this.num_of_players != 4)
      {
        if(this.player_array[i].hand.length > 5)
          won_players.push(this.player_array[i]);
      }

      if(name == 'Billy-Bob Badass' && this.num_of_players != 4)
      {
        if(this.player_array[this.current_turn].character.char_name == 'Billy-Bob Badass' && is_alive == true)
        {
          if(this.current_attacking_player == this.current_turn)
          {
            if(this.player_array[this.current_defending_player].hp == this.player_array[this.current_defending_player].character.hp)
            {
              if((neutral_dead_count + terrorist_dead_count + counter_terrorist_dead_count) >= 3)
                won_players.push(this.player_array[i]);
            }
          }
        }
      }

      if(name == 'Totally Tori' && this.num_of_players != 4)
      {
        if(won_players.length > 0 && is_alive == true)
          won_players.push(this.player_array[i]);
      }
    } //end for loop

    if(won_players.length > 0)
    {
      var x = document.getElementById("next_player_overlay_container");
      var win_string = '';
      for(var i = 0; i < won_players.length; i++)
      {
        //win_string = win_string + 'PLAYER ' + (i + 1) + '<br>';
        win_string = win_string + won_players[i].character.char_name + '<br>';
      }
    	x.getElementsByTagName("h3")[0].innerHTML = "WINNER(S): <br>" + win_string;
      document.getElementById("next_player_btn").style.display = "none";
      document.getElementById("next_player_end_game_btn").style.display = "initial";
    	x.style.display = "initial";
    	// function show_next_player_screen(){
    	// 	$('#next_player_overlay_container').fadeIn();
    	// };
    	// window.setTimeout( show_next_player_screen, 0 ); // 200ms
    }
  }

}

game = new Game();
