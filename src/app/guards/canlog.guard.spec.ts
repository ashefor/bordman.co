import { TestBed, async, inject } from '@angular/core/testing';

import { CanlogGuard } from './canlog.guard';

describe('CanlogGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanlogGuard]
    });
  });

  it('should ...', inject([CanlogGuard], (guard: CanlogGuard) => {
    expect(guard).toBeTruthy();
  }));
});
