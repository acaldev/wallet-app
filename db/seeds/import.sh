#! /bin/bash
mongoimport --host mongodb --db app --collection users --drop --type json --file /mongo-seed/users.json --jsonArray
mongoimport --host mongodb --db app --collection wallets --drop --type json --file /mongo-seed/wallets.json --jsonArray
mongoimport --host mongodb --db app --collection exchangerates --drop --type json --file /mongo-seed/exchangerates.json --jsonArray
