import { SearchBookResponse } from './../../../services/dto/search-book.response';
import { MyProfileService } from './../../../services/base/my-profile.service';
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
import { GetUserResponse } from 'src/app/services/dto/get-user.response';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { combineLatest } from 'rxjs';
import geodist from 'geodist';
@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss'],
})
export class SearchBookComponent implements OnInit {
  public searchBookForm: FormGroup;
  public userData: GetUserResponse;
  public faSearch = faSearch;
  public faWhatsapp = faWhatsapp;
  public searchResults: SearchBookResponse[] = [];
  public resultsWithCoordinates: SearchBookResponse[] = [];
  public resultsWithoutCoordinates: SearchBookResponse[] = [];
  public userList: GetUserResponse[];
  public userCoordinates: [number, number];

  constructor(
    private searchBookService: SearchBookService,
    private myProfileService: MyProfileService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onChange() {}

  ngOnInit() {
    this.myProfileService.getUserData().subscribe((user) => {
      this.userData = user;

      if (user.Latitude && user.Longitude) {
        this.userCoordinates = [
          parseFloat(user.Latitude),
          parseFloat(user.Longitude),
        ];
      }
    });
    // this.searchBookService.getUserList().subscribe((users) => {
    //   this.userList = users;
    // });
    this.searchBookForm = this.searchBookService.getSearchBookForm();
  }

  sortSearchResultByProximity(searchBookResponseArr: SearchBookResponse[]) {
    return searchBookResponseArr.sort(
      (a, b) =>
        geodist(this.userCoordinates, [
          parseFloat(a.LatitudeUsuarioLivro),
          parseFloat(a.LongitudeUsuarioLivro),
        ]) -
        geodist(this.userCoordinates, [
          parseFloat(b.LatitudeUsuarioLivro),
          parseFloat(b.LongitudeUsuarioLivro),
        ])
    );
  }

  openChat(phone) {
    this.searchBookService.openChatByPhoneNumber(phone);
  }

  async putUserNameOnSearchResults() {
    this.searchResults.forEach(async (result, i, arr) => {
      const UsuarioNome = (
        await this.searchBookService
          .getUserById(result.idUsuarioLivro)
          .toPromise()
      ).Nome;
      this.searchResults[i].UsuarioNome = UsuarioNome;
    });
  }

  searchBook() {
    this.ngxLoader.start();
    combineLatest([
      this.searchBookService.getBookByTitle(
        this.searchBookForm.get('searchTerm').value
      ),
      this.searchBookService.getBookByAuthor(
        this.searchBookForm.get('searchTerm').value
      ),
    ]).subscribe(async (res) => {
      if ((!res[0] && !res[1]) || (!res[0].length && !res[1].length)) {
        this.toastr.show(
          'Não conseguimos achar usuários que possuem o livro que você procurou.',
          'Sua pesquisa não trouxe resultados'
        );
        this.searchResults = [];
        this.resultsWithCoordinates = [];
        this.resultsWithoutCoordinates = [];
        this.ngxLoader.stop();
        return;
      }
      this.searchResults = res[0] || res[1];

      if (res[0] && res[1]) {
        res[1].forEach((value, i, arr) => {
          if (!res[0].map((item) => item.Id).includes(value.idUsuarioLivro)) {
            this.searchResults.push(value);
          }
        });
      }

      this.searchResults = this.searchResults.filter(
        (book) => book.idUsuarioLivro !== this.userData.Id && book.CelularUsuarioLivro
      );

      await this.putUserNameOnSearchResults();

      this.resultsWithCoordinates = this.searchResults.filter(
        (book) => book.LatitudeUsuarioLivro && book.LongitudeUsuarioLivro
      );

      if (this.userCoordinates) {
        this.resultsWithCoordinates = this.sortSearchResultByProximity(
          this.resultsWithCoordinates
        ).map((result) => ({
          ...result,
          Distancia: geodist(
            this.userCoordinates,
            [result.LatitudeUsuarioLivro, result.LongitudeUsuarioLivro],
            { unit: 'km' }
          ),
        }));

        if (this.searchBookForm.get('maxDistance').value) {
          this.resultsWithCoordinates = this.resultsWithCoordinates.filter(
            (result) =>
              result.Distancia <= this.searchBookForm.get('maxDistance').value
          );
        }
      }

      this.resultsWithoutCoordinates = this.searchResults.filter(
        (book) => !(book.LatitudeUsuarioLivro && book.LongitudeUsuarioLivro)
      );

      this.ngxLoader.stop();
    });
  }
}
