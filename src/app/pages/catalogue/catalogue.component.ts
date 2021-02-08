import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { FailComponent } from '../snack/fail/fail.component';
import { SuccessComponent } from '../snack/success/success.component';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  inventory: Book[] = [];

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'Subscribe',
          title: 'Subscribe ',
        },
        {
          name: 'Unsubscribe',
          title: 'Unsubscribe ',
        }
      ],
    },
    columns: {
      name: {
        title: 'Name'
      },
      text: {
        title: 'Description'
      },
      price: {
        title: 'Price'
      },
      subscribed: {
        title: 'Subscribed'
      }
    },
    attr: {
      class: 'table table-bordered table-hover'
    }
  };

  constructor(private bookService: BookService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookService.getCatalogue()
      .subscribe((data) => {
        this.inventory = data;
      });
  }

  onCustom(event: { action: any; data: { id: any; }; }) {
    if (event.action == 'Subscribe') {
      this.bookService.subscribe(event.data.id)
        .subscribe(
          {
            next: res => {
              this._snackBar.openFromComponent(SuccessComponent, {
                duration: 5 * 1000
              });
              window.location.reload();
            },
            error: error => {
              this._snackBar.openFromComponent(FailComponent, {
                duration: 5 * 1000
              });
            }
          }
        );
    }

    if (event.action == 'Unsubscribe') {
      this.bookService.unsubscribe(event.data.id)
        .subscribe(
          {
            next: res => {
              this._snackBar.openFromComponent(SuccessComponent, {
                duration: 5 * 1000
              });
              window.location.reload();
            },
            error: error => {
              this._snackBar.openFromComponent(FailComponent, {
                duration: 5 * 1000
              });
            }
          }
        );
    }
  }
}
