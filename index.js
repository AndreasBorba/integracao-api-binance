const { parse } = require('dotenv');
const api = require('./api');

setInterval(async () => {
   
    /*
    // Imprime o resultado da ordem de compra/venda
    
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

    const resultado  = await api.depth();
    const bookSell = parseInt(resultado.asks[0][0]);
    console.log("Realizando a compra de BND");
    console.log("Consultando...")
    console.log("Informações sobre a carteira");
    const account = await api.accountInfo();
    const wallet  = account.balances.filter(b => b.asset === 'BNB' || b.asset === 'BUSD');
    console.log(wallet);
    const walletDollar = parseInt(account.balances.find(b => b.asset === 'BUSD').free);

    if (walletDollar > bookSell){
        console.log('Você pode comprar!')
        console.log(`Saldo disponível em carteira: ${walletDollar} \nValor de compra BNB: $ ${bookSell}`);
        console.log("Realizando ordem")
        const sellOrder = await api.newOrder(process.env.SYMBOL, 1, bookSell * process.env.PROFITABILITY, 'SELL', 'LIMIT' );
        console.log(sellOrder);
        
    }else{
        console.log("Não possível realizar a comprar!");
        console.log(`Saldo disponível em carteira: ${walletDollar} \nValor de compra BNB: $ ${bookSell}`);
    }





    //const orderBook = await api.depth();
    
}, process.env.CRAWLER_INTERVAL);