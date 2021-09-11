import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AppState } from '../store/app.reducer';
import { AuthService } from './auth.service';
import { AuthBaseResponseData } from './auth.types';
import { loginStart } from './store/auth.actions';

@Component({ selector: 'app-auth', templateUrl: './auth.component.html' })
export class AuthComponent implements OnDestroy, OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;

  private closeSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthBaseResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(loginStart({ email: email, password: password }));
    } else {
      authObservable = this.authService.signup(email, password);
    }

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authenticationError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    //Just pass the time to the factory resolver and it will return a factory for it
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription!.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
