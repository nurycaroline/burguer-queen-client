import styled from "styled-components";

export const DetailOrder = styled.details`
	summary {
		font-size: 20px;
		font-weight: bold;
		cursor: pointer;
	}

	p	{
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20px;
	}
`

export const DetailOrderContent = styled.div`
	margin: 20px;

	label {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 10px;

		display: flex;

		span {
			display: block;
			margin-left: 10px;
		}

		input {
			margin-left: 10px;
		}
	}

	ul {
		li {
			margin: 5px 0;
			list-style: none;
		}
	}
`