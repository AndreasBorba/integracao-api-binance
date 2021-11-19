const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;
const apiUrl = process.env.API_URL;

async function privateCall(path, data = {}, method = 'GET') {
    const timestamp = Date.now();

    const recvWindow = 60000;//máximo permitido, default 5000

    const signature = crypto
        .createHmac('sha256', apiSecret)
        .update(`${querystring.stringify({ ...data, timestamp, recvWindow })}`)
        .digest('hex');

    const newData = { ...data, timestamp, recvWindow, signature };
    const qs = `?${querystring.stringify(newData)}`;

    try {
        const result = await axios({
            method,
            url: `${apiUrl}${path}${qs}`,
            headers: { 'X-MBX-APIKEY': apiKey }
        });

        return result.data;

    } catch (error) {
        console.log(error);
    }
}


async function publicCall(path, data, method = 'GET') {
    try {
        // Validar se a variável DATA existir, preencher com os dados em 'qs'.
        const qs = data ? `?${querystring.stringify(data)}` : '';
        // AWAIT apenas irá retornar a chamada, apenas quando a chamada estiver concluida.
        const result = await axios({
            method,
            url: `${process.env.API_URL}${path}${qs}`
        })
        //console.log(`O horário do servidor {timestamp} é: ${result.data.serverTime}.`);
        return result.data;
    } catch (err) {
        console.log(err);
    }
}

async function accountInfo() {
    return privateCall('/v3/account');
}

async function time() {
    return publicCall('/v3/time');
}

async function newOrder(symbol, quantity, price, side = 'BUY', type = 'MARKET'){
    const data = {symbol, side, type, quantity};

    if (price) data.price = parseInt(price);
    if (type === 'LIMIT') data.timeInForce = 'GTC';

    return privateCall('/v3/order', data, 'POST');
}

async function depth(symbol = 'BNBBUSD', limit = 5) {
    return publicCall('/v3/depth', { symbol, limit });
}

// Consulta todos os pares negociados
async function exchangeInfo() {
    return publicCall('/v3/exchangeInfo');
}

// A função publicCall e privateCall será de uso interno.
// Esta função (time) retorna o horário em que o servidor esta operando, em formato timestamp.
module.exports = { time, depth, exchangeInfo, accountInfo, newOrder };