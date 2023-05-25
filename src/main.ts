import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


 const editBtn = document.querySelector('#editButton') 
 const modalBg = document.querySelector('.modal-background')
 const modal = document.querySelector('.modal')

 editBtn?.addEventListener('click', () => {
    modal?.classList.add('is-active')
 })