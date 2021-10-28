const fs = require("fs");
const csvtojson = require("csvtojson");
const prompt = require("prompt");
const got = require("got");

runConvert();

async function runConvert() {
  prompt.start();
  prompt.get(["apiKey", "fullPathToCSV"], async (err, input) => {
    console.log("");
    console.log("==== PARSING DATA ====");

    const ordersJson = await csvtojson().fromFile(input.fullPathToCSV);
    let ordersToPost = [];
    // loop through jsonArray and create a new object with nested objects
    ordersJson.forEach((item) => {
      ordersToPost.push({
        ExternalOrderId: item.ExternalOrderID,
        RegionName: item.RegionName,
        CustomerID: item.CustomerID,
        Direction: item.Direction,
        PayType: item.PayType,
        PONumber: item.PONumber,
        DefaultJob: item.DefaultJob,
        DeliveryLocation: item.DeliveryLocation,
        Status: item.Status,
        Description: item.Description,
        UseHaulZones: item.UseHaulZones,
        UsePOD: item.UsePOD,
        UDF1: item.UDF1,
        UDF2: item.UDF2,
        UDF3: item.UDF3,
        Latitude: item.Latitude,
        Longitude: item.Longitude,
        PricingTemplate: item.PricingTemplate,
        EntityUseCode: item.EntityUseCode,
        Address1: item.Address1,
        Address2: item.Address2,
        City: item.City,
        State: item.State,
        Zip: item.Zip,
        OrderProducts: [
          {
            ProductID: item.ProductID,
            TaxCode: item.TaxCode,
            LocationName: item.LocationName,
            YardName: item.YardName,
            UnitPrice: item.UnitPrice,
            FreightRate: item.FreightRate,
            HaulerRate: item.HaulerRate,
            FreightType: item.FreightType,
            Surcharge: item.Surcharge,
            SurchargeType: item.SurchargeType,
            OrderQuantity: item.OrderQuantity,
            ActiveDate: item.ActiveDate,
            ExpirationDate: item.ExpirationDate,
            DeliveryDate: item.DeliveryDate,
            Status: item.OrderProductStatus,
            Description: item.OrderProductDescription,
          },
        ],
      });
    });

    // console.log("");
    // console.log("==== ORDERS TO POST ====");
    // console.log("");

    // console.log(ordersToPost);

    console.log("==== API RESPONSE ====");

    let { body } = await got.post(
      "https://fwapi-staging.azurewebsites.net/v2/orders",
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": input.apiKey,
        },
        json: ordersToPost,
      }
    );

    body = JSON.parse(body);

    console.log("STATUS: " + body.Status);
    console.log("MESSAGE:" + body.Message);

    const filename = "results.json";
    fs.writeFile(filename, JSON.stringify(body, null, 2), (err) => {
      if (err) {
        console.log("DETAILED RESULTS FILE: " + err);
      }
      console.log("DETAILED RESULTS FILE: " + filename);
      console.log("");
      console.log("==== DONE ====");
      console.log("");

      require("readline")
        .createInterface(process.stdin, process.stdout)
        .question("Press [Enter] to exit...", function () {
          process.exit();
        });
    });
  });
}
