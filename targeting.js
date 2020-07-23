const resultDiv = document.getElementById('result');
const validURL = /(https?:\/\/)+([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;

function validateURLs(urls) {
    let validArr = [];
    urls.forEach(url => validArr.push(validURL.test(url)));
    return validArr;
}

function check() {
    let selection = document.getElementById('rule-select').value;
    let rule = document.getElementById('rule').value;
    let urls = document.getElementById('url').value.split(/\n|\,/).filter(item => item);
    let validity = validateURLs(urls);
    
    if (selection === 'simple' && validURL.test(rule) && validURL.test(urls)) {
        simplematch(rule, urls, validity);
    } else if (selection === 'exact' && validURL.test(rule) && validURL.test(urls)) {
        exactmatch(rule, urls, validity);
    } else if (selection === 'contains' && rule !== '' && urls !== '' && validURL.test(urls)) {
        urlContains(rule, urls, validity);
    } else if (selection === 'endswith' && rule !== '' && urls !== '' && validURL.test(urls)) {
        urlEndswith(rule, urls, validity);
    } else if (selection === 'startswith' && rule !== '' && urls !== '' && validURL.test(urls)) {
        urlStartswith(rule, urls, validity);
    } else {
        invalidInput(rule, urls, validity);
    }
  }

function invalidInput(rule, urls) {
    if (rule === "") {
        resultDiv.innerHTML = "<h3>❗ Please enter a targeting parameter</h3>";
    } else if (urls.length === 0) {
        resultDiv.innerHTML = "<h3>❗ Please enter a URL to match</h3>";
    } else if (!validURL.test(rule) || !validURL.test(urls)) {
        resultDiv.innerHTML = "<h3>❗ Please enter valid URLs. <br> Format must be http://example.com</h3>";
    }
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
    let cleanRule = rule.replace(protocol, '').replace(www, '').replace(params, '');
    let cleanURLs = urls.map(function(url) {
        url = url.replace(protocol, '').replace(www, '').replace(params, '');
        return url;
    });

    let matches = [];
    cleanURLs.forEach(url => matches.push(url.toLowerCase() === cleanRule.toLowerCase()));

    let result = generateResultHTML(matches, urls, validity);
    resultDiv.innerHTML = result;
}

function exactmatch(rule, urls, validity) {
    let matches = [];
    urls.forEach(url => matches.push(url === rule));
    let result = generateResultHTML(matches, urls, validity);
    resultDiv.innerHTML = result;
}

function urlContains(rule, urls, validity) {
    let matches = [];
    urls.forEach(url => matches.push(url.includes(rule)));
    let result = generateResultHTML(matches, urls, validity);
    resultDiv.innerHTML = result;
}

function urlStartswith(rule, urls, validity) {
    let matches = [];
    urls.forEach(url => matches.push(url.startsWith(rule)));
    let result = generateResultHTML(matches, urls, validity);
    resultDiv.innerHTML = result;
}

function urlEndswith(rule, urls, validity) {
    let matches = [];
    urls.forEach(url => matches.push(url.endsWith(rule)));
    let result = generateResultHTML(matches, urls, validity);
    resultDiv.innerHTML = result;
}

function printResult(bool) {
    bool ? 
    resultDiv.innerHTML = "<h3>✅ It's a match!</h3>" :
    resultDiv.innerHTML = "<h3>❌ Not a match.</h3>";
}