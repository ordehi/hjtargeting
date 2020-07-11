function check() {
    let selection = document.getElementById('rule-select').value;
    if (selection === 'exact') {
        exactmatch();
    }  else if (selection === 'contains') {
        urlContains();
    } else if (selection === 'endswith') {
        endswith();
    } else if (selection === 'startswith') {
        startswith();
    }
}

function exactmatch() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    if (rule !== "" && url !== "") {
        if (rule === url) {
            console.log("It's a match!");
        } else {
            console.log("Not a match.");
        }
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}

function urlContains() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    let regex;
    if (rule !== "" && url !== "") {
        regex = new RegExp(rule, 'gm');
        if (url.match(regex)) {
            console.log("It's a match!");
        } else if (!url.match(regex)) {
            console.log("Not a match.");
        }
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}

function endswith() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    let endsrule;
    let regex;
    if (rule !== "" && url !== "") {
        endsrule = `.*${rule}$`
        regex = new RegExp(endsrule, 'gm');
        if (url.match(regex)) {
            console.log("It's a match!");
        } else if (!url.match(regex)) {
            console.log("Not a match.");
        }
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}
function startswith() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    let startsrule;
    let regex;
    if (rule !== "" && url !== "") {
        startsrule = `^${rule}.*`
        regex = new RegExp(startsrule, 'gm');
        if (url.match(regex)) {
            console.log("It's a match!");
        } else if (!url.match(regex)) {
            console.log("Not a match.");
        }
    } else if (rule === "") {
        console.log("Please enter a targeting parameter.");
    } else if (url === "") {
        console.log("Please enter a URL to match.");
    }
}

// function urlContains(input, compare) {
//     let regex = new RegExp(input, 'gm');
//     let found = compare.match(regex);
//     console.log(found);
// }