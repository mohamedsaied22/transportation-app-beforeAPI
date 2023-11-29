"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import Link from "next/link";
import { CalendarDays, ShieldX , CheckSquare} from "lucide-react";
import { Card } from "@/components/ui/card";
import TruckData from "../components/bookingData";
import { v4 as uuidv4 } from "uuid";
// import UpdateBooking from "../components/booking-update";

const BookingInfo = ({ params }) => {
  const [booking, setBooking] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [filteredTrucks, setFilteredTrucks] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const id = params.id;

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("Bookings")) || [];
    const foundBooking = bookings.find((c) => c.id === id);

    if (foundBooking) {
      setBooking(foundBooking);
      const bookingTrucks =
        JSON.parse(localStorage.getItem(`trucks_${id}`)) || [];
      foundBooking.trucks = bookingTrucks.length;
      setFilteredBookings(bookings);
    }

    const bookingTrucks =
      JSON.parse(localStorage.getItem(`trucks_${id}`)) || [];
    setTrucks(bookingTrucks);
    setFilteredTrucks(bookingTrucks);
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  const handleTruckCreated = (newTruck) => {
    newTruck.id = uuidv4();
    const updatedTrucks = [...trucks, newTruck];
    setTrucks(updatedTrucks);
    localStorage.setItem(`trucks_${id}`, JSON.stringify(updatedTrucks));

    const updatedBooking = {
      ...booking,
      trucks: booking.trucks + 1,
    };
    setBooking(updatedBooking);
    localStorage.setItem(`booking_${id}`, JSON.stringify(updatedBooking));

    setFilteredBookings((prevState) => {
      const index = prevState.findIndex((v) => v.id === updatedBooking.id);
      if (index !== -1) {
        prevState[index] = updatedBooking;
      }
      return [...prevState];
    });
  };

  const handleUpdateTruck = (updatedTruck) => {
    const truckIndex = trucks.findIndex(
      (truck) => truck.id === updatedTruck.id
    );

    if (truckIndex !== -1) {
      const updatedTrucks = [...trucks];
      updatedTrucks[truckIndex] = updatedTruck;
      setTrucks(updatedTrucks);

      const filteredTrucksIndex = filteredTrucks.findIndex(
        (truck) => truck.id === updatedTruck.id
      );

      if (filteredTrucksIndex !== -1) {
        const updatedFilteredTrucks = [...filteredTrucks];
        updatedFilteredTrucks[filteredTrucksIndex] = updatedTruck;
        setFilteredTrucks(updatedFilteredTrucks);
        localStorage.setItem(`trucks_${id}`, JSON.stringify(updatedTrucks));
      }
    }
  };

  const handleUpdateBooking = (updatedBooking) => {
    setBooking(updatedBooking);

    const bookingIndex = filteredBookings.findIndex(
      (booking) => booking.id === updatedBooking.id
    );

    if (bookingIndex !== -1) {
      const updatedBookings = [...filteredBookings];
      updatedBookings[bookingIndex] = updatedBooking;
      setFilteredBookings(updatedBookings);
      localStorage.setItem("Bookings", JSON.stringify(updatedBookings));
    }
  };

  return (
    <div>
    <Link href="/booking">
      <Heading
        title="Booking Management"
        description="Monitor all bookings in one place."
        icon={CalendarDays}
        iconColor="text-sky-400"
      />
    </Link>

    <div className="px-4 md:px-12 lg:px-32 space-y-4 grid  xl:grid-cols-2 gap-4">
      <Card className=" p-4 border-black/5 flex flex-col mt-4 shadow-md hover:shadow-xl transition rounded-2xl ">
      <div className="  flex items-center justify-center mb-4  ">
              <div className="w-full ">
                <div className="flex text-lg  mb-2 bg-gray-100 shadow-xl p-2 items-center justify-center rounded-t-2xl font-semibold">
                  <div className="text-left ">Booking Number: </div>
                  <div className="flex ml-2 ">
                    {booking.bookingNumber || "..........."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">Work Order:</div>
                  <div className="text-right ">
                    {booking.workOrder || "..........."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">Vessel:</div>
                  <div className="text-right ">
                    {booking.vessel || "..........."}
                  </div>
                </div>
                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-sm">Cargo:</div>
                  <div className="text-right ">
                    {booking.cargo || "..........."}
                  </div>
                </div>
                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-sm">Sub Cargo:</div>
                  <div className="text-right ">
                    {booking.subCargo || "..........."}
                  </div>
                </div>
                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-sm">IMEX:</div>
                  <div className="text-right ">
                    {booking.IMEX || "..........."}
                  </div>
                </div>
                {/* <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-sm">Number of Trucks:</div>
                  <div className="text-right ">
                    {booking.numberOfTrucks || "..........."}
                  </div>
                </div> */}
                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-sm">Opened At:</div>
                  <div className="text-right text-sm ">
                    {new Date(booking.openedAt).toLocaleDateString()}{" "}
                    <br />
                    {new Date(booking.openedAt).toLocaleTimeString() ||
                      "............."}
                  </div>
                </div>

                <div className="flex justify-between shadow-md p-2 ">
                  <div className="text-left text-sm">Status:</div>
                  <div className="text-right ">
                    {booking.status === "Closed" ? (
                      <>
                        <span className="text-red-500 flex items-center justify-center font-semibold">
                        <ShieldX className="mr-1" />                            Closed
                        </span>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.closedAt).toLocaleDateString()}{" "}
                          {new Date(booking.closedAt).toLocaleTimeString() ||
                            "............."}
                        </div>
                      </>
                    ) : (
                      <div className=" flex items-center mt-4 ">
                      <span className="text-green-500 font-semibold mr-1 ">
                        <CheckSquare />                        </span>
                      Open
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

        {/* <div className="flex justify-center mt-2">
          <UpdateBooking
            booking={booking}
            onUpdateBooking={handleUpdateBooking}
          />
                <CloseBooking
              booking={booking}
              onBookingClosed={handleBookingClosed}
            />
        </div> */}
      </Card>
    </div>
    <div>
    <TruckData
      trucks={filteredTrucks}
      onTruckCreated={handleTruckCreated}
      onUpdateTruck={handleUpdateTruck} // Pass the function here
    />
    </div>
  </div>
  );
};

export default BookingInfo;
