const resultDiv = document.getElementById("result");
const validURL = /(https?:\/\/)+([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;

const validateURLs = (urls) => urls.map((url) => validURL.test(url));
const textarea = document.getElementById('url');
const container = document.getElementsByClassName('matcharea');
const backdrop = document.getElementsByClassName('backdrop');
const highlights = document.getElementsByClassName('highlights');

function handleInput() {
  let text = textarea.value;
  let highlightedText = applyHighlights(text);
  highlights.innerHTML = highlightedText;
}

function applyHighlights(text) {
  return text
      .replace(/\n$/g, '\n\n')
      .replace(/[A-Z].*?\b/g, '<mark></mark>');
}

function handleScroll() {
  let scrollTop = textarea.scrollTop();
  backdrop.scrollTop(scrollTop);
}

textarea.addEventListener('input', handleInput);
textarea.addEventListener('scroll', handleScroll);



function check() {
  let selection = document.getElementById("rule-select").value;
  let rule = document.getElementById("rule").value;
  let urls = document
    .getElementById("url")
    .value.split(/\n|\,/)
    .filter((item) => item);
  let validity = validateURLs(urls);

  if (selection === "simple" && validURL.test(rule) && validURL.test(urls)) {
    simplematch(rule, urls, validity);
  } else if (
    selection === "exact" &&
    validURL.test(rule) &&
    validURL.test(urls)
  ) {
    exactContainsStartsOrEnds(rule, urls, validity, selection);
  } else if (rule !== "" && urls !== "" && validURL.test(urls)) {
    exactContainsStartsOrEnds(rule, urls, validity, selection);
  } else {
    invalidInput(rule, urls, validity);
  }
}

function invalidInput(rule, urls) {
  resultDiv.innerHTML =
    rule === ""
      ? "<h3>❗ Please enter a targeting parameter</h3>"
      : urls.length === 0
      ? "<h3>❗ Please enter a URL to match</h3>"
      : !validURL.test(rule) || !validURL.test(urls)
      ? "<h3>❗ Please enter valid URLs. <br> Format must be http://example.com</h3>"
      : "";
}

function generateResultHTML(matches, urls, validity) {
  let resultHTML = `<ul>`;
  for (let i = 0; i < matches.length; i++) {
    if (matches[i] && validity[i]) {
      resultHTML += `<li><span class="match"> ${urls[i]}</span></li>`;
    } else if (matches[i] && !validity[i]) {
      resultHTML += `<li>❓ <span class="partial">${urls[i]} <- part of the string matches but it is not a valid URL
            Format must be http://example.com</span></li>`;
    } else if (!matches[i] && !validity[i]) {
      resultHTML += `<li>❗❗ <span class="notamatch">${urls[i]}</span> is not a valid URL</li>`;
    } else {
      resultHTML += `<li><span class="notamatch"> ${urls[i]}</span></li>`;
    }
  }
  resultHTML += `</ul>`;
  return resultHTML;
}

function simplematch(rule, urls, validity) {
  let protocol = /^https?:\/\//;
  let www = /www\./;
  let params = /\#.*|\?.*|&.*|\/\#.*|\/\?.*|\/$/;
  let cleanRule = rule
    .replace(protocol, "")
    .replace(www, "")
    .replace(params, "");

  let cleanURLs = urls.map((url) =>
    url.replace(protocol, "").replace(www, "").replace(params, "")
  );

  let matches = cleanURLs.map(
    (url) => url.toLowerCase() === cleanRule.toLowerCase()
  );

  let result = generateResultHTML(matches, urls, validity);
  resultDiv.innerHTML = result;
}

const exactContainsStartsOrEnds = (rule, urls, validity, selection) => {
  const logicMap = (url) => {
    const logic = {
      exact: url === rule,
      contains: url.includes(rule),
      endswith: url.endsWith(rule),
      startswith: url.startsWith(rule),
    };
    return logic[selection];
  };
  let matches = urls.map((url) => logicMap(url));
  let result = generateResultHTML(matches, urls, validity);
  resultDiv.innerHTML = result;
};

const printResult = (bool) =>
  (resultDiv.innerHTML = `<h3>${
    bool ? "✅ It's a match!" : "❌ Not a match."
  }</h3>`);
