import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  //Template is the ng-template like element, so the current element where this directive is applied is stored in it
  //ViewContainer == Where should we render it? A real place in the dom
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
