# FW Order Import Utility

![Utility Screenshot](exe.png)

## Steps to import
1) Download the [fw-order-import.exe](https://github.com/TAC-Insight/fw-order-import/raw/main/dist/fw-order-import.exe)
> You may need to tell Windows to allow/trust the file before it will download or run.
2) Get your API Key from https://portal.fast-weigh.com/APIInfo
3) Prep your CSV [(template here)](https://raw.githubusercontent.com/TAC-Insight/fw-order-import/main/OrdersTemplate.csv)
> You'll want to double/triple check your CSV. Mass imports can also mean mass cleanup if the data is wrong.
4) Run the EXE
5) Paste in your API key
6) Paste in the path to your CSV
7) Check the results.json file for feedback on any errors
8) Fix any errors
9) Rerun (the importer will also perform updates on any changed data)
10) Celebrate all the time you've saved!

## Notes

There is a [csv template with proper formatting](https://raw.githubusercontent.com/TAC-Insight/fw-order-import/main/OrdersTemplate.csv) in this repo. Use it for reference. 

Each row in the template is a product line item for an order (FW Order Product). They get grouped together and posted to the same order using the **ExternalOrderID** field as the key. Rows with the same **ExternalOrderID** will post as line items on the same order. They should share the same Order info. If they don't, the last row for any given **ExternalOrderID** will overwrite all the others.

Also remember that **fields containing commas must be wrapped in quotes**. Ex: "ACME, INC". The quotes will be stripped away in the import process. They tell the CSV parser that "ACME, INC" should be treated as the value for a single column.

## Required fields:
- ExternalOrderID (This is the key/lookup field. It's not visible in the Fast-Weigh UI. Typically it is the Order Number from the system you are migrating away from. A new ExternalOrderID will create a new Fast-Weigh Order. If a duplicate is found the API assumes you want to update the existing Order with additional products or the values within the existing Order header info.)
- RegionName
- CustomerID
- Direction (O = outbound, I = Inbound)
- PayType (C = Charge Hid $, X = Cash, S = Charge Show $, D = Credit Card, K = Check)
- Status (A = Active, I = Inactive, C = Closed)
- Description
- ProductID
- UnitPrice
- FreightRate
- HaulerRate
- FreightType (U = Unit, L = Load)
- Surcharge
- SurchargeType (U = Unit, L = Load)
- OrderProductStatus (A = Active, I = - Inactive, C = Closed)

