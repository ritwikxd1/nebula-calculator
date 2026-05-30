const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

function playClick() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "triangle";
    osc.frequency.value = 800;

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.05
    );

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        playClick();

        const value = button.textContent.trim();

        if(value === "C"){
            display.value = "";
            return;
        }

        if(value === "⌫"){
            display.value =
            display.value.slice(0,-1);
            return;
        }

        if(value === "="){

            try{
                const expression =
                display.value
                .replace(/×/g,"*")
                .replace(/−/g,"-");

                display.value =
                Function(
                    "return " + expression
                )();

            }catch{
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

    if(key === "Backspace"){
        display.value =
        display.value.slice(0,-1);
    }

    if(key === "Escape"){
        display.value = "";
    }

    if(key === "Enter"){

        try{

            const expression =
            display.value
            .replace(/×/g,"*")
            .replace(/−/g,"-");

            display.value =
            Function(
                "return " + expression
            )();

        }catch{
            display.value = "Error";
        }
    }
});
