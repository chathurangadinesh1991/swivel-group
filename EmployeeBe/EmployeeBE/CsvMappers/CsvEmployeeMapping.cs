using EmployeeBE.Enumerators;
using EmployeeBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinyCsvParser.Mapping;
using TinyCsvParser.TypeConverter;

namespace EmpBE.CsvMappers
{
    public class CsvEmployeeMapping : CsvMapping<CsvEmployee>
    {
        public CsvEmployeeMapping()
        {
            MapProperty(0, x => x.EmpId);
            MapProperty(1, x => x.FullName);
            MapProperty(2, x => x.Gender, new EnumConverter<Gender>());
            MapProperty(3, x => x.DOB);
            MapProperty(4, x => x.JoinedDate);
            MapProperty(5, x => x.Salary);
            MapProperty(6, x => x.Branch);
            MapProperty(7, x => x.Country);
        }
    }
}
