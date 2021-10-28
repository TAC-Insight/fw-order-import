# FW Order Import Utility

1) Download the fw-order-import.exe
2) Run it
3) Paste in your API key
4) Paste in the path to your CSV
5) Check the results.json file for feedback on any errors
6) Fix any errors
7) Rerun (the importer will also perform updates on any changed data)
8) Celebrate all the time you've saved!

There is a template with proper formatting in this repo. Use it for reference.

There are required fields:
- ExternalOrderID
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

