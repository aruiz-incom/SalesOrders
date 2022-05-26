const { soap } = require("strong-soap");
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const access = {
  user: "ARUIZ",
  psw: "Incom#724!",
};

export default function handler(req, res) {
  const url = "./wsdl/ManageSalesOrderIn.wsdl";
  const timeStamp = dayjs().utc().format();
  const requestArgs = {
    SalesOrderBundleMaintainRequest_sync: {
      BasicMessageHeader: {},
      SalesOrder: {
        $attributes: { actionCode: "01" },
        BusinessTransactionDocumentReference: {
          $attributes: { actionCode: "01" },
          BusinessTransactionDocumentReference: {
            ID: "81",
            TypeCode: "764",
          },
          BusinessTransactionDocumentRelationshipRoleCode: 1,
          DataProviderIndicator: true,
        },
        SalesUnitParty: {
          $attributes: { actionCode: "04" },
          PartyID: "101024",
        },
        SalesAndServiceBusinessArea: {
          $attributes: { actionCode: "04" },
          DistributionChannelCode: "Z4",
        },
        EmployeeResponsibleParty: {
          $attributes: { actionCode: "04" },
          PartyID: "1000",
        },
        AccountParty: {
          $attributes: { actionCode: "04" },
          PartyID: "MOSTRADOR",
        },
        PricingTerms: {
          $attributes: { actionCode: "04" },
          CurrencyCode: "MXN",
          PriceDateTime: {
            $attributes: { timeZoneCode: "UTC" },
            $value: timeStamp,
          },
          GrossAmountIndicator: false,
        },
        Item: [
          {
            $attributes: { actionCode: "04" },
            ID: "10",
            ReleaseToExecute: false,
            ItemProduct: {
              $attributes: { actionCode: "04" },
              ProductInternalID: "2178S",
            },
            ItemScheduleLine: {
              $attributes: { actionCode: "04" },
              ID: "1",
              TypeCode: "1",
              Quantity: 2.0,
            },
          },
          {
            $attributes: { actionCode: "04" },
            ID: "20",
            ReleaseToExecute: false,
            ItemProduct: {
              $attributes: { actionCode: "04" },
              ProductInternalID: "100",
            },
            ItemScheduleLine: {
              $attributes: { actionCode: "04" },
              ID: "1",
              TypeCode: "1",
              Quantity: 3.0,
            },
          },
        ],
      },
    },
  };
  soap.createClient(url, {}, (err, client) => {
    let method = client["MaintainBundle"];
    client.setSecurity(new soap.BasicAuthSecurity(access.user, access.psw));
    method(requestArgs, function (err, result, envelope, soapHeader) {
      res.send(JSON.stringify(result));
    });
  });
}
