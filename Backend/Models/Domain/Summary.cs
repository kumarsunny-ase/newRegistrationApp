using System;
namespace newRegistrationApp.Models.Domain
{
	public class Summary
	{
		public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string Industry { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public bool TermsOfServices { get; set; }
    }

}

