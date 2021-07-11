const validateURLs = (urlsToMatch) =>
  urlsToMatch.map((url) => validURL.test(url));

function check() {
  console.log("checking");
  let targetingRule = rules.value;
  let targetUrl = targetBox.value;
  let urlsToMatch = textarea.value.split(/\n|\,/).filter((item) => item);
  let urlValidity = validateURLs(urlsToMatch);
  if (targetingRule === "simple") {
    simplematch(targetUrl, urlsToMatch);
  }
  if (validURL.test(targetUrl) && validURL.test(urlsToMatch) && urlValidity) {
    if (targetingRule === "simple") {
      simplematch(targetUrl, urlsToMatch);
    } else if (
      ["exact", "starts", "ends", "contains"].indexOf(targetingRule) > -1
    ) {
      exactContainsStartsOrEnds(targetUrl, urlsToMatch, targetingRule);
    } else {
      invalidInput(targetUrl, urlsToMatch);
    }
  }
}

function invalidInput(targetUrl, urlsToMatch) {
  resultDiv.innerHTML =
    targetUrl === ""
      ? "<h3>❗ Please enter a targeting parameter</h3>"
      : urlsToMatch.length === 0
      ? "<h3>❗ Please enter a URL to match</h3>"
      : !validURL.test(targetUrl) || !validURL.test(urlsToMatch)
      ? "<h3>❗ Please enter valid URLs. <br> Format must be http://example.com</h3>"
      : "";
}

// function generateResultHTML(matches, urlsToMatch, validity) {
//   let resultHTML = `<ul>`;
//   for (let i = 0; i < matches.length; i++) {
//     if (matches[i] && validity[i]) {
//       resultHTML += `<li><span class="match"> ${urlsToMatch[i]}</span></li>`;
//     } else if (matches[i] && !validity[i]) {
//       resultHTML += `<li>❓ <span class="partial">${urlsToMatch[i]} <- part of the string matches but it is not a valid URL
//             Format must be http://example.com</span></li>`;
//     } else if (!matches[i] && !validity[i]) {
//       resultHTML += `<li>❗❗ <span class="notamatch">${urlsToMatch[i]}</span> is not a valid URL</li>`;
//     } else {
//       resultHTML += `<li><span class="notamatch"> ${urlsToMatch[i]}</span></li>`;
//     }
//   }
//   resultHTML += `</ul>`;
//   return resultHTML;
// }

function simplematch(targetUrl, urlsToMatch) {
  let protocol = /^https?:\/\//;
  let www = /www\./;
  let params = /\#.*|\?.*|&.*|\/\#.*|\/\?.*|\/$/;
  let cleanRule = targetUrl
    .replace(protocol, "")
    .replace(www, "")
    .replace(params, "");

  let cleanURLs = urlsToMatch.map((url) =>
    url.replace(protocol, "").replace(www, "").replace(params, "")
  );

  let matches = cleanURLs.map(
    (url) => url.toLowerCase() === cleanRule.toLowerCase()
  );
  console.log(matches);
  applyHighlights(urlsToMatch, matches);
}

const exactContainsStartsOrEnds = (targetUrl, urlsToMatch, targetingRule) => {
  const logicMap = (url) => {
    const logic = {
      exact: url === targetUrl,
      contains: url.includes(targetUrl),
      ends: url.endsWith(targetUrl),
      starts: url.startsWith(targetUrl),
    };
    return logic[targetingRule];
  };
  let matches = urlsToMatch.map((url) => logicMap(url));
  console.log(matches);
  applyHighlights(urlsToMatch, matches);
};

const printResult = (bool) =>
  (resultDiv.innerHTML = `<h3>${
    bool ? "✅ It's a match!" : "❌ Not a match."
  }</h3>`);
