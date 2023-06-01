import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, inject, Input, OnInit, Renderer2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs';

@Directive({
  selector: '[appSvgIcon]',
  standalone: true
})
export class SvgIconDirective implements OnInit {
  @Input('appSvgIcon') iconName!: string;
  private elRef = inject(ElementRef);
  private http = inject(HttpClient);
  private renderer = inject(Renderer2);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.loadSvgIcon();
  }

  loadSvgIcon(): void {
    this.http.get(
      `assets/icons/${this.iconName}.svg`,
      { responseType: 'text' }
    ).pipe(first()).subscribe({
      next: data => {
        const html = this.sanitizer.bypassSecurityTrustHtml(data);
        const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, html);
        this.renderer.setProperty(this.elRef.nativeElement, 'innerHTML', sanitized);
      },
      error: error => console.error(error),
    });
  }
}
