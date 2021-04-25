import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {

    count = 0;

    increment() {
        this.count++;
        console.log('Count is now: ' + this.count);
    }
    
}