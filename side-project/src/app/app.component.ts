import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  forbiddenProjectNames = ["Test"];
  projectStatuses = ["Stable", "Critical", "Finished"];
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required],
        this.validateProjectName.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl("", Validators.required),
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  changeStatus(e) {
    this.projectForm.patchValue({
      projectStatus: e.target.value,
    });
  }

  validateProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
          resolve({ projectNameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
