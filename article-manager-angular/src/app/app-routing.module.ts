import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { MyarticlesComponent } from './myarticles/myarticles.component';
import { ArticleComponent } from './article/article.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';



const routes: Routes = [
  {path:'',component:ListComponent},
  {path:'login',component:LoginComponent},
  {path:'create',component:CreateComponent},
  {path:'update/:id',component:CreateComponent},
  {path:'myarticles',component:MyarticlesComponent},
  {path:'signup',component:SignupComponent},
  {path:'logout',component:LogoutComponent},
  {path:'article/:id',component:ArticleComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
