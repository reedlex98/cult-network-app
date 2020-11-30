import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UserLibraryBook } from './../../../services/dto/user-library-book';
import { MyLibraryService } from './../../../services/base/my-library.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { pid } from 'process';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  public userLibraryBooks: UserLibraryBook[];
  public faTrash = faTrash;

  constructor(
    private myLibraryService: MyLibraryService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  deleteBook(id: string) {
    this.myLibraryService.deleteBook(id).subscribe((res) => {
      this.userLibraryBooks = this.userLibraryBooks.filter(
        (book) => book.Id !== id
      );
      this.toastr.show(res, 'Livro excluído com sucesso!', {
        timeOut: 2000,
      });
      this.redirectToAddBook();
    });
  }

  redirectToAddBook() {
    if (!this.userLibraryBooks.length) {
      this.toastr.show(
        'Adicione um novo livro',
        'Você ainda não possui livros em sua biblioteca',
        {
          timeOut: 2000,
        }
      );
      this.router.navigate(['app/add-book']);
    }
  }

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
        this.redirectToAddBook();
      });
  }
}
