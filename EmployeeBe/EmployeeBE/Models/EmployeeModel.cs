using EmployeeBE.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeBE.Models
{
    public class EmployeeModel
    {
        private CurrencyModel _currency;
        private double _salaryUSD;

        public string EmpId { get; set; }
        public string FullName { get; set; }
        public string Branch { get; set; }
        public string Country { get; set; }
        public double SalaryUSD
        {
            set
            {
                _salaryUSD = value;
            }
        }
        public CurrencyModel Currency
        {
            set
            {
                _currency = value;
            }
        }
        public string CurrencyType
        {
            get
            {
                return _currency.Type;
            }
        }
        public double Salary
        {
            get
            {
                return _currency.Rate * _salaryUSD;
            }
        }
        public double PAYETax
        {
            get
            {
                return new PAYETaxCalculator(_currency, _salaryUSD).getTaxAmount();
            }
        }
        public double NetPay
        {
            get
            {
                return (_currency.Rate * _salaryUSD) - PAYETax;
            }
        }
    }
}
