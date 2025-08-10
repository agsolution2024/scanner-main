import { Button } from '../atoms/button';
import { ButtonGroup } from '../molecules/button-group';
import Link from 'next/link';

interface HeaderProps {
  username?: string;
}

export const Header = ({ username }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">RLIFE</Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </nav>

          <ButtonGroup>
            {username ? (
              <>
                <span className="text-gray-700">Welcome, {username}</span>
                <Button variant="outline" size="sm">Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">Login</Button>
                <Button variant="default" size="sm">Sign Up</Button>
              </>
            )}
          </ButtonGroup>
        </div>
      </div>
    </header>
  );
};

export default Header; 