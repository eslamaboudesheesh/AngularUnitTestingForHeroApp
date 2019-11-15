import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;
  beforeEach(() => {
    HEROES = [
      {id: 1 , name: 'eslam', strength: 8  },
      {id: 2 , name: 'Amgad', strength: 28  },
      {id: 3 , name: 'Talal', strength: 55  }
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);

  });
  describe('delete', () => {
   it('should remove the indicated hero from the herolist', () => {
    // Arrange
    /* The reason why they're using of() is
      because it's very easy to use it instead of a real HTTP call.
      so used RxJS of() to return an Observable of mock heroes (Observable).
      */

    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;
    // Act
     component.delete(HEROES[2]);
     // Assert
     expect(component.heroes.length).toBe(2);
   });

   it('should used deleteher()', () => {
    // Arrange
     mockHeroService.deleteHero.and.returnValue(of(true));
     component.heroes = HEROES;
     // Act
      component.delete(HEROES[2]);
      // Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
   });
  });

  describe('addNewHero', () => {
    it('should add new hero ', () => {
     // Arrange

     mockHeroService.addHero.and.returnValue(of(true));
     component.heroes = HEROES
     // Act

      component.add('eslame');
      // Assert
      expect(mockHeroService.addHero).toHaveBeenCalledWith({
        name: 'eslame' ,
        strength : 11
       });
    });

    it('should add new hero in list of hero ', () => {
      // Arrange

      mockHeroService.addHero.and.returnValue(of(true));
      component.heroes = HEROES;
      // Act

       component.add('eslame');
       // Assert
       expect(component.heroes.length).toBe(4);
     });

   });

   describe('getAll', () => {
    it('return all hero ', () => {
      // Arrange
      mockHeroService.getHeroes.and.returnValue(of(true));
      component.heroes = HEROES;
      let xpext = component.heroes.length;
      // Act
      component.getHeroes();
     // Assert
     expect(xpext).toBe(3);

    });
   });
});

describe('HeroesComponentShallow' , () => {
  let HEROES;
  let mockHeroService;
  let fixture: ComponentFixture<HeroesComponent>;

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
   class FakeHeroComponent {
    @Input() hero: Hero;
   // @Output() delete = new EventEmitter();
  }
  beforeEach(() => {
    HEROES = [
      {id: 1 , name: 'eslam', strength: 8  },
      {id: 2 , name: 'Amgad', strength: 28  },
      {id: 3 , name: 'Talal', strength: 55  }
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
  TestBed.configureTestingModule({
    declarations: [HeroesComponent , FakeHeroComponent],
    // schemas: [NO_ERRORS_SCHEMA],
    providers :[
      {provide: HeroService , useValue: mockHeroService}
    ]
    // NO_ERRORS_SCHEMA make angular module do not Error if unknown attribiut or element
  });
  fixture = TestBed.createComponent(HeroesComponent);
  });

  it('it correctly used the service for get all heroes', () => {
    // Arrenge
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    // Act
    let expectRes = fixture.componentInstance.heroes.length;
    // Assert
    expect(expectRes).toBe(3);

  });

  it("should created li for each hero in heroes list ", () => {
    // Arrenge
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    // Act
    let expectRes = fixture.debugElement.queryAll(By.css('li')).length;
    // Assert

    expect(expectRes).toBe(3);
  });
});



describe('HeroesComponentdeepTest' , () => {
  let HEROES;
  let mockHeroService;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(() => {
    HEROES = [
      {id: 1 , name: 'eslam', strength: 8  },
      {id: 2 , name: 'Amgad', strength: 28  },
      {id: 3 , name: 'Talal', strength: 55  }
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
  TestBed.configureTestingModule({
    declarations: [HeroesComponent , HeroComponent],
     schemas: [NO_ERRORS_SCHEMA],
    providers :[
      {provide: HeroService , useValue: mockHeroService}
    ]
    // NO_ERRORS_SCHEMA make angular module do not Error if unknown attribiut or element
  });
  fixture = TestBed.createComponent(HeroesComponent);
  });


it('should render each hero as ahero component', () => {
  // Arrenge
  mockHeroService.getHeroes.and.returnValue(of(HEROES));
  fixture.detectChanges();
  // Act
  const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
  // Assert
  expect(heroComponentDEs.length).toBe(3);
  // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('eslam');
  // expect(heroComponentDEs[1].componentInstance.hero.name).toEqual('Amgad');
  // expect(heroComponentDEs[2].componentInstance.hero.name).toEqual('Talal');
   for (let i=0 ; i < heroComponentDEs.length ; i++)
   {
    expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
   }

})

});
