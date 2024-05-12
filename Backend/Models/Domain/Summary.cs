using System;
namespace newRegistrationApp.Models.Domain
{
	public class Summary
	{
		public Guid Id { get; set; }
		public Company Company { get; set; }
		public User User { get; set; }
        public bool TermsOfService { get; set; }
    }
}

