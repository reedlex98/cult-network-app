import { Component } from '@angular/core';
import { faBook, faBookMedical, faUser, faShareAltSquare, faAngry, faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logged-area',
  templateUrl: './logged-area.component.html',
  styleUrls: ['./logged-area.component.scss']
})
export class LoggedAreaComponent {
  public faBook = faBook
  public faBookMedical = faBookMedical
  public faUser = faUser
  public faHome = faHome
  public faShareAltSquare = faShareAltSquare
  public faAngry = faAngry

  constructor(){

  }

}
