
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useState} from "react";

export default function TanstackProvider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    // With SSR, we usually want to set some default staleTime
                    // above 0 to avoid refetching immediately on the client
                    staleTime: 5 * 60 * 1000,
                    refetchOnWindowFocus: false,
                },
            },
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
