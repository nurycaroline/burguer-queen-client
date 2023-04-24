import Colors from '@/styles/colors';
import styled from 'styled-components';

export const Main = styled.main`
	
`;

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	background-color: ${Colors.black[100]};
	color: ${Colors.white[100]};

	button {
		background-color: ${Colors.black[100]};
		color: ${Colors.white[100]};
		border: 1px solid ${Colors.white[100]};
		padding: 5px 10px;
		border-radius: 5px;
	}
`