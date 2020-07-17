import { Directive, HostListener, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOpacityHover]'
})
export class OpacityHoverDirective {

  constructor(public el: ElementRef, public renderer: Renderer2) {}

    @Input() myOpacity: string;

    // Event listeners for element hosting
  // the directive
  @HostListener('mouseenter') onMouseEnter() {
    this.hover(true);
}

@HostListener('mouseleave') onMouseLeave() {
    this.hover(false);
}
// Event method to be called on mouse enter and on mouse leave
hover(isOver: boolean){
    if(isOver){
      this.renderer.setStyle(this.el.nativeElement, 'opacity', this.myOpacity);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1.0');
    }
}

}
