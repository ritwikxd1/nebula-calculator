const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        if(value === "C"){
            display.value = "";
            return;
        }

        if(value === "⌫"){
            display.value = display.value.slice(0,-1);
            return;
        }

        if(value === "="){

            try{
                display.value = eval(display.value);
            }

            catch{
                display.value = "Error";
            }

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

    if(key === "Enter"){
        try{
            display.value = eval(display.value);
        }
        catch{
            display.value = "Error";
        }
    }

    if(key === "Backspace"){
        display.value = display.value.slice(0,-1);
    }

    if(key === "Escape"){
        display.value = "";
    }
});
