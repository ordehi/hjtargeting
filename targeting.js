function check() {
    let selection = document.getElementById('rule-select').value;
    if (selection === 'simple') {
        simplematch();
    } else if (selection === 'exact') {
        exactmatch();
    }  else if (selection === 'contains') {
        urlContains();
    } else if (selection === 'endswith') {
        urlEndswith();
    } else if (selection === 'startswith') {
        urlStartswith();
    }
}

const validURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

// function log(x) {
//      $("#result").append(x + "<br>");
//  }

function simplematch() {
    let protocol = /^https?:\/\//;
    let www = /www\./;
    let params = /\#.*|\?.*|&.*/;
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;

    rule = rule.replace(protocol, '');
    rule = rule.replace(www, '');
    url = url.replace(protocol, '');
    url = url.replace(www, '');
    let cleanRule = rule.replace(params, '');
    let cleanURL = url.replace(params, '');


    if (validURL.test(rule) && validURL.test(url)) {
    cleanRule.match(cleanURL) ? 
    console.log("It's a match!") : console.log("Not a match.");
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    } else if (!validURL.test(rule)) {
        console.log(`Please enter a valid URL
        Format must be http://example.com`);
    } else if (!validURL.test(url)) {
        console.log(`Please enter a valid URL
        Format must be http://example.com`);
    }
}


// for (let i = 0; i < urls.length; i++) {
//     log(simplematch(urls[i]));
// }

function exactmatch() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    if (rule !== "" && url !== "") {
        rule.toLowerCase() === url.toLowerCase() ?
        console.log("It's a match!") : console.log("Not a match.");
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}

function urlContains() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    if (rule !== "" && url !== "") {
        url.toLowerCase().includes(rule.toLowerCase()) ?
        console.log("It's a match!") : console.log("Not a match.");
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}

function urlStartswith() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    if (rule !== "" && url !== "") {
        url.toLowerCase().startsWith(rule.toLowerCase()) ?
        console.log("It's a match!") : console.log("Not a match.");
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}

function urlEndswith() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    if (rule !== "" && url !== "") {
        url.toLowerCase().endsWith(rule.toLowerCase()) ?
        console.log("It's a match!") : console.log("Not a match.");
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}