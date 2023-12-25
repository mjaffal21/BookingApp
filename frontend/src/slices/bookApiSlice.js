import { apiSlice } from './apiSlice';
import { BOOKINGS_URL } from '../constants';

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: BOOKINGS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Booking'],
    }),
    GetBookings: builder.query({
      query: () => ({
        url: `${BOOKINGS_URL}/list`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Booking'],
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingsQuery } = bookApiSlice;
