import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { GET_ORDER_BY_ORDER_NUMBER_QUERY } from './graphql/queries';
import { OrderStatusEnum } from './models/order-status.enum';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

const mocks = [
    {
        request: {
            query: GET_ORDER_BY_ORDER_NUMBER_QUERY,
            variables: {
                id: 1
            }
        },
        result: {
            data: {
                order: {
                    id: 1,
                    orderNumber: 12345,
                    status: OrderStatusEnum.IN_PROGRESS,
                    createdAt: "2022-09-12T16:36:17.096Z",
                    updatedAt: "2022-09-12T16:36:17.096Z",
                }
            }
        }
    }
];

describe('App', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly',  () => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <App />
            </MockedProvider>
        );
        expect(container).toBeInTheDocument();
        const button = screen.getByText('Search')
        const input = screen.getByLabelText(/^Order Number/i);
        expect(button).toBeDisabled();
        expect(input).toBeInTheDocument();
    });

    it('should display json data', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <App />
            </MockedProvider>
        );
        const button = screen.getByText('Search')
        const input = screen.getByLabelText(/^Order Number/i);

        await userEvent.type(input, '1');
        await waitFor(() =>
            expect(button).toBeEnabled()
        );
        fireEvent.click(button);
        expect(await screen.findByText('Loading data...')).toBeInTheDocument();
        await waitFor(async () =>
            expect(await screen.findByTestId("json-text"))
                .toHaveTextContent(
                    '{ "id": 1, "orderNumber": 12345, "status": "IN_PROGRESS", "createdAt": "2022-09-12T16:36:17.096Z", "updatedAt": "2022-09-12T16:36:17.096Z" }'
                )
        );
    })
})
