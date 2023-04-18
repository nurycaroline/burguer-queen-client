import { MenuItem } from '@/types/MenuItem';
import { Order } from '@/types/Order';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

type KitchenOrdersProps = {
	oldOrders: Order[];
	menu: MenuItem[];
}

const KitchenOrders = ({ oldOrders, menu }: KitchenOrdersProps) => {
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

	const formatDate = (date: Timestamp) => {
		return new Intl.DateTimeFormat('pt-BR').format(date.toDate());
	}

	return (
		<details>
			<summary><h3>Pedidos na Cozinha ({orderItemsWithMenuItems.length || 0})</h3></summary>
			{orderItemsWithMenuItems.map((order) => (
				<div key={order.id}>
					{order.client_name} - {formatDate(order.created_at)}  - R$ {order.total}
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

export default KitchenOrders;