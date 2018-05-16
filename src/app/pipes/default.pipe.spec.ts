import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform('', 'http://qadocs-dev/qadocs'))
      .toBe('http://qadocs-dev/qadocs');
  });

});
