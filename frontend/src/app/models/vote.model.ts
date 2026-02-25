export interface Vote {
	id?: number;
	report_id: number;
	user_id: number;
	vote_type: 'up' | 'down';
	created_at?: string;
	updated_at?: string;
}
