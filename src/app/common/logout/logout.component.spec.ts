import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { By } from '@angular/platform-browser';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', fakeAsync(async ()=> {
    const spySignOut = spyOn(component, 'signOut');
    fixture.detectChanges();
    let buttondebug = fixture.debugElement.query(By.css('button'));
    let button = buttondebug.nativeElement;
    button.click();
    fixture.detectChanges();
    expect(spySignOut).toHaveBeenCalledTimes(1);
  }));
});
