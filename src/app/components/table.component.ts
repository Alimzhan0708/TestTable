import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, ViewChild, inject} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { array } from '../data/array'

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class TableComponent {
    private _liveAnnouncer = inject(LiveAnnouncer);
    data = array;
    displayedColumns = ['_id', 'isActive', 'balance', 'picture', 'age', 'name', 'company', 'email', 'address', 'tags', 'favoriteFruit'];
    dataSource = new MatTableDataSource(this.data);
    searchText = new FormControl();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    defaultSearch() {
      console.log('filter');
      this.dataSource.filter = this.searchText.value;
      const filteredRows = this.dataSource.filteredData;
      console.log(filteredRows);
    }

    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
          this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
          this._liveAnnouncer.announce('Sorting cleared');
        }
      }
}