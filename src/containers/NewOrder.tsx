import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { MenuItem } from '@/types/MenuItem';
import { FirebaseApp } from 'firebase/app';

type NewOrderProps = {
	menu: MenuItem[];
	app: FirebaseApp;
}

const NewOrder = ({ menu, app }: NewOrderProps) => {
	const db = getFirestore(app);

	const [newOrderItems, setNewOrderItems] = useState<any[]>([]);
	const [clientName, setClientName] = useState<string>('');
	const [menutype, setMenuType] = useState<'day' | 'breakfast'>('breakfast');

	const getTotalItens = () => {
		return newOrderItems.reduce((acc, item) => {
			return acc + item.item_price
		}, 0)
	}

	const handleAddItem = (newItem: any) => {
		setNewOrderItems([...newOrderItems, newItem])
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
			alert('Preencha o nome do cliente')
			return false
		}

		if (newOrderItems.length === 0) {
			alert('Adicione ao menos um item')
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
				items: newOrderItems.map(x => x.id),
				total,
				created_at: new Date(),
			}
			addDoc(collection(db, 'order'), body)
			cleanValues()
		}
	}

	return (
		<>
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

			<br />

			<details open>
				<summary>Menu</summary>
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
			</details>
			<details open>
				<summary><h2>Resumo do Pedido</h2></summary>
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
							<p>{item.item_name} - R$ {item.item_price}</p>
							<button onClick={() => handleRemoverItem(item)}>Remover</button>
						</li>
					))}
				</ul>
				<h3>Total: {getTotalItens()}</h3>

				<button onClick={postOrder}>Adicionar pedido</button>
			</details>
		</>
	)
}

export default NewOrder;