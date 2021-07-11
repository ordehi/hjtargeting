function applyHighlights(text, matches) {
  let backdropText = "";
  for (let i = 0; i < matches.length; i++) {
    if (matches[i] === true) {
      backdropText += `<mark class="match">${text[i]}</mark>`;
    } else {
      backdropText += `<mark class="no-match">${text[i]}</mark>`;
    }
  }
  backdropText = backdropText
    .replace(/\n$/g, "\n\n")
    .replace(/[A-Z].*?\b/g, '<mark class="match">$&</mark>');

  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, " <wbr>");
  }
  console.log(text);
  highlights.innerHTML = backdropText;
}

// we're obviously not gonna use innerHTML for prod, you'll need to do some templating here which means some nice refactoring is in order
function handleInput() {
  const text = textarea.value;
  const highlightedText = applyHighlights(text);
  highlights.innerHTML = highlightedText;
}

function handleScroll() {
  var scrollTop = textarea.scrollTop;
  console.log("textarea scroll " + textarea.scrollTop);
  backdrop.scrollTop = scrollTop;
  console.log("backdrop scroll " + backdrop.scrollTop);

  var scrollLeft = textarea.scrollLeft;
  backdrop.scrollLeft = scrollLeft;
}

function fixIOS() {
  // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
  // highlights.css({
  //   'padding-left': '+=3px',
  //   'padding-right': '+=3px'
  // });
  highlights.style.paddingLeft += "3px";
  highlights.style.paddingRight += "3px";
}

function bindEvents() {
  textarea.addEventListener("input", () => {
    handleScroll();
    checkForMatches1SecondAfterInput();
  });
  textarea.addEventListener("scroll", handleScroll);
}

if (isIOS) {
  fixIOS();
}

bindEvents();
