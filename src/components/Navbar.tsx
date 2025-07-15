import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Plan your wedding', path: '/services', hasDropdown: true },
    { name: 'Expert advice', path: '/about' },
    { name: 'Find a couple', path: '/gallery' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm text-center">
        <span className="font-medium">Matson Baby</span>
        <span className="mx-4">Matson Home</span>
        <span>Matson for vendors</span>
      </div>

      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-foreground'
                  } ${item.hasDropdown ? 'flex items-center' : ''}`}
                >
                  {item.name}
                  {item.hasDropdown && <span className="ml-1">▼</span>}
                </Link>
              ))}
            </div>

            {/* Logo - Centered */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/lovable-uploads/dc1e0084-194d-4369-b13d-34b7f7d3629e.png" 
                alt="Matson Cards" 
                className="h-14 w-auto object-contain group-hover:scale-105 transition-smooth" 
              />
            </Link>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Log in
              </Button>
              <Button size="sm" className="bg-matson-black hover:bg-matson-black/90 text-white rounded-full px-6">
                Get started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-border py-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium py-2 px-4 rounded-md transition-colors hover:bg-muted ${
                      isActive(item.path) ? 'text-primary bg-muted' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 pt-4 space-y-2">
                  <Button variant="outline" className="w-full rounded-full">
                    Log in
                  </Button>
                  <Button className="w-full bg-matson-black hover:bg-matson-black/90 text-white rounded-full">
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;