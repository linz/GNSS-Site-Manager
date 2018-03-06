import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '/login', redirectTo: '/', pathMatch: 'full' },
  { path: '/logout', redirectTo: '/', pathMatch: 'full' },
]
@NgModule({
  imports: [
    RouterModule.forRoot([
	  { path: 'login', redirectTo: '/', pathMatch: 'full' },
	  { path: 'logout', redirectTo: '/', pathMatch: 'full' },    	
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

