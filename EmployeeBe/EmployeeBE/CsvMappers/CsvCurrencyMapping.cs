using EmployeeBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinyCsvParser.Mapping;

namespace EmployeeBE.CsvMappers
{
    public class CsvCurrencyMapping : CsvMapping<CsvCurrency>
    {
        public CsvCurrencyMapping()
        {
            MapProperty(0, x => x.Country);
            MapProperty(1, x => x.Type);
            MapProperty(2, x => x.Rate);
        }
    }
}
