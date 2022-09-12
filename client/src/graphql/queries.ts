import { gql } from '@apollo/client';
import { OrderModel } from '../models/order.model';

export const GET_ORDER_BY_ORDER_NUMBER_QUERY = gql`
    query GetOrders($id: Int!) {
        order(id: $id) {
            id,
            orderNumber,
            status,
            createdAt,
            updatedAt,
        }
    }
`;

export type OrderData = { order: OrderModel };
export type OrderVariable = { id?: number };
