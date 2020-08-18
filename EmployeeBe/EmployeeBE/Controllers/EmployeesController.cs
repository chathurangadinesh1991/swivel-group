using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using EmpBE.CsvMappers;
using EmployeeBE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TinyCsvParser;

namespace EmpBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        private IEmployeesService _employeesService;

        public EmployeesController(IEmployeesService employeesService)
        {
            _employeesService = employeesService;
        }

        [HttpGet("salary_details/{empId}")] 
        public async Task<ActionResult> GetEmployeeSalaryDetails(string empId)
        {
            try
            {
                var returnModel = _employeesService.GetEmployeeSalaryDetails(empId);
                return Ok(returnModel);
            }
            catch (Exception ex)
            {
                switch (ex.Message)
                {
                    case "400":
                        return StatusCode(400,"Invalid employee number");
                    default:
                        return StatusCode(500, ex.Message);
                }               
            }           
        }
    }
}