import { ChronicalAppPage } from './app.po';

describe('chronical-app App', () => {
  let page: ChronicalAppPage;

  beforeEach(() => {
    page = new ChronicalAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
