'use client';
import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
const clothingItems = [
  {
    id: 1,
    name: 'Elegant Maxi Dress',
    category: 'dress',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
    trending: false,
    inWardrobe: true,
  },
  {
    id: 2,
    name: 'Summer Blue Dress',
    category: 'dress',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
    trending: true,
    inWardrobe: true,
  },
  // Add more items as needed
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const trending = searchParams.get('trending');
  const wardrobe = searchParams.get('wardrobe');

  let filteredItems = clothingItems;

  if (category) {
    filteredItems = filteredItems.filter((item) => item.category === category);
  }

  if (trending === 'true') {
    filteredItems = filteredItems.filter((item) => item.trending);
  }

  if (wardrobe === 'true') {
    filteredItems = filteredItems.filter((item) => item.inWardrobe);
  }

  return NextResponse.json(filteredItems);
}

export async function POST(request: Request) {
  const body = await request.json();

  // Add new clothing item logic here
  const newItem = {
    id: Date.now(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  // In a real app, save to database
  clothingItems.push(newItem);

  return NextResponse.json(newItem, { status: 201 });
}
