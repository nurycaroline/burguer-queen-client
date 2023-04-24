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
	const [menutype, setMenuType] = useState<'lunch' | 'breakfast'>('breakfast');

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

	const handleChangeMenu = (type: 'lunch' | 'breakfast') => {
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
		<S.Section>
			<S.GroupMenu.Container>
				<S.GroupMenu.Header>
					<button
						disabled={menutype === 'breakfast'}
						onClick={() => handleChangeMenu('breakfast')}
					>
						Café da manhã
					</button>
					<button
						disabled={menutype === 'lunch'}
						onClick={() => handleChangeMenu('lunch')}
					>
						Almoço
					</button>
				</S.GroupMenu.Header>

				<S.GroupMenu.Menu>
					{
						menu?.filter(x => x.menu_type === menutype).map((item: any) => (
							<S.GroupMenu.MenuItem
								key={item.id}
								onClick={() => handleAddItem(item)}
							>
								<p>{item.item_name} - R$ {item.item_price}</p>
							</S.GroupMenu.MenuItem>
						))
					}
				</S.GroupMenu.Menu>

			</S.GroupMenu.Container>

			<S.GroupResume.Container>
				<h2>Resumo do Pedido</h2>
				<label htmlFor="clientName">
					<span>Nome do cliente:</span>

					<input
						type="text"
						id="clientName"
						value={clientName}
						onChange={({ currentTarget }) => setClientName(currentTarget.value)}
					/>
				</label>

				<hr />

				<ul>
					{newOrderItems.map((item) => (
						<li key={item.id}>
							<span>{item.item_name} - R$ {item.item_price} - {item.count}x</span>
							<S.Buttton onClick={() => handleRemoverItem(item)}>Remover</S.Buttton>
						</li>
					))}
				</ul>
				<h3>Total: R${getTotalItens()}</h3>

				<S.ButttonGroup>
					<S.Buttton onClick={postOrder}>Adicionar pedido</S.Buttton>
					<S.Buttton onClick={cleanValues}>Limpar pedido</S.Buttton>
				</S.ButttonGroup>
			</S.GroupResume.Container>
		</S.Section>
	)
}

export default NewOrder;