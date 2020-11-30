import { Component, OnInit } from '@angular/core';
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
import { SearchBookService } from 'src/app/services/base/search-book.service';
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
  public isMenuCollapsed = true;

  constructor(
    private signInService: SignInService,
    private router: Router,
    private searchBookService: SearchBookService
  ) {}

  logout() {
    this.signInService.logout();
    this.router.navigate(['auth/sign-in']);
  }

  collapseMenu() {
    this.isMenuCollapsed = true;
    // setTimeout(() => {
    // }, 100);
  }

  expandMenu() {
    this.isMenuCollapsed = false;
  }
}
