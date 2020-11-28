import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBook,
  faDoorOpen,
  faBookMedical,
  faUser,
  faShareAltSquare,
  faAngry,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { SignInService } from 'src/app/services/base/sign-in.service';

@Component({
  selector: 'app-logged-area',
  templateUrl: './logged-area.component.html',
  styleUrls: ['./logged-area.component.scss'],
})
export class LoggedAreaComponent {
  public faBook = faBook;
  public faBookMedical = faBookMedical;
  public faUser = faUser;
  public faHome = faHome;
  public faShareAltSquare = faShareAltSquare;
  public faAngry = faAngry;
  public faDoorOpen = faDoorOpen;

  constructor(private signInService: SignInService, private router: Router) {}

  logout() {
    this.signInService.logout();
    this.router.navigate(['auth/sign-in']);
  }
}
