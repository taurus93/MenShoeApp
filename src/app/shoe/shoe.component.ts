import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShoeService } from "../service/shoe.service";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, NgControl } from "@angular/forms";
@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoeComponent implements OnInit {

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

  constructor(private shoeService: ShoeService, private fb: FormBuilder) { }


  createForm() {
    this.form = this.fb.group({
      id: '',
      name: '',
      itemnum: '',
      size: '',
      color: '',
      inventory: ''
    });
    this.form2 = this.form;
  }

  loadAll() {
    this.shoeService
      .getAll()
      .then(data => {
        this.list = data;
        console.log(this.list);
      })
      .catch(err => console.log(err));
  }

  onClickToGetDetail(id) {
    console.log(id);
    this.shoeService
      .getByID(id)
      .then(res => {
        console.log(res);
      })
  }

  onClickToEdit(id) {
    // this.customerDetail = formData;
    console.log(id);
    return this.shoeService
      .getByID(id)
      .then(res => {
        this.form2 = this.fb.group({
          id: res.id,
          name: res.name,
          itemnum: res.itemnum,
          size: res.size,
          color: res.color,
          inventory: res.inventory
        });
        console.log(this.form2); 
      });
  }

  onClickToUpdate(formData) {
    console.log(formData);
    return this.shoeService
      .update(formData)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  onClickToDelete(id) {
    console.log(id);
    this.shoeService
      .deleteByID(id)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  onSubmit(formData) {
    console.log('adding new user...');
    console.log(formData);
    this.shoeService
      .addNew(formData)
      .then(res => console.log(res))
      .then(() => {
        this.loadAll();
      });
  }

  search(name: string): void {
    if(name=="") this.loadAll();
    this.shoeService
     .getByName(name)
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
