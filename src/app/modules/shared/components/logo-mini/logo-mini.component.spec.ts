import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMiniComponent } from './logo-mini.component';

describe('LogoMiniComponent', () => {
  let component: LogoMiniComponent;
  let fixture: ComponentFixture<LogoMiniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogoMiniComponent]
    });
    fixture = TestBed.createComponent(LogoMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
