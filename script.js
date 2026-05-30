const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clickSound = document.getElementById("clickSound");

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        playSound();

        const text = button.textContent;
        const value = button.dataset.value || text;

        if(text === "C"){
            display.value = "";
            return;
        }

        if(text === "⌫"){
            display.value = display.value.slice(0,-1);
            return;
        }

        if(text === "="){

            try{
                display.value = eval(display.value);
            }
            catch{
                display.value = "Error";
            }

            return;
        }

        if(text === "−"){
            display.value += "-";
            return;
        }

        display.value += value;

    });

});

document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if("0123456789+-*/.%".includes(key)){
        display.value += key;
    }

    if(key === "Backspace"){
        display.value = display.value.slice(0,-1);
    }

    if(key === "Escape"){
        display.value = "";
    }

    if(key === "Enter"){
        try{
            display.value = eval(display.value);
        }
        catch{
            display.value = "Error";
        }
    }

});
