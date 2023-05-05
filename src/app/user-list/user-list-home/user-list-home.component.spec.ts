import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListHomeComponent } from './user-list-home.component';

describe('UserListHomeComponent', () => {
  let component: UserListHomeComponent;
  let fixture: ComponentFixture<UserListHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
