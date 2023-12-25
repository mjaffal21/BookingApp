import { apiSlice } from './apiSlice';
import { PLACES_URL, UPLOAD_URL } from '../constants';

export const placeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    photoUpload: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    createPlace: builder.mutation({
      query: (data) => ({
        url: PLACES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Place'],
    }),
    getUserPlaces: builder.query({
      query: () => ({
        url: `${PLACES_URL}/user-places`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Place'],
    }),
    getUserPlaceById: builder.query({
      query: (id) => ({
        url: `${PLACES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updatePlaceById: builder.mutation({
      query: (data) => ({
        url: `${PLACES_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Place'],
    }),
    getPlaces: builder.query({
      query: () => ({
        url: `${PLACES_URL}/list`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Place'],
    }),
    getSinglePlace: builder.query({
      query: (id) => ({
        url: `${PLACES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Place'],
    }),
  }),
});

export const {
  usePhotoUploadMutation,
  useCreatePlaceMutation,
  useGetUserPlacesQuery,
  useGetUserPlaceByIdQuery,
  useUpdatePlaceByIdMutation,
  useGetPlacesQuery,
  useGetSinglePlaceQuery,
} = placeApiSlice;
