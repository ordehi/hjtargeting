const resultDiv = document.getElementById('result');
const validURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

function check() {
    let selection = document.getElementById('rule-select').value;
    let rule = document.getElementById('rule').value;
    let urls = document.getElementById('url').value.split(/\n|\,/);
    
    if (selection === 'simple' && validURL.test(rule) && validURL.test(urls)) {
        simplematch(rule, urls);
    } else if (selection === 'exact' && validURL.test(rule) && validURL.test(urls)) {
        exactmatch(rule, urls);
    } else if (selection === 'contains' && rule !== '' && urls !== '') {
        urlContains(rule, urls);
    } else if (selection === 'endswith' && rule !== '' && urls !== '') {
        urlEndswith(rule, urls);
    } else if (selection === 'startswith' && rule !== '' && urls !== '') {
        urlStartswith(rule, urls);
    } else {
        invalidInput(rule, urls);
    }
  }

function invalidInput(rule, urls) {
    if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (urls === "") {
        console.log("Please enter a URL to match.");
    } else if (!validURL.test(rule) || !validURL.test(urls)) {
        console.log(`Please enter valid URLs
Format must be http://example.com`);
    }
}

function simplematch(rule, urls) {
    let protocol = /^https?:\/\//;
    let www = /www\./;
    let params = /\#.*|\?.*|&.*|\/\#.*|\/\?.*|\/$/;
    rule = rule.replace(protocol, '').replace(www, '').replace(params, '');
    let cleanURLs = urls.map(function(url) {
        url = url.replace(protocol, '').replace(www, '').replace(params, '');
        return url;
    });

    let result = generateResultHTML(cleanURLs);
    
    function generateResultHTML() {
        let resultHTML = `<ul>`;
        for (let i = 0; i < cleanURLs.length; i++) {
            if (rule === cleanURLs[i]) {
                resultHTML += `<li class="match">✅ ${urls[i]}</li>`;
            } else {
                resultHTML += `<li class="notamatch">❌ ${urls[i]}</li>`;
            }
        }
        resultHTML += `</ul>`;
        return resultHTML;
    }
    resultDiv.innerHTML = result;
}


// for (let i = 0; i < urls.length; i++) {
//     log(simplematch(urls[i]));
// }

function exactmatch(rule, urls) {
    let result = rule.toLowerCase() === urls.toLowerCase();
    printResult(result);
}

function urlContains(rule, urls) {
    let result = urls.toLowerCase().includes(rule.toLowerCase());
    printResult(result);
}

function urlStartswith(rule, urls) {
    let result = urls.toLowerCase().startsWith(rule.toLowerCase());
    printResult(result);
}

function urlEndswith(rule, urls) {
    let result = urls.toLowerCase().endsWith(rule.toLowerCase());
    printResult(result);
}

function printResult(bool) {
    bool ? 
    resultDiv.innerHTML = "<h3>✅ It's a match!</h3>" :
    resultDiv.innerHTML = "<h3>❌ Not a match.</h3>";
}