import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
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
  transactionToCreate: Transaction = new Transaction()
  allTransactions: Transaction[] = []
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0OTI0NzU1NzZhMjRlODBjOGNjZmI0ZSIsIm5hbWUiOiJDYXJsb3NDcnV6IiwiZW1haWwiOiJjYXJsb3NjcnVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMEZXckpQdi5LeUFJYUNFZlUwbnNxT3RONzdjNGNnWWIvVHlMdktkNmVqaUxNV29YemQ4eEciLCJpbWFnZSI6bnVsbH0sImlhdCI6MTY4NzgyMjgxNX0.KfXhvRzJ__IysO9O_lROHy6Afor-KNVPGfjhEAOpQqA'
  constructor(private http: HttpClient) {
  }

  //metodos que van a consumir el api
  getAllBanks(){
    console.log(this.urlApi)
    return this.http.get(`${this.urlApi}/`, { headers: new HttpHeaders({'Authorization': 'key ' + this.token})})
  }

  getBank(_id: string){
    console.log(this.urlApi)
    return this.http.get(`${this.urlApi}/${_id}`, { headers: new HttpHeaders({'Authorization': 'key ' + this.token})})
  }

  createBank(data: Bank){
    return this.http.post(`${this.urlApi}/`, data, { headers: new HttpHeaders({'Authorization': 'key ' + this.token})})
  }

  createTransaction(data: any){
    return this.http.post(`${this.urlApiTransaction}/`, data, { headers: new HttpHeaders({'Authorization': 'key ' + this.token})})
  }

  deleteTransaction(_id: string){
    return this.http.delete(`${this.urlApiTransaction}/${_id}`,{ headers: new HttpHeaders({'Authorization': 'key ' + this.token})})
  }

  updateTransaction(data:any){
    return this.http.put(`${this.urlApiTransaction}/`,data,{ headers: new HttpHeaders({'Authorization': 'key ' + this.token})})
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
