using EmpBE.CsvMappers;
using EmployeeBE.CsvMappers;
using EmployeeBE.Helpers;
using EmployeeBE.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TinyCsvParser;

namespace EmployeeBE.Services
{
    public interface IEmployeesService
    {
        EmployeeModel GetEmployeeSalaryDetails(string empId);
    }

    public class EmployeesService: IEmployeesService
    {
        private readonly AppSettings _appSettings;
        private ICommonService _commonService;

        public EmployeesService(IOptions<AppSettings> appSettings, ICommonService commonService)
        {
            _appSettings = appSettings.Value;
            _commonService = commonService;
        }

        public EmployeeModel GetEmployeeSalaryDetails(string empId)
        {
            List<EmployeeModel> salaryList = new List<EmployeeModel>();
            CsvEmployeeMapping csvMapper = new CsvEmployeeMapping();
            CsvParser<CsvEmployee> csvParser = new CsvParser<CsvEmployee>(new CsvParserOptions(true, ','), csvMapper);
            var result = csvParser.ReadFromFile(_appSettings.FilePath + "employee.csv", Encoding.ASCII).ToList();

            foreach (var details in result)
            {
                if (details.Result.EmpId == empId)
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
                    break;
                }
            }

            if (salaryList.Count == 0)
            {
                throw new Exception("400");
            }

            return salaryList[0];
        }        
    }
}
