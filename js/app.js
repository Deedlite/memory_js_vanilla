var app = {
  clickEnable: true,
  cardMatch: 0,
  card1: null,
  card2: null,

  init: function() {
    var start = document.getElementById("normal");
    start.addEventListener("click", app.startGame);
  },

  startGame: function() {
    var menu = document.querySelector(".menu");
    menu.style.display = "none";
    app.generateCards();
  },

  generateCards: function() {
    var max = 7;
    var zeroToMax1 = app.generateArray(max);
    var zeroToMax2 = app.generateArray(max);
    var allCardsNumber = zeroToMax1.concat(zeroToMax2);
    allCardsNumber = app.shuffle(allCardsNumber);

    for (var i = 0; i < allCardsNumber.length; i++) {
      var carte = document.createElement("div");
      carte.classList.add("carte");
      var cache = document.createElement("div");
      cache.classList.add("cache");
      var image = document.createElement("div");
      image.classList.add("image");
      image.style.backgroundPosition = '0-' + allCardsNumber[ i ] + '00px';
      carte.append(cache);
      carte.append(image);
      carte.addEventListener('click', app.cardClick);

      var container = document.getElementById("container");
      container.appendChild(carte);
    }
  },

  generateArray: function(max) {
    var tab = [];
    for (var nb = 0; nb <= max; nb++) {
      tab.push(nb);
    }
    return tab;
  },

  cardClick: function(evt) {
    if (app.clickEnable) {

      if (evt.target.classList.contains("image"))
      return;

      var carte = evt.target.parentNode;
      var image = carte.querySelector(".image");
      carte.classList.add('flipped');

      var cache = carte.querySelector(".cache");
      cache.style.display = "none";
      image.style.display = "block";

      if (app.card1 == null) {
        app.card1 = image;
      }
      else {
        app.card2 = image;
        app.clickEnable = false;

        var card1Style = getComputedStyle(app.card1);
        var card1Back = card1Style.getPropertyValue("background-position");
        var card2Style = getComputedStyle(app.card2);
        var card2Back = card2Style.getPropertyValue("background-position");
        
        if (card2Back != card1Back) {
          setTimeout(function() {
            app.card1.style.display = "none";
            var temp = app.card1.previousSibling;
            temp.style.display = "block";
            app.card1.parentNode.classList.remove('flipped');
            app.card2.style.display = "none";
            var temp2 = app.card2.previousSibling;
            temp2.style.display = "block";
            app.card2.parentNode.classList.remove('flipped');
            app.clickEnable = true;
            app.card1 = null;
            app.card2 = null;
          },
          1000);
        } else {
          app.clickEnable = true;
          app.card1 = null;
          app.card2 = null;
          app.cardMatch += 1;
          app.isWin();
        }
      }
    }
  },

  isWin: function() {
     if (app.cardMatch == 8) {
      window.alert("WIIIIIIIIIIIIIIN !");
      window.location.reload();
    }
  },

  shuffle: function(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  },
}
document.addEventListener('DOMContentLoaded', app.init);
