import { MenuItem } from '@/types/MenuItem';
import { Order } from '@/types/Order';
import React from 'react';

type ListOldOrdersProps = {
	oldOrders: Order[];
	menu: MenuItem[];
}

const ListOldOrders = ({ oldOrders, menu }: ListOldOrdersProps) => {
	const orderItemsWithMenuItems = oldOrders.map((order) => {
		const items: MenuItem[] = order.items
			.map((item: any) => {
				const menuItem = menu?.find(x => x.id === item.id)!;
				return {
					...menuItem,
					count: item.count,
				};
			})
		
		return { ...order, items };
	});

	return (
		<details>
			<summary><h3>Pedidos Realizados - Hoje ({orderItemsWithMenuItems.length || 0})</h3></summary>
			{orderItemsWithMenuItems.map((order) => (
				<div key={order.id}>
					{order.client_name} - R$ {order.total}
					<ul>
						{order.items?.map((item: any) => (
							<li key={item.id}>
								<p>{item.item_name} - {item.count}x R$ {item.item_price}</p>
							</li>
						))}
					</ul>
				</div>
			))}
		</details>
	)
}

export default ListOldOrders;