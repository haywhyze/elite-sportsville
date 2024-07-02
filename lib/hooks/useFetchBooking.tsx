import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useFetchBooking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [bookings, setBookings] = useState<{ id: string }[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'bookings'),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(data);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { isLoading, error, bookings };
};
