function CalculateScore(firstName, secondName) {
    // Store "Name1 matches Name2" as array
    var firstNameArray = firstName.toLowerCase().split("")
    var secondNameArray = secondName.toLowerCase().split("")
    var matchesArray = "matches".split("")

    var allLetters = firstNameArray.concat(matchesArray, secondNameArray)

    // Count amount of each letter
    var counts = []
    var remainingLetters = allLetters.slice()
    while (remainingLetters.length > 0) {

        var currentLetter = remainingLetters[0]

        var currentLetterCount = 1
        remainingLetters.splice(0, 1)
        for (i = 0; i < remainingLetters.length; ++i) {
            if (remainingLetters[i] == currentLetter) {
                currentLetterCount++
                remainingLetters.splice(i, 1)
            }
        }
        counts.push(currentLetterCount)
    }

    // Reduce to 2 digit number
    var temp = counts.slice()
    while (temp.length > 2) {

        var current = ""

        for (i = 0; i < Math.floor(temp.length / 2); ++i) {
            var frontNum = parseInt(temp[i])
            var backNum = parseInt(temp[temp.length - (i + 1)])
            current += parseInt(frontNum + backNum).toString()
        }

        if (temp.length % 2 != 0) {
            current += parseInt(temp[Math.floor(temp.length / 2)]).toString()
        }
        temp = current.slice()
    }
    var score = parseInt(temp)

    return score
}


function TestNames(firstName, secondName) {
    var name1 = firstName
    var name2 = secondName

    var score = CalculateScore(name1, name2)

    var outputString = name1 + " matches " + secondName + " " + score.toString() + "%"

    if (score >= 80) {
        outputString += ", good match"
    }

    console.log(outputString)
}

function isAlphabetic(name) {
    var alphabetic = false

    if (!/[^a-zA-Z]/.test(name)) {
        alphabetic = true
    } else {
        alphabetic = false
    }

    return alphabetic
}

function removeDuplicates(oldArray) {
    var newArray = []

    var currentElement;
    var elementFound;
    for (i = 0; i < oldArray.length; ++i) {
        currentElement = oldArray[i]
        elementFound = false

        for (j = 0; j < newArray.length; ++j) {
            if (newArray[j] == currentElement) {
                elementFound = true
            }
        }

        if (elementFound == false) {
            newArray.push(currentElement)
        }
    }

    return newArray
}

function csv(fileName) {
    const fs = require("fs")
    const rl = require("readline")

    const reader = rl.createInterface(
        {
            input: fs.createReadStream(fileName)
        })

    var males = []
    var females = []

    reader.on("line", (row) => {
        var split = row.split(", ")
        if (split[1] == "m") {
            males.push(split[0])
        } else if (split[1] == "f") {
            females.push(split[0])
        }
    })


    reader.on("close", () => {
        console.log("Males before removing duplicates:")
        console.log(males)
        console.log("Females before removing duplicates:")
        console.log(females)
        console.log("\n")

        // Remove duplicates
        males = removeDuplicates(males)
        females = removeDuplicates(females)
        console.log("Males:")
        console.log(males)
        console.log("Females:")
        console.log(females)
        console.log("\n")

        // Calculate Scores
        var matches
        var maleName
        var femaleName
        var matchScore
        var outputString
        for (m = 0; m < males.length; ++m) {
            matches = []
            maleName = males[m]
            console.log("Male: " + maleName)
            for (f = 0; f < females.length; ++f) {
                femaleName = females[f]

                if (!isAlphabetic(maleName) || !isAlphabetic(femaleName)) {
                    console.log("Error: All characters need to be alphabetic.")
                } else {
                    matchScore = CalculateScore(maleName, femaleName)
                    matches.push({ partner: femaleName, score: matchScore })
                }
            }

            matches.sort(function (a, b) {
                let score1 = a.score
                let score2 = b.score

                if (score1 != score2) {
                    return score2 - score1
                } else {
                    let person1 = a.partner.toLowerCase()
                    let person2 = b.partner.toLowerCase()

                    if (person1 < person2) { return -1 }
                    if (person1 > person2) { return 1 }
                    return 0;
                }
            })

            // Sort by score, then by name
            for (i = 0; i < matches.length; ++i) {
                femaleName = matches[i].partner
                matchScore = matches[i].score

                outputString = maleName + " matches " + femaleName + " " + matchScore.toString() + "%"

                if (matchScore >= 80) {
                    outputString += ", good match"
                }

                console.log(outputString)
            }
            console.log("\n")
        }

    })

}


function main() {

    const http = require('http')
    const fs = require('fs')
    
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'content-type': 'text/html' })
      fs.createReadStream('index.html').pipe(res)
    })
    
    server.listen(process.env.PORT || 3000)
    
    var button = document.getElementById("calculateScoreButton");
    button.addEventListener("click", function() {
        var name1 = document.getElementById("name1").value
        var name2 = document.getElementById("name2").value
    
        if(name1 == "" || name2 == ""){
            document.getElementById("result").innerHTML = ""
            console.log("FBwkj")
    
        }
        console.log("FBwkj")

        document.getElementById("result").innerHTML = "FUCK YEAH"    
    }, )
        
    
    // Test Case
    console.log("Test Case:\n")

    var name1 = "Jack"
    var name2 = "Jill"

    if (!isAlphabetic(name1) || !isAlphabetic(name2)) {
        console.log("Error: All characters need to be alphabetic.")
    } else {
        TestNames(name1, name2)
    }
    console.log("\n------------------------\n")

    // Entire CSV file
    csv("names.csv")
}

main()