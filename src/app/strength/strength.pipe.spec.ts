import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    // arrange
    let pipe: StrengthPipe;
    pipe = new StrengthPipe();
    // Acts && assert
    // let val = pipe.transform(5);

    expect(pipe.transform(5)).toContain('5 (weak)');
  });

  it('should Display Strong if Strength is equle  10 ' , () => {
    let pipe: StrengthPipe;
    pipe = new StrengthPipe();
    expect(pipe.transform(10)).toContain('10 (strong)');
  });
});
