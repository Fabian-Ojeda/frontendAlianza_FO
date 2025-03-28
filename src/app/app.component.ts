import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMobile = false;
  title = 'frontAlianza_FO';
  menuSelected: string = 'Clients';

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  changeMenuTitle(title: string){
    this.menuSelected=title;
  }

  closeSidenav(sidenav: any) {
    if (this.isMobile) {
      sidenav.close();
    }
  }
}
