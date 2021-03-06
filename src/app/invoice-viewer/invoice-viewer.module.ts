import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { MomentModule } from 'angular2-moment';
import { CreditCardDirectivesModule } from 'angular-cc-library';

import { InvoiceService } from '../services';

import { InvoiceViewerRoutingModule } from './invoice-viewer-routing.module';
import { ViewerComponent } from './viewer/viewer.component';
import { PaymentWizardComponent } from './payment-wizard/payment-wizard.component';
import { ContactFormComponent } from './payment-wizard/contact-form/contact-form.component';
import { CardFormComponent } from './payment-wizard/card-form/card-form.component';
import { OtpFormComponent } from './payment-wizard/otp-form/otp-form.component';
import { SummaryComponent } from './payment-wizard/summary/summary.component';
import { SuccessComponent } from './payment-wizard/success/success.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule,
    CreditCardDirectivesModule,
    SharedModule,
    InvoiceViewerRoutingModule
  ],
  declarations: [
    ViewerComponent, 
    PaymentWizardComponent, 
    ContactFormComponent, 
    CardFormComponent, 
    OtpFormComponent, 
    SummaryComponent, SuccessComponent
  ],
  providers: [Title, InvoiceService]
})
export class InvoiceViewerModule { }
