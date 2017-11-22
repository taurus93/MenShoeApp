import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from "../service/customer.service";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, NgControl } from "@angular/forms";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

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

  private emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  private phonePattern = '[0-9]{3,}-[0-9]{3,}-[0-9]{4,}';

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }


  createForm() {
    this.form = this.fb.group({
      id: '',
      fullName: '',
      address: '',
      phoneNumber: [null, [
        Validators.required,
        Validators.pattern(this.phonePattern)
      ]],
      email: [null, [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]],
      pastalCode: ''
    });
    this.form2 = this.form;
  }

  loadAll() {
    this.customerService
      .getAll()
      .then(data => {
        this.list = data;
        console.log(this.list);
      })
      .catch(err => console.log(err));
  }

  onClickToGetDetail(id) {
    console.log(id);
    this.customerService
      .getByID(id)
      .then(res => {
        console.log(res);
      })
  }

  onClickToEdit(id) {
    // this.customerDetail = formData;
    console.log(id);
    return this.customerService
      .getByID(id)
      .then(res => {
        this.form2 = this.fb.group({
          id: res.id,
          fullName: res.fullName,
          address: res.address,
          phoneNumber: res.phoneNumber,
          email: res.email,
          pastalCode: res.pastalCode
        });
        console.log(this.form2);
      });
  }

  onClickToUpdate(formData) {
    console.log(formData);
    return this.customerService
      .update(formData)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  onClickToDelete(id) {
    console.log(id);
    this.customerService
      .deleteByID(id)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  onSubmit(formData) {
    console.log('adding new user...');
    console.log(formData);
    this.customerService
      .addNew(formData)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  search(name: string): void {
    if (name == "") this.loadAll();
    this.customerService
      .getByCustId(name)
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
    this.loadAll();
  }

}
