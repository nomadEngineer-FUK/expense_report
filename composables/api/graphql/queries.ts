

import { gql } from '@apollo/client/core';

// ユーザー
export const GET_USERS = gql`
    query GetUsers {
        getUsers {
            id
            username
            mail
            role
        }
    }
`

// 部門
export const GET_DEPARTMENTS = gql`
    query GetDepartments {
        getDepartments {
            id
            name
        }
    }
`

// 会計科目
export const GET_ACCOUNTING_ITEMS = gql`
    query GetAccountingItems {
        getAccountingItems {
            id
            name
        }
    }
`

