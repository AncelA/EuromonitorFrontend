import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { FailComponent } from '../snack/fail/fail.component';
import { SuccessComponent } from '../snack/success/success.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  inventory: Book[] = [];

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
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
      }
    },
    attr: {
      class: 'table table-bordered table-hover'
    }
  };

  constructor(private bookService: BookService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bookService.getSubscriptions()
      .subscribe((data) => {
        this.inventory = data;
      });
  }

  onCustom(event: { action: any; data: { id: any; }; }) {
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
