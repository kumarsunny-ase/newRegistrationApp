using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newRegistrationApp.Data;
using newRegistrationApp.Models.Domain;
using newRegistrationApp.Models.DTO;


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

        /// <summary>
        /// Retrieves a list of industries.
        /// </summary>
        /// <remarks>
        /// This endpoint allows users to fetch the list of industries available in the database.
        /// </remarks>
        /// <returns>The list of industries.</returns>
        [HttpGet("industries")]
        public async Task<IActionResult> GetIndustries()
        {
            try
            {
                var industry = await _registrationDbContext.industries.ToListAsync();
                return Ok(industry);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching industries.", ex);
            }
            
        }

        /// <summary>
        /// Checks if a username is already taken.
        /// </summary>
        /// <remarks>
        /// This endpoint allows users to check if a username is already registered in the database.
        /// </remarks>
        /// <param name="username">The username to check.</param>
        /// <returns>True if the username is already taken, false otherwise.</returns>
        [HttpGet("userName")]
        public async Task<IActionResult> CheckUserName(string username)
        {
            try
            {
                var isTaken = await _registrationDbContext.summaries.AnyAsync(u => u.UserName == username);
                return Ok(isTaken);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while checking username availability.", ex);
            }
            
        }

        /// <summary>
        /// Adds a new industry to the database.
        /// </summary>
        /// <remarks>
        /// This endpoint allows users to add a new industry by providing the industry name.
        /// </remarks>
        /// <param name="request">An <see cref="IndustryDTO"/> object containing the industry name.</param>
        /// <returns>The newly added industry.</returns>
        [HttpPost("save")]
        public async Task<IActionResult> AddIndustry(IndustryDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var industry = new Industry
                {
                    Id = Guid.NewGuid(),
                    IndustryName = request.IndustryName
                };

                _registrationDbContext.industries.Add(industry);

                await _registrationDbContext.SaveChangesAsync();

                return Ok(industry);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while saving industry.", ex);
            }
            
        }

        /// <summary>
        /// Adds a new user summary to the database.
        /// </summary>
        /// <remarks>
        /// This endpoint allows users to add their summary information, such as name and other relevant details.
        /// </remarks>
        /// <param name="summaryData">A <see cref="Summary"/> object containing the user's summary data.</param>
        /// <returns>A success message indicating the user data has been saved.</returns>
        [HttpPost("summary")]
        public async Task<IActionResult> AddSummary(Summary summaryData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _registrationDbContext.summaries.Add(summaryData);

                await _registrationDbContext.SaveChangesAsync();

                return Ok(new { message = "User data saved successfully" });
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to save user data to the database.", ex);
            }
        }
    }
}

