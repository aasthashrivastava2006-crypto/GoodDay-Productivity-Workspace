import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} GoodDay. All rights reserved.</p>
        <p className="text-sm mt-1">
          Contact us: <a href="mailto:support@goodday.app" className="underline">support@goodday.app</a> | 
          <a href="tel:+1234567890" className="underline">+1 (234) 567-890</a>
        </p>
      </div>
    </footer>
  );
}
