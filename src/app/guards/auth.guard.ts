import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const authStutus=inject(AdminService)
  const router=inject(Router)
  const toast=inject(ToastrService)
  if(authStutus.isLoggedIn()){
    return true;
  }
  else{
    toast.warning("Access denied. Please login")
    router.navigateByUrl('')
    return false
  }
};
