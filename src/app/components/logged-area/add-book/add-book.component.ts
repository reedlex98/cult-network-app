import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup } from '@angular/forms';
import { AddBookService } from './../../../services/base/add-book.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  public addBookForm: FormGroup;
  public searchBookForm: FormGroup;
  public errorMessages: any;
  public searchSucceded = false;
  public registerMode: 'MANUAL' | 'AUTO' = 'AUTO';
  public isLoading = false;

  constructor(
    private addBookService: AddBookService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private ngxUiLoaderService: NgxUiLoaderService,
    private router: Router
  ) {}

  registerNewBook() {
    this.ngxUiLoaderService.start();
    this.addBookService
      .addNewBook(this.addBookForm.value)
      .pipe(
        finalize(() => {
          this.ngxUiLoaderService.stop();
        })
      )
      .subscribe(
        (res) => {
          if (res.Code !== 200) {
            this.toastr.show(res.Msg, 'Erro ao adicionar novo livro!', {
              timeOut: 2000,
            });
          } else {
            this.toastr.show(res.Msg, 'Livro adicionado com sucesso!', {
              timeOut: 2000,
            });
            this.router.navigate(['app/my-library']);
          }
        }
        // (err) => {
        //   this.toastr.show(
        //     err.error.error_description,
        //     err.error.error[0].toUpperCase() + err.error.error.slice(1),
        //     {
        //       timeOut: 2000,
        //     }
        //   );
        // }
      );
  }

  searchBookByIsbn() {
    if (this.searchBookForm.valid) {
      this.ngxUiLoaderService.start();
      this.addBookService
        .searchBookByIsbn(this.searchBookForm.get('isbn').value)
        .pipe(
          tap(() => {
            this.ngxUiLoaderService.stop();
          })
        )
        .subscribe((res) => {
          if (!res) {
            this.toastr.show(
              'Não conseguimos encontrar o livro que possui esse ISBN!',
              'Erro na busca'
            );
            return;
          }
          this.addBookForm = this.addBookService.patchSearchedBookValueToForm(
            this.searchBookForm.get('isbn').value,
            res
          );
          this.searchSucceded = true;
        });
      this.cdr.checkNoChanges();
    }
  }

  toggleRegisterMode() {
    if (this.registerMode === 'AUTO') {
      this.registerMode = 'MANUAL';
      this.addBookForm.enable();
      return;
    }
    if (this.registerMode === 'MANUAL') {
      this.registerMode = 'AUTO';
      this.addBookForm.disable();
      return;
    }
    this.addBookForm = this.addBookService.getAddBookForm();
  }

  onChange() {}

  ngOnInit() {
    this.searchBookForm = this.addBookService.getSearchBookForm();
    this.addBookForm = this.addBookService.getAddBookForm();
    this.errorMessages = this.addBookService.getErrorMessages();
    this.addBookForm.disable();
  }
}
