'use client';

import React from 'react';
import Link from 'next/link';
import { Input } from './ui/input';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  const services = ['Home', 'About', 'Career', 'Pricing', 'Solutions'];
  const docs = ['Help Center', 'Contact', 'FAQ', 'Privacy Policy'];

  const navLink = (label: string) => (
    <Link
      href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
      className='hover:underline transition-colors'
    >
      {label}
    </Link>
  );

  return (
    <footer className='flex flex-col gap-6 px-10 py-8 bg-gray-100 dark:bg-zinc-900 text-sm'>
      {/* Top Section */}
      <div className='flex flex-col md:flex-row justify-between gap-10'>
        {/* Brand + Newsletter */}
        <div className='flex flex-col gap-3 max-w-md'>
          <h3 className='text-xl font-semibold'>ChopChop R.</h3>
          <p>Stay in the loop — Sign up for updates from ChopChop R.</p>
          <Input
            type='email'
            placeholder='Enter your email'
            className='border rounded-2xl px-3 py-2'
          />
        </div>

        {/* Navigation */}
        <div className='flex flex-wrap gap-10'>
          <div>
            <h4 className='font-semibold mb-2'>Service</h4>
            <ul className='flex flex-col gap-1'>
              {services.map(item => (
                <li key={item}>{navLink(item)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>Documentation</h4>
            <ul className='flex flex-col gap-1'>
              {docs.map(item => (
                <li key={item}>{navLink(item)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>Social</h4>
            <div className='flex gap-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebook className='w-5 h-5 hover:text-blue-600 transition-colors' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram className='w-5 h-5 hover:text-pink-500 transition-colors' />
              </a>
              <a
                href='https://tiktok.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTiktok className='w-5 h-5 hover:text-black dark:hover:text-white transition-colors' />
              </a>
              <a
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube className='w-5 h-5 hover:text-red-600 transition-colors' />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='flex justify-between items-center border-t pt-4 text-xs dark:border-amber-400'>
        <span>© 2025 ChopChop R. All rights reserved.</span>
        <Link href='/terms' className='hover:underline'>
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
