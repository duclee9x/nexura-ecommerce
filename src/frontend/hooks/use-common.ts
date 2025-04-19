import { useQueryClient } from "@tanstack/react-query"

export const useQueryUtils = () => {
    const queryClient = useQueryClient()
    return {
        invalidateQueries: (queryKey: string[]) => {
            queryClient.invalidateQueries({ queryKey: queryKey })
        }
    }
}

