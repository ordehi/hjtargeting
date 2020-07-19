const resultDiv = document.getElementById('result');
const validURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

function check() {
    let selection = document.getElementById('rule-select').value;
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    
    if (selection === 'simple' && validURL.test(rule) && validURL.test(url)) {
        simplematch(rule, url);
    } else if (selection === 'exact' && validURL.test(rule) && validURL.test(url)) {
        exactmatch(rule, url);
    } else if (selection === 'contains' && rule !== '' && url !== '') {
        urlContains(rule, url);
    } else if (selection === 'endswith' && rule !== '' && url !== '') {
        urlEndswith(rule, url);
    } else if (selection === 'startswith' && rule !== '' && url !== '') {
        urlStartswith(rule, url);
    } else {
        invalidInput(rule, url);
    }
  }

function invalidInput(rule, url) {
    if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    } else if (!validURL.test(rule) || !validURL.test(url)) {
        console.log(`Please enter valid URLs
Format must be http://example.com`);
    }
}

function simplematch(rule, url) {
    let protocol = /^https?:\/\//;
    let www = /www\./;
    let params = /\#.*|\?.*|&.*|\/$/;
    rule = rule.replace(protocol, '').replace(www, '').replace(params, '');
    url = url.replace(protocol, '').replace(www, '').replace(params, '');
    let result = rule === url;
    printResult(result); 
}


// for (let i = 0; i < urls.length; i++) {
//     log(simplematch(urls[i]));
// }

function exactmatch(rule, url) {
    let result = rule.toLowerCase() === url.toLowerCase();
    printResult(result);
}

function urlContains(rule, url) {
    let result = url.toLowerCase().includes(rule.toLowerCase());
    printResult(result);
}

function urlStartswith(rule, url) {
    let result = url.toLowerCase().startsWith(rule.toLowerCase());
    printResult(result);
}

function urlEndswith(rule, url) {
    let result = url.toLowerCase().endsWith(rule.toLowerCase());
    printResult(result);
}

function printResult(bool) {
    bool ? 
    resultDiv.innerHTML = "<h3>✅ It's a match!</h3>" :
    resultDiv.innerHTML = "<h3>❌ Not a match.</h3>";
}