import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const useFetchPricing = () => {
  const [pricingData, setPricingData] = useState<any>({
    morning: 8000,
    afternoon: 5000,
    evening: 10000,
    night: 15000,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const pricingCollectionRef = collection(db, 'pricing'); // Replace 'pricing' with your Firestore collection name
        const pricingSnapshot = await getDocs(pricingCollectionRef);
        const [pricingData] = pricingSnapshot.docs.map((doc) => doc.data());
        setPricingData(pricingData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  return {
    pricing: pricingData,
    isLoading,
    error,
  };
};

export default useFetchPricing;
