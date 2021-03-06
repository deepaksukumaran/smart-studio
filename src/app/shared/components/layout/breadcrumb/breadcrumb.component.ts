import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: BreadCrumb[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscribeEvents();
  }

  /* Lifecycle Hooks */
  ngOnInit() {
  }

  /* Private Methods */
  private subscribeEvents() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      }
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []) {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
        let label = '';
        switch (child.snapshot.data[ROUTE_DATA_BREADCRUMB]) {
          case 'orderId':
            label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
            break;
          default:
            label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
            break;
        }

        const breadcrumb: BreadCrumb = {
          label: label,
          params: child.snapshot.params,
          url: url
        };
        breadcrumbs.push(breadcrumb);
      }

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
