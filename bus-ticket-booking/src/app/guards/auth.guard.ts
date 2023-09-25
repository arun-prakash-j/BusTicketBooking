import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // if (this.firebaseService.isAuthenticated()) {
    //   return true;
    // } else {
    //   this.router.navigate([]);
    //   return false;
    // }
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/customer-login']);
    }
    return isLoggedIn;
  }
}
