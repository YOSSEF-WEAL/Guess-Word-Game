// Spinner
let spinner = document.querySelector('.spinner-wrapper');

window.addEventListener('load', () =>
{
    spinner.style.opacity = '0';
    setTimeout(() =>
    {
        spinner.style.display = 'none';
    }, 200);
})


// Setting Game Name
let gameName = "Guess Word Game";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Yossef Weal. `;

//Setting Game Options
let numberofTries = 6;
let numbersofLeters = 6;
let currenttry = 1;
let disabled = true;
let numberOfHints = 2;

// Word manage
let WordToGuess = "";
const Word = ["Create", "Update", "Delete", "Master", "Branch", "Puzzle", "Yossef", "School"];
WordToGuess = Word[Math.floor(Math.random() * Word.length)].toLowerCase();
let massegeArea = document.querySelector(".message");

// Manage Hints 
document.querySelector(".hint span").innerHTML = numberOfHints;

const getHintBtn = document.querySelector(".hint");
getHintBtn.addEventListener("click", gethint);

console.log(WordToGuess);

function generateInput()
{
    const inputsContainer = document.querySelector(".inputs");
    // Create Maine try div
    for (let i = 1; i <= numbersofLeters; i++)
    {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        // Create Inputs
        for (let j = 1; j <= numbersofLeters; j++)
        {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    // Focus on fist inpot
    inputsContainer.children[0].children[1].focus();
    // Disable All inputs first one
    const iputsDisable = document.querySelectorAll(".disabled-inputs input");
    iputsDisable.forEach((input) => (input.disabled = true));




    const inputs = document.querySelectorAll("input");


    inputs.forEach((input, index) =>
    {
        // Convert input to Uppercase
        input.addEventListener("input", function ()
        {
            this.value = this.value.toUpperCase();
            // console.log(index);
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });
    });

    inputs.forEach((input, index) =>
    {
        input.addEventListener("keydown", function (evevt)
        {
            // console.log(evevt);
            const currentIndex = Array.from(inputs).indexOf(evevt.target); // Or this
            // console.log(currentIndex);
            if (event.key == "ArrowRight")
            {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key == "ArrowLeft")
            {
                const prevtInput = currentIndex - 1;
                if (prevtInput >= 0) inputs[prevtInput].focus();
            }
        });
    });
};


const guessButton = document.querySelector(".chech");
guessButton.addEventListener("click", handelGuesses);

function handelGuesses()
{
    let successGuess = true;
    for (let i = 1; i <= numberofTries; i++)
    {
        const InputField = document.querySelector(`#guess-${currenttry}-letter-${i}`);
        const Letter = InputField.value.toLowerCase();
        // console.log(Letter);
        const actualLetar = WordToGuess[i - 1];

        // Game Logic
        if (Letter === actualLetar)
        {
            // letter Is Correct And In Place
            InputField.classList.add("yes-in-place");

        } else if (WordToGuess.includes(Letter) && Letter !== "")
        {
            InputField.classList.add("not-in-place");
            // letter Is Correct And Not Place
            successGuess = false;

        } else
        {
            InputField.classList.add("Wrong");
            successGuess = false;
        }

    }
    // Check If user Win Or Lose 

    if (successGuess)
    {
        // console.log("You Win");
        massegeArea.innerHTML = `You Win The Word Is <span>${WordToGuess}</span>`;
        if (numberOfHints === 2)
        {
            massegeArea.innerHTML = `<p>Congratz You Didn't use Hints The Word Is <span>${WordToGuess}</span></p> `;

        }
        // Add Disble Class on all Try Divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        // Disable Guess Button
        guessButton.disabled = true;
        getHintBtn.disabled = true;

    } else
    {
        // console.log("You Lose");
        document.querySelector(`.try-${currenttry}`).classList.add("disabled-inputs");
        // console.log(currenttry);
        const currenttryInputs = document.querySelectorAll(`.try-${currenttry} input`);
        currenttryInputs.forEach((input) => (input.disabled = true));

        currenttry++;

        // document.querySelector(`.try-${currenttry}`).classList.remove("disabled-inputs");
        const nexttryInputs = document.querySelectorAll(`.try-${currenttry} input`);
        nexttryInputs.forEach((input) => (input.disabled = false));
        let element = document.querySelector(`.try-${currenttry}`);
        if (element)
        {
            document.querySelector(`.try-${currenttry}`).classList.remove("disabled-inputs");
            element.children[1].focus();
        } else
        {
            // Disable Guess Button 
            guessButton.disabled = true;
            getHintBtn.disabled = true;
            massegeArea.innerHTML = `You Lose The Word Is <span>${WordToGuess}</span>`;
        }
    }
}

function gethint()
{
    if (numberOfHints > 0)
    {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    } if (numberOfHints === 0)
    {
        getHintBtn.disabled = true;
    }

    const enableInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(enableInputs);
    const emptyEnabledInputs = Array.from(enableInputs).filter((input) => input.value === "");
    // console.log(emptyEnabledInputs);

    if (emptyEnabledInputs.length > 0)
    {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        randomInput.classList.add("Hint-input");
        const indexToFill = Array.from(enableInputs).indexOf(randomInput);
        // console.log(randomIndex);
        // console.log(randomInput);
        // console.log(indexToFill);
        if (indexToFill !== -1)
        {
            randomInput.value = WordToGuess[indexToFill].toUpperCase();
        }
    }
}

function handelBackspace(event)
{
    if (event.key === "Backspace")
    {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const CurrentIndex = Array.from(inputs).indexOf(document.activeElement);
        // console.log(CurrentIndex);
        if (CurrentIndex > 0)
        {
            const currentInput = inputs[CurrentIndex];
            const prevInput = inputs[CurrentIndex - 1]; // If you wont back in delet prev input
            // const prevInput = inputs[CurrentIndex];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
}

document.addEventListener("keydown", handelBackspace);

window.onload = function ()
{
    generateInput();
};

// Gat a New word
let BtnNew = document.querySelector(".New-word");
function relodpage()
{
    window.location.reload();
}
BtnNew.addEventListener("click", relodpage);


// const Word = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Yossef", "School"];
// Hint sentence 
let Hint_body = document.querySelector(".modal-body");

for (let H = 0; H < Word.length; H++)
{
    if (WordToGuess === Word[0].toLowerCase())
    {

        Hint_body.textContent = "The word means to make something out of nothing or to invent something completely new.";
    }
    if (WordToGuess === Word[1].toLowerCase())
    {
        Hint_body.textContent = "The word means adding information to old information and renewing anything old when it becomes...";
    }
    if (WordToGuess === Word[2].toLowerCase())
    {
        Hint_body.textContent = "The word is said about something that has been completely removed from its place, file, or phone, for example.";
    }
    if (WordToGuess === Word[3].toLowerCase())
    {
        Hint_body.textContent = "An adjective used when the work is very new.";
    }
    if (WordToGuess === Word[4].toLowerCase())
    {
        Hint_body.textContent = "An adjective used to describe containers when they are empty or a cup when it is also empty.";
    }
    if (WordToGuess === Word[5].toLowerCase())
    {
        Hint_body.textContent = "A type of guessing, predicting and collecting games.";
    }
    if (WordToGuess === Word[6].toLowerCase())
    {
        Hint_body.textContent = "This will be very easy 😂 Name of the programmer of the game you are playing now 🫣.";
    }
    if (WordToGuess === Word[7].toLowerCase())
    {
        Hint_body.textContent = "A place where I go to learn from elementary to high school.";
    }

}



