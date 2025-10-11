import { AuthForm } from '@/components';

export default function Login() {
  const handleSubmit = ( data ) => {
    console.log(data);
  };

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 rounded-box bg-base-100 p-6 shadow-lg">
      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">Signup</h1>
      </header>

      <AuthForm type="signup" onSubmit={handleSubmit} />
    </section>
  );
}
