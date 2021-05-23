import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';

export interface AccountDetails {
  accountNumber: string;
  availableCash: number;
  todaysChangePercentage: number;
  todaysChangeValue: number;
  todaysChange: string;
}

const DEFAULT_ROWS_DISPLAY = 3;

const ELEMENT_DATA: AccountDetails[] = [
  {
    accountNumber: 'AAA - 0029',
    availableCash: 39160334.42,
    todaysChangePercentage: 0.07,
    todaysChangeValue: 31435.87,
    todaysChange: 'negative',
  },
  {
    accountNumber: 'IRA - 0146',
    availableCash: 15884302.39,
    todaysChangePercentage: 0.03,
    todaysChangeValue: 7430.83,
    todaysChange: 'positive',
  },
  {
    accountNumber: 'AAA -1812',
    availableCash: 20110926.1,
    todaysChangePercentage: 0.21,
    todaysChangeValue: 3881.63,
    todaysChange: 'positive',
  },
  {
    accountNumber: 'REG - 2019',
    availableCash: 13465679.34,
    todaysChangePercentage: 0.0,
    todaysChangeValue: 0.0,
    todaysChange: 'none',
  },
  {
    accountNumber: 'AAA - 3810',
    availableCash: 10050054.07,
    todaysChangePercentage: 0.07,
    todaysChangeValue: 8196.69,
    todaysChange: 'positive',
  },
  {
    accountNumber: 'IRA - 5200',
    availableCash: 5763.36,
    todaysChangePercentage: 0.08,
    todaysChangeValue: 8916.69,
    todaysChange: 'negative',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isShowMore = true;
  displayedColumns: string[] = ['accountNumber', 'availableCash'];
  dataSource = [...ELEMENT_DATA].slice(0, DEFAULT_ROWS_DISPLAY);

  // tslint:disable-next-line: typedef
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // tslint:disable-next-line: typedef
  accountNumberSortChange(sort: Sort) {
    const sliceLength = this.isShowMore
      ? DEFAULT_ROWS_DISPLAY
      : ELEMENT_DATA.length;
    const initialData = [...ELEMENT_DATA];

    if (sort.direction === '') {
      return initialData.slice(0, sliceLength);
    }

    this.dataSource = initialData
      .sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'accountNumber':
            return this.compare(
              Number(a.accountNumber.split('-')[1]),
              Number(b.accountNumber.split('-')[1]),
              isAsc
            );
          case 'availableCash':
            return this.compare(a.availableCash, b.availableCash, isAsc);
          default:
            return 0;
        }
      })
      .slice(0, sliceLength);
  }

  // tslint:disable-next-line: typedef
  showAll() {
    this.isShowMore = false;
    this.dataSource = [...ELEMENT_DATA];
  }
}
