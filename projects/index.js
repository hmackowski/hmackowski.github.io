// Initialize some variables
let inputValue;
var dexNum = 0;

// Event listener for submit button
$("#clickSubmit").on("click", () => {
  getPokemon($("#inputField").val());
});

// Event listener for clear button
$("#clearButton").on("click", (event) => {
  // Prevent default button action
  event.preventDefault();

  // Clear the content and reset the header text and image
  $("#content").empty();
  $("#head").text('PokéMon');
  $("#content-container").find('img').remove();
  $("#inputField").val("");1
  inputValue = null;
});

async function getPokemon(num) {
  // Create a div element
  let div1 = document.createElement("div");

  // Validation for the input value
  if (num <= 0 || num > 1008 || num == null) {
    console.log("number not between 1 and 1010!");
    // alert("needs to be between 1 and 1010!");
    // Create the alert element
    var alertDiv = $("<div>")
      .addClass("alert alert-warning alert-dismissible fade show col-4")
      .attr("role", "alert")
      .css({
        "margin": "0 auto",
        "display": "flex",
        "justify-content": "center",
        "align-items": "center"
      });

    var parentDiv = $("<div>")
      .addClass("d-flex justify-content-center")
      .append(alertDiv);

    $("#nav").after(parentDiv);

    // Create the strong element
    var strongElement = $("<strong>").text(
      "The number needs to be between 1 and 1008!"
    );

    // Create the button element
    var buttonElement = $("<button>")
      .addClass("btn-close")
      .attr("type", "button")
      .attr("data-bs-dismiss", "alert")
      .attr("aria-label", "Close");

    // Append the strong element and button element to the alert div
    alertDiv.append(strongElement, buttonElement);

    // Append the alert div to the body
    $("#nav").after(alertDiv);
    $("#inputField").val("");
  } else {
    try {
      // Get request to the server
      const data = await $.get(
        `https://pokeapi.co/api/v2/pokemon/${num}`
      );
      // Handle the received data
      let user = data;
      console.log(user);
      console.log(user.types[0].type.name + " this is the type on pokeapi");
      // Check the range of num and assign the corresponding value to dexNum
      if (
        num == 350 ||
        (num >= 420 && num <= 423) ||
        (num >= 424 && num <= 521) ||
        (num >= 523 && num <= 599) ||
        (num >= 600 && num <= 619) ||
        (num >= 621 && num <= 649) ||
        num == 20 ||
        num == 19 ||
        num == 50 ||
        num == 105
      ) {
        dexNum = 1;
      } else if (num == 522 || num == 999 || num == 920 || num == 900) {
        dexNum = 0;
      } else if (num == 620) {
        dexNum = 3;
      } else if (num >= 650 && num <= 719) {
        dexNum = 6;
      } else if (num == 720) {
        dexNum = 14;
      } else if (num >= 721 && num <= 748) {
        dexNum = 7;
        console.log("this one");
      } else if ((num >= 749 && num <= 750) || (num >= 800 && num <= 820)) {
        dexNum = 8;
      } else if ((num >= 751 && num <= 799) || (num >= 821 && num <= 898)) {
        dexNum = 7;
      } else if (num >= 1009 && num <= 1010) {
        console.log("last one");
        dexNum = null;
      }

      console.log(dexNum);
      console.log(user.name);
      // Now get the Pokemon species description
      const speciesData = await $.get(
        `https://pokeapi.co/api/v2/pokemon-species/${num}`
      );
      let desc = speciesData.flavor_text_entries[dexNum].flavor_text.replace(
        /[^\x20-\x7E\u00A0-\u00FF]/g,
        " "
      );

      console.log(desc);


      // Create the card inside this done function
      $(document).ready(function () {
        // Create a card element
        var card = $("<div>").addClass("card").css("width", "18rem");

        // Create and add classes and attributes to the card elements
        let cardImg = $("<img>")
          .addClass("card-img-top")
          .attr(
            "src",
            `https://img.pokemondb.net/sprites/home/normal/${user.name}.png`
          )
          .attr("alt", "Card image cap");
        console.log(
          `https://img.pokemondb.net/sprites/home/normal/${user.name}.png`
        );
        let cardBody = $("<div>").addClass("card-body");
        let cardTitle = $("<h5>")
          .addClass("card-title")
          .text(`#${num} - ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}`);
        let cardText = $("<p>").addClass("card-text").text(`${desc}`);

console.log(user.types[0] + " this is the type on pokeapi");

        // Example usage:
        let type2 = null;
        let type1 = createPokemonButtonType1(user.types[0].type.name);
        if(user.types.length > 1){
         type2 = createPokemonButtonType2(user.types[1].type.name);
        } else {
          type2 = null;
        }
       

        // Construct the card with the elements
        cardBody.append(cardImg, cardTitle, cardText, type1, type2);
        card.append(cardBody);

        // Append the card to the content div
        $("#content").append(card);
      });

      // Process the data when name1 is available
      $('#head').text(user.name.charAt(0).toUpperCase() + user.name.slice(1));

      // Clear the input field
      $("#inputField").val("");

      // Log the input value
      console.log("Input value:", num);

      // Set the image source
      $("#pokeImage").attr(
        "src",
        `https://img.pokemondb.net/sprites/home/normal/${user.name.toLowerCase()}.png`
      );

      // Set the class attribute for the div
      div1.setAttribute("class", "container col-6  text-white text-center");

      // Append the div1 to the body
      document.body.append(div1);
    } catch (error) {
      // Log error if the request fails
      console.error("AJAX request failed:", error);
    }
  }
}

