// share logic

import { useQuery } from "@tanstack/react-query";

export default function useQueryCard(key, fn) {
    return useQuery({
        queryKey: [key],
        queryFn: fn,
        select: (data) => data?.data  // استخدام 'data' بدلاً من 'date'
    });
}
