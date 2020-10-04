# Stock Management
Api for stock management, done in NodeJS + MongoDB.

## How it works

![Class diagram](https://raw.githubusercontent.com/nathangngencissk/stock-management/master/diagram.png)

There are 2 main features.

`/api/warehouse/create_movement` for creating a new movement of products, that may be an entrance or exit.

example payload:
```json
{
	"type": "NOTA_FISCAL_ENTRADA",
	"shop": "5f750f9d6b26310012eaea14",
	"warehouse": "5f77ac24b7c512002e0f1cf9",
	"product": "5f77aae8b7c512002e0f1cf6",
	"supplier": "5f77aa60b7c512002e0f1cf5",
	"value": 200,
	"quantity": 100
}
```

The process that follow is. Create a new document -> Create an order with this document -> Check order in stock -> Update stock information.

`/api/shop/5f750f9d6b26310012eaea14` for checking the products in stock by warehouse for the shop with id `5f750f9d6b26310012eaea14`.

example response:
```json
{
  "5f77ac24b7c512002e0f1cf9": [
    {
      "productId": "5f77aae8b7c512002e0f1cf6",
      "productName": "Cookie",
      "productMeasuringUnit": "grams",
      "quantity": 500,
      "totalValue": 450,
      "averageCost": 0.9
    }
  ]
}
```

(totalValue and averageCost will only be shown if the warehouse belongs to the same owner as the store)

## How to run
`docker-compose up`
