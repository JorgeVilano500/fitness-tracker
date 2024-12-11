import { Navbar, SideNav } from '@/components';
import { login, signup } from './actions'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Login Signup",
    description: "Login to the fitness tracker page or register now. ",
  };

export default function LoginPage() {
  return (
    <div className="grid grid-cols-10 grid-rows-auto h-auto">
        <Navbar />
        <SideNav />
        
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
    </div>
  )
}