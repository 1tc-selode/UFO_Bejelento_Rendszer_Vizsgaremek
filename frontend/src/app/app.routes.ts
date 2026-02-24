
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ReportDetails } from './components/report-details/report-details';
import { ReportForm } from './components/report-form/report-form';
import { Profile } from './components/profile/profile';
import { Statistics } from './components/statistics/statistics';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';
import { AdminReports } from './components/admin/admin-reports/admin-reports';
import { AdminCategories } from './components/admin/admin-categories/admin-categories';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [

  // Nyilvános oldalak
  // Nyilvános oldalak
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'reports/:id', component: ReportDetails },

  // Bejelentés létrehozás / szerkesztés (csak belépve)
  { path: 'create', component: ReportForm, canActivate: [authGuard] },
  { path: 'edit/:id', component: ReportForm, canActivate: [authGuard] },

  // Profil
  { path: 'profile', component: Profile, canActivate: [authGuard] },

  // Statisztikák
  { path: 'statistics', component: Statistics },

  // Admin
  { path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'reports', component: AdminReports },
      { path: 'categories', component: AdminCategories }
    ]
  },

  { path: '**', redirectTo: '' }
];