using System;
using System.ComponentModel.DataAnnotations;

namespace newRegistrationApp.Models.Domain
{
	public class Industry
	{
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Industry Name is required")]
        [StringLength(50, ErrorMessage = "Industry Name cannot be longer than 50 characters")]
        public string IndustryName { get; set; }
    }
}

