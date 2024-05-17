using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("industries")]
        public IActionResult GetCompany()
        {
            var industry = _registrationDbContext.industries.ToList();
            return Ok(industry);
        }

        [HttpGet("userName")]
        public async Task<IActionResult> CheckUserName(string username)
        {
            var isTaken = await _registrationDbContext.summaries.AnyAsync(u => u.UserName == username);
            return Ok(isTaken);
        }

        [HttpPost("save")]
        public IActionResult AddIndustry(IndustryDTO request)
        {
            var industry = new Industry
            {
                Id = Guid.NewGuid(),
                IndustryName = request.IndustryName
            };

            _registrationDbContext.industries.Add(industry);
            
            _registrationDbContext.SaveChanges();

            return Ok(industry);
        }

        [HttpPost("summary")]
        public async Task<IActionResult> AddSummary(Summary summaryData)
        {

            try
            {
                _registrationDbContext.summaries.Add(summaryData);

                await _registrationDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to save user data to the database.", ex);
            }

            return Ok(new { message = "User data saved successfully" });
        }
    }
}

