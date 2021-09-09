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

function csv(){

}

function main() {

    var name1 = "Jack"
    var name2 = "Jill"

    if (!isAlphabetic(name1) || !isAlphabetic(name2)) {
        console.log("Error: All characters need to be alphabetic.")
    } else {
        TestNames(name1, name2)
    }
}

main()