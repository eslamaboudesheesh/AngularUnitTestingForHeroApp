import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

// shallow tests
describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
beforeEach(() => {
TestBed.configureTestingModule({
  declarations: [HeroComponent],
  schemas: [NO_ERRORS_SCHEMA]
  // NO_ERRORS_SCHEMA make angular module do not Error if unknown attribiut or element
});
fixture = TestBed.createComponent(HeroComponent);
});

it('should have the correct hero', () => {
// Arrange
fixture.componentInstance.hero = {
  id : 1 ,
  name: 'SuperMan',
  strength : 5,
};
// Act && Assert
expect(fixture.componentInstance.hero.name).toEqual('SuperMan');

});

it('should render the hero name in anchor tag', () => {
  // Arrange
  fixture.componentInstance.hero = {
    id: 1,
    name: 'SuperMan',
    strength: 5
  };
  fixture.detectChanges();
  // Act
  let deA = fixture.debugElement.query(By.css('a'));
  // let expectContent = fixture.nativeElement.querySelector('a').textContent;
  // Assert
  expect(deA.nativeElement.textContent).toContain('SuperMan');
  //  expect(expectContent).toContain('SuperMan');
});
});
