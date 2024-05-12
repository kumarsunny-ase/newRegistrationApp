using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using newRegistrationApp.Data;
using newRegistrationApp.Models.Domain;
using newRegistrationApp.Models.DTO;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace newRegistrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private readonly RegistrationDbContext _registrationDbContext;

        public RegistrationController(RegistrationDbContext registrationDbContext)
        {
            _registrationDbContext = registrationDbContext;
        }

        [HttpGet]
        public IActionResult GetCompany()
        {
            var companies = _registrationDbContext.Companies.ToList();
            return Ok(companies);
        }

        [HttpPost("step1")]
        public IActionResult AddCompany(AddCompanyDTO request)
        {
            var companies = new Company
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Industry = request.Industry
            };

            _registrationDbContext.Companies.Add(companies);
            _registrationDbContext.SaveChanges();

            return Ok(companies);
        }

        [HttpPost("step2")]
        public IActionResult AddUser(UserDTO request)
        {
            var users = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                FirstName = request.FirstName,
                UserName = request.UserName,
                Password = request.Password,
                Email = request.Email
            };

            _registrationDbContext.Users.Add(users);
            _registrationDbContext.SaveChanges();

            return Ok(users);
        }

        [HttpPost("step3")]
        public async Task<IActionResult> AddSummary(Summary summaryData)
        {
            //if (!summaryData.TermsOfService)
            //    return BadRequest("Terms of Service not accepted");

            try
            {
                _registrationDbContext.Companies.Add(summaryData.Company);

                _registrationDbContext.Users.Add(summaryData.User);

                await _registrationDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to save summary data to the database.", ex);
            }

            return Ok();
        }

        [HttpGet("User")]
        public IActionResult GetUser()
        {
            var users = _registrationDbContext.Users.ToList();
            return Ok(users);
        }
    }
}

