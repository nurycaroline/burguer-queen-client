import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { MenuItem } from '@/types/MenuItem';
import { FirebaseApp } from 'firebase/app';

import * as S from './styles'
import { toast } from 'react-toastify';

type NewOrderProps = {
	menu: MenuItem[];
	app: FirebaseApp;
}

const NewOrder = ({ menu, app }: NewOrderProps) => {
	const db = getFirestore(app);

	const [newOrderItems, setNewOrderItems] = useState<MenuItem[]>([]);
	const [clientName, setClientName] = useState<string>('');
	const [menutype, setMenuType] = useState<'day' | 'breakfast'>('breakfast');

	const getTotalItens = () => {
		return newOrderItems.reduce((acc, item) => {
			return acc + (item.item_price * (item.count || 1))
		}, 0)
	}

	const handleAddItem = (newItem: MenuItem) => {
		const foundItem = newOrderItems.find(x => x.id === newItem.id)
		if (foundItem) {
			foundItem.count = (foundItem.count || 0) + 1;
			setNewOrderItems([...newOrderItems])
			return;
		}

		setNewOrderItems([...newOrderItems, {
			...newItem,
			count: 1,
		}])
	}

	const handleRemoverItem = (newItem: any) => {
		const index = newOrderItems.findIndex(x => x.id === newItem.id);
		newOrderItems.splice(index, 1);
		setNewOrderItems([...newOrderItems])
	}

	const handleChangeMenu = (type: 'day' | 'breakfast') => {
		setMenuType(type)
		setNewOrderItems([])
		setClientName('')
	}

	function checkValues() {
		if (!clientName) {
			toast.warn('Preencha o nome do cliente')
			return false
		}

		if (newOrderItems.length === 0) {
			toast.warn('Adicione ao menos um item')
			return false
		}

		return true
	}

	function cleanValues() {
		setNewOrderItems([])
		setClientName('')
	}

	async function postOrder() {
		const total = getTotalItens()

		if (checkValues()) {
			const body = {
				client_name: clientName,
				items: newOrderItems.map(({ id, count }) => ({
					id,
					count
				})),
				total,
				created_at: new Date(),
			}
			try {
				await addDoc(collection(db, 'order'), body)
				cleanValues()
				toast.success('Pedido enviado para cozinha')
			} catch (error) {
				toast.error('Erro ao salvar pedido')
			}
		}
	}

	return (
		<S.Container>
			<S.ContainerMenu>
				<header>
					<button
						disabled={menutype === 'breakfast'}
						onClick={() => handleChangeMenu('breakfast')}
					>
						Café da manhã
					</button>
					<button
						disabled={menutype === 'day'}
						onClick={() => handleChangeMenu('day')}
					>
						Dia
					</button>
				</header>

				<h2>Menu</h2>
				<ul>
					{
						menu?.filter(x => x.menu_type === menutype).map((item: any) => (
							<li key={item.id}>
								<p>{item.item_name} - R$ {item.item_price}</p>
								<button onClick={() => handleAddItem(item)}>Adicionar</button>
							</li>
						))
					}
				</ul>

			</S.ContainerMenu>

			<S.ContainerOrder>
				<h2>Resumo do Pedido</h2>
				<label htmlFor="clientName">
					Client Name:

					<input
						type="text"
						id="clientName"
						value={clientName}
						onChange={({ currentTarget }) => setClientName(currentTarget.value)}
					/>
				</label>

				<ul>
					{newOrderItems.map((item) => (
						<li key={item.id}>
							<p>{item.item_name} - R$ {item.item_price} - {item.count}x</p>
							<button onClick={() => handleRemoverItem(item)}>Remover</button>
						</li>
					))}
				</ul>
				<h3>Total: R${getTotalItens()}</h3>

				<button onClick={postOrder}>Adicionar pedido</button>
				<button onClick={cleanValues}>Limpar pedido</button>
			</S.ContainerOrder>
		</S.Container>
	)
}

export default NewOrder;