-- Insert Tours
INSERT INTO tours (id, slug, title, title_mr, category, duration, price, tagline, description, image) VALUES
('ashtavinayak', 'ashtavinayak-yatra', 'Divine Ashtavinayak Yatra', 'दिव्य अष्टविनायक यात्रा', 'spiritual', '2 Nights / 3 Days', 'Starting from ₹8,999 per person', 'A spiritual journey covering Maharashtra\'s sacred Ganpati temples', 'Embark on a sacred pilgrimage to all eight revered Ganpati temples of Maharashtra. This carefully curated 3-day journey takes you through the divine circuit of Morgaon, Siddhatek, Pali, Mahad, Theur, Lenyadri, Ozar, and Ranjangaon.', '/images/ASHTAVINAYAK.jpg'),
('tadoba', 'tadoba-tiger-safari', 'The Roar of Tadoba', 'ताडोबाची गर्जना', 'wildlife', '3 Nights / 4 Days', 'Starting from ₹14,999 per person', 'Experience India\'s premier Tiger Reserve with expert-led safaris', 'Discover the raw beauty of Tadoba Andhari Tiger Reserve, Maharashtra\'s largest and oldest national park. With one of India\'s highest tiger densities, every safari promises an unforgettable encounter with the wild.', 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Tadoba-1.png'),
('dubai_shopping', 'dubai-shopping-festival', 'Shop the World: Dubai', 'दुबई शॉपिंग फेस्टिव्हल', 'international', '4 Nights / 5 Days', 'Starting from ₹49,999 per person', 'Curated shopping festivals, luxury stays, and iconic city tours', 'Experience the glamour of Dubai with our carefully crafted package. From the towering Burj Khalifa to the gold-laden souks, from desert safaris to luxury mall shopping - this trip has it all.', 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome012.jpg'),
('singapore', 'singapore-experience', 'Singapore Experience', 'सिंगापूर अनुभव', 'international', '4 Nights / 5 Days', 'Starting from ₹54,999 per person', 'The Lion City awaits with gardens, culture, and culinary delights', 'Explore the vibrant city-state of Singapore. From the futuristic Gardens by the Bay to the cultural enclaves of Chinatown and Little India, experience a perfect blend of tradition and modernity.', 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome015.jpg'),
('bangkok-malaysia-singapore', 'bangkok-malaysia-singapore', 'Bangkok Malaysia Singapore', 'बैंकॉक मलेशिया सिंगापुर', 'international', '4 to 15 Days', 'Starting from ₹64,999 per person', 'Four amazing destinations in one incredible journey', 'Experience the best of Southeast Asia! From Singapore to Malaysia, Bangkok & Pattaya with multiple tour options from 4 to 15 days.', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?crop=entropy&cs=srgb&fm=jpg'),
('konkan', 'konkan-coastal-retreat', 'Konkan Coastal Retreat', 'कोकण किनारा सहल', 'coastal', '3 Nights / 4 Days', 'Starting from ₹11,999 per person', 'Premium Konkan beaches, temples, and Malvani cuisine', 'Escape to the pristine beaches of Konkan coast. From the white sands of Tarkarli to the historic Sindhudurg Fort, experience the untouched beauty of Maharashtra\'s coastline with authentic Malvani hospitality.', 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Nainital-9.png'),
('corbett', 'jim-corbett-safari', 'Jim Corbett Tiger Safari', 'जिम कॉर्बेट वाघ सफारी', 'wildlife', '3 Nights / 4 Days', 'Starting from ₹16,999 per person', 'India\'s oldest national park and the heart of Project Tiger', 'Journey to Jim Corbett National Park, established in 1936 as India\'s first national park. Home to the majestic Royal Bengal Tiger and set against the backdrop of the Himalayan foothills, this is a wildlife experience like no other.', 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Tadoba-3.png'),
('sri-lanka-maldives', 'sri-lanka-maldives', 'Sri Lanka With Maldives', 'श्रीलंका और मालदीव', 'international', '6 Nights / 7 Days', 'Starting from ₹59,999 per person', 'Cultural immersion in Sri Lanka combined with Maldives luxury', 'This itinerary offers a seamless blend of cultural exploration and tropical luxury, beginning in Colombo and moving into the scenic heart of Kandy. The second half transitions into pure relaxation in the Maldives — one of the world\'s most sought-after tropical destinations.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=srgb&fm=jpg'),
('dubai', 'dubai', 'Dubai', 'दुबई', 'international', '3 Nights / 4 Days', 'Starting from ₹39,999 per person', 'Luxury, innovation, and cultural fusion in the heart of UAE', 'Dubai is a city that truly exemplifies luxury, innovation, and cultural fusion. From iconic Burj Al Arab to desert safaris, gold souks to dhow cruises — experience the world\'s most exciting destination.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=srgb&fm=jpg');

-- Insert Highlights
INSERT INTO tour_highlights (tour_id, highlight_text) VALUES
('ashtavinayak', 'AC Tempo Traveller'), ('ashtavinayak', 'Darshan at all 8 temples'), ('ashtavinayak', 'Breakfast & Dinner included'), ('ashtavinayak', 'Experienced guide'),
('tadoba', '2 Jungle Safaris (Gypsy)'), ('tadoba', 'Resort accommodation'), ('tadoba', 'All meals included'), ('tadoba', 'Naturalist guide'),
('dubai_shopping', '4-star hotel stay'), ('dubai_shopping', 'Desert Safari with BBQ dinner'), ('dubai_shopping', 'Dhow Cruise'), ('dubai_shopping', 'Dubai City Tour'),
('singapore', 'Sentosa Island visit'), ('singapore', 'Gardens by the Bay'), ('singapore', 'Night Safari'), ('singapore', 'Universal Studios'),
('bangkok-malaysia-singapore', 'Singapore City Tour'), ('bangkok-malaysia-singapore', 'Genting Highlands'), ('bangkok-malaysia-singapore', 'Pattaya Beaches'), ('bangkok-malaysia-singapore', 'Bangkok Temples'), ('bangkok-malaysia-singapore', 'Hong Kong Disneyland'), ('bangkok-malaysia-singapore', 'Macau Casinos'),
('konkan', 'Scuba diving at Tarkarli'), ('konkan', 'Sindhudurg Fort visit'), ('konkan', 'Malvani cuisine'), ('konkan', 'Beach camping'),
('corbett', 'Jeep Safari in Dhikala Zone'), ('corbett', 'Riverside resort stay'), ('corbett', 'Bird watching'), ('corbett', 'Corbett Museum visit'),
('sri-lanka-maldives', 'Pinnawala Elephant Orphanage'), ('sri-lanka-maldives', 'Temple of the Tooth'), ('sri-lanka-maldives', 'Nuwara Eliya Tea Estates'), ('sri-lanka-maldives', 'Maldives Beach Resort'),
('dubai', 'Burj Al Arab'), ('dubai', 'Desert Safari'), ('dubai', 'Gold Souk'), ('dubai', 'Dhow Cruise');

-- Insert Itineraries
INSERT INTO tour_itineraries (tour_id, day, title, details, stay) VALUES
('ashtavinayak', 'Day 1', 'Pune - Morgaon - Siddhatek - Pali', 'Early morning departure from Pune. Visit Shri Mayureshwar Temple at Morgaon, Shri Siddhi Vinayak at Siddhatek, and Shri Ballaleshwar at Pali. Overnight stay at Pali.', 'Pali'),
('ashtavinayak', 'Day 2', 'Mahad - Theur - Lenyadri', 'After breakfast, visit Shri Varadvinayak at Mahad, Shri Chintamani at Theur, and Shri Girijatmaj at Lenyadri (requires climbing 300+ steps). Overnight stay near Ozar.', 'Ozar'),
('ashtavinayak', 'Day 3', 'Ozar - Ranjangaon - Pune', 'Morning darshan at Shri Vighnahar at Ozar and Shri Mahaganapati at Ranjangaon. Return to Pune by evening with divine blessings.', 'Pune'),
('tadoba', 'Day 1', 'Pune/Mumbai - Tadoba', 'Travel to Tadoba Andhari Tiger Reserve. Check-in at the jungle resort. Evening orientation about the park and wildlife.', 'Tadoba'),
('tadoba', 'Day 2', 'Full Day Safari', 'Early morning and afternoon safari in the core zone. Spot Royal Bengal Tigers, Leopards, Sloth Bears, Wild Dogs, and over 195 species of birds.', 'Tadoba'),
('tadoba', 'Day 3', 'Safari & Buffer Zone', 'Morning safari in the buffer zone. Afternoon at leisure or optional nature walk. Evening campfire and wildlife photography session.', 'Tadoba'),
('tadoba', 'Day 4', 'Tadoba - Return', 'Early morning birdwatching. After breakfast, check-out and return journey with memories of the wild.', 'Return'),
('dubai_shopping', 'Day 1', 'Arrival in Dubai', 'Arrive at Dubai International Airport. Hotel check-in. Evening free for Dubai Mall visit and Burj Khalifa views.', 'Dubai'),
('dubai_shopping', 'Day 2', 'Dubai City Tour', 'Full day city tour covering Jumeirah Mosque, Palm Jumeirah, Atlantis, Dubai Frame, and Gold & Spice Souks. Evening Dhow Cruise dinner.', 'Dubai'),
('dubai_shopping', 'Day 3', 'Desert Safari', 'Morning at leisure for shopping at Mall of Emirates. Afternoon desert safari with dune bashing, camel riding, BBQ dinner with entertainment.', 'Dubai'),
('dubai_shopping', 'Day 4', 'Abu Dhabi Day Trip', 'Full day excursion to Abu Dhabi. Visit Sheikh Zayed Grand Mosque, Emirates Palace, and Yas Island. Return to Dubai.', 'Dubai'),
('dubai_shopping', 'Day 5', 'Departure', 'Last minute shopping at Global Village or Dubai Outlet Mall. Transfer to airport for return flight.', 'Departure'),
('singapore', 'Day 1', 'Arrival & Marina Bay', 'Arrive at Changi Airport. City orientation tour. Evening at Marina Bay Sands and Gardens by the Bay light show.', 'Singapore'),
('singapore', 'Day 2', 'Sentosa Island', 'Full day at Sentosa Island. Visit Universal Studios Singapore, S.E.A. Aquarium, and enjoy the beaches.', 'Singapore'),
('singapore', 'Day 3', 'Cultural Tour', 'Explore Chinatown, Little India, and Arab Street. Visit Merlion Park. Afternoon at Orchard Road for shopping.', 'Singapore'),
('singapore', 'Day 4', 'Nature & Night Safari', 'Morning at Singapore Botanic Gardens. Afternoon at leisure. Evening Night Safari experience.', 'Singapore'),
('singapore', 'Day 5', 'Departure', 'Morning free for last-minute shopping. Transfer to Changi Airport.', 'Departure'),
('bangkok-malaysia-singapore', 'Day 1', 'Mumbai - Bangkok - Pattaya', 'Depart to Bangkok. Proceed to Pattaya. Evening Alcazar Show.', 'Pattaya'),
('bangkok-malaysia-singapore', 'Day 2', 'Pattaya', 'Coral Island by Speed Boat, Parasailing, Glass bottom boat. Mini Siam. Thai Massage.', 'Pattaya'),
('bangkok-malaysia-singapore', 'Day 3', 'Pattaya - Bangkok', 'Nong Nooch Village - Thai Cultural Show and Elephant Show. Chao Praya River Cruise dinner.', 'Bangkok'),
('bangkok-malaysia-singapore', 'Day 4', 'Bangkok - Safari World', 'Safari World - Wild Life Safari, Marine Park, Orang Utan Boxing, Dolphins Show.', 'Bangkok'),
('bangkok-malaysia-singapore', 'Day 5', 'Bangkok Temple Tour', 'Golden Buddha, Reclining Buddha, Principle Buddha. Baiyoke Sky Tower. Shopping.', 'Bangkok'),
('bangkok-malaysia-singapore', 'Day 6', 'Bangkok - Genting Highlands', 'Flight to Kuala Lumpur. Proceed to Genting Highlands. Cable Car ride. Casino.', 'Genting Highlands'),
('bangkok-malaysia-singapore', 'Day 7', 'Genting Highlands', 'Genting Highlands Theme Park - Monorail, Roller Coaster, Go Carting, Water Splash.', 'Genting Highlands'),
('bangkok-malaysia-singapore', 'Day 8', 'Genting - Kuala Lumpur', 'KL City tour - Batu Caves, Petronas Twin Tower, KL Tower. Shopping.', 'Kuala Lumpur'),
('bangkok-malaysia-singapore', 'Day 9', 'Kuala Lumpur - Singapore', 'Proceed to Singapore by bus. Night Safari.', 'Singapore'),
('bangkok-malaysia-singapore', 'Day 10', 'Singapore', 'Jurong Bird Park. Sentosa Island - Wax Museum, Underwater World.', 'Singapore'),
('bangkok-malaysia-singapore', 'Day 11', 'Singapore - Mumbai', 'Departure to Mumbai.', ''),
('konkan', 'Day 1', 'Pune - Ganpatipule', 'Depart from Pune. Visit the famous Ganpatipule Swayambhu Ganpati Temple. Evening at the pristine Ganpatipule Beach. Overnight stay.', 'Ganpatipule'),
('konkan', 'Day 2', 'Ganpatipule - Tarkarli', 'Drive along the scenic Konkan coast to Tarkarli. En route visit Jaigad Fort. Evening at Tarkarli Beach with Malvani seafood dinner.', 'Tarkarli'),
('konkan', 'Day 3', 'Tarkarli & Sindhudurg', 'Morning scuba diving or snorkeling at Tarkarli. Afternoon boat ride to Sindhudurg Fort. Evening bonfire at beach campsite.', 'Tarkarli'),
('konkan', 'Day 4', 'Return to Pune', 'After breakfast, visit Vengurla Beach. Begin return journey to Pune via Amboli Ghat with scenic stops.', 'Return'),
('corbett', 'Day 1', 'Delhi - Corbett', 'Drive from Delhi to Jim Corbett National Park (approx 6 hrs). Check-in at riverside resort. Evening nature walk along the Kosi River.', 'Corbett'),
('corbett', 'Day 2', 'Dhikala Zone Safari', 'Full day safari in the famous Dhikala zone. Spot Tigers, Elephants, Deer, and Gharials. Packed lunch in the park.', 'Corbett'),
('corbett', 'Day 3', 'Bijrani Zone Safari', 'Morning safari in Bijrani zone. Afternoon visit to Corbett Museum and Garjia Devi Temple. Evening at leisure.', 'Corbett'),
('corbett', 'Day 4', 'Return to Delhi', 'Early morning birdwatching. After breakfast, check-out and drive back to Delhi.', 'Delhi'),
('sri-lanka-maldives', 'Day 1', 'Mumbai - Colombo - Kandy', 'Depart to Colombo. En route visit Pinnawala Elephant Orphanage. Proceed to Kandy.', 'Kandy'),
('sri-lanka-maldives', 'Day 2', 'Kandy City Tour', 'Visit Spice Garden, Gems Factory, Craft Centre, and Temple of the Tooth.', 'Kandy'),
('sri-lanka-maldives', 'Day 3', 'Kandy - Nuwara Eliya', 'Proceed to Nuwara Eliya. En route visit Tea Estate, Tea Factory, and Sita Amman Temple.', 'Nuwara Eliya'),
('sri-lanka-maldives', 'Day 4', 'Nuwara Eliya - Colombo', 'Proceed to Colombo. City tour with Freedom Memorial, Museum, Beach, Shopping at ODEL.', 'Colombo'),
('sri-lanka-maldives', 'Day 5', 'Colombo - Maldives', 'Depart to Male. Transfer to resort by speed boat. Day at leisure.', 'Maldives'),
('sri-lanka-maldives', 'Day 6', 'Maldives - Leisure Day', 'Day free for relaxation. Optional water sports: Parasailing, Scuba diving, Fishing, Snorkeling.', 'Maldives'),
('sri-lanka-maldives', 'Day 7', 'Maldives - Mumbai', 'Breakfast and departure to Mumbai. Tour ends.', 'Mumbai'),
('dubai', 'Day 1', 'Mumbai - Dubai', 'Depart to Dubai. Arrival and transfer to hotel.', 'Dubai'),
('dubai', 'Day 2', 'Dubai City Tour', 'City tour - Burj Al Arab, Jumeira Mosque, Dubai Museum, Gold Souk, Spice Souk, Madinat Jumeirah. Evening Dhow Cruise with dinner.', 'Dubai'),
('dubai', 'Day 3', 'Dubai - Desert Safari', 'Free time for shopping. Afternoon Desert Safari with dune bashing, camel ride, belly dancing, and BBQ dinner.', 'Dubai'),
('dubai', 'Day 4', 'Dubai - Mumbai', 'Check out and departure to Mumbai. Tour ends.', 'Mumbai');

-- Insert Variants
INSERT INTO tour_variants (tour_id, variant_id, name, duration, destinations) VALUES
('bangkok-malaysia-singapore', 'bmsm', 'BMS Full', '11D/10N', 'Bangkok, Pattaya, Malaysia, Singapore'),
('bangkok-malaysia-singapore', 'bangkok_pattaya', 'Bangkok Pattaya', '7D/6N', 'Bangkok, Pattaya'),
('bangkok-malaysia-singapore', 'singapore_malaysia', 'Singapore Malaysia', '7D/6N', 'Singapore, Malaysia'),
('bangkok-malaysia-singapore', 'singapore', 'Singapore Only', '4D/3N', 'Singapore'),
('bangkok-malaysia-singapore', 'bmsm_alt', 'BMS Alternate', '8D/7N', 'Singapore, Malaysia, Bangkok, Pattaya'),
('bangkok-malaysia-singapore', 'bangkok_singapore', 'Bangkok Singapore', '7D/6N', 'Bangkok, Pattaya, Singapore'),
('bangkok-malaysia-singapore', 'hk_msm_bp', 'HK MSM BP', '15D/14N', 'Hong Kong, Macau, Malaysia, Singapore, Bangkok, Pattaya'),
('bangkok-malaysia-singapore', 'hk_msm', 'HK Malaysia Singapore', '9D/8N', 'Hong Kong, Malaysia, Singapore'),
('bangkok-malaysia-singapore', 'hongkong', 'Hong Kong', '4D/3N', 'Hong Kong, Macau'),
('bangkok-malaysia-singapore', 'hk_malaysia', 'HK Malaysia', '7D/6N', 'Hong Kong, Malaysia'),
('bangkok-malaysia-singapore', 'malaysia', 'Malaysia Only', '4D/3N', 'Malaysia (KL, Genting)');

-- Insert Admin (admin / admin123)
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2y$10$H8Y.K3.53P9pYp3N9Q4Y.u7Q9N6pX9o/Y5o3V.fH3o5V/X5o3V.fH');
