﻿using System;
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

        [HttpGet("industries")]
        public IActionResult GetCompany()
        {
            var industry = _registrationDbContext.industries.ToList();
            return Ok(industry);
        }

        [HttpPost("step1")]
        public IActionResult AddCompany(IndustryDTO request)
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

        [HttpPost("step3")]
        public async Task<IActionResult> AddSummary(Summary summaryData)
        {
            //if (!summaryData.TermsOfService)
            //    return BadRequest("Terms of Service not accepted");

            try
            {
                _registrationDbContext.summaries.Add(summaryData);

                await _registrationDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to save summary data to the database.", ex);
            }

            return Ok();
        }
    }
}

