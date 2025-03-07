import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserProductComponent } from './user-product/user-product.component';
import { LogoutComponent } from '../common/logout/logout.component';
import { MockLogoutComponent, MockUserProductComponent } from '../../../test/mocks/components.mock';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(UserComponent, {
      remove: { imports: [UserProductComponent] },
      add: { imports: [MockUserProductComponent] },
    });
    TestBed.overrideComponent(UserComponent, {
      remove: { imports: [LogoutComponent] },
      add: { imports: [MockLogoutComponent] },
    });
  
    await TestBed.configureTestingModule({
      imports: [
        MockUserProductComponent,
        MockLogoutComponent,
        UserComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
