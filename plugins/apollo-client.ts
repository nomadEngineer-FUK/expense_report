import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client/core'
import { defineNuxtPlugin } from '#app'

// モックリンクの作成
const mockLink = new ApolloLink((operation) => {
    // ユーザー一覧のモックレスポンス
    const mockData = {
        getUsers: [
            { id: 1, username: 'User1', mail: 'user1@example.com', role: 'admin' },
            { id: 2, username: 'User2', mail: 'user2@example.com', role: 'user' },
            { id: 3, username: 'User3', mail: 'user3@example.com', role: 'admin' },
            { id: 4, username: 'User4', mail: 'user4@example.com', role: 'user' }
        ],
        getDepartments: [
            { id: 1, name: '取締役' },
            { id: 2, name: '人事総務' },
            { id: 3, name: '財務経理' },
            { id: 4, name: 'システム開発' },
            { id: 5, name: '営業' },
            { id: 6, name: '企画' }
        ],
        getAccountingItems: [
            { id: 1, name: '会議費' },
            { id: 2, name: '旅費交通費' },
            { id: 3, name: '接待交際費' },
            { id: 4, name: '消耗品費' },
            { id: 5, name: '通信費' }
        ]
    }

    return new Observable((observer) => {
        observer.next({ data: mockData })
        observer.complete()
    })
})

export default defineNuxtPlugin(() => {
    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        link: mockLink
    })

    return {
        provide: {
            apollo: apolloClient
        }
    }
})
