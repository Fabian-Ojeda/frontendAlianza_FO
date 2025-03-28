import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from "../../interfaces/client";
import {MatPaginator} from "@angular/material/paginator";
import {ClientsService} from "../../services/clients.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoaderService} from "../../services/loader.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrl: './table-clients.component.css'
})
export class TableClientsComponent implements AfterViewInit{
  /**
   * Input property to trigger data fetching externally.
   * If the input value is greater than 0, the `readAllClients` method is called to fetch all clients.
   */

  @Input() set readData(value: number) {
    if(value>0){
      this.readAllClients();
    }
  }
  /**
   * Reactive form for handling client search by shared key.
   */

  formSearch!: FormGroup ;
  /**
   * Columns to be displayed in the Angular Material table.
   */

  displayedColumns: string[] = ['sharedKey', 'businessId', 'email', 'phone', 'dataAdded', 'edit'];

  /**
   * Data source for the Angular Material table, initialized with an empty array.
   */

  dataSource = new MatTableDataSource<Client>([]);

  /**
   * Reference to Angular Material's paginator for managing table pagination.
   */

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Constructor to inject the required services.
   *
   * @param clientsService Service responsible for fetching client data from the backend.
   * @param loaderService Service used to handle loading indicators during asynchronous operations.
   */

  constructor(
    private clientsService: ClientsService,
    private loaderService: LoaderService
  ) {
    this.initForm();
    this.readAllClients();
  }

  /**
   * Initializes the reactive form used for searching clients by shared key.
   */

  private initForm() {
    this.formSearch = new FormGroup({
      sharedKey: new FormControl('', Validators.required),
    })
  }

  /**
   * Angular lifecycle hook that triggers after the component's view has been initialized.
   */

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Fetches and populates the table with all the client data.
   *
   * Uses `LoaderService` to show a loading indicator while fetching data. Displays an error
   * message using SweetAlert2 in case the backend request fails.
   */
  readAllClients(){
    this.loaderService.show();
    this.clientsService.getAllClients().subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource<Client>(data);
        this.dataSource.paginator = this.paginator;
        this.loaderService.hide();
      },
      error: error => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
        this.loaderService.hide();
      }
    })
  }

  /**
   * Searches for clients by their shared key.
   *
   * If the form is valid, this method fetches clients matching the provided shared key.
   * It updates the table's data source with matching results or displays an error
   * if no information is available or the request fails.
   *
   * If the form is invalid, it marks all controls as touched to show validation errors.
   */
  searchClientBySharedKey() {
    if (this.formSearch.valid) {
      this.loaderService.show();
      this.clientsService.searchClientsBySharedKey(this.formSearch.controls["sharedKey"].value).subscribe({
        next: (data) => {
          if(data.length>0) {
            this.dataSource = new MatTableDataSource<Client>(data);
            this.dataSource.paginator = this.paginator;
          }else{
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No information available",
            });
          }
          this.loaderService.hide();
        },
        error: error => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
          this.loaderService.hide();
        }
      });
    } else {
      this.formSearch.markAllAsTouched();
    }
  }
}
