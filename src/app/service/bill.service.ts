import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class BillService {
  private api: string = 'http://localhost:8080/shoe_server/bill';
  private opts = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

  constructor(private http: Http) { }

  private handdleErr(err: any): Promise<any> {
    console.log(err);
    return Promise.reject(err.message || err);
  }

  getAll() {
    return this.http
      .get(`${this.api}/all`)
      .toPromise()
      .then(res => res.json())
      .catch(this.handdleErr);
  }

  addNew(formData: any) {
    return this.http
      .post(`${this.api}/add`, JSON.stringify(formData), this.opts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handdleErr);
  }

  update(formData) {
    return this.http
    .put(`${this.api}/put`, JSON.stringify(formData), this.opts)
    .toPromise()
    .then(res => res.json())
    .catch(this.handdleErr);
  }

  getByID(id, shoeId, customerId) {
    return this.http
      .get(`${this.api}/get/${id}/${shoeId}/${customerId}`)
      .toPromise()
      .then(res => res.json())
      .catch(this.handdleErr);
  }

  deleteByID(id, shoeId, customerId) {
    return this.http
      .delete(`${this.api}/delete/${id}/${shoeId}/${customerId}`)
      .toPromise()
      .then(res => res.json())
      .catch(this.handdleErr);
  }

  getByCustomerId(customerId) {
    // const param = new URLSearchParams();
    return this.http
      .get(`${this.api}/get?customerId=${customerId}`)
      .toPromise()
      .then(res => res.json())
      .catch(this.handdleErr);
  }
  
}
