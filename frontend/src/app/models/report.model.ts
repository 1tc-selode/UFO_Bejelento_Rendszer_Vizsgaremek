import { User } from './user.model';
import { Category } from './category.model';
import { Vote } from './vote.model';

export interface ReportImage {
	id?: number;
	report_id: number;
	image_path: string;
	created_at?: string;
	updated_at?: string;
}

export interface Report {
	id?: number;
	user_id: number;
	category_id?: number;
	title: string;
	description: string;
	latitude: number;
	longitude: number;
	date: string;
	witnesses: number;
	status?: 'pending' | 'approved' | 'rejected';
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
	user?: User;
	category?: Category;
	images?: ReportImage[];
	votes?: Vote[];
}
