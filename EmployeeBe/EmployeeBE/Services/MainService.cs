using EmpBE.CsvMappers;
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
    public interface IMainService
    {
        List<EmployeeModel> GetSearchResults(string fName, string lName, string branch, string country);
    }

    public class MainService: IMainService
    {
        private readonly AppSettings _appSettings;
        private ICommonService _commonService;

        public MainService(IOptions<AppSettings> appSettings, ICommonService commonService)
        {
            _appSettings = appSettings.Value;
            _commonService = commonService;
        }

        public List<EmployeeModel> GetSearchResults(string fName, string lName, string branch, string country)
        {
            List<EmployeeModel> salaryList = new List<EmployeeModel>();
            CsvEmployeeMapping csvMapper = new CsvEmployeeMapping();
            CsvParser<CsvEmployee> csvParser = new CsvParser<CsvEmployee>(new CsvParserOptions(true, ','), csvMapper);
            var result = csvParser.ReadFromFile(_appSettings.FilePath + "employee.csv", Encoding.ASCII).ToList();


            foreach (var details in result)
            {
                salaryList.Add(new EmployeeModel
                {
                    EmpId = details.Result.EmpId,
                    FullName = details.Result.FullName,
                    Branch = details.Result.Branch,
                    Country = details.Result.Country,
                    SalaryUSD = details.Result.Salary,
                    Currency = _commonService.GetCurrencyDetails(details.Result.Country),
                });
            }
            var returnResults = from salary in salaryList
                                where
                                  ((country != null) ? salary.Country.ToLower().Trim() == country.ToLower().Trim() : true) &&
                                  ((branch != null) ? salary.Branch.ToLower().Trim() == branch.ToLower().Trim() : true) &&
                                  ((fName != null) ? salary.FullName.Split(" ")[0].ToLower().Contains(fName.ToLower().Trim()) : true) &&
                                  ((lName != null) ? salary.FullName.Split(" ")[1].ToLower().Contains(lName.ToLower().Trim()) : true)
                                select salary;

            if (returnResults.ToList().Count == 0)
            {
                throw new Exception("400");
            }

            return returnResults.ToList();
        }
    }
}
