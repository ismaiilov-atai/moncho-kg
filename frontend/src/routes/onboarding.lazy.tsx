import OnboardingWith from '@/components/custom/boarding/Onboarding';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/onboarding')({
  component: RouteComponent,
});

function RouteComponent() {
  return <OnboardingWith />;
}
