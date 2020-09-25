const synth=window.speechSynthesis;


const textform=document.querySelector('form');
const textinput=document.querySelector('#t1');
const voiceselect=document.querySelector('#s1');
const rate=document.querySelector('#r1');
const ratevalue=document.querySelector('#rate-value');
const pitch=document.querySelector('#r2');
const pitchvalue=document.querySelector('#pitch-value');


let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach((voice)=>{
        let xy=document.createElement('option');
        xy.textContent=voice.name + '('+voice.lang + ')';
        xy.setAttribute('data-lang',voice.lang);
        xy.setAttribute('data-name',voice.name);
        voiceselect.appendChild(xy);
    })
};


getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged= getVoices;
}

const speak = () => {
    
    if(synth.speaking){
        console.error('alredy spealing....');
        return;
    }
    if(textinput.value !== ''){
        document.querySelector('body').style.background='#141414 url(p.gif)';
        document.querySelector('body').style.backgroundRepeat='repeat-x';
        const speakText= new SpeechSynthesisUtterance(textinput.value);
        speakText.onend = e =>{
            console.log("done speaking .....");
            document.querySelector('body').style.background='#141414';
        }
        speakText.onerror = e =>{
            console.error('something went worng');
        }
        //selected voice

        const selectedvoice = voiceselect.selectedOptions[0].getAttribute('data-name');
        //loop

        voices.forEach((voice)=>{
            if(voice.name===selectedvoice)
            {
                speakText.voice=voice;
            }
        });
        //set picth and range
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

        synth.speak(speakText);
    }
};


//event listeners


textform.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textinput.blur();

});

rate.addEventListener('change',e => ratevalue.textContent=rate.value);

pitch.addEventListener('change',e => pitchvalue.textContent=pitch.value);

voiceselect.addEventListener('change',speak);