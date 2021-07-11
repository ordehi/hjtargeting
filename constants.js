const container = document.querySelector(".container");
const backdrop = document.querySelector(".backdrop");
const highlights = document.querySelector(".highlights");
const textarea = document.querySelector("textarea");
const toggleDark = document.querySelector(".dark-mode");
const targetBox = document.querySelector(".target");
const rules = document.querySelector("#rules");

const validURL =
  /(https?:\/\/)+([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;

// Browser sniffing, sorry!
const ua = window.navigator.userAgent.toLowerCase();
const isIE = !!ua.match(/msie|trident\/7|edge/);
const isWinPhone = ua.indexOf("windows phone") !== -1;
const isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const checkForMatches1SecondAfterInput = debounce(() => check());
