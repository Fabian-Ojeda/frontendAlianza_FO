import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {Client} from "../../interfaces/client";
import {ClientsService} from "../../services/clients.service";
import Swal from 'sweetalert2';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-dialog-new-client',
  templateUrl: './dialog-new-client.component.html',
  styleUrl: './dialog-new-client.component.css'
})
export class DialogNewClientComponent implements OnInit {
  /**
   * Reactive form to capture client details.
   */
  clientForm!: FormGroup;

  /**
   * Constructor that initializes the component and its dependencies.
   *
   * @param dialogRef Reference to control and close the dialog.
   * @param fb The FormBuilder service to create the reactive form.
   * @param clientsService The service responsible for handling client-related API calls.
   * @param loaderService The service used to show or hide a loading indicator.
   */

  constructor(
    public dialogRef: MatDialogRef<DialogNewClientComponent>,
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private loaderService: LoaderService
  ) {
  }

  /**
   * Lifecycle hook that runs once after the component has been initialized.
   * Initializes the `clientForm` with fields and their respective validators:
   */

  ngOnInit(){
    this.clientForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, [Validators.required, Validators.min(1000000000)]],
      email: [null, [Validators.required, Validators.email]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    })
  }

  /**
   * Handles the creation of a new client when the form is submitted.
   */

  createUser(){
    if(this.clientForm.valid){
      let newClient : Client = {
        sharedKey: '',
        name: this.clientForm.controls['name'].value,
        lastName: this.clientForm.controls['lastName'].value,
        businessId: this.clientForm.controls['name'].value +" "+this.clientForm.controls['lastName'].value,
        email: this.clientForm.controls['email'].value,
        phone: this.clientForm.controls['phone'].value,
        dataStart: this.clientForm.controls['startDate'].value,
        dataFinish: this.clientForm.controls['endDate'].value
      }
      this.loaderService.show();
      this.clientsService.createClient(newClient).subscribe({
        next: (response) => {
          if(!response.error){
            Swal.fire({
              title: response.message,
              icon: "success",
              draggable: true
            }).then(() => {
              this.dialogRef.close(true);
            });
          }
          this.loaderService.hide();
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
          });
          this.loaderService.hide();
        }
      })
    }else {
      this.clientForm.markAllAsTouched();
    }
  }

}
