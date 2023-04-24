import { MenuItem } from '@/types/MenuItem';
import { Order } from '@/types/Order';
import { Timestamp, doc, getFirestore, updateDoc } from 'firebase/firestore';
import React from 'react';
import * as S from './styles';

type ListOrdersProps = {
	orders: Order[];
	menu: MenuItem[];
	title: string
	inputLabel?: string
	inputUpdateKey?: keyof Order
}

const ListOrders = ({ menu, title, orders, inputLabel, inputUpdateKey }: ListOrdersProps) => {
	const db = getFirestore();

	const orderItemsWithMenuItems = orders.map((order) => {
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
		return new Intl.DateTimeFormat('pt-BR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(date.toDate());
	}

	function handleUpdate(orderId: string, checked: boolean) {
		if (!inputUpdateKey) return;

		updateDoc(doc(db, "order", orderId), {
			[inputUpdateKey]: checked,
			updated_at: new Date(),
		})
	}

	const durationOrder = (start: Timestamp, end: Timestamp) => {
		if (!start || !end) return;

		const created_at = start.toDate();
		const updated_at = end.toDate();
		const diff = updated_at.getTime() - created_at.getTime();

		const time = {
			day: Math.floor(diff / 86400000),
			hour: Math.floor(diff / 3600000) % 24,
			minute: Math.floor(diff / 60000) % 60,
			second: Math.floor(diff / 1000) % 60,
			millisecond: Math.floor(diff) % 1000
		};
		return Object.entries(time)
			.filter(val => val[1] !== 0)
			.map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
			.join(', ');
	}

	return (
		<S.DetailOrder>
			<summary>{title} ({orderItemsWithMenuItems.length || 0})</summary>
			{
				!orderItemsWithMenuItems.length && (
					<p>Nenhum pedido encontrado</p>
				)
			}
			{orderItemsWithMenuItems.map((order) => (
				<S.DetailOrderContent key={order.id}>
					<p>{order.client_name} - {formatDate(order.created_at)}  - R$ {order.total}</p>
					{
						inputLabel && inputUpdateKey && (
							<label>
								<input
									type="checkbox"
									checked={order[inputUpdateKey] as boolean}
									onChange={e => handleUpdate(order.id, e.target.checked)}
								/>
								<span>{inputLabel}</span>
							</label>
						)
					}
					{order.created_at && order.updated_at && (
						<p>Duração: {durationOrder(order.created_at, order.updated_at)}</p>
					)}

					<p>Itens:</p>
					<ul>
						{order.items?.map((item: any) => (
							<li key={item.id}>
								{item.item_name} - {item.count}x R$ {item.item_price}
							</li>
						))}
					</ul>
				</S.DetailOrderContent>
			))}
		</S.DetailOrder>
	)
}

export default ListOrders;
