import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private dataSource = new BehaviorSubject<any>('');
  currentData = this.dataSource.asObservable();


  constructor() { }

  updateData(data:any) {
    this.dataSource.next(data);
  }
}
