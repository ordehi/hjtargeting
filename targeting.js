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
    }
}

function urlContains() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    let regex;
    if (rule !== null && url !== null) {
        regex = new RegExp(rule, 'gm');
    } else if (rule === null) {
        console.log("Please enter a targeting parameter.");
    } else if (url === null) {
        console.log("Please enter a URL to match.");
    }

    if (url.match(regex) !== null) {
        console.log("It's a match!");
    } else if (url.match(regex) === null) {
        console.log("Not a match.");
    }
}

function endswith() {
    let rule = document.getElementById('rule').value;
    let url = document.getElementById('url').value;
    let regex = new RegExp(rule, 'gm');
    let found = url.match(regex);
    if (found === null) {
        console.log(found);
    } else {
        console.log("");
    }
}

// function urlContains(input, compare) {
//     let regex = new RegExp(input, 'gm');
//     let found = compare.match(regex);
//     console.log(found);
// }