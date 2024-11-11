import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  timePlaying : number = 0;
  play : boolean = false;
}
