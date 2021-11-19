const api = require('./api');

setInterval(async () => {
   
    /*
    // Imprime o resultado da ordem de compra/venda
    //console.log(await api.depth());
    const result = await api.depth();
    console.log(`Ordem de compra mais alta: ${parseInt(result.bids[0][0])}`);
    console.log(`Ordem de venda mais baixa: ${parseInt(result.asks[0][0])} \n`);
    */

    //console.log(await api.exchangeInfo());
    //console.log(await api.accountInfo());

    //const account = await api.accountInfo();

    //const wallet  = account.balances.filter(b => b.asset === 'BNB' || b.asset === 'BUSD');

    //console.log(wallet);

    //console.log(await api.accountInfo());

    console.log(await api.depth());

    //const orderBook = await api.depth();
    
}, process.env.CRAWLER_INTERVAL);