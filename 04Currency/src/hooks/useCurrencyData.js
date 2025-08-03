    import { useEffect, useState } from 'react';

    const useCurrencyInfo = (currency) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchCurrency = async () => {
        setLoading(true);
        try {
            const res = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`,
            { signal: controller.signal }
            );
            const result = await res.json();
            setData(result[currency.toLowerCase()]);
        } catch (err) {
            if (err.name !== 'AbortError') {
            console.error('Failed to fetch currency info:', err);
            }
        } finally {
            setLoading(false);
        }
        };

        fetchCurrency();
        return () => controller.abort();
    }, [currency]);

    return { data, loading };
    };

    export default useCurrencyInfo;