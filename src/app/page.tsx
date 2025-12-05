import { redirect } from 'next/navigation';

// Root page redirects to casual view
// This is a fallback - middleware handles the actual routing
export default function Home() {
  redirect('/casual');
}
