import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UserLibraryBook } from '../../../services/dto/user-library-book';
import { MyLibraryService } from '../../../services/base/my-library.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SearchBookService } from 'src/app/services/base/search-book.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss'],
})
export class SearchBookComponent implements OnInit {
  public userLibraryBooks: UserLibraryBook[];
  public faTrash = faTrash;
  public searchBookForm: FormGroup;

  constructor(
    private searchBookService: SearchBookService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onChange() {}

  ngOnInit() {
    this.searchBookForm = this.searchBookService.getSearchBookForm();
  }
}
