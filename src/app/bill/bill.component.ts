import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BillService } from "../service/bill.service";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, NgControl } from "@angular/forms";
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BillComponent implements OnInit {

  private list;
  private form: FormGroup;
  private form2: FormGroup;
  mailAddress: NgControl;
  // private detail = {
  //   bankId: '',
  //   bankName: '',
  //   bankLocation: '',
  //   bankOpenDate: ''
  // };

  constructor(private billService: BillService, private fb: FormBuilder) { }


  createForm() {
    this.form = this.fb.group({
      id: this.fb.group({
        customerId: [''],
        shoeId: ['']
      }),
      amount: [''],
      total: ['']
    });
  }

  createForm2() {
    this.form2 = this.fb.group({
      id: this.fb.group({
        id: [''],
        customerId: [''],
        shoeId: ['']
      }),
      amount: [''],
      total: ['']
    });
  }

  loadAll() {
    this.billService
      .getAll()
      .then(data => {
        this.list = data;
        console.log(this.list);
      })
      .catch(err => console.log(err));
  }

  // onClickToGetDetail(id) {
  //   console.log(id);
  //   this.billService
  //     .getByID(id)
  //     .then(res => {
  //       console.log(res);
  //     })
  // }

  onClickToEdit(id, shoeId, customerId) {
    // this.customerDetail = formData;
    return this.billService
      .getByID(id, shoeId, customerId)
      .then(res => {
        this.form2 = this.fb.group({
          id: this.fb.group({
            id: res.id.id,
            customerId: res.id.shoeId,
            shoeId: res.id.customerId
          }),
          amount: res.amount,
          total: res.total
        });
        console.log(this.form2); 
      });
  }

  onClickToUpdate(formData) {
    console.log(formData);
    return this.billService
      .update(formData)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  onClickToDelete(id, shoeId, customerId) {
    this.billService
      .deleteByID(id, shoeId, customerId)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  onSubmit(formData) {
    console.log('adding new user...');
    console.log(formData);
    this.billService
      .addNew(formData)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  search(customerId: string): void {
    if(customerId=="") this.loadAll();
    this.billService
     .getByCustomerId(customerId)
     .then(res => {
       this.list = res;
     }).catch(err => console.log(err));
   }

  // showData(formData) {
  //   let newformData = this.parseIntFormID(formData);
  //   console.log(newformData);
  // }

  // parseIntFormID(data) {
  //   let newData = Object.assign({}, data);
  //   newData.id = parseInt(data.id);
  //   return newData;
  // }

  ngOnInit() {
    this.createForm();
    this.createForm2();
    this.loadAll();
  }

}
