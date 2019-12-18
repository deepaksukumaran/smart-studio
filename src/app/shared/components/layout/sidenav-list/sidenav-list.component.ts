import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  sideMenuList: any[] = [];

  constructor() { }

  ngOnInit() {
    this.initVariables();
  }

  /* Private Methods */
  private initVariables() {
    this.sideMenuList = [
      { name: 'EMPLOYEES', icon: 'group', url: 'employee/all' },
      { name: 'CUSTOMERS', icon: 'transfer_within_a_station', url: 'customer/all' },
      { name: 'NEW ORDER', icon: 'playlist_add', url: 'order/new' },
    ];
  }
}
