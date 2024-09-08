import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Toaster, toast } from "sonner";
const programs = [
  {
    id: 1,
    name: "Software Engineering",
    description: "Learn to code and build applications",
  },
  {
    id: 2,
    name: "Data Science",
    description: "Analyze and interpret complex data",
  },
  {
    id: 3,
    name: "Cybersecurity",
    description: "Protect systems and networks from digital attacks",
  },
  {
    id: 4,
    name: "AI & Machine Learning",
    description: "Develop intelligent systems and algorithms",
  },
];

const timeSlots = [
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
];

const ProgramCard = ({ program, onBook }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">{program.name}</h3>
      </CardHeader>
      <CardContent>
        <p>{program.description}</p>
        <div className="mt-4 flex items-center space-x-2">
          <Switch
            id={`book-toggle-${program.id}`}
            onCheckedChange={(checked) => setIsBooking(checked)}
          />
          <label htmlFor={`book-toggle-${program.id}`}>Book Space</label>
        </div>
        {isBooking && (
          <div className="mt-4">
            <h4 className="mb-2 font-semibold">Select Time Slot:</h4>
            {timeSlots.map((slot, index) => (
              <Button
                key={index}
                variant={selectedSlot === slot ? "default" : "outline"}
                className="mr-2 mb-2"
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onBook(program, selectedSlot)}
          disabled={!isBooking || !selectedSlot}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const TechHubBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBooking = (program, timeSlot) => {
    setBookingDetails({ program, timeSlot });
    setIsModalOpen(true);

    // Simulate API call and show success toast after 3 seconds
    setTimeout(() => {
      setIsModalOpen(false);
      setShowToast(true);

      // Hide toast after 3 more seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tech Hub Program Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onBook={handleBooking}
          />
        ))}
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="text-center">
                <p>Generating your booking QR code...</p>
                <div className="my-4">
                  {/* Placeholder QR code */}
                  <img
                    src="/qrcode.png"
                    alt="Placeholder QR Code"
                    className="mx-auto"
                  />
                </div>
                <p>Program: {bookingDetails?.program.name}</p>
                <p>Time Slot: {bookingDetails?.timeSlot}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsModalOpen(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showToast && (
        <Toast
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg"
          onOpenChange={setShowToast}
        >
          Booking successful! Your QR code has been generated.
        </Toast>
      )}
    </div>
  );
};

export default TechHubBooking;
