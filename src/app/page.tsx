import { TodoContainer } from '@/components/TodoContainer';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Testes com Vitest e Playwright',
};

export default function Home() {
  return <TodoContainer />;
}
