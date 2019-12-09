import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToJobDetails(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

}
