import { filesOfProject } from 'tsarch';
import 'tsarch/dist/jest';

describe('architecture', () => {
  it('application layer should not depend on ui', () => {
    const uiPattern = '/.*.controller.ts$/i';
    const servicePattern = '/.*.service.ts$/i';

    const rule = filesOfProject()
      .matchingPattern(uiPattern)
      .shouldNot()
      .dependOnFiles()
      .matchingPattern(servicePattern);

    expect(rule).toPassAsync();
  });
});
