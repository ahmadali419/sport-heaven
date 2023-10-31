/* eslint-disable react/no-unescaped-entities */
"use client"
import { Flex, Text, Button, Card, Box, Avatar, Heading, Strong } from '@radix-ui/themes';
import * as Separator from '@radix-ui/react-separator';
import Image from 'next/image';
import NavbarStore from '@/components/NavbarStore';
import HeroSection from '@/components/HeroSection';
export default function Home() {
  return (
    <main>
      <NavbarStore />
      <HeroSection />
    </main>
  )
}
