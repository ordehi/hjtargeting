var container = document.querySelector('.container');
var backdrop = document.querySelector('.backdrop');
var highlights = document.querySelector('.highlights');
var textarea = document.querySelector('textarea');
var toggleDark = document.querySelector('.dark-mode');

// yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
var ua = window.navigator.userAgent.toLowerCase();
var isIE = !!ua.match(/msie|trident\/7|edge/);
var isWinPhone = ua.indexOf('windows phone') !== -1;
var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

function applyHighlights(text) {
  text = text
    .replace(/\n$/g, '\n\n')
    .replace(/[A-Z].*?\b/g, '<mark class="match">$&</mark>');
  
  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, ' <wbr>');
  }
  
  return text;
}

// we're obviously not gonna use innerHTML for prod, you'll need to do some templating here which means some nice refactoring is in order
function handleInput() {
  var text = textarea.value;
  var highlightedText = applyHighlights(text);
  highlights.innerHTML = highlightedText;
}

function handleScroll() {
  var scrollTop = textarea.scrollTop;
  backdrop.scrollTop = scrollTop;
  
  var scrollLeft = textarea.scrollLeft;
  backdrop.scrollLeft = scrollLeft;  
}

function fixIOS() {
  // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
  // highlights.css({
  //   'padding-left': '+=3px',
  //   'padding-right': '+=3px'
  // });
  highlights.style.paddingLeft += '3px';
  highlights.style.paddingRight += '3px';
}

function bindEvents() {
  textarea.addEventListener('input', handleInput);
  textarea.addEventListener('scroll', handleScroll);
}

if (isIOS) {
  fixIOS();
}

bindEvents();
handleInput();