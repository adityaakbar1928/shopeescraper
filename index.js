import fs from 'fs';
import { Console, time } from 'console';
import { parse } from 'path';
import request from 'request';
import config from './config.js';
import fsx from 'fs-extra';
import chalk from 'chalk';
import fetch from 'node-fetch';
import { exit } from 'process';

const biru = chalk.blue;
const kuning = chalk.yellow;
const merah = chalk.red;
const hijau = chalk.green;

try {
    const createFile = fs.appendFileSync('data.csv', 'Item_Id,Product_Name,Stock,Price\r\n');
} catch (error) {
    console.log(merah("CSV Files still running, cant edit. Please close it first"))
    exit();
}
const api_url = `https://shopee.co.id/api/v4/recommend/recommend?bundle=shop_page_product_tab_main&limit=999&offset=0&section=shop_page_product_tab_main_sec&shopid\=${config.seller_id}`;

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

function scrapeShopee(callback){
    const settings = {
        url: api_url,
        headers: {
            'Accept': `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36`,
            'content-type': 'application/json',
            'content-encoding': 'gzip'
        }
    }
    
    request.get(settings, (error, response, body) => {
        if(!error && response.statusCode == 200){
            try {
                const result = JSON.parse(body);
                const oke = result.data;
                const oke1 = oke.sections;
                const oke2 = oke1[0];
                const oke3 = oke2.data;
                const oke4 = oke3.item;
                callback(oke4);
            } catch (error) {
                console.log(error)
            }
        }
    });
};


scrapeShopee(function(oke4){
    let mq = 0;
    let mk = config.maximum_scrape;
    while(mq <= mk){
        mq++;
        const oke5 = oke4[mq];
        const itemsid = oke5.itemid;
        const namapd = oke5.name;
        const namapd_wospace = oke5.name.toString().replace(/\s/g, '');
        const stock = oke5.stock;
        let price = oke5.price * 0.000010;
        const image_url = oke5.images;
        const images_url = image_url.toString().split(',')
        let desc_url = `https://shopee.co.id/api/v2/item/get\?itemid\=${itemsid}\&shopid\=${config.seller_id}`;
        let konfig2 = {
            method: "Get",
            headers: {
                'Accept': `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36`,
                'content-type': 'application/json',
                'content-encoding': 'gzip'
            },
        };
        fetch(desc_url, konfig2)
            .then(resdesc => resdesc.json())
            .then((json) => {
                try {
                    const dek = json.item.description;
                    const createDir = `./${namapd_wospace}`;
                    fsx.ensureDir(createDir);
                    for(var a in images_url){
                        var exist = images_url[a]
                        const imgur = `https://cf.shopee.co.id/file/${exist}`;
                        download(imgur, `./${namapd_wospace}/image${exist}.jpg`, function(){
                        //console.log(kuning(`product image downloaded!!`));
                        });
                    }
                    const tulis = fs.createWriteStream(`./${namapd_wospace}/product_information.txt`, {
                        flags: 'a'
                    });
                    tulis.write(`Product Name: ${namapd}\n`)
                    tulis.write(`Price: Rp.${price}\n`);
                    tulis.write(`Stock: ${stock}\n`);
                    tulis.write(`Description: \n${dek}\n`);
                    console.log(kuning(`Getting Info for: ${namapd}`))
                    console.log(kuning(`Get product information [Name, Price, Stock, Description, Image]....`))
                } catch (error) {
                    console.log(merah("It seems shopee blocked your IP address to access API, try using vpn"))
                    exit();
                }
            fs.appendFileSync('data.csv', "\""+ itemsid + "\"" + "," + namapd + "," + "\""+ stock + "\"" + "," + price);
            fs.appendFileSync('data.csv', '\r\n');
            console.log(hijau("Sucess!"))
            console.log(hijau("================================================"))
            sleep(1000, function() {
                //do nothing
             });
            });
    };
    //console.log(hijau("All Process is done!"))
});