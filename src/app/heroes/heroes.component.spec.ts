import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroComponent', () => {
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
