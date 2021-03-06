import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth-guard.guard';
import { NoAuthGuard } from 'app/shared/guards/no-auth-guard.guard';

const routes: Routes =[
  
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: 'public',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('app/public/public.module').then(m => m.PublicModule)
  },
  {
    path: '**',
    redirectTo: 'public'
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
