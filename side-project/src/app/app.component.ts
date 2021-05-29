import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormArray } from "@angular/forms";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  //Holds a group of controls (The full form object)
  signupForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
    //statusChanges == validation state of the form
    //valueChanges == changes to the values of the form
  }

  getControls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get("hobbies") as FormArray).push(control);
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({gender: "male"});
  }
  /**
   * Returns a key-value. This is new Typescript syntax to me
   *
   * @param control
   */
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    //Validation is succesful. Null must be always returned in this case
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
