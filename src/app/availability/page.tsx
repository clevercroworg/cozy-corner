import type { Metadata } from "next";
import { PageHeader } from "@/components/ornaments";
import { photos } from "@/lib/gallery";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = { title: "Availability" };

export default function AvailabilityPage() {
  return (
    <>
      <PageHeader
        photo={photos.hallArches}
        eyebrow="Book the hall"
        title="Check Availability"
      />
      <section className="container-x py-16 md:py-20">
        <div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
