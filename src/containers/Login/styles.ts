import styled from 'styled-components';

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	color: #333;
	background-color: #333;

	h1 {
		color: #fff;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		height: 150px;
		gap: 20px;
		padding: 20px;
		background-color: #fff;
		margin-top: 20px;
		border-radius: 10px;
		width: 310px;
	}
`;

export const ButtonSend = styled.input`
	color: #fff;
	background-color: #333;
	border: none;
	padding: 5px 10px;
`

export const Input = styled.input`
	width: 200px;
`