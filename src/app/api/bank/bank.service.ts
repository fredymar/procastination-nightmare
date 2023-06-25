import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Bank } from 'src/app/models/bank.models';
import { Transaction } from 'src/app/models/transaction.models';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  urlApi = `${environment.API_URI}/bank`
  bankToCreate: Bank = new Bank()
  allBanks: Bank[] = []
  urlApiTransaction = `${environment.API_URI}/transaction`
  transactionToCreate: Bank = new Bank()
  allTransactions: Transaction[] = []

  constructor(private http: HttpClient) {
  }

  //metodos que van a consumir el api
  getAllBanks(){
    console.log(this.urlApi)
    return this.http.get(`${this.urlApi}/`)
  }

  getBank(_id: string){
    console.log(this.urlApi)
    return this.http.get(`${this.urlApi}/${_id}`)
  }

  createBank(data: Bank){
    return this.http.post(`${this.urlApiTransaction}/`, data)
  }

  createTransaction(data: Transaction){
    return this.http.post(`${this.urlApi}/`, data)
  }


  deleteBank(_id: string){
    return this.http.delete(`${this.urlApi}/deleteBank/${_id}`)
  }

  updateBank(data: any){
    let dataToUpdate = {
      _id: data._id,
      dataToUpdate : data
    }
    return this.http.put(`${this.urlApi}/updateBank`, dataToUpdate)
  }
}
