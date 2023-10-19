const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing our joke to out Voice RSS API

function tellMe(joke) {
        VoiceRSS.speech({
            key: '4286ace0b9714de289553cd5a0600c31',
            src: joke,
            hl: 'en-gb',
            v: 'Alice',
            r: -1, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
    }

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //  Text-to-Speech
        tellMe(joke);
        // disable butoon
        toggleButton();
    } catch (error) {
        // catch error
        console.log('whooops!', error)
    }
}

// Event listners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);