export type MenuItem = {
	id: string;
	item_name: string;
	item_price: number;
	item_type: 'hambuger';
	menu_type: 'breakfast' | 'day';
	count?: number;
};