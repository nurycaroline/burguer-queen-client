import Colors from '@/styles/colors';
import styled from 'styled-components';

export const Section = styled.section`
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	width: 100%;

	flex-wrap: wrap;
`;


export const GroupMenu = {
	Container: styled.div`
		flex-basis: 50%;
		min-width: 300px;
		height: 420px;
		
		ul {
			height: 400px;
			overflow-y: scroll;
		}
	`,

	Header: styled.header`
		width: 200px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;

		button {
			background: none;
			border: none;
			color: ${Colors.grey[100]};
			
			&:disabled {
				color: ${Colors.black[100]};
				border: none;
				border-bottom: 1px solid ${Colors.black[100]};
				padding: 5px 10px;
				border-radius: 5px;
				cursor: not-allowed;
			}
		}
	`,

	Menu: styled.div`
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	`,

	MenuItem: styled.button`
		background-color: ${Colors.green[100]};
		border: none;
		padding: 10px 15px;
		border-radius: 5px;
	`
}


export const GroupResume = {
	Container: styled.div`
		flex-basis: 50%;

		hr {
			margin: 20px 0;
		}

		ul {
			height: 400px;
			overflow-y: scroll;
		}

		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 5px 0;

			button {
				background-color: ${Colors.red[100]};
			}
		}
	`
}

export const ButttonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	width: 50%;
	gap: 10px;
`

export const Buttton = styled.button`
	background-color: ${Colors.blue[100]};
	border: none;
	padding: 10px 15px;
	border-radius: 5px;
	color: ${Colors.white[100]};
`