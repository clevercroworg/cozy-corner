import type { Metadata } from "next";
import { PageHeader } from "@/components/ornaments";
import { photos } from "@/lib/gallery";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = { title: "Book the Venue" };

export default function BookPage() {
  return (
    <>
      <PageHeader
        photo={photos.hallArches}
        eyebrow="Booking enquiry"
        title="Book the Venue"
      />
      <section className="container-x py-16 md:py-20">
        <div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