function createPokemonButtonType1(type1) {
  let $button = $("<a>")
    .addClass("btn text-white")
    .attr("href", "#")
    .attr("id", "buttonType")
    .text(type1.charAt(0).toUpperCase() + type1.slice(1))
    .css("color", "white");

  switch (type1.toLowerCase()) {
    case "normal":
      $button.css("background-color", "#A8A878");
      break;
    case "fire":
      $button.css("background-color", "#F08030");
      break;
    case "water":
      $button.css("background-color", "#6890F0");
      break;
    case "electric":
      $button.css("background-color", "#f8d030");
      break;
    case "grass":
      $button.css("background-color", "#78c850");
      break;
    case "ice":
      $button.css("background-color", "#98D8D8");
      break;
    case "fighting":
      $button.css("background-color", "#C03028");
      break;
    case "poison":
      $button.css("background-color", "#A040A0");
      break;
    case "ground":
      $button.css("background-color", "#E0C068");
      break;
    case "flying":
      $button.css("background-color", "#A890F0");
      break;
    case "psychic":
      $button.css("background-color", "#F85888");
      break;
    case "bug":
      $button.css("background-color", "#A8B820");
      break;
    case "rock":
      $button.css("background-color", "#B8A038");
      break;
    case "ghost":
      $button.css("background-color", "#705898");
      break;
    case "dragon":
      $button.css("background-color", "#7038F8");
      break;
    case "dark":
      $button.css("background-color", "#705848");
      break;
    case "steel":
      $button.css("background-color", "#B8B8D0");
      break;
    case "fairy":
      $button.css("background-color", "#EE99AC");
      break;
    default:
      $button.addClass("btn-secondary");
      break;
  }

  return $button;
}

function createPokemonButtonType2(type2) {

  console.log('type2:', type2);

  if (type2 === null) {
    console.log('type2 is null');
    return null;
  }

  console.log('type2:', type2);

  let $button = $("<button>")
    .addClass("btn text-white")
    .attr("id", "buttonType")
    .text(type2 ? type2.charAt(0).toUpperCase() + type2.slice(1) : '');

  if (type2) {
    console.log('type2.toLowerCase():', type2.toLowerCase());

    switch (type2.toLowerCase()) {
      case "normal":
        $button.css("background-color", "#A8A878");
        break;
      case "fire":
        $button.css("background-color", "#F08030");
        break;
      case "water":
        $button.css("background-color", "#6890F0");
        break;
      case "electric":
        $button.css("background-color", "#f8d030");
        break;
      case "grass":
        $button.css("background-color", "#78c850");
        break;
      case "ice":
        $button.css("background-color", "#98D8D8");
        break;
      case "fighting":
        $button.css("background-color", "#C03028");
        break;
      case "poison":
        $button.css("background-color", "#A040A0");
        break;
      case "ground":
        $button.css("background-color", "#E0C068");
        break;
      case "flying":
        $button.css("background-color", "#A890F0");
        break;
      case "psychic":
        $button.css("background-color", "#F85888");
        break;
      case "bug":
        $button.css("background-color", "#A8B820");
        break;
      case "rock":
        $button.css("background-color", "#B8A038");
        break;
      case "ghost":
        $button.css("background-color", "#705898");
        break;
      case "dragon":
        $button.css("background-color", "#7038F8");
        break;
      case "dark":
        $button.css("background-color", "#705848");
        break;
      case "steel":
        $button.css("background-color", "#B8B8D0");
        break;
      case "fairy":
        $button.css("background-color", "#EE99AC");
        break;
      default:
        $button.addClass("btn-secondary");
        break;
    }
  }

  return $button;
}
