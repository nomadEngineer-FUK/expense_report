import { ApolloClient } from '@apollo/client/core';

declare module '#app' {
    interface NuxtApp {
        $apolloClient: ApolloClient<unknown>;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $apolloClient: ApolloClient<unknown>;
    }
}
