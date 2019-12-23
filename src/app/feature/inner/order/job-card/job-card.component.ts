import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildForm();
    this.initVariables();
  }

  private initVariables() {
    const jobId = this.activatedRoute.snapshot.paramMap.get('jobId');
    this.isEditMode = jobId !== null;
  }

  private buildForm() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
