import { TpwPage } from './app.po';

describe('tpw App', () => {
  let page: TpwPage;

  beforeEach(() => {
    page = new TpwPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
