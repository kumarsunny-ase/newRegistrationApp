﻿using System;
using newRegistrationApp.Models.Domain;

namespace newRegistrationApp.Models.DTO
{
	public class SummaryDTO
	{
        public string CompanyName { get; set; }
        public string Industry { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public bool TermsOfService { get; set; }
    }
}

