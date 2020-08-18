using EmployeeBE.Enumerators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeBE.Models
{
    public class CsvEmployee
    {
        public string EmpId { get; set; }
        public string FullName { get; set; }
        public Gender Gender { get; set; }
        public DateTime DOB { get; set; }
        public DateTime JoinedDate { get; set; }
        public double Salary { get; set; }
        public string Branch { get; set; }
        public string Country { get; set; }
    }
}
