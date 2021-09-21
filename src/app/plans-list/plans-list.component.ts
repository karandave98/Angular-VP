import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanServiceService } from '../services/plan-service.service';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {

  availPlansList: any[] = [];
  availPackageList: any[] = [];

  selePlanPackageList: any[] = [];
  errorMessage: string = '';
  couponCode = '';
  showCouponCode = false;

  constructor(private planService: PlanServiceService, private router: Router) { }

  ngOnInit(): void {

    this.getPlansList();
    this.getPackageList();
  }

  getPlansList() {
    this.planService.getPlansList().subscribe((res: any) => {
      this.availPlansList = res;
    });
  }

  getPackageList() {
    this.planService.getPackageList().subscribe((res: any) => {
      this.availPackageList = res;
    });
  }


  planChange(event: any, planDet: any, isWeekly: boolean) {
    const selPlaceList = this.selePlanPackageList;
    if (event && event.target.checked) {
      const planDetails = planDet;
      planDetails.selectedAmount = isWeekly ? planDet.weeklyPlanPrice : planDet.monthlyPlanPrice;
      planDetails.isWeekly = isWeekly;
      planDetails.selPackageList = [];
      selPlaceList.push(planDetails);
    } else {
      const findInd = selPlaceList.findIndex(plan => plan.id === planDet.id);
      if (findInd >= 0) {
        selPlaceList.splice(findInd, 1);
      }
    }
    this.selePlanPackageList = selPlaceList;
    console.log(this.getSumAmount())
  }

  packageChanged(event: any, plan: any, packageDet: any) {
    if (event && event.target.checked) {
      const planDetInd = this.selePlanPackageList.findIndex(selPlan => selPlan.id === plan.id);
      if (planDetInd >= 0) {
        const selPlan = this.selePlanPackageList[planDetInd];
        selPlan.selPackageList.push(packageDet);
        if (selPlan.selPackageList.length === plan.minPakcageCount) {
          this.errorMessage = '';
        }
      }
    } else {
      const planDetInd = this.selePlanPackageList.findIndex(selPlan => selPlan.id === plan.id);
      if (planDetInd >= 0) {
        const selPlan = this.selePlanPackageList[planDetInd];
        const findInd = selPlan.selPackageList.findIndex((selPac: any) => selPac.id === packageDet.id);
        if (findInd >= 0) {
          selPlan.selPackageList.splice(findInd, 1);
        }
        if (selPlan.selPackageList.length === plan.minPakcageCount) {
          this.errorMessage = '';
        }
      }
    }
  }

  getSumAmount() {
    // return this.selePlanPackageList.reduce((acc, sel) => {return acc + sel.selectedAmount;},0);
    let total = 0;
    this.selePlanPackageList.forEach(plan => total += plan.selectedAmount);
    return total;
  }

  proccedToPayment() {
    if (this.selePlanPackageList.length > 0 && this.validatePlans()) {
      this.router.navigate(['payment-successfull']);
    } else if (this.selePlanPackageList.length <= 0) {
      this.errorMessage = 'Please Selct at lease one plan';
    }
  }

  validatePlans() {
    let flag = true;
    for (const selPlan of this.selePlanPackageList) {
      if (selPlan.selPackageList.length !== selPlan.minPakcageCount) {
        flag = false;
        this.errorMessage = 'Please Select minimum ' + selPlan.minPakcageCount + ' Pacakges';
        break;
      }
    }
    return flag;
  }

  applyCouponCode() {
    this.showCouponCode = true;
  }
}
