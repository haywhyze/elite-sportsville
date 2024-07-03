import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useFetchBooking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [bookings, setBookings] = useState<any>([]);

  useEffect(() => {
    const now = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(now.getMonth() + 3);

    const unsubscribe = onSnapshot(
      collection(db, 'bookings'),
      (querySnapshot) => {
        const data = querySnapshot.docs
          .map((doc) => {
            const booking = doc.data();
            // Filter selectedTimeSlots within the next 3 months
            const futureTimeSlots = booking.selectedTimeSlots.filter(
              (slot: any) => {
                const slotDate = new Date(slot.date);
                return slotDate >= now && slotDate <= threeMonthsFromNow;
              }
            );

            return futureTimeSlots.length > 0
              ? { id: doc.id, ...booking, selectedTimeSlots: futureTimeSlots }
              : null;
          })
          .filter(Boolean); // Remove null entries

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
