import styled from "styled-components";
import Spinner from '../../ui/Spinner';
import {useCabins }from '../cabins/useCabins'
import DurationChart from './DurationChart'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from 'react'
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import {Stats} from "./Stats";
import SalesChart from "./SalesChart";
import TodayActivity from "../check-in-out/TodayActivity";

function DashboardLayout() {
  const {bookings, isLoading: isBookingsLoading}=useRecentBookings()
  const {stays, confirmedStays, isLoading: isStaysLoading, numDays} =useRecentStays();
  const {cabins, isLoading:isCabinLoading}=useCabins();
  if(isBookingsLoading || isStaysLoading) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays} />
      
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
