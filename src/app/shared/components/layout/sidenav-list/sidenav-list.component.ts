import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  sideMenuList: any[] = [];

  constructor(private router: Router) { }

  /* Lifecycle Hooks */
  ngOnInit() {
    this.initVariables();
  }

  /* Private Methods */
  private initVariables() {
    this.sideMenuList = [
      { name: 'EMPLOYEES', icon: 'group', url: 'employee/all' },
      { name: 'CUSTOMERS', icon: 'transfer_within_a_station', url: 'customer/all' },
      { name: 'ORDERS', icon: 'playlist_add', url: 'order/all' },
    ];
  }

  /* Public Methods */
  isModuleSelected(menu) {
    const moduleName = menu.url.split('/')[0];
    return this.router.url.includes(moduleName);
  }
}
