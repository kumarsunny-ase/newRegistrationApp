using System;
using newRegistrationApp.Models.Domain;

namespace newRegistrationApp.Models.DTO
{
	public class SummaryDTO
	{
        public Company Company { get; set; }
        public User User { get; set; }
        public bool TermsOfService { get; set; }
    }
}

