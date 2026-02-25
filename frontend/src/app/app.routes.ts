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
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
	{ path: '', component: Home },
	{ path: 'login', component: Login },
	{ path: 'register', component: Register },
	{ path: 'reports/:id', component: ReportDetails },
	{ path: 'create', component: ReportForm, canActivate: [AuthGuard] },
	{ path: 'edit/:id', component: ReportForm, canActivate: [AuthGuard] },
	{ path: 'profile', component: Profile, canActivate: [AuthGuard] },
	{ path: 'statistics', component: Statistics },
	{
		path: 'admin',
		canActivate: [AdminGuard],
		children: [
			{ path: '', component: AdminDashboard },
			{ path: 'reports', component: AdminReports },
			{ path: 'categories', component: AdminCategories }
		]
	},
	{ path: '**', redirectTo: '' }
];
