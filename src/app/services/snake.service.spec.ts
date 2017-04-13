/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SnakeServiceService } from './snake-service.service';

describe('SnakeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnakeServiceService]
    });
  });

  it('should ...', inject([SnakeServiceService], (service: SnakeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
