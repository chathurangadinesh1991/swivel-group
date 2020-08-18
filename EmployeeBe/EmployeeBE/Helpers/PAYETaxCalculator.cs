using EmployeeBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeBE.Helpers
{
    public class PAYETaxCalculator
    {
        private CurrencyModel currency;
        private double salary;

        public PAYETaxCalculator(CurrencyModel currency, double salaryUSD)
        {
            this.currency = currency;
            this.salary = (salaryUSD * currency.Rate);
        }

        public double getTaxAmount()
        {
            double taxAmount;

            if (salary == 0)
            {
                //Error
                return 0;
            }

            if (currency.Country == "Sri Lanka")
            {
                if (salary < 100000)
                {
                    taxAmount = salary * 0/100;
                }
                else if (salary >= 100000 && salary <= 0 - 249999.99)
                {
                    taxAmount = salary * 5/100;
                }
                else
                {
                    taxAmount = salary * 10/100;
                }
            }
            else if (currency.Country == "India")
            {
                if (salary < 100000)
                {
                    taxAmount = salary * 0/100;
                }
                else if (salary >= 100000 && salary <= 0 - 299999.99)
                {
                    taxAmount = salary * 4/100;
                }
                else
                {
                    taxAmount = salary * 7/100;
                }
            }
            else if(currency.Country == "Pakistan")
            {
                if (salary < 500000)
                {
                    taxAmount = salary * 0.5/100;
                }
                else
                {
                    taxAmount = salary * 4/100;
                }
            }
            else if(currency.Country == "Bangladesh")
            {
                taxAmount = 0;
            }
            else
            {
                //Error Wrong Country
                taxAmount = 0;
            }

            return taxAmount;
        }
    }
}
