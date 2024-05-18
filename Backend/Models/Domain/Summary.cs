using System;
using System.ComponentModel.DataAnnotations;

namespace newRegistrationApp.Models.Domain
{
	public class Summary
	{
		public Guid Id { get; set; }

        [Required(ErrorMessage = "Company Name is required")]
        [StringLength(50, ErrorMessage = "Company Name cannot be longer than 50 characters")]
        public string CompanyName { get; set; }

        [Required(ErrorMessage = "Industry is required")]
        [StringLength(50, ErrorMessage = "Industry cannot be longer than 50 characters")]
        public string Industry { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        [StringLength(50, ErrorMessage = "First Name cannot be longer than 50 characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "User Name is required")]
        [StringLength(50, ErrorMessage = "User Name cannot be longer than 50 characters")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 50 characters long")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [Compare("Password", ErrorMessage = "Password and Confirm Password must match")]
        public string ConfirmPassword { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "You must accept the terms of services")]
        public bool TermsOfServices { get; set; }
    }

}

