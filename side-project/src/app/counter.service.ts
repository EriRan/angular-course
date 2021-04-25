import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {

    activeOperationsDone = 0;
    inactiveOperationsDone = 0;

    incrementActive() {
        this.activeOperationsDone++;
        console.log('Active count is now: ' + this.activeOperationsDone);
    }

    incrementInactive() {
        this.inactiveOperationsDone++;
        console.log('Inactive count is now: ' + this.inactiveOperationsDone);
    }
    
}