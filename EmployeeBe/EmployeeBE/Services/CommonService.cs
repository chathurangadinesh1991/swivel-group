using EmployeeBE.CsvMappers;
using EmployeeBE.Helpers;
using EmployeeBE.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TinyCsvParser;

namespace EmployeeBE.Services
{
    public interface ICommonService
    {
        CurrencyModel GetCurrencyDetails(string country);
    }

    public class CommonService: ICommonService
    {
        private readonly AppSettings _appSettings;

        public CommonService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public CurrencyModel GetCurrencyDetails(string country)
        {
            CurrencyModel returnModel = new CurrencyModel();
            CsvCurrencyMapping csvMapper = new CsvCurrencyMapping();
            CsvParser<CsvCurrency> csvParser = new CsvParser<CsvCurrency>(new CsvParserOptions(true, ','), csvMapper);
            var result = csvParser.ReadFromFile(_appSettings.FilePath + "currency.csv", Encoding.ASCII).ToList();

            foreach (var details in result)
            {
                if (details.Result.Country == country)
                {
                    returnModel = new CurrencyModel
                    {
                        Country = details.Result.Country,
                        Type = details.Result.Type,
                        Rate = details.Result.Rate
                    };
                    break;
                }
            }

            return returnModel;
        }
    }
}
