import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewClientComponent } from './dialog-new-client.component';

describe('DialogNewClientComponent', () => {
  let component: DialogNewClientComponent;
  let fixture: ComponentFixture<DialogNewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogNewClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
