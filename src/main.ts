import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if(!navigator.geolocation){
  alert("error")
  throw new Error("El navegador no soporta la Geolocation");
  
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));