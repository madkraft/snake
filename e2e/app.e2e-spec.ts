import { SketchesPage } from './app.po';

describe('sketches App', function() {
  let page: SketchesPage;

  beforeEach(() => {
    page = new SketchesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
