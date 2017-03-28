import { TestBed, inject } from '@angular/core/testing';

import { LessonListService } from './lesson-list.service';

describe('LessonListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonListService]
    });
  });

  it('should ...', inject([LessonListService], (service: LessonListService) => {
    expect(service).toBeTruthy();
  }));
});
