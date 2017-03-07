import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[autoHeight]'
})
export class AutoHeightDirective implements OnInit {
  private headerHeight: number = 65;

  constructor(private elem: ElementRef) {}

  ngOnInit() {
    let bodyHeight = window.innerHeight;
    this.resize(bodyHeight);
  }

  @HostListener('change', ['$event'])
  onChange(event: any) {
    let bodyHeight = event.target.innerHeight;
    this.resize(bodyHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let bodyHeight = event.target.innerHeight;
    this.resize(bodyHeight);
  }

  private resize(bodyHeight: number): void {
    let scrollHeight = bodyHeight - this.headerHeight;
    this.elem.nativeElement.style.overflowY = 'auto';
    this.elem.nativeElement.style.overflowX = 'hidden';
    this.elem.nativeElement.style.height = scrollHeight + 'px';
  }
}
