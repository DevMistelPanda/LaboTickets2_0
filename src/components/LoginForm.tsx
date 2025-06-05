
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const LoginForm = () => {

  return (
    <section className="bg-party-light min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h1 className="text-2xl font-bold text-party-dark mb-6">Login</h1>
    <form>
        <div className="mb-4">
            <label className="block text-party-dark mb-2" htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                className="w-full p-2 border border-party-gray rounded"
                placeholder="Enter your email"
            />
        </div>
        <div className="mb-6">
            <label className="block text-party-dark mb-2" htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                className="w-full p-2 border border-party-gray rounded"
                placeholder="Enter your password"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-party-purple hover:bg-party-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Login
        </button>
    </form>
    </div>  
    </section>
  );
};

export default LoginForm;
