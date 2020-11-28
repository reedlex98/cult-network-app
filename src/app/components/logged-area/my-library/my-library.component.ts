import { finalize } from 'rxjs/operators';
import { UserLibraryBook } from './../../../services/dto/user-library-book';
import { MyLibraryService } from './../../../services/base/my-library.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  public userLibraryBooks: UserLibraryBook[];

  constructor(
    private myLibraryService: MyLibraryService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.ngxLoader.start();
    this.myLibraryService
      .getUserLibraryBooks()
      .pipe(
        finalize(() => {
          this.ngxLoader.stop();
        })
      )
      .subscribe((userLibraryBooks) => {
        this.userLibraryBooks = userLibraryBooks;
      });
  }
}
