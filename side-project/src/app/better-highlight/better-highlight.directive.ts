import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    //Need to get the element but it is really simple
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "blue"
    ); //You can also add important tag in the last argument
  }
}
