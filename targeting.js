function matchRegex(strRegex, str) {
    let regex = new RegExp(strRegex, 'gm');
    let m;
    
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }  
}

// let rule = "";
// let url = "";

function check() {
    let selection = document.getElementById('rule-select').value;
    if (selection === 'contains') {
        urlContains();
    } else if (selection === 'endswith') {
        endswith();
    } else if (selection === 'startswith') {
        startswith();
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