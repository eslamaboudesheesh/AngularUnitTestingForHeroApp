/**
 * this articl can be usful https://offering.solutions/blog/articles/2017/10/02/testing-an-angular-http-service/
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';


describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService,
        { provide: MessageService, useValue: mockMessageService }]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  it('should call get with the correct Uri', () => {
    // Arrange
    service.getHero(4).subscribe();
    // Act
    const req = httpTestingController.expectOne('api/heroes/4');
    // Assert
    req.flush({ id: 1, name: 'eslam', strength: 8 });
    httpTestingController.verify();
  });

  it('should Call post with correct uri ', () => {

    // Arrange
    service.addHero(
      {
        id: 5,
        name: 'ahmed',
        strength: 11
      }).subscribe((data: any) => {
        expect(data.name).toBe('ahmed');
      });
    // Act
    const req = httpTestingController.expectOne('api/heroes', 'post to api');
    // Assert

    expect(req.request.method).toBe('POST');
    req.flush({
      id: 5,
      name: 'ahmed',
      strength: 11
    });
    httpTestingController.verify();
  });

  it('should Call put With Correct uri', () => {
    // Arrange

    service.updateHero({
      id: 5,
      name: 'Ahmed',
      strength: 11
    }).subscribe((data: any) => {
      expect(data.name).toBe('Ahmed');
    });
    // Act

    const req = httpTestingController.expectOne('api/heroes', 'put to api');
    // Assert
    expect(req.request.method).toBe('PUT');
    req.flush({
      id: 5,
      name: 'Ahmed',
      strength: 11
    });
    httpTestingController.verify();

  });


  it('should delete the correct Uri', () => {
    // Arrange

    service.deleteHero(3).subscribe((data: any) => {
      expect(data).toBe(3);
    });
    // Act

    const req = httpTestingController.expectOne(
      `api/heroes/3`,
      'delete to api'
    );
    // Assert

    expect(req.request.method).toBe('DELETE');

    req.flush(3);

    httpTestingController.verify();
  });
});
