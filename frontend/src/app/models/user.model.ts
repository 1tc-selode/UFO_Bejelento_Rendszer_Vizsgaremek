export interface User {
	id?: number;
	name: string;
	email: string;
	password?: string;
	role: 'user' | 'admin' | 'banned';
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
}
