using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeBE.Models;
using EmployeeBE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private IMainService _mainService;

        public MainController(IMainService mainService)
        {
            _mainService = mainService;
        }

        [HttpGet("")]
        public async Task<ActionResult> GetServerStatus()
        {
            return Ok("Server is Running ...");
        }

        [HttpGet("search")]
        public async Task<ActionResult> GetSearchResults(string fName, string lName, string branch, string country)
        {
            try
            {
                List<EmployeeModel> returnModels = _mainService.GetSearchResults(fName, lName, branch, country);
                return Ok(returnModels);
            }
            catch (Exception ex)
            {
                switch (ex.Message)
                {
                    case "400":
                        return StatusCode(400,"Invalid search entry");
                    default:
                        return StatusCode(500, ex.Message);
                }
            }           
        }
    }
}