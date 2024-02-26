# Shopee Products Scrapper
Scrape shopee products informations, including [Product Name, Price, Stock, Product Description, Product Images]

# How To Use
1. Install NodeJS, link: https://nodejs.org/dist/v16.15.1/node-v16.15.1-x64.msi
2. Extract script to folder
3. open config.js with text editor (eg. notepad), and enter shopee seller id and put the maximum scrape to whatever you like.

    3.a for example, if you put 10 in maximum scrape, the tools will scrape 10 products.
    
    3.b recommended to put 50 - 100 products / day otherwise, shopee will ban your ip address from accessing their APIs.
4. hold shift+right click mouse and select "open command prompt here"
5. type "npm install" without quote
6. after completed, type node index.js to run the tools
7. shopee product informations [including name, price, stock, descriptions, and product images] will be added inside the folder named with the title of the products

# How to get shopee seller id?

- search the product from your target seller store on shopee
    - eg, https://shopee.co.id/HANASUI-LIPTIN-i.14881876.16324661639?sp_atk=18fa954b-ef4b-4b1c-95b7-fd804ab78195&xptdk=18fa954b-ef4b-4b1c-95b7-fd804ab78195
- check the url, as you can see, from my url, i can see the seller id is 16324661639 while the 14881876 is item id

# What if i get banned from accessing shopee API ?
if you get banned, dont worry, you only get banned from accessing APIs only, not banned to accessing shopee.
what you need to do when you get that message?
you can use vpn to continue scraping or just wait 10-30 minutes, and you can continue again without using VPN.

# Footer
This scripts is open source, feel free to edit and add the features.
but please include the credits

# Thanks to:
Paulodarosa (https://github.com/paulodarosa) for shopee API

https://patorjk.com/ - for ASCII art generator

stackoverflow
