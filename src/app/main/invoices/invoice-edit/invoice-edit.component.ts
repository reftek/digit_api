import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, SessionService, InvoiceService } from '../../../services';
import { InvoiceUtils } from './invoice-utils';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  org: any;
  mode: string;
  loading: boolean;
  editing: boolean;
  saving: boolean = false;
  model: any;
  route$: Subscription;
  cancel$: Subject<any> = new Subject();

  constructor(
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute, 
    private session: SessionService, 
    private invoiceService: InvoiceService
  ) { }

  buildInvoice(model) {
    let builder = new InvoiceUtils.Builder();
    
    builder
      .setType(model.type)
      .setOrg(model.org_id)
      .setTo(model.contact_id)
      .setRaisedAtDate(model.raised_at)
      .setDueDate(model.due_at)
      .setLineAmountType(model.line_amount_type)
      .setInvoiceNo(model.invoice_no)
      .setInvoiceReference(model.reference)
      .setItems(model.items.data || model.items)
      .setStatus(model.status)
      .setSubTotal(model.sub_total)
      .setTaxTotal(model.tax_total)
      .setTotal(model.total)
      .setNotes(model.notes);
    
    return builder.get()
  }
  saveInvoice($event) {
    let model = this.buildInvoice($event);
    
    if (!this.editing) {
      this.saving = true;
      this.invoiceService.create(model)
        .takeUntil(this.cancel$)
        .subscribe(response => { 
          this.saving = false;
          this.alert.success('Invoice', 'Invoice successfully created', { timeOut: 3000 })
          this.mode === 'acc_rec' 
            ? this.router.navigate(['/invoices', 'sales'], { queryParams: { status: 'all' } })
            : this.router.navigate(['/invoices', 'bills'], { queryParams: { status: 'all' } })
        }, 
        err => {
          this.saving = false;
        });
    } else {
      this.saving = true;
      this.invoiceService.update(this.model.id, model)
        .takeUntil(this.cancel$)
        .subscribe(response => {
          this.saving = false;
          this.alert.success('Invoice', 'Invoice successfully updated', { timeOut: 3000 })
        },
        err => {
          this.saving = false;
        })
    }
  }
  
  fetchInvoice(id: string) {
    this.loading = true
    
    this.invoiceService.get(id, { ref: 'invoice', include: 'contact,items' })
      .subscribe(response => {
        this.model = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg()
    let route$ = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));
    
    this.route$ = route$.subscribe(route => {
      this.editing = route.params.id ? true : false;
      this.mode = route.qparams.type || 'acc_rec';
      if (this.editing) this.fetchInvoice(route.params.id)
    })
  }

  ngOnDestroy() {
    this.cancel$.complete();
    this.route$.unsubscribe();
  }
}