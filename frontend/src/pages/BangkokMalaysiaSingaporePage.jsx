import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Building, Ship, Palmtree, Camera, Mountain, Landmark, Waves, TreePine } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "/images/bangkok/bangkok.jpg";
const ABOUT_IMG = "/images/bangkok/wat-phra-kaew.jpg";
const CTA_BG = "/images/bangkok/singapore.jpg";

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '4 to 15 Days' },
  { icon: MapPin, label: 'Countries', value: 'Up to 5 Countries' },
  { icon: Heart, label: 'Trip Type', value: 'International' },
  { icon: Users, label: 'Ideal For', value: 'All Travelers' },
];

const DESTINATIONS = [
  { name: 'Singapore', desc: 'Lion City with Marina Bay, Gardens by the Bay, Sentosa Island & Night Safari.', icon: Building, image: '/images/bangkok/singapore.jpg' },
  { name: 'Bangkok', desc: 'Golden temples, Grand Palace, Safari World & Baiyoke Sky Tower.', icon: Landmark, image: '/images/bangkok/bangkok.jpg' },
  { name: 'Pattaya', desc: 'Coral Island, Alcazar Show, Nong Nooch Village & Mini Siam.', icon: Palmtree, image: '/images/bangkok/pattaya.jpg' },
  { name: 'Malaysia', desc: 'Petronas Twin Towers, Genting Highlands & Batu Caves.', icon: Mountain, image: '/images/bangkok/malaysia.jpg' },
  { name: 'Hong Kong', desc: 'Victoria Peak, Disneyland, Avenue of Stars & Aberdeen.', icon: Camera, image: '/images/bangkok/hongkong.jpg' },
  { name: 'Macau', desc: 'Ruins of St. Paul, A-Ma Temple & world-class casinos.', icon: Waves, image: '/images/bangkok/macau.jpg' },
];

const TOURS = {
  bmsm: {
    label: 'BMS Full (11D)',
    sublabel: '10N / 11 Days',
    destinations: 'Bangkok, Pattaya, Malaysia, Singapore',
    description: 'Experience all four amazing destinations in one incredible journey!',
    days: [
      { day: 'Day 1', title: 'Mumbai - Bangkok - Pattaya', details: 'Report 3 hrs before flight at Chhatrapati Shivaji Terminal. Depart to Bangkok. On arrival, proceed to Pattaya. Hotel check-in. Evening see Alcazar Show.', highlights: ['Alcazar Show', 'Pattaya'], stay: 'Pattaya' },
      { day: 'Day 2', title: 'Pattaya', details: 'Visit Coral Island by Speed Boat, enjoy Parasailing and Glass bottom boat ride. Evening visit Gems factory and Mini Siam. Enjoy authentic Thai Massage.', highlights: ['Coral Island', 'Mini Siam', 'Thai Massage'], stay: 'Pattaya' },
      { day: 'Day 3', title: 'Pattaya - Bangkok', details: 'Visit Nong Nooch Village - Thai Cultural Show and Elephant Show. Afternoon proceed to Bangkok. Enjoy dinner on Chao Praya River Cruise.', highlights: ['Nong Nooch Village', 'River Cruise'], stay: 'Bangkok' },
      { day: 'Day 4', title: 'Bangkok - Safari World', details: 'Proceed to Safari World. Safari Park - Wild Life Safari, Marine Park - Orang Utan Boxing Show, Sea Lion Show, Stunt Man Show, Dolphins Show, Spy War Show.', highlights: ['Safari World', 'Wildlife Safari'], stay: 'Bangkok' },
      { day: 'Day 5', title: 'Bangkok Temple Tour', details: 'Bangkok Temple tour - Golden Buddha, Reclining Buddha and Principle Buddha. Enjoy aerial view from Baiyoke Sky Tower. Free time for shopping.', highlights: ['Grand Palace', 'Baiyoke Tower', 'Shopping'], stay: 'Bangkok' },
      { day: 'Day 6', title: 'Bangkok - Genting Highlands', details: 'Proceed to airport. Depart to Kuala Lumpur by flight. On arrival, proceed to Genting Highlands. Climb by Cable Car (Southeast Asia\'s longest). Evening visit Casino.', highlights: ['Genting Highlands', 'Cable Car', 'Casino'], stay: 'Genting Highlands' },
      { day: 'Day 7', title: 'Genting Highlands', details: 'Enjoy Genting Highlands Outdoor Theme Park - Monorail Ride, Corkscrew, Space Shot, Roller Coaster, Go Carting, Water Splash.', highlights: ['Theme Park', 'Roller Coaster', 'Water Splash'], stay: 'Genting Highlands' },
      { day: 'Day 8', title: 'Genting - Kuala Lumpur', details: 'Proceed to Kuala Lumpur for City orientation tour - Batu Caves, Kings Palace, Petronas Twin Tower, KL Tower (Photo Stop), National Monument, Merdeka Square. Visit Chocolate Factory Outlets.', highlights: ['Petronas Towers', 'Batu Caves', 'Shopping'], stay: 'Kuala Lumpur' },
      { day: 'Day 9', title: 'Kuala Lumpur - Singapore', details: 'Proceed to Singapore by bus. Arrival, Hotel check in. Evening Night Safari - world\'s first nocturnal wildlife park.', highlights: ['Night Safari', 'Singapore'], stay: 'Singapore' },
      { day: 'Day 10', title: 'Singapore', details: 'Visit Jurong Bird Park - Panorail Ride, Penguin Parade, Flamingo pool. Afternoon visit Sentosa Island - Images of Singapore (Wax Museum), Underwater World and Song of the Sea.', highlights: ['Jurong Bird Park', 'Sentosa Island', 'Underwater World'], stay: 'Singapore' },
      { day: 'Day 11', title: 'Singapore - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends with beautiful memories.', highlights: ['Departure'], stay: '' },
    ]
  },
  bangkok_pattaya: {
    label: 'Bangkok Pattaya (7D)',
    sublabel: '6N / 7 Days',
    destinations: 'Bangkok, Pattaya',
    description: 'Perfect for a quick Thailand getaway with culture, beaches & entertainment.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Bangkok', details: 'Report 3 hrs before flight. Depart to Bangkok. Arrival. Hotel check-in.', highlights: ['Bangkok'], stay: 'Bangkok' },
      { day: 'Day 2', title: 'Bangkok - Pattaya', details: 'Proceed to Pattaya. Hotel check-in. Afternoon sightseeing - Nong Nooch Village, Thai Cultural Show, Elephant Show, Mini Siam.', highlights: ['Nong Nooch', 'Mini Siam'], stay: 'Pattaya' },
      { day: 'Day 3', title: 'Pattaya', details: 'Visit Coral Island by Speed Boat. Enjoy Parasailing and Glass Bottom boat ride. Evening see Alcazar Show. Enjoy Thai Massage.', highlights: ['Coral Island', 'Alcazar Show'], stay: 'Pattaya' },
      { day: 'Day 4', title: 'Pattaya - Bangkok', details: 'Proceed to Gems factory. Afternoon proceed to Bangkok. Hotel check-in.', highlights: ['Gems Factory', 'Bangkok'], stay: 'Bangkok' },
      { day: 'Day 5', title: 'Bangkok Temple Tour', details: 'Bangkok Temple tour - Golden Buddha, Reclining Buddha, Principle Buddha. Enjoy Baiyoke Sky Tower view. Evening Chao Praya River Cruise dinner.', highlights: ['Grand Palace', 'River Cruise'], stay: 'Bangkok' },
      { day: 'Day 6', title: 'Bangkok - Safari World', details: 'Proceed to Safari World - Wild Life Safari, Marine Park, Orang Utan Boxing Show, Sea Lion Show, Dolphins Show. After dinner proceed to airport.', highlights: ['Safari World'], stay: 'In Flight' },
      { day: 'Day 7', title: 'Bangkok - Mumbai', details: 'Early morning arrival at Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  singapore_malaysia: {
    label: 'Singapore Malaysia (7D)',
    sublabel: '6N / 7 Days',
    destinations: 'Singapore, Malaysia',
    description: 'Modern cities, scenic landscapes & thrilling attractions.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Kuala Lumpur - Genting', details: 'Report 3 hrs before flight. Depart to Kuala Lumpur. On arrival proceed to Genting Highlands. Cable Car ride. Evening Casino.', highlights: ['Genting Highlands', 'Cable Car'], stay: 'Genting Highlands' },
      { day: 'Day 2', title: 'Genting Highlands', details: 'Enjoy Genting Highlands Outdoor Theme Park - Monorail Ride, Corkscrew, Space Shot, Roller Coaster, Go Carting, Water Splash.', highlights: ['Theme Park', 'Rides'], stay: 'Genting Highlands' },
      { day: 'Day 3', title: 'Genting - Kuala Lumpur', details: 'Proceed to Kuala Lumpur for City tour - Batu Caves, Kings Palace, Petronas Twin Tower, KL Tower, National Monument, Merdeka Square. Shopping.', highlights: ['Petronas Towers', 'Batu Caves'], stay: 'Kuala Lumpur' },
      { day: 'Day 4', title: 'Kuala Lumpur - Singapore', details: 'Proceed to Singapore by bus. Arrival, Hotel check-in. Evening visit Night Safari.', highlights: ['Night Safari', 'Singapore'], stay: 'Singapore' },
      { day: 'Day 5', title: 'Singapore City Tour', details: 'Singapore city tour - Suntec City, Fountain of Wealth, Merlion Park, Singapore River, Chinese Temple. Afternoon visit Sentosa Island - Wax Museum, Underwater World, Song of the Sea.', highlights: ['Merlion', 'Sentosa'], stay: 'Singapore' },
      { day: 'Day 6', title: 'Singapore', details: 'Visit Jurong Bird Park - Panorail Ride, Penguin Parade, Flamingo pool. Afternoon shopping/relaxation.', highlights: ['Jurong Bird Park'], stay: 'Singapore' },
      { day: 'Day 7', title: 'Singapore - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  singapore: {
    label: 'Singapore Only (4D)',
    sublabel: '3N / 4 Days',
    destinations: 'Singapore',
    description: 'Quick premium international experience with world-class attractions.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Singapore', details: 'Report 3 hrs before flight. Depart to Singapore. City tour - Suntec City, Merlion Park, Singapore River, Chinese Temple, Orchard Road. Hotel check-in.', highlights: ['Merlion', 'Orchard Road'], stay: 'Singapore' },
      { day: 'Day 2', title: 'Singapore - Sentosa', details: 'Free time for shopping. Afternoon visit Sentosa Island - Wax Museum, Underwater World, Song of the Sea (Musical Fountain Show).', highlights: ['Sentosa Island', 'Underwater World'], stay: 'Singapore' },
      { day: 'Day 3', title: 'Singapore', details: 'Visit Jurong Bird Park - Panorail Ride, Penguin Parade, Flamingo pool, World of Darkness. Afternoon shopping/relaxation.', highlights: ['Jurong Bird Park'], stay: 'Singapore' },
      { day: 'Day 4', title: 'Singapore - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  bmsm_alt: {
    label: 'BMS Alternate (8D)',
    sublabel: '7N / 8 Days',
    destinations: 'Singapore, Malaysia, Bangkok, Pattaya',
    description: 'Alternate route starting from Singapore for a different perspective.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Singapore', details: 'Report 3 hrs before flight. Depart to Singapore. City tour - Merlion Park, Singapore River, Chinese Temple, Orchard Road. Hotel check-in.', highlights: ['Merlion', 'Singapore'], stay: 'Singapore' },
      { day: 'Day 2', title: 'Singapore', details: 'Free time for relaxation/shopping. Optional Universal Studio or Jurong Bird Park. Afternoon Sentosa Island by Cable Car - Underwater World, Song of the Sea.', highlights: ['Sentosa', 'Cable Car'], stay: 'Singapore' },
      { day: 'Day 3', title: 'Singapore - Kuala Lumpur', details: 'Depart to Kuala Lumpur by Coach. City tour - King\'s Palace, Petronas Twin Tower, KL Tower, National Monument, Merdeka Square. Visit Chocolate factory.', highlights: ['Petronas Towers', 'KL'], stay: 'Kuala Lumpur' },
      { day: 'Day 4', title: 'Kuala Lumpur - Genting - KL', details: 'Day Tour to Genting Highlands. En route Batu Caves. Cable Car ride. Theme Park - Monorail, Space Shot, Roller Coaster, Go Carting. Casino.', highlights: ['Genting', 'Theme Park'], stay: 'Kuala Lumpur' },
      { day: 'Day 5', title: 'Kuala Lumpur - Bangkok - Pattaya', details: 'Depart to Bangkok by flight. On arrival proceed to Pattaya. Hotel check-in. Evening see Alcazar Show.', highlights: ['Pattaya', 'Alcazar Show'], stay: 'Pattaya' },
      { day: 'Day 6', title: 'Pattaya', details: 'Proceed to Coral Island by Speed Boat. Enjoy Parasailing & Glass Bottom boat ride. Evening visit Gems factory & Nong Nooch Village - Thai Cultural Show, Elephant Show.', highlights: ['Coral Island', 'Nong Nooch'], stay: 'Pattaya' },
      { day: 'Day 7', title: 'Pattaya - Bangkok', details: 'Proceed to Bangkok. En route Safari World - Wild Life Safari, Marine Park, Orang Utan Boxing Show, Sea Lion Show, Dolphins Show. Hotel check-in.', highlights: ['Safari World', 'Bangkok'], stay: 'Bangkok' },
      { day: 'Day 8', title: 'Bangkok - Mumbai', details: 'Bangkok Temple tour - Golden Buddha, Reclining Buddha, Principle Buddha. Proceed to airport. Depart to Mumbai. Tour ends.', highlights: ['Temple Tour', 'Departure'], stay: '' },
    ]
  },
  bangkok_singapore: {
    label: 'Bangkok Singapore (7D)',
    sublabel: '6N / 7 Days',
    destinations: 'Bangkok, Pattaya, Singapore',
    description: 'Thrilling Thailand combined with modern Singapore.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Bangkok - Pattaya', details: 'Report 3 hrs before flight. Depart to Bangkok. Proceed to Pattaya. Hotel check-in. Evening see Alcazar Show.', highlights: ['Alcazar Show', 'Pattaya'], stay: 'Pattaya' },
      { day: 'Day 2', title: 'Pattaya', details: 'Visit Coral Island by Speed Boat, enjoy Parasailing and Glass bottom boat ride. Visit Gems factory. Evening Mini Siam.', highlights: ['Coral Island', 'Mini Siam'], stay: 'Pattaya' },
      { day: 'Day 3', title: 'Pattaya - Bangkok', details: 'Visit Nong Nooch Village - Thai Cultural Show and Elephant Show. Bangkok Temple tour - Golden Buddha, Reclining Buddha.', highlights: ['Nong Nooch', 'Temple Tour'], stay: 'Bangkok' },
      { day: 'Day 4', title: 'Bangkok - Safari World', details: 'Proceed to Safari World. Safari Park - Wild Life Safari, Marine Park - Orang Utan Boxing Show, Sea Lion Show, Stunt Man Show.', highlights: ['Safari World'], stay: 'Bangkok' },
      { day: 'Day 5', title: 'Bangkok - Singapore', details: 'Proceed to airport. Depart to Singapore. Hotel check-in. Evening visit Night Safari.', highlights: ['Night Safari', 'Singapore'], stay: 'Singapore' },
      { day: 'Day 6', title: 'Singapore City & Sentosa', details: 'Singapore city tour - Suntec City, Merlion Park, Singapore River, Chinese Temple. Afternoon Sentosa Island - Wax Museum, Underwater World, Song of the Sea.', highlights: ['Merlion', 'Sentosa'], stay: 'Singapore' },
      { day: 'Day 7', title: 'Singapore - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  hk_msm_bp: {
    label: 'HK MSM BP (15D)',
    sublabel: '14N / 15 Days',
    destinations: 'Hong Kong, Macau, Malaysia, Singapore, Bangkok, Pattaya',
    description: 'The ultimate Southeast Asia experience covering 5 countries!',
    days: [
      { day: 'Day 1', title: 'Mumbai - Hong Kong', details: 'Report 3 hrs before flight. Depart to Hong Kong. Arrival. Evening visit Avenue of Stars.', highlights: ['Avenue of Stars', 'Hong Kong'], stay: 'Hong Kong' },
      { day: 'Day 2', title: 'Hong Kong - Macau', details: 'Hong Kong City Orientation - Victoria Peak, Aberdeen, Repulse Bay. Proceed to Macau by Jetfoil. Macau tour - Ruins of St. Pauls, A-ma Temple. Night at Casinos.', highlights: ['Victoria Peak', 'Macau'], stay: 'Macau' },
      { day: 'Day 3', title: 'Macau - Hong Kong', details: 'Proceed to Hong Kong by Jetfoil. Visit Disneyland - Space Mountain, Jungle Cruise, Golden Mickey, Lion King, Disney Parade.', highlights: ['Disneyland', 'Hong Kong'], stay: 'Hong Kong' },
      { day: 'Day 4', title: 'Hong Kong - Genting', details: 'Proceed to airport. Depart to Kuala Lumpur. On arrival proceed to Genting Highlands. Cable Car ride. Casino.', highlights: ['Genting Highlands'], stay: 'Genting Highlands' },
      { day: 'Day 5', title: 'Genting Highlands', details: 'Enjoy Genting Highlands Outdoor Theme Park - Monorail, Corkscrew, Space Shot, Roller Coaster, Go Carting, Water Splash.', highlights: ['Theme Park'], stay: 'Genting Highlands' },
      { day: 'Day 6', title: 'Genting - Kuala Lumpur', details: 'Proceed to Kuala Lumpur for City tour - Batu Caves, Kings Palace, Petronas Twin Tower, KL Tower, National Monument, Merdeka Square. Shopping.', highlights: ['Petronas', 'Batu Caves'], stay: 'Kuala Lumpur' },
      { day: 'Day 7', title: 'Kuala Lumpur - Singapore', details: 'Proceed to Singapore by Bus. Arrival. Evening Night Safari.', highlights: ['Night Safari'], stay: 'Singapore' },
      { day: 'Day 8', title: 'Singapore City & Sentosa', details: 'Singapore city tour - Suntec City, Fountain of Wealth, Merlion Park, Singapore River, Chinese Temple. Sentosa Island - Wax Museum, Underwater World, Song of the Sea.', highlights: ['Merlion', 'Sentosa'], stay: 'Singapore' },
      { day: 'Day 9', title: 'Singapore - Jurong', details: 'Visit Jurong Bird Park - Panorail, Penguin Parade, Flamingo pool. Afternoon shopping.', highlights: ['Jurong Bird Park'], stay: 'Singapore' },
      { day: 'Day 10', title: 'Singapore - Bangkok', details: 'Proceed to airport. Depart to Bangkok. Hotel check-in.', highlights: ['Bangkok'], stay: 'Bangkok' },
      { day: 'Day 11', title: 'Bangkok - Pattaya', details: 'Proceed to Pattaya. Hotel check-in. Afternoon sightseeing - Nong Nooch Village, Thai Cultural Show, Elephant Show, Mini Siam.', highlights: ['Nong Nooch', 'Mini Siam'], stay: 'Pattaya' },
      { day: 'Day 12', title: 'Pattaya', details: 'Visit Coral Island by Speed Boat. Enjoy Parasailing and Glass Bottom boat ride. Evening visit Gems factory. Alcazar Show.', highlights: ['Coral Island', 'Alcazar'], stay: 'Pattaya' },
      { day: 'Day 13', title: 'Pattaya - Bangkok', details: 'Proceed to Bangkok. Temple tour - Golden Buddha, Reclining Buddha, Principle Buddha. Baiyoke Sky Tower. Shopping.', highlights: ['Grand Palace', 'Baiyoke'], stay: 'Bangkok' },
      { day: 'Day 14', title: 'Bangkok - Safari World', details: 'Proceed to Safari World - Wild Life Safari, Marine Park, Orang Utan Boxing Show, Dolphins Show. Chao Praya River Cruise dinner. Proceed to airport.', highlights: ['Safari World', 'River Cruise'], stay: 'In Flight' },
      { day: 'Day 15', title: 'Bangkok - Mumbai', details: 'Early morning arrival at Mumbai. Tour ends with wonderful memories.', highlights: ['Departure'], stay: '' },
    ]
  },
  hk_msm: {
    label: 'HK Malaysia Singapore (9D)',
    sublabel: '8N / 9 Days',
    destinations: 'Hong Kong, Malaysia, Singapore',
    description: 'Hong Kong Disneyland combined with Malaysia & Singapore highlights.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Hong Kong', details: 'Report 3 hrs before flight. Depart to Hong Kong. Arrival. Evening visit Avenue of Stars.', highlights: ['Avenue of Stars'], stay: 'Hong Kong' },
      { day: 'Day 2', title: 'Hong Kong - Macau', details: 'Hong Kong City Tour - Victoria Peak, Aberdeen, Repulse Bay. Proceed to Macau by Jetfoil. Macau tour - Ruins of St. Pauls, A-ma Temple. Night casinos.', highlights: ['Victoria Peak', 'Macau'], stay: 'Macau' },
      { day: 'Day 3', title: 'Macau - Hong Kong', details: 'Proceed to Hong Kong by Jetfoil. Visit Disneyland - Space Mountain, Jungle Cruise, Golden Mickey, Lion King, Disney Parade.', highlights: ['Disneyland'], stay: 'Hong Kong' },
      { day: 'Day 4', title: 'Hong Kong - Genting', details: 'Proceed to airport. Depart to Kuala Lumpur. On arrival proceed to Genting Highlands. Cable Car. Casino.', highlights: ['Genting'], stay: 'Genting Highlands' },
      { day: 'Day 5', title: 'Genting Highlands', details: 'Enjoy Genting Highlands Outdoor Theme Park - Monorail, Corkscrew, Space Shot, Roller Coaster, Go Carting.', highlights: ['Theme Park'], stay: 'Genting Highlands' },
      { day: 'Day 6', title: 'Genting - Kuala Lumpur', details: 'Proceed to Kuala Lumpur for City tour - Batu Caves, Kings Palace, Petronas Twin Tower, KL Tower. Shopping.', highlights: ['Petronas', 'Batu Caves'], stay: 'Kuala Lumpur' },
      { day: 'Day 7', title: 'Kuala Lumpur - Singapore', details: 'Proceed to Singapore by Bus. Evening Night Safari.', highlights: ['Night Safari'], stay: 'Singapore' },
      { day: 'Day 8', title: 'Singapore City & Sentosa', details: 'Singapore city tour - Suntec City, Merlion Park, Singapore River. Sentosa - Wax Museum, Underwater World, Song of the Sea.', highlights: ['Merlion', 'Sentosa'], stay: 'Singapore' },
      { day: 'Day 9', title: 'Singapore - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  hongkong: {
    label: 'Hong Kong Only (4D)',
    sublabel: '3N / 4 Days',
    destinations: 'Hong Kong, Macau',
    description: 'Experience Hong Kong\'s iconic attractions & Disneyland.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Hong Kong', details: 'Report 3 hrs before flight. Depart to Hong Kong. Arrival. Evening visit Avenue of Stars.', highlights: ['Avenue of Stars', 'Hong Kong'], stay: 'Hong Kong' },
      { day: 'Day 2', title: 'Hong Kong - Macau', details: 'Hong Kong City Tour - Victoria Peak, Aberdeen, Repulse Bay. Proceed to Macau by Jetfoil. Macau tour - Ruins of St. Pauls, A-ma Temple. Night at Casinos.', highlights: ['Victoria Peak', 'Macau'], stay: 'Macau' },
      { day: 'Day 3', title: 'Macau - Hong Kong', details: 'Proceed to Hong Kong by Jetfoil. Visit Disneyland - Space Mountain, Jungle Cruise, Golden Mickey, Lion King, Disney Parade.', highlights: ['Disneyland'], stay: 'Hong Kong' },
      { day: 'Day 4', title: 'Hong Kong - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  hk_malaysia: {
    label: 'HK Malaysia (7D)',
    sublabel: '6N / 7 Days',
    destinations: 'Hong Kong, Malaysia',
    description: 'Hong Kong & Malaysia adventure with Genting Highlands.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Hong Kong', details: 'Report 3 hrs before flight. Depart to Hong Kong. Arrival. Evening visit Avenue of Stars.', highlights: ['Avenue of Stars'], stay: 'Hong Kong' },
      { day: 'Day 2', title: 'Hong Kong - Macau', details: 'Hong Kong City Tour - Victoria Peak, Aberdeen, Repulse Bay. Proceed to Macau by Jetfoil. Macau tour - Ruins of St. Pauls, A-ma Temple. Night casinos.', highlights: ['Victoria Peak', 'Macau'], stay: 'Macau' },
      { day: 'Day 3', title: 'Macau - Hong Kong', details: 'Proceed to Hong Kong by Jetfoil. Visit Disneyland - Space Mountain, Jungle Cruise, Golden Mickey, Lion King, Disney Parade.', highlights: ['Disneyland'], stay: 'Hong Kong' },
      { day: 'Day 4', title: 'Hong Kong - Genting', details: 'Proceed to airport. Depart to Kuala Lumpur. On arrival proceed to Genting Highlands. Cable Car. Casino.', highlights: ['Genting'], stay: 'Genting Highlands' },
      { day: 'Day 5', title: 'Genting Highlands', details: 'Enjoy Genting Highlands Outdoor Theme Park - Monorail, Corkscrew, Space Shot, Roller Coaster, Go Carting, Water Splash.', highlights: ['Theme Park'], stay: 'Genting Highlands' },
      { day: 'Day 6', title: 'Genting - Kuala Lumpur', details: 'Proceed to Kuala Lumpur for City tour - Batu Caves, Kings Palace, Petronas Twin Tower, KL Tower. Shopping.', highlights: ['Petronas', 'Batu Caves'], stay: 'Kuala Lumpur' },
      { day: 'Day 7', title: 'Kuala Lumpur - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  malaysia: {
    label: 'Malaysia Only (4D)',
    sublabel: '3N / 4 Days',
    destinations: 'Malaysia (Kuala Lumpur, Genting)',
    description: 'Quick Malaysia escape with Genting Highlands adventure.',
    days: [
      { day: 'Day 1', title: 'Mumbai - Kuala Lumpur - Genting', details: 'Report 3 hrs before flight. Depart to Kuala Lumpur. On arrival proceed to Genting Highlands. Cable Car ride (Southeast Asia\'s longest). Evening Casino.', highlights: ['Genting Highlands', 'Cable Car'], stay: 'Genting Highlands' },
      { day: 'Day 2', title: 'Genting Highlands', details: 'Enjoy Genting Highlands Outdoor Theme Park - Monorail Ride, Corkscrew, Space Shot, Roller Coaster, Go Carting, Water Splash.', highlights: ['Theme Park', 'Rides'], stay: 'Genting Highlands' },
      { day: 'Day 3', title: 'Genting - Kuala Lumpur', details: 'Proceed to Kuala Lumpur for City tour - Batu Caves, Kings Palace, Petronas Twin Tower, KL Tower, National Monument, Merdeka Square. Visit Chocolate Factory.', highlights: ['Petronas', 'Batu Caves'], stay: 'Kuala Lumpur' },
      { day: 'Day 4', title: 'Kuala Lumpur - Mumbai', details: 'Proceed to airport for flight to Mumbai. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
};

export default function BangkokMalaysiaSingaporePage() {
  const navigate = useNavigate();
  const [activeItinerary, setActiveItinerary] = useState('bmsm');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tour = TOURS[activeItinerary];

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="bms-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Bangkok Malaysia Singapore Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['International Tour', 'Multiple Countries', 'Adventure'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="bms-title">
            Bangkok Malaysia Singapore
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            Four amazing destinations in one incredible journey — Singapore, Malaysia, Bangkok & Pattaya
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-full text-sm hover:bg-purple-800 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="bms-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="bms-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Bangkok Malaysia Singapore" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">Southeast Asia Adventure</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  Experience the best of Southeast Asia in one unforgettable tour! From the futuristic cityscape of Singapore 
                  with its world-class attractions, to the shopping paradise and natural beauty of Malaysia, and finally the 
                  golden temples and vibrant street life of Bangkok and Pattaya.
                </p>
                <p>
                  This comprehensive tour covers multiple countries offering a perfect blend of adventure, culture, shopping, 
                  and entertainment. Whether it's Disneyland in Hong Kong, theme parks in Genting, or the Night Safari in Singapore — 
                  there's something for everyone!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="bms-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center" data-testid={`bms-qi-${info.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-purple-700" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-purple-700">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="bms-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-purple-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Destinations Covered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              From gleaming skyscrapers to golden temples — explore amazing destinations across Southeast Asia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" data-testid="bms-destinations-grid">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.name}
                className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group"
                data-testid={`bms-dest-${dest.name.toLowerCase().replace(/[\s&()]/g, '-')}`}
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <dest.icon className="w-4 h-4 text-purple-700" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-1">{dest.name}</h3>
                  <p className="text-xs text-[var(--brand-text-muted)] leading-relaxed">{dest.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="bms-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-purple-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-4">
              Choose from {Object.keys(TOURS).length} curated tour options.
            </p>
            
            {/* Current Tour Info */}
            <p className="text-sm font-medium text-purple-700 mb-4">
              {tour.destinations} — {tour.sublabel}
            </p>
            <p className="text-xs text-[var(--brand-text-muted)] max-w-lg mx-auto mb-6">
              {tour.description}
            </p>

            {/* Tour Selector */}
            <div className="inline-flex flex-wrap justify-center rounded-xl bg-white border border-[var(--brand-border)] p-1 gap-1" data-testid="bms-itinerary-toggle">
              {Object.entries(TOURS).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setActiveItinerary(key)}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeItinerary === key ? 'bg-purple-700 text-white' : 'text-[var(--brand-text-muted)] hover:text-purple-700'}`}
                  data-testid={`toggle-${key}`}
                >
                  <span className="block">{t.label}</span>
                  <span className="block text-[10px] opacity-70">{t.sublabel}</span>
                </button>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="bms-itinerary-accordion">
            {tour.days.map((day, idx) => (
              <AccordionItem
                key={`${activeItinerary}-${idx}`}
                value={`day-${idx}`}
                className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-purple-700 text-white text-xs rounded-full font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>
                      <span className="block text-purple-700 text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100">
                        {h}
                      </span>
                    ))}
                  </div>
                  {day.stay && (
                    <p className="text-xs text-[var(--brand-text-muted)] mt-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Night Stay: <strong>{day.stay}</strong>
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="bms-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Bangkok Malaysia Singapore" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-purple-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready for a Southeast Asian Adventure?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Experience multiple amazing destinations — Singapore, Malaysia, Bangkok, Pattaya, Hong Kong & more!
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3.5 bg-white text-purple-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2"
            data-testid="bms-enquire-bottom"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
