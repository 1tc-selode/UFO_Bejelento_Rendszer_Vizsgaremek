import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/reports/reports-module').then(m => m.ReportsModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'reports',
		loadChildren: () => import('./features/reports/reports-module').then(m => m.ReportsModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
	},
	{
		path: 'register',
		loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
	},
	{
		path: 'profile',
		loadComponent: () => import('./features/profile/profile').then(m => m.ProfileComponent),
		canActivate: [AuthGuard]
	},
	{
		path: 'statistics',
		loadChildren: () => import('./features/statistics/statistics-module').then(m => m.StatisticsModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'admin',
		loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule),
		canActivate: [AuthGuard]
	}
];
