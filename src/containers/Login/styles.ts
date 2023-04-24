import Colors from '@/styles/colors';
import styled from 'styled-components';

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	color: ${Colors.black[100]};
	background-color: ${Colors.black[100]};

	h1 {
		color: ${Colors.white[100]};
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		height: 150px;
		gap: 20px;
		padding: 20px;
		background-color: ${Colors.white[100]};
		margin-top: 20px;
		border-radius: 10px;
		width: 310px;
	}
`;

export const ButtonSend = styled.input`
	color: ${Colors.white[100]};
	background-color: ${Colors.black[100]};
	border: none;
	padding: 5px 10px;
`

export const Input = styled.input`
	width: 200px;
`