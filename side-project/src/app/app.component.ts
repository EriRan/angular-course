import { ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("f") signupForm: NgForm;
  subscription = "advanced";
  submitted = false;
  submittedResult = {
    email: "",
    subscription: "",
    password: "",
  };

  onSubmit() {
    this.submitted = true;
    this.submittedResult.email = this.signupForm.form.value.userData.email;
    this.submittedResult.subscription =
      this.signupForm.form.value.userData.subscription;
    this.submittedResult.password =
      this.signupForm.form.value.userData.password;
    this.signupForm.resetForm();
  }
}
