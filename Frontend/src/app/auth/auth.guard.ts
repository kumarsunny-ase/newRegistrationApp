import { CanActivateFn, Router } from '@angular/router';
import { FormDataService } from '../services/formData/form-data.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const formDataService = inject(FormDataService);
  const router = inject(Router);

  // Check if company data is completed
  if (formDataService.formData.company) {
    return true; // Allow navigation to the user page
  } else if (formDataService.formData.user) {
    return true; // Allow navigation to the summary page
  } else {
    // Redirect to the home page if company data is not completed
    router.navigate(['/']);
    return false;
  }
};
