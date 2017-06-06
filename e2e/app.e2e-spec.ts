import { Ltmv1Page } from './app.po';

describe('ltmv1 App', () => {
  let page: Ltmv1Page;

  beforeEach(() => {
    page = new Ltmv1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
