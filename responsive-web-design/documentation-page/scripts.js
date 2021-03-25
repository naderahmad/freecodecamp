var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var colors = ["#72009e", "#1e276b", "#bc688e", "#544F66", "#544F66", "#E2CCC1"];

var fps = 15;
var now;
var then = Date.now();
var num = 2;
var delta;
var tamanho = 50;
var ismobile = false;
var varpi = 2 * Math.PI;
var interval = 1000 / fps;
var objforDraw = new Array();

$(document).ready(function () {
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / fps);
      }
    );
  })();
  window.cancelRequestAnimFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      clearTimeout
    );
  })();
  var ShadowObject = function (color) {
    this.x = Math.random() * canvas.width + 10;
    this.y = Math.random() * canvas.height + 10;
    this.color = color;
    this.size = tamanho;
    this.dirX = Math.random() < 0.5 ? -1 : 1;
    this.dirY = Math.random() < 0.5 ? -1 : 1;
    this.checkIsOut = function () {
      if (this.x > canvas.width + this.size / 2 || this.x < 0 - this.size / 2) {
        this.dirX = this.dirX * -1;
      }
      if (
        this.y > canvas.height + this.size / 2 ||
        this.y < 0 - this.size / 2
      ) {
        this.dirY = this.dirY * -1;
      }
    };
    this.move = function () {
      this.x += this.dirX * 2;
      this.y += this.dirY * 2;
    };
  };

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var len = objforDraw.length;
    for (i = 0; i < len; i++) {
      context.beginPath();
      context.arc(
        objforDraw[i].x,
        objforDraw[i].y,
        objforDraw[i].size,
        0,
        varpi,
        false
      );
      context.fillStyle = objforDraw[i].color;
      context.shadowColor = objforDraw[i].color;
      if (ismobile == false) {
        context.shadowBlur = 50;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
      }
      context.fill();
      objforDraw[i].checkIsOut();
      objforDraw[i].move();
    }
  }

  function animloop() {
    requestAnimFrame(animloop);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      draw();
      then = now - (delta % interval);
    }
  }
  document.body.onload = function (e) {
    for (i = 0; i < colors.length * num; i++) {
      var color = i >= colors.length ? colors[i - colors.length] : colors[i];
      objforDraw.push(new ShadowObject(color));
    }
    animloop();
  };
});

function toggle() {
  let menuToggle = document.querySelector("header"),
    toggleBtn = document.querySelector(".toggleClose"),
    toggleMenu = document.querySelector(".menu-toggle"),
    nav = document.querySelector(".navbar");

  nav.classList.toggle("navbar-active");
  toggleBtn.classList.toggle("active");
  toggleMenu.classList.toggle("disabled");
}
