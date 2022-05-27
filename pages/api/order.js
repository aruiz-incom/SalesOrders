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
        ProductRecipientParty: {
          $attributes: { actionCode: "04" },
          PartyID: "MOSTRADOR",
          Address: {
            CorrespondenceLanguageCode: "ES",
            Email: {
              URI: "aruiz@it4u.com.mx",
              DefaultIndicator: true,
            },
            Telephone: {
              Number: {
                SubscriberID: "5577641945",
                CountryCode: "MX",
              },
              DefaultConventionalPhoneNumberIndicator: false,
              DefaultMobilePhoneNumberIndicator: true,
              MobilePhoneNumberIndicator: true,
            },
            DisplayName: {
              FormattedName: {
                $attributes: { languageCode: "ES" },
                $value: "Cliente Alexis Ruiz Santiago",
              },
            },
            Name: {
              Name: {
                FirstLineName: "Cecilio Robelo 373",
                SecondLineName: "Jardpin Balbuena",
                ThirdLineName: "Venustiano Carranza, Ciudad de México",
                FourthLineName: "15900",
              },
            },
            PostalAddress: {
              CountryCode: "MX",
              RegionCode: "DF",
              CityName: "CIUDAD DE MEXICO",
              DistrictName: "Jardín Balbuena",
              StreetPostalCode: "15900",
              StreetName: "Cecilio Robelo",
              HouseID: "373",
              CareOfName: "Alexis Ruiz",
            },
          },
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
              ProductInternalID: "302",
            },
            ItemScheduleLine: {
              $attributes: { actionCode: "04" },
              ID: "1",
              TypeCode: "1",
              Quantity: 3.0,
            },
            PriceAndTaxCalculationItem: {
              $attributes: { actionCode: "04" },
              ItemMainPrice: {
                $attributes: { actionCode: "04" },
                Rate: {
                  DecimalValue: 5,
                  CurrencyCode: "MXN",
                  BaseDecimalValue: 1.0,
                  BaseMeasureUnitCode: "ZPZ",
                },
              },
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
