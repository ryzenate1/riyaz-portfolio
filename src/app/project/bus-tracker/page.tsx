import { Container } from '@/components/ui/container';
import { ScrollProgress } from '@/components/scroll-progress';
import ContactSection from '@/components/sections/contact';
import Link from 'next/link';
import Image from 'next/image';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLE Bus Tracker ― Projects',
  description: 'Smart India Hackathon project — BLE & LoRa based real-time bus tracking system.',
};

export default function BusTrackerProject() {
  return (
    <>
      <ScrollProgress />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16">
          <Container>
            <Link href="/#work" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
              ← Back to work
            </Link>
            
            <div className="mt-8 mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">IoT</span>
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">BLE</span>
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">LoRa</span>
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">Hackathon</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-medium text-neutrals-100 mb-4">BLE Bus Tracker</h1>
              <p className="text-lg text-neutrals-400 max-w-2xl">
                Smart India Hackathon project — A BLE and LoRa based real-time bus tracking system 
                for efficient public transportation management.
              </p>
            </div>

            {/* Project Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutrals-900 border border-neutrals-800 mb-16">
              <Image
                src="/projects/bus-tracker.jpg"
                alt="BLE Bus Tracker - IoT Transportation System"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Role</h3>
                <p className="text-neutrals-200">IoT Developer & Team Lead</p>
              </div>
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Event</h3>
                <p className="text-neutrals-200">Smart India Hackathon</p>
              </div>
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Tech Stack</h3>
                <p className="text-neutrals-200">ESP32, BLE, LoRa, React Native, Node.js</p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl">
              <h2 className="text-2xl font-medium text-neutrals-100 mb-6">About the Project</h2>
              <div className="space-y-4 text-neutrals-400">
                <p>
                  This Smart India Hackathon project addresses the challenge of real-time public 
                  transportation tracking in areas with limited connectivity using a hybrid 
                  BLE (Bluetooth Low Energy) and LoRa communication approach.
                </p>
                <p>
                  The system uses BLE beacons at bus stops to detect approaching buses, 
                  while LoRa provides long-range communication to a central server. 
                  This enables accurate ETA predictions even in remote areas without 
                  reliable cellular coverage.
                </p>
                <p>
                  Key innovations include ultra-low power consumption, mesh network capabilities, 
                  and a companion mobile app for commuters to track bus locations in real-time.
                </p>
              </div>

              <h2 className="text-2xl font-medium text-neutrals-100 mb-6 mt-12">Technical Highlights</h2>
              <ul className="space-y-3 text-neutrals-400">
                <li className="flex items-start gap-3">
                  <span className="text-neutrals-500 mt-1">—</span>
                  <span>ESP32 microcontrollers for bus-mounted tracking devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutrals-500 mt-1">—</span>
                  <span>LoRa WAN for 10+ km range communication</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutrals-500 mt-1">—</span>
                  <span>BLE 5.0 for precise stop detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutrals-500 mt-1">—</span>
                  <span>Solar-powered bus stop beacons</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutrals-500 mt-1">—</span>
                  <span>Real-time dashboard for transport authorities</span>
                </li>
              </ul>
            </div>
          </Container>
        </section>

        <ContactSection />
      </main>
    </>
  );
}
