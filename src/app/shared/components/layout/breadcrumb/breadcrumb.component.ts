import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { ActionService } from '@shared/services/action.service';
import { Subscription } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, AfterViewChecked, OnDestroy {

  homeCrumb: Breadcrumb;
  breadcrumbs: Breadcrumb[];
  navigationEvent: Subscription;
  borrowerListEvent: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hostElement: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private actionService: ActionService) { }

  ngOnInit() {
    this.initVariable();
    this.subscribeEvents();
  }

  ngAfterViewChecked() {
    this.breadcrumbs = this.reAssignBreadcrumbValues();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.navigationEvent.unsubscribe();
    this.borrowerListEvent.unsubscribe();
  }

  /* Private Methods */
  private initVariable() {
    this.homeCrumb = {
      id: 'home',
      url: 'QAZ/qaz',
      label: 'HOME',
      collapse: false,
      hide: false
    };
  }

  private subscribeEvents() {
    this.navigationEvent = this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {

        const root: ActivatedRoute = this.route.root;
        this.breadcrumbs = this.constructBreadcrumbs(root);
        this.breadcrumbs = [this.homeCrumb, ...this.breadcrumbs];
        this.breadcrumbs = this.reAssignBreadcrumbValues();
      }
    });
  }

  private constructBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length === 0) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.constructBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // append route URL to URL
      url += `/${routeURL}`;

      // add breadcrumb
      const data = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      const breadcrumb: Breadcrumb = {
        id: '',
        url: url,
        label: '',
        collapse: false,
        hide: false
      };

      if (typeof data === 'object') {
        breadcrumb.id = data.id;
        breadcrumb.label = data.label;
        breadcrumb.hide = data.hide !== undefined ? data.hide : false;
      } else {
        breadcrumb.label = data;
      }

      if (!breadcrumb.hide) {
        breadcrumbs.push(breadcrumb);
      }

      // recursive
      return this.constructBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private reAssignBreadcrumbValues(): Breadcrumb[] {

    const crumbs = this.breadcrumbs;
    if (this.actionService.isAllNullOrEmptyObject(crumbs)) { return; }

    const element = this.hostElement.nativeElement;

    crumbs.map((crumb) => {
      // switch (crumb.id) {
      //   case 'home':
      //     crumb.label = !this.screenService.isHandset() ? PORTAL_NAME : 'LP';
      //     break;
      //   case 'loanNumber':
      //     crumb.label = !this.screenService.isHandset()
      //       ? 'Loan Number #' + this.loanService.getLoanNumber()
      //       : '#' + this.loanService.getLoanNumber();
      //     break;
      //   case 'borrowerName':
      //     const currentBorrower = this.borrowerService.getBorrower();
      //     if (!this.actionService.isNullOrEmptyObject(currentBorrower)) {
      //       crumb.label = `${this.actionService.getEmptyIfNull(currentBorrower.firstName)}
      //       ${this.actionService.getEmptyIfNull(currentBorrower.lastName)}`;
      //     }
      //     break;
      // }
      crumb.collapse = false;
    });

    let breadcrumbIndex = 0;
    element.getElementsByClassName('breadcrumb')[0].classList.remove('bc-ellipsis');
    this.changeDetectorRef.detectChanges();
    while (element.clientWidth < element.scrollWidth && breadcrumbIndex < crumbs.length) {
      if (breadcrumbIndex > 0 && breadcrumbIndex < crumbs.length - 1) {
        crumbs[breadcrumbIndex].collapse = true;
      } else if (breadcrumbIndex === crumbs.length - 1) {
        element.getElementsByClassName('breadcrumb')[0].classList.add('bc-ellipsis');
      }
      breadcrumbIndex++;
      this.changeDetectorRef.detectChanges();
    }

    return crumbs;
  }

  /* Public Methods */
  onWindowResize() {
    this.breadcrumbs = this.reAssignBreadcrumbValues();
  }
}
