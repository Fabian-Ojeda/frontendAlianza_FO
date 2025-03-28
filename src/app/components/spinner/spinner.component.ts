import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit, OnDestroy {
  /**
   * Indicates whether the loading spinner should be visible.
   * It is updated based on the value emitted by the `LoaderService`.
   */

  isLoading: boolean = false;
  /**
   * Subscription to the `isLoading$` observable from the `LoaderService`.
   * Used to manage updates to the `isLoading` property.
   */

  private loadingSubscription!: Subscription;

  /**
   * Constructor that injects dependencies.
   *
   * @param loaderService The service responsible for managing the loading state across the application.
   */

  constructor(private loaderService: LoaderService) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   *
   * Subscribes to the `isLoading$` observable from the `LoaderService` and updates
   * the `isLoading` property whenever a new value is emitted.
   */

  ngOnInit(): void {
    this.loadingSubscription = this.loaderService.isLoading$.subscribe((loading:boolean) => {
      this.isLoading = loading;
    })
  }

  /**
   * Lifecycle hook that is called just before the component is destroyed.
   *
   * Unsubscribes from the `isLoading$` observable to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
