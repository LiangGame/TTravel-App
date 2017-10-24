import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ScenicPage } from '../scenic/scenic';
import { NotesPage } from '../notes/notes';
import { StrategyPage } from '../strategy/strategy';
import { PersonPage } from '../person/person';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScenicPage;
  tab3Root = NotesPage;
  tab4Root = StrategyPage;
  tab5Root = PersonPage;

  constructor() {

  }
}
