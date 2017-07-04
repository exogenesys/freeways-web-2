const express = require('express');
const mongoose = require("mongoose");

const request = require("request");
const rp = require('request-promise');
const backup = require('mongodb-backup');
// const seed = require("../seed.js");

const places = require("../models/places.js");
const trips = require('../models/trip.js');
const experiences = require("../models/experience.js");
const destinations = require("../models/destination.js");
const languages = require("../models/languages.js");
const searchKeys = require("../models/searchKeys.js");
const mustCarry = require("../models/mustcarry.js");
const nearByLoc = require("../models/nearBy.js");

const Router = express.Router();
const uri = "mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory"

mongoose.connect(uri);

console.log("hello from api");

const z = [
  {
    "slug": "unforgettable-rail-through-mountains",
    "title": "Unforgettable rail through mountains",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to have this experience during October to June because the weather is most beautiful at this time. But you can experience this all year round.",
    "time_to_explore": "5 hours",
    "destination": "Ooty",
    "caption": "Its more than a train",
    "why_should_you_try": "The experience of travelling in this train will leave you mesmerised. The charming Nilgiri Mountain Railway (NMR), blue and cream with wooden coaches and large windows, is widely regarded as a marvel of engineering. The Nilgiri Mountain Railway is a World Heritage Site. The train is used more by tourists for the experience than locals for transportation purposes. This journey is particularly scenic because of the breathtaking surroundings that comprise of rocky land, gorges, green hills and rolling tea plantations.The entire Nilgiri Mountains can be viewed which gives a delight to the eyes.",
    "what_should_you_know": "The train travels the 46 km between Mettupalayam and Ooty in five hours with five stops on the way. This quaint train goes through 16 tunnels and over 250 bridges, at heights of 300 feet to 7200 feet.  It has one of the steepest tracks in Asia. Before the final stop in Ooty, you will pass through the tranquil towns of Coonoor, and Lovedale. The train was built because the only way to get to Ooty was on horseback.",
    "things_to_care_about": "Because the train is small, it fills up soon, so it is recommended to make bookings much in advance through the IRCTC website or at the Indian Railways reservation counters. Carry water and some snacks with you may not be able to get any if you are just going for a ride and back.",
    "address": "Ooty, India",
    "distance_from_city_centre": "22 km",
    "price": "Rs 205 per person in First Class, Rs 30 per person in Second Class and Rs 15 for Unreserved category.",
    "latitude": 11.356163,
    "longitude": 76.814363,
    "how_to_reach": "There is one train a day over the rack section, which starts from Mettupalayam at 07:10 and reaches Ooty at noon. The return train starts from Ooty at 14:00, and reaches Mettupalayam at 17:35. The train is scheduled to connect to the Nilgiri Express, which travels from Mettupalayam to Chennai via Coimbatore. A summer special service is also run during the months of April and May, starting from Mettupalayam at 09:30 (AM) and from Ooty at 12:15 (PM). Between Coonoor and Udagamandalam, there are four daily trains each way.",
    "usual_timings": "7:45 AM - 1 PM",
    "days_off": "",
    "keywords": "ooty train,ooty mountain railway,nilgiri mountain railway,mountain train",
    "img": ""
  },
  {
    "slug": "visit-a-tea-plantation",
    "title": "Visit a tea plantation",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to visit during October to June because the weather is most beautiful at this time and so are the tea plantations. But you can visit this all year round.",
    "time_to_explore": "2 - 3 hours",
    "destination": "Ooty",
    "caption": "Aromatic Voyage",
    "why_should_you_try": "The Nilgiri region is renowned for its tea and most of the areas in ooty are surrounded with tea plantations. Nothing can be more peaceful and relaxing than a walk through the tea plantation. This experience is one of the top activities to indulge in Ooty. The aroma of the leaves and the surrounding greenery would leave you mesmerised.",
    "what_should_you_know": "The place which is most popular for its tea estates is Glenmorgan which is one of the old tea estate and also Glenmorgan is also one of the famous picnic spots.The GlenMorgan tea estate is more for the wanderers than for tea enthusiasts. No doubt the location is a must visit for tea lovers. But the fact that it is surrounded by lush green avenues makes it a must visit for anyone. <br/> While being here also visit the tea factory and get to know about the process of making a tea. There would be a shop in the tea factory from where you can buy different varities of tea and take back home.",
    "things_to_care_about": "Be cautious while buying tea from any local shops. At times you might end up buying cheap tea against the great chocolate tea. In short you might also get cheated at times. Thus, it is always recommended to purchase tea from a reputed and a branded shop.",
    "address": "Dodabetta tea factory,\nDodabetta Road, \nOotacamund, \nThe Nilgiris.Tamil Nadu",
    "distance_from_city_centre": "5.8 km",
    "price": "There are no charges.",
    "latitude": 11.412668,
    "longitude": 76.733536,
    "how_to_reach": "Nearest bus stand is ATC Bus Stand and from ATC bus stand you will require min 50 min to reach this place.You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "9 AM - 6 PM",
    "days_off": "",
    "keywords": "tea plantation,tea factory,tea museum,plantation walk",
    "img": ""
  },
  {
    "slug": "horseback-riding-at-north-lake-road",
    "title": "Horseback riding at North Lake Road",
    "best_time_to_visit": "APR - MAY <br/>  \nSEP - NOV",
    "best_time_to_visit_more_information": "Its recommended to have this experience during September to November or April to May because horse riding happens in this period only.",
    "time_to_explore": "1 hour",
    "destination": "Ooty",
    "caption": "Back Your Horses Up",
    "why_should_you_try": "If strutting on a horse around the quaint tea plantations is something you would like to do, then the Boat House at North Lake in Ooty is the place to be. In one hour you can go around the lake and visit the countryside around Ooty. Ooty has one of the best riding courses in the country and a well defined riding season as well. You will definitely love this experience.",
    "what_should_you_know": "Take a guide along and enjoy the hilly terrains as you ride around the lake. Trekking with horses to the nearest forest is also available. Horses are well trained and its a enjoyable, safe experience to indulge in.",
    "things_to_care_about": "Better to ask for the rates and time first. Beware of cheating.<br/>Always wear a helmet that fits properly to prevent damage. Listen carefully and follow what the instructor says.",
    "address": "Kathadimattam Ooty, Tamil Nadu 643006",
    "distance_from_city_centre": "1.4 km",
    "price": "Cost Per Person is Rs 50 - 150.",
    "latitude": 11.406387,
    "longitude": 76.689329,
    "how_to_reach": "The nearest bus stand is Ooty Main Bus Stand..You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "9 AM - 6 PM",
    "days_off": "",
    "keywords": "riding courses,horse,N lake road,",
    "img": ""
  },
  {
    "slug": "yoga-at-nature-cure-ooty",
    "title": "Yoga at Nature Cure",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to have this experience during October to June because the weather is most beautiful at this time. But you can experience this all year round.",
    "time_to_explore": "2 - 3 hours",
    "destination": "Ooty",
    "caption": "Loosen Up",
    "why_should_you_try": "A session of yoga on the hills is the perfect ingredient to turn your trip into a relaxing getaway. Ease your mind as lose time in the hands of Mother Nature. Meet other interesting people during this session and exchange yoga, meditation and health tips. This experience will help you get back from your journey feeling much lighter and revived.",
    "what_should_you_know": "You have to get up and reach the place early in the morning. While being there you can interact with other people and get to know about some health tips. This experience is highly recommended while being in Ooty.",
    "things_to_care_about": "Do remeber to carry a yoga mattress. Wear as light clothes as possible.",
    "address": "Kamadhenu Medicals, Finger post, Ooty, Tamil Nadu 643002",
    "distance_from_city_centre": "1.2 km",
    "price": "Starts from Rs 600 per person per day.",
    "latitude": 11.412842,
    "longitude": 76.690454,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "6 AM - 5 PM",
    "days_off": "",
    "keywords": "yoga in ooty, relaxing in ooty, breathing",
    "img": ""
  },
  {
    "slug": "boating-in-pykara-lake",
    "title": "Boating in pykara lake",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to have this experience during October to June because the weather is most beautiful at this time and so is the lake. But you can visit this all year round except the monsoon season.",
    "time_to_explore": "1 hour",
    "destination": "Ooty",
    "caption": "Go with the flow",
    "why_should_you_try": "Boating on the placid waters of Lake Pykara is one of the popular things to do amongst tourists. With serene and green surroundings, the green water of the lake is something you wish for. Go for the speed boat and have the experience of the lifetime.",
    "what_should_you_know": "A number of boat types such as pedal boats and motor boats are available for you to choose from. Reach the place early maybe within 10 am in the morning because afterwards there is a lot of rush for tourists. Its an hour drive from Ooty. Go for the speed boat to have a great experience.",
    "things_to_care_about": "Wear a life jacket while boating to avoid accidents.\nCarefully listen and follow the instructions as said by the professional.",
    "address": "Pykara, Tamil Nadu 643237",
    "distance_from_city_centre": "23 km",
    "price": "Boating Fees : Speed Boat: Rs 785, Motor Boat(8 Seater): Rs 750 <br/>Water falls Fees : Rs 5 per person",
    "latitude": 11.454787,
    "longitude": 76.597485,
    "how_to_reach": "Pykara Lake and Falls lie by the Coimbatore Ooty Gundelpet Highway. You have to drive and take left from the Pykara Police Station to reach here in around 40 minutes. You can also reach here by taking a taxi or an autorickshaw.",
    "usual_timings": "9 AM - 6 PM",
    "days_off": "",
    "keywords": "boating in pykara lake,boating in ooty",
    "img": ""
  },
  {
    "slug": "angling-at-avalanche-lake",
    "title": "Angling at Avalanche Lake",
    "best_time_to_visit": "APR - JUN<br/>SEP - NOV",
    "best_time_to_visit_more_information": "Its recommended to have this experience during April to June or September to November because this would be the ideal time to catch fishes. The experience during these months would be a lot better than done in any other months. But this experience can be done any time of the year.",
    "time_to_explore": "2 - 3 hours",
    "destination": "Ooty",
    "caption": "Catch and Release",
    "why_should_you_try": "This offbeat activity would leave you with an entirely different experience that you will cherish forever. The serene environment of the lakes would leave you mesmerised. Fishing in Avalanche is quite popular due to the clear waters and a large number of trouts inhabitant here. They can be easily captured with spin rods and small spoons. Enjoy carp, goad trout and mixed water fishing at the town's various lakes, streams and waterways.",
    "what_should_you_know": "Upper Bhavani and Avalanche are the best known places in South Asia for trout fishing. Apart from trout, a plentiful of Carnatic Carp fishes can also be caught in Pykara Lake and Ooty Lake. Winters are easier for fishing activity than in summers.<br/>The rods and fishing accessories can be hired from the nearby trout hatchery.",
    "things_to_care_about": "It is obligatory to get a Fishing license from the Assistant Director of Fisheries in Ooty for fishing in the area.\nWear a lifejacket to avoid accidents and don't go very near to the lake since it can be dangerous.",
    "address": "Avalanche lake,Ooty, The Nilgiris, Tamil Nadu, 643001, India",
    "distance_from_city_centre": "23 km",
    "price": "Costs around Rs 500 - Rs 1000.",
    "latitude": 11.321655,
    "longitude": 76.598353,
    "how_to_reach": "If you drive down then take south west from Ooty towards Upper Bhavani to reach the village in some 30 minutes.You can reach through a taxi, autorickshaw also.",
    "usual_timings": "9 AM - 6 PM",
    "days_off": "",
    "keywords": "angling in ooty,fishing in ooty,avalanche lake,ooty",
    "img": ""
  },
  {
    "slug": "play-golf-in-ooty-club",
    "title": "Play Golf in Ooty Club",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to have this experience during October to June because the weather is most beautiful at this time. But you can experience this all year round.",
    "time_to_explore": "2 - 3 hours",
    "destination": "Ooty",
    "caption": "Aim for the perfect shot",
    "why_should_you_try": "The Ooty golf course is like and unlike any other golf course. It is situated on the slope of a mountain and located 7000 feet above sea level. The entire course is surrounded by avalanche range which contains thick woods. The golf course contains many varieties of trees like aromatic eucalyptus, oak, rhododendron, and fir which add to the scenic atmosphere.\nThe Ooty golf course is pretty popular with the veteran golfers who experience a thrill here.",
    "what_should_you_know": "The Gymkhana Club in Ooty offers a golf course with 18-holes facility. Its premises also have a bar, restaurant, table tennis, billiards and card room. It is recommended that you play only nine holes as the rest could prove to be an arduous task. This place is well-equipped with all international class amenities. There are plenty of resorts around to provide you a comfortable stay.<br/>Its on the way to Pykara falls.",
    "things_to_care_about": "Dress code is Formal. Jeans, round neck tees and track suits are not allowed. You need to follow the rules of the golf course.",
    "address": "Golf Course Road, Finger Post, Ooty, Tamil Nadu 643006",
    "distance_from_city_centre": "3.8 km",
    "price": "Golf charges are Per person Rs.1000 onwards for non members. Golf kits and caddy fees are extra.<br/>\nEntry fee is Per person Rs.1000 onwards for non members. Golf kits and caddy fees are extra.",
    "latitude": 11.419855,
    "longitude": 76.673266,
    "how_to_reach": "From ooty main bus it would take 55 min approximately to reach this place. You can reach here by your own private vehicle or through a taxi, autorickshaw.",
    "usual_timings": "9 AM - 6 PM",
    "days_off": "",
    "keywords": "play golf,sports,adventure,gymkhana",
    "img": ""
  },
  {
    "slug": "handg-gliding-in-kalhatti",
    "title": "Hang Gliding in Kalhatti",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to have this experience during October to June because the weather is most beautiful at this time. But you can experience this all year round except the monsoon season.",
    "time_to_explore": "1 hour",
    "destination": "Ooty",
    "caption": "Fly high",
    "why_should_you_try": "Is it a bird? Is it a plane? No, it’s you on a hang glider! Humans have been fascinated with flying, and we have come up with many ways to get close to the actual experience of flying. If you’re in Ooty and want to make your trip unforgettable – hang gliding is just the thing for you. Just picture yourself gliding over the beautiful terrains of the Nilgiris with nothing but sky and greenery all around you. Using an extremely light, non-motorized glider, you can take off using just your feet and fly through the skies like a bird. The view below is breathtaking with thick forests, flowing streams and rolling hills.",
    "what_should_you_know": "In hang gliding sport, pilot glides through an unmotorized foot propelled glider. Kalhatti Waterfalls, situated at 16kms from Ooty, facilitates hang gliding and para-gliding sports.The Department of Tourism also facilitates the pursuit of hang-gliding in Ooty by helping to organise courses during the months of March, April and May each year. The activity is carried out by experienced professionals and is very safe.",
    "things_to_care_about": "You need to book in advance to enjoy the aerial thrills. This experience is not for those who have heart problems.<br/>Remember to wear a helmet and carefully listen to the instructions told by the professional. Also do a pre-flight check.",
    "address": "Kalhatti Falls, Nilgiris, Kadanadu, Tamil Nadu 64320",
    "distance_from_city_centre": "The hang gliding launch area is 20 kilometres from Ooty in Kalahatti.",
    "price": "The providers charge between Rs 1200 to 2500 per person and the rides last from 7 to 25 minutes depending upon charges.",
    "latitude": 11.406364,
    "longitude": 76.712341,
    "how_to_reach": "Nearest bus stand is ATC Bus Stand . From ATC bus stand it would take around 35 minutes to reach this place.You can reach here through bus,taxi ,rickshaw or by your own private vehicle. If you drive down then take the Ooty-Mysore Road or the Sigur Ghat Road. You have to walk 2 miles from the Kalhatti village to reach this place.",
    "usual_timings": "9 AM - 6 PM",
    "days_off": "",
    "keywords": "gliding,activity,hand gliding, adventure in ooty",
    "img": ""
  },
  {
    "slug": "hiking-at-mukurthi-national-park",
    "title": "Hiking at Mukurthi national Park",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to have this experience during October to June because the weather is most beautiful at this time. But you can experience this all year round.",
    "time_to_explore": "3 - 4 hours",
    "destination": "Ooty",
    "caption": "Bliss in the lap of nature",
    "why_should_you_try": "Sandwiched by two national parks, Mudumalai, and Silent Valley, the Mukurthi National Park offers trekkers hundreds of trails that criss-cross its dense forest. The Trek through Mukurthi's intense wilderness is sure to give you memories that will last a lifetime. So, if you are consumed by wanderlust, you couldn’t ask for an experience more thrilling and adventurous than Mukurthi Peak You will trek around lake, waterfall, and suddenly it would lead to the grasslands which would leave you awestruck. If you really want to get into some remote wilderness to find peace along with some thrilling adventure, Mukurthi National Park is the ultimate destination.",
    "what_should_you_know": "The best time of the year to visit the Mukurthi National Park is between the months of February to May and September to November.<br/>While trekking through the Mukurthi peak, you would come across Montane grasslands, shrubs cape and the Shola forest that combine to keep the temperatures low and the winds gusty. \nWhile trekking, if you see giant Asian elephants then don’t be surprised.",
    "things_to_care_about": "Carry plenty of water and first-aid kit along. \nWear apropriate shoes that fit for trekking. If you find some elephants while trekking, be careful and don't go near them.",
    "address": "Mount Stuart Hill, Ooty, Tamil Nadu 643001",
    "distance_from_city_centre": "33.7 km",
    "price": "Charges for Children’s (Age 5 to 12 years) are Rs. 10, for Adult  Rs. 15, for Still camera its Rs. 25 and for Handy Camera / Video Camera its Rs. 150 and Charges for documentary educational films using Handy camera and Video Camera is Rs. 2000.",
    "latitude": 11.42882,
    "longitude": 76.559898,
    "how_to_reach": "Mukurthi National Park is well connected to Major Cities and Places by buses. There are a number of government and privately operated vehicles that go to Mukurthi National Park. You can also reach here by your own private vehicle or through a taxi, autorickshaw.",
    "usual_timings": "9 AM - 6 PM",
    "days_off": "",
    "keywords": "national park,mukurthi national park,childrens place,family place11",
    "img": ""
  },
  {
    "slug": "doddabetta-peak-a-wonderful-trekking-spot",
    "title": "Doddabetta Peak – A wonderful trekking spot",
    "best_time_to_visit": "OCT - JUN",
    "best_time_to_visit_more_information": "Its recommended to have this experience during October to June because the weather is most beautiful at this time. But you can experience this all year round.",
    "time_to_explore": "5 - 6 hours",
    "destination": "Ooty",
    "caption": "The mountains are calling",
    "why_should_you_try": "Doddabetta Peak is a refreshing and mesmeric visual treat for all. Along with the peak, one can relish the luxuriant surrounding, thick forests, and picture postcard view of Ooty. You don’t need a reason to visit the Dodabetta peak. It is the highest mountain in the Nilgiri Hills at 2637 meters (8652 feet) and offers the most breathtaking views of the Nilgiris. It is a home to various endangered species of flora and fauna offering an amazing scenic beauty. At the top, you would be amazed to see the clouds around, and a cup of tea will certainly make the moment more magical.",
    "what_should_you_know": "If you are a trekker, you are going to love this place. A reserved forest area surrounds the peak. The attractions of this mountain are its forests, vegetation, and shrubs. The trek up to the top is not that challenging and has a Telescope house at the top which provides stunning views of the surrounding hills, waterfalls and forests.",
    "things_to_care_about": "Carry plenty of water and some food along. Wear apropriate shoes that fit for trekking. If you find some elephants while trekking, be careful and don't go near them.",
    "address": "Ooty Kotagiri Road, Ooty, The Nilgiris, Tamil Nadu, 643002, India",
    "distance_from_city_centre": "8.9 km",
    "price": "Charges for Children’s (Age 5 to 12 years) are Rs. 10, for Adult  Rs. 15, for Still camera its Rs. 25 and for Handy Camera / Video Camera its Rs. 150 and Charges for documentary educational films using Handy camera and Video Camera is Rs. 2000.",
    "latitude": 11.400989,
    "longitude": 76.73616,
    "how_to_reach": "You can reach here by your own private vehicle or through a taxi, autorickshaw.",
    "usual_timings": "7 AM - 6 PM",
    "days_off": "",
    "keywords": "The Telescope House for a stunning view\n,mountain,peak,trekking,adventures",
    "img": ""
  },
  {
    "slug": "experience-dune-bashing",
    "title": "Experience Dune Bashing",
    "best_time_to_visit": "NOV - APR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1- 2 hours",
    "destination": "Jaisalmer",
    "caption": "Ride in the Desert",
    "why_should_you_try": "Get ready for one of the most thrilling adventure sports in India which will leave you with a high dose of adrenaline. Explore the vast desert in an SUV while bashing against the dunes. If you are still thinking that dune bashing is a popular adventure sports of the Gulfs and the Arabs, you should think again. Thar Desert areas near Jaisalmer are also considered as ideal locations for dune bashing and off-roading as well. The Sam Sand Dunes are thronged by thousands of adventure junkies who has a yearning for these two sports and make it part of their Jaisalmer trip.",
    "what_should_you_know": "While being in Jaisalmer you have to try this experience. Its highly recommended and this will surely give you a high dose of adrenaline. This is best experienced in the winter months, but many times the providers are already booked due to the peak season. So it is recommended to book this in advance.",
    "things_to_care_about": "Dune bashing is an art and just because you know how to drive, there are no guarantees that you won’t dig yourself into a deep hole. So drive carefully. Do listen and follow the intructions given by the professional.",
    "address": "Sam Sand Dunes, Right Side On Sam Road, Jaisalmer, Rajasthan 345001.",
    "distance_from_city_centre": "42 km",
    "price": "Charges for jeep safari in Jaisalmer are Rs 1200 per person onwards.",
    "latitude": 26.83699,
    "longitude": 70.539244,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "7 AM - 8 PM",
    "days_off": "",
    "keywords": "dune bashing,jaislamer dune bashing,sand dunes",
    "img": ""
  },
  {
    "slug": "parasailing-in-the-dunes",
    "title": "Parasailing in the Dunes",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1- 2 hours",
    "destination": "Jaisalmer",
    "caption": "Let Sky Be Your Playground",
    "why_should_you_try": "Fly high in the air as you parasail and enjoy the golden sand dunes of Thar desert. Parasailing is one of the most adventurous yet safest aero sports being carried out in prominent adventurous destinations in India. Above the groud feel free as you sail higher and higher, the countryside of the desert land proves to be a perfect spot for sailing.",
    "what_should_you_know": "While being in Jaisalmer you have to try this experience. Its highly recommended and this will surely give you a high dose of adrenaline. You would be trained by a professional first and be careful in following their instructions. This is best experienced in the winter months, but many times the providers are already booked due to the peak season. So it is recommended to book this in advance.",
    "things_to_care_about": "Remember to wear the helmet and follow the intructions of the professional as you parasail. Be careful while landing as this can result in some injury if not done properly.",
    "address": "Sam Sand Dunes, Right Side On Sam Road, Jaisalmer, Rajasthan 345001.",
    "distance_from_city_centre": "42 km",
    "price": "It costs around Rs 800-1000.",
    "latitude": 26.83699,
    "longitude": 70.539244,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "8 AM - 5 PM",
    "days_off": "",
    "keywords": "Parasailing, Parasailing at Jaisalmer,Jaisalmar Parasailing,Fly high in the air in jaisalmar",
    "img": ""
  },
  {
    "slug": "paramotoring-at-sam-sand-dunes",
    "title": "Paramotoring at Sam Sand Dunes",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1- 2 hours",
    "destination": "Jaisalmer",
    "caption": "Explore the Desert",
    "why_should_you_try": "Paramotoring is an amazing activity that allows you to fly over the dunes of the desert in your very own open, simple, personal aircraft. It offers everyone the opportunity to experience the freedom and excitement of personal flight. You’ll be at a safe enough height and still be able to enjoy amazing views of the desert from an angle you’ve never seen it before.",
    "what_should_you_know": "The paramotor is a backpack-type ultra-light aircraft that is unique, hassle-free and extremely safe. The trainers are skilled and highly qualified. They will make sure you’re comfortable enough to make the most of this experience. The team will take pictures of you as you glide through the air like a desert bird.",
    "things_to_care_about": "Remember to wear the helmet and follow the intructions of the professional as you fly. Be careful while landing as this can result in some injury if not done properly.",
    "address": "Sam Sand Dunes, Right Side On Sam Road, Jaisalmer, Rajasthan 345001",
    "distance_from_city_centre": "42 km",
    "price": "It costs between Rs 1000 to Rs 2000.",
    "latitude": 26.83699,
    "longitude": 70.539244,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "8 AM - 5 PM",
    "days_off": "",
    "keywords": "Paramotoring at Jaisalmer, Paramotoring, Jaisalmer Paramotoring",
    "img": ""
  },
  {
    "slug": "quad-biking-in-the-desert",
    "title": "Quad Biking in the Desert",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1- 2 hours",
    "destination": "Jaisalmer",
    "caption": "Ignite the Rider in You",
    "why_should_you_try": "Experience the thrill exploring the sand dunes in the great Thar desert on your quad bike. You will have an amazing riding experience with the sightseeing. Certainly a memorable experience for everyone as you take a bit of the desert back home in your heart.",
    "what_should_you_know": "You will be covering a distance of about 2 km with your quad bike inside the desert jungle and the surrounding area.\nMust try dune topography or ride in an enclosed circuit in a quad-bike. The dusty whirlpool created by the ATV’s motion adds to the thrill factor.\nGet an option to drive a 200 CC or 570 CC 4x4 as per your convenience and for kids 50 CC bikes are also available.",
    "things_to_care_about": "Remember to wear the helmet and follow the intructions of the professional as you ride the quad-bike. Be careful while taking turns and remember to slow your quad-bike.",
    "address": "Sam Sand Dunes, Right Side On Sam Road, Jaisalmer, Rajasthan 345001.",
    "distance_from_city_centre": "42 km",
    "price": "It costs between Rs.600 to Rs.1000.",
    "latitude": 26.83699,
    "longitude": 70.539244,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "8 AM - 5 PM",
    "days_off": "",
    "keywords": "Quad Biking in Jaisalmer,Quad Biking, Jaisalmer Quad Biking, quad biking experience",
    "img": ""
  },
  {
    "slug": "take-a-photography-tour",
    "title": "Take a Photography Tour",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "6 - 7 hours",
    "destination": "Jaisalmer",
    "caption": "Capture the moments",
    "why_should_you_try": "A moment captured is captured forever. With almost hundreds of sights to behold, Jaisalmer will leave a part of itself in your heart. To capture the best glimpses of the royal Jaisalmer, take a tour of the favorite Jaisalmer attractions. Go through the lanes, havelis, temples, forts and view the dunes and sand from never seen before perspective.",
    "what_should_you_know": "Carry the best camera & wide angle lenses that you have for the amazing shots. Ask the local people around for some hidden lanes and you will definitely have a great experience capturing the memories.",
    "things_to_care_about": "There are some providers for this Photography tour but it would be better done if you avoid them and explore the streets, asking the locals on your own since the providers will take you to the popular places only.",
    "address": "Sam Sand Dunes,Right Side On Sam Road, Jaisalmer, Rajasthan 345001.",
    "distance_from_city_centre": "42 km",
    "price": "Charges are Rs 1300 per person.",
    "latitude": 26.83699,
    "longitude": 70.539244,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "8 AM - 5 PM",
    "days_off": "",
    "keywords": "Photography Tour,Tour of Photography, photograhy in jaisalmer,Photography Tour in jaisalmer",
    "img": ""
  },
  {
    "slug": "camp-in-the-desert",
    "title": "Camp in the Desert",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1 - 2 days",
    "destination": "Jaisalmer",
    "caption": "Camping And Desert, A perfect duo",
    "why_should_you_try": "Camping in desert is very different from camping in the woods of the hills, as it provides you with the deadly calm of the night, to the peace in your heart. Not a strenuous activity, the tents provided also gives you a feeling as though you have headed back to the sands of time of the kings and the queens, as the tents are also decorated beautifully to give you that feel. Camping leaves you enchanted, admiring the beauty around you, bonding over the mutual bonfire and sharing jokes. This is one of the best experience to have in Jaisalmer.",
    "what_should_you_know": "These are especially recommended for honeymooners and vacationers who seek to live away from the regular hustle and bustle and commotion of the city. Popular desert camps are The Serai, Royal Desert Camp, and Prince Desert Camp.\nThe folk dance and music are added bonus while being here.",
    "things_to_care_about": "You have to make a booking well in advance since it remains filled up the entire season.",
    "address": "The Serai, Bherwa, Jaisalmer, Rajasthan 345001.",
    "distance_from_city_centre": "46 km",
    "price": "Charges are INR 5000 – INR 9000 for overnight camping, INR 1500 for camel safari and dinner.",
    "latitude": 26.931303,
    "longitude": 71.275249,
    "how_to_reach": "You can take a bus after which you will have to take a taxi or an auto rickshaw to reach here. You can also drive through in your private vehicle.",
    "usual_timings": "Open 24 Hours",
    "days_off": "",
    "keywords": "Camp in the Desert, Camp in the Desert jaisalmer, Camp in the Desert rajasthan, Desert camp jaisalmer",
    "img": ""
  },
  {
    "slug": "favour-the-rajasthani-cuisine",
    "title": "Favour the Rajasthani Cuisine",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1 - 2 hours",
    "destination": "Jaisalmer",
    "caption": "The Royal Cuisine",
    "why_should_you_try": "If you want to get the real taste of Rajasthan, then relishing in the Rajasthani cuisine is the best option. Ditch fast food and other items during the trip and feast on Rajasthani cuisine, which will tickle your palate and satisfy the epicurean within you. The cooking here is influenced by war-like lifestyle of the state and its hot, desert location.",
    "what_should_you_know": "The food is prepared in such a way that it can last for days and be eaten even without heating. So, you can even take dishes such as Pyaaj Kachori, Mirchi Bada or Bikaneri Bhujia with you after enjoying the dishes. Sweet delicacies, particularly, churma and besan chakki along with gujia must be tried. Apart from this gajar ki sabji, kicha ki sabji, kadhi, lauki ke koftey and daal baati churma must not be missed during the feast. There are various places in Jaisalmer that give good quality Rajasthani food.",
    "things_to_care_about": "The food in Jaisalmer tends to be spicy and loaded with clarified butter. You can always tell the chef to adjust as per your taste. <br/>Remember to take some sweets back home.",
    "address": "Rang Mahal restaurant, 5, Hotel Complex,Sam Road,Jaisalmer 345001,Rajasthan India.",
    "distance_from_city_centre": "2.2 km",
    "price": "Cost for two would be approximately Rs 600.",
    "latitude": 26.916388,
    "longitude": 70.887043,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "9 AM - 11 PM",
    "days_off": "",
    "keywords": "Rajasthani Cuisine, Rajasthani Cuisine jaisalmer, Rajasthani Food, Food in jaisalmer",
    "img": ""
  },
  {
    "slug": "a-puppet-show",
    "title": "A Puppet Show",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "30 minutes",
    "destination": "Jaisalmer",
    "caption": "Life in Puppets",
    "why_should_you_try": "Going back in time and seeing the characters of Ramayana and Mahabharta and the kings and queens come alive, all of this merely with the help of puppets, which happens to be one of the major attraction in the whole of Rajasthan. The lively puppets, the colours and the uncanny resemblance to reality will all leave you awestruck. Not just the mythological creatures, but activities and chores of day-to-day life are depicted, making it easy for them to relate to the viewers.",
    "what_should_you_know": "The show can be enjoyed in the Desert Cultural Centre and Museum, where at the advent of every evening, the folk artists in Jaisalmer perform the amusing art of puppetry and incite life to several characters and tales from Rajasthan’s history. The show takes place every evening of the month.This is definitely one of the things to do in Jaisalmer.",
    "things_to_care_about": "Reach the show before time since it gets crowded later on. It usually starts in the late evening around 6 pm.",
    "address": "Gadisar Rd, Amar Sagar Pol, Jaisalmer, Rajasthan 345001.",
    "distance_from_city_centre": "1 km",
    "price": "Cost of the ticket to museum is ₹50, for camera is ₹50 and for combined museum & puppet show is ₹100. The ticket includes admission to the Jaisalmer Folklore Museum.",
    "latitude": 26.910767,
    "longitude": 70.919376,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "10 AM to 6 PM  Puppet show: 6:30 PM - 7:00PM & 7:30 AM - 8:00 PM",
    "days_off": "",
    "keywords": "Puppet Show, Puppet Show  jaisalmer, Puppet Show in jaisalmer",
    "img": ""
  },
  {
    "slug": "get-high-on-bhang-lassi",
    "title": "Get high on Bhang Lassi",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "30 minutes",
    "destination": "Jaisalmer",
    "caption": "Never A Reason To Not",
    "why_should_you_try": "Jaisalmer is famous for its Bhang lassi and you can find it right outside the fort. These are government authorised shops and they even sell Bhang infused biscuits. For people who can handle bhang well, go on why wait! This is like your adda.",
    "what_should_you_know": "There are various government authorized shops in Jaisalmer near jaisalmer fort where you will get Bhang. So need not worry since its legal.<br/>\nOn the other hand, you can buy some bhang, get home and prepare your own bhang lassi and get high on it.",
    "things_to_care_about": "Never have this bhang lassi before your camel safari or any activity as it may lead to complications. Dont drive instantly after having this, its better to wait some time. The first timers should be careful and not drink this in high amounts since the effect would not be controllable.",
    "address": "Amar Sagar Pol, Jaisalmer, Rajasthan 345001.",
    "distance_from_city_centre": "1 km",
    "price": "The costs starts from Rs.100.",
    "latitude": 26.913747,
    "longitude": 70.914163,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "9 AM - 10 PM",
    "days_off": "",
    "keywords": "Bhang Lassi,  Bhang Lassi jaisalmer,",
    "img": ""
  },
  {
    "slug": "marwari-thali-and-halwayi-breakfast",
    "title": "Marwari Thali and Halwayi Breakfast",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1 hour",
    "destination": "Jaisalmer",
    "caption": "Too much isn't much",
    "why_should_you_try": "The Marwari thali and Halwayi breakfast is an integral part of the desert culture of Rajasthan. They are really delicious to feed upon and will make you craving for more. Bajra roti and Missi roti with Gatta Masala and Kher Sangri tastes delicious for lunch and dinner. For breakfast and an evening snack mirchi vada, kachori, samosa, ladoos, lassi and other sweets make for a lip smacking experience.",
    "what_should_you_know": "The most famous place for a hearty meal is the Suryagarh Restaurant, Jaisalmer. The cost would be little on the higher side but its worth it. There are many places where you will get the local food of Jaisalmer.",
    "things_to_care_about": "The Marwari food can be little spicy than normal, so remember to tell the chef to suit as per your taste.",
    "address": "Suryagarh, Kahala Phata, Sam Road, Jaisalmer-345001 Rajasthan, India.",
    "distance_from_city_centre": "13 km",
    "price": "Cost for two would be around Rs 500.",
    "latitude": 26.915909,
    "longitude": 70.908404,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "9 AM - 11 PM",
    "days_off": "",
    "keywords": "Marwari Thali jaisalmer,,Halwayi Breakfast,Halwayi Breakfast jaisalmer, Marwari Thali",
    "img": ""
  },
  {
    "slug": "paint-ball-in-the-desert",
    "title": "Paint Ball in the desert",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1 hour",
    "destination": "Jaisalmer",
    "caption": "A Coloured Mess",
    "why_should_you_try": "Paintball is an adrenaline filled, action packed, fun game played by people of all ages. Indulge in the paintball activity with best quality German equipment and perfect landscaped terrain of the desert giving you an enthralling feel of the war zone. Shoot at each other with the paint-balls and make your team win the match. You would really cherish this experience after doing it.",
    "what_should_you_know": "Friends, family, groups all come together to play paintball and have a blast. Its a game played by people of all ages. Book this in advance since it almost remains full during the season.",
    "things_to_care_about": "Understand properly the safety instructions and follow the rules as the professional says. Remember to wear helmets since not wearing them may hurt you.",
    "address": "Sam Dunes, Jaisalmer, Rajasthan",
    "distance_from_city_centre": "42 km",
    "price": "Starting from Rs.600.",
    "latitude": 26.893219,
    "longitude": 70.529478,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "9 AM - 7 PM",
    "days_off": "",
    "keywords": "Paint Ball In Jaisalmer, Paint Ball Jaisalmer, Paint Ball",
    "img": ""
  },
  {
    "slug": "indulge-in-the-kesar-kasturi",
    "title": "Indulge In The Kesar Kasturi",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1 hour",
    "destination": "Jaisalmer",
    "caption": "Beyond The Name",
    "why_should_you_try": "The Royal Saffron liquor is enriched with as many as 21 exotic spices to tickle your tastebuds. It is an Indian alcoholic preparation that is brewed locally in the villages of Jaisalmer. Although you won't get drunk if you consume in small quantity, this is a must try as it gives you a feeling of royal assosciation.",
    "what_should_you_know": "Generally mistaken to be a sweet dish, Kesar Kasturi is an alcoholic drink. Said to have been passed down from the ages of the Maharajas, the Kesar Kasturi is comparatively stronger than a good old whiskey. Ideally, you're supposed to consume it like a wine and because it's a winter drink. You can find this drink at various locations in Jaisalmer.",
    "things_to_care_about": "Since its comparitvely stronger than a whiskey, take care in the amount you consume. Don't drive or do not get involved in any activity whatsoever since it may lead to complications.",
    "address": "Suryagarh, Kahala Phata, Sam Road, Jaisalmer, Rajasthan 345001",
    "distance_from_city_centre": "13 km",
    "price": "Cost for two would be arouns Rs 400.",
    "latitude": 26.916933,
    "longitude": 70.778162,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "9 AM - 11 PM",
    "days_off": "",
    "keywords": "Indulge In The Kesar Kasturi, Indulge In The Kesar Kasturi jaisalmer,  Jaisalmer Kesar Kasturi",
    "img": ""
  },
  {
    "slug": "hang-out-with-the-villagers",
    "title": "Hang Out With The Villagers",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "2 - 3 hours",
    "destination": "Jaisalmer",
    "caption": "Socializing Gets Better and Better",
    "why_should_you_try": "The best way to know about a city and to get the best experience of it, would be doing it the way the locals do. Learn all about the traditions and the faiths and the myths around, understand everything; from their culture to their food, get the first hand experience by hanging out with the locals. You will experience a vibrant culture as you sip on your drink, hearing stories age-old.",
    "what_should_you_know": "The people around are very-friendly and more than willing to fill you up in all the historical parts, the cultural ways and everything. Not just the city, but the rural settlements are as welcoming as they could be.",
    "things_to_care_about": "Be sensitive towards their beliefs. Do not hurt the local sentiments. People have different ways of living everywhere, understand that their ways may come to you as different if you come from a different place, but indeed, it's just the way it's supposed to be.",
    "address": "Khuri Village, Jaisalmer, Rajasthan",
    "distance_from_city_centre": "48 km",
    "price": "",
    "latitude": 26.614831,
    "longitude": 70.7161,
    "how_to_reach": "You can take a bus to reach Khuri. The bus to Khuri leaves from Gadisar lake between 9:30 am to 10 am and the return bus is approximately at 10:00 am and 2:30 pm from Khuri to Gadisar lake. The bus takes two hours to reach. You can hire a taxi or an auto rickshaw or even drive through in your private vehicle to reach here.",
    "usual_timings": "Open 24 Hours",
    "days_off": "",
    "keywords": "Hang Out With The Villagers, Hang Out With The Villagers jaisalmer, Hang Out  jaisalmer,  The Villagers in jaisalmer",
    "img": ""
  },
  {
    "slug": "ride-a-camel",
    "title": "Ride a Camel",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1 hour",
    "destination": "Jaisalmer",
    "caption": "A Must While You're Here",
    "why_should_you_try": "When you think of Rajasthan, the land of kings, the first image that pops into your head is of a camel, somewhere in a deserted area. True to the imagination, camel ride is the most recommended activity one can suggest while in Rajasthan. Riding on a camel, through the golden deserts, with absolutely no trace of human settlements around is an experience worth paying for. Enjoy the peace and the beauty of the desert, while you make your way through the sands.",
    "what_should_you_know": "If you’re going to be away more than an hour or two at night, bring warm clothing as the temps fall rapidly. Many women recommend a comfortable sports bra as this provides support without digging into your skin. If you’re atop one of these magnificent creatures, pack properly. A cushion to help you adopt to the motion of the camel is vital. You’ll also want to have plenty of water on hand and a camera that is well-shielded from the heat.",
    "things_to_care_about": "While being on top of camel hold your grip tight. Be careful when the camel stand and when it sits. Before having this experience make sure your stomach is not full as it can cause problems.",
    "address": "Real Desert Man Camel Safari Jaisalmer, Opposite to National Handloom, Fort Rd, Manak Chowk, Amar Sagar Pol, Jaisalmer, Rajasthan 345001",
    "distance_from_city_centre": "1 km",
    "price": "Camel Desert Safari costs Rs.500 per person",
    "latitude": 26.836597,
    "longitude": 70.539008,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "6 AM - 10 PM",
    "days_off": "",
    "keywords": "Camel Rides, Camel Rides jaisalmer, Real Desert Man Camel Safari Jaisalmer, Sam Sand Dunes jaisalmer",
    "img": ""
  },
  {
    "slug": "dance-to-the-music",
    "title": "Dance to the Music",
    "best_time_to_visit": "OCT - MAR",
    "best_time_to_visit_more_information": "Its recommended to visit during November to April, because the weather is most beautiful at this time. The summers are really hot and you should avoid visiting during summers. But this experience can be taken all round the year.",
    "time_to_explore": "1 - 2 hours",
    "destination": "Jaisalmer",
    "caption": "The Cultural Dive",
    "why_should_you_try": "Experience the culture of Jaisalmer through the rare folk music and dance of this town. These performances are well dwelled with colourful and traditional dresses and jwellery.  Due to various reasons, Rajasthani folk dance is famous all over the globe and you will definitely experience something extra-ordinary.",
    "what_should_you_know": "Several folk dance shows are held in various cultural venues around the city. Kamaicha is a 400-year old stringed instrument from Rajasthan - a dying art, this is one experience you just can’t afford to miss.",
    "things_to_care_about": "Do not tip the musicians and the dancers. Be sensitive towards their beliefs and remember to not hurt the local sentiments.",
    "address": "Sam Dunes, Jaisalmer, Rajasthan.",
    "distance_from_city_centre": "42 km",
    "price": "Costs starts from Rs 500 per person",
    "latitude": 26.837105,
    "longitude": 70.539201,
    "how_to_reach": "You can reach here through taxi ,rickshaw or by your own private vehicle.",
    "usual_timings": "11 AM - 10 PM",
    "days_off": "",
    "keywords": "Folk Dance, Folk Dance jaisalmer, Music in jaisalmer, music",
    "img": ""
  },
  {
    "slug": "chambal-river-safari",
    "title": "Chambal River Safari",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "3 hours",
    "destination": "Agra",
    "caption": "Home to alligators & crocodiles",
    "why_should_you_try": "If you are a nature lover then this tour is the perfect fit for you. Embark on this exciting boat safari in Chambal and witness the enchanting beauty of the valleys as you boat through the river.",
    "what_should_you_know": "This protected area on the Chambal River is home to alligators, crocodiles, freshwater dolphins, and variety of both native and migratory birds. Take a river safari with a naturalist-guide to learn more about the region's vegetation and wildlife, some of which is endangered, while you soak up the scenery.",
    "things_to_care_about": "",
    "address": "Mela Kothi Road, Village and P.O. Jarar, Bah, Agra, Uttar Pradesh 283104",
    "distance_from_city_centre": "87 Km",
    "price": "",
    "latitude": 26.872516,
    "longitude": 78.564265,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "9:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Chambal River Safari",
    "img": ""
  },
  {
    "slug": "indulge-in-mughal-cuisine",
    "title": "Indulge in Mughal Cuisine",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "1 hours",
    "destination": "Agra",
    "caption": "Real king cuisine",
    "why_should_you_try": "Back in the 16th century, the Mughals made Agra the capital of India and constructed all those world-famous monuments you might have heard of. So it’s no surprise that the Muslim empire left indelible imprints on Agra’s cuisine as well, much like it has in Delhi and other parts of North India.",
    "what_should_you_know": "You may already know its trademarks: creamy, boldly flavored curries; lots of ground and whole spices, dried fruits and nuts; roasted meats. It’s a rich cuisine fit for a king.",
    "things_to_care_about": "",
    "address": "Chaat Wali Gali, Sadar Bazar, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "7.9 Km",
    "price": "Rs 200 - Rs 1000 /- person",
    "latitude": 27.21046,
    "longitude": 78.006882,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "10:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Indulge in Mughal Cuisine",
    "img": ""
  },
  {
    "slug": "momuments-galore",
    "title": "Monuments Galore",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "1-2 hours",
    "destination": "Agra",
    "caption": "Archietctural wonder",
    "why_should_you_try": "The fort is built out of sandstone, of which the magnificent palaces inside the fort were built by Shah jahan out of white marble.The Sheesh Mahal (Palace of Mirrors). He built it as a summer palace, which features appliqué mirror work on the ceilings and walls.",
    "what_should_you_know": "The convex mirrors have highly reflective qualities. Because the palace has only a few places for light to shine through, the semi dark interior required artificial light, which glittered and twinkled thousands of ways through the mirrors.",
    "things_to_care_about": "",
    "address": "Agra Fort | Rakabgani, Agra 282003, India",
    "distance_from_city_centre": "10 Km",
    "price": "",
    "latitude": 27.179561,
    "longitude": 78.02108,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "10:00 AM - 5:00 PM",
    "days_off": "",
    "keywords": "Monuments Galore",
    "img": ""
  },
  {
    "slug": "marble-shopping-at-subhash-emporium",
    "title": "Marble Shopping at Subhash Emporium",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "1 hour",
    "destination": "Agra",
    "caption": "Agra is known for marbles",
    "why_should_you_try": "While more expensive than many other shops, you definitely get what you pay for: high-quality stone and master craftsmanship at an astonishingly lower price.",
    "what_should_you_know": "Some of the pieces on display at this renowned marble shop are simply stunning. Some of the work is decorative, but some is functional, such as tabletops, trays, lamp bases, and candle holders that glow from the flame inside.",
    "things_to_care_about": "",
    "address": "18/1, Gwalior Road, Opp BSNL office, Shahzadi Mandi,, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "9 Km",
    "price": "",
    "latitude": 27.162743,
    "longitude": 78.014645,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "10:00 AM - 7:00 PM",
    "days_off": "",
    "keywords": "Marble Shopping at Subhash Emporium",
    "img": ""
  },
  {
    "slug": "kalakriti-dance-drama-show",
    "title": "Kalakriti Dance Taj Show",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "2 hours",
    "destination": "Agra",
    "caption": "Agra's famous cultural show",
    "why_should_you_try": "Watching the show 'Mohabbat The Taj' is an amazing experience. Artists who play their respective parts perform with full of excellency and seeing their performance you can say they all are matchless. Apart from their acting stage arrangement with lighting system is marvellous.",
    "what_should_you_know": "Excellent artists who were working on the stone and giving shape them into Taj Mahal, centre table, dining tablet & atlast rising of Taj Mahal on the stage is amazing.",
    "things_to_care_about": "",
    "address": "41/142 A/1 Fatehabad Road | Behind Hotel Trident, Opposite Hotel Pushp Villa, Agra 282004, India",
    "distance_from_city_centre": "12.8 Km",
    "price": "Rs 750 /- per person if pre-booked",
    "latitude": 27.161961,
    "longitude": 78.060109,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "11:00 AM - 9:00 PM",
    "days_off": "",
    "keywords": "Kalakriti Dance Taj Show",
    "img": ""
  },
  {
    "slug": "mughal-heritage-walk",
    "title": "Mughal heritage walk",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "2 hours",
    "destination": "Agra",
    "caption": "See Mughal culture in locality",
    "why_should_you_try": "Mughal heritage walk is good to see local culture and impact of mughal culture on locality. It makes you wonder to see people and their language variation to distance.",
    "what_should_you_know": "An insight into what life is like in a traditional village.The walk is approx 1.5km and you get a view of the taj mahlal at the end of the walk.You can observe the local people , their culture and activity here.",
    "things_to_care_about": "",
    "address": "U.P Tourism, Taj Rd, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "10 Km",
    "price": "",
    "latitude": 27.179561,
    "longitude": 78.021081,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "10:00 AM - 5:00 PM",
    "days_off": "",
    "keywords": "Mughal heritage walk",
    "img": ""
  },
  {
    "slug": "monuments-of-agra-on-cycle",
    "title": "Monuments of agra on cycle",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "2 hours",
    "destination": "Agra",
    "caption": "There is no better way to explore this city",
    "why_should_you_try": "Welcome to Agra By Bike, Exploring agra by bicycles visiting different monuments, discovering the local places & culture is something unique. Experience what this magnificent city has to offer from visiting a 400-year old bazaar to food tastings at the local street market and appreciating the beautiful architecture of Jama Masjid.",
    "what_should_you_know": "Visit old temples, spice markets and see local life up close. Enter the old city market known as Kinari Bazaar, the biggest and oldest local bazaar of North India, which has been around for 400 yrs old from the time of Mughals. You will be visiting the famous Spice Market where spice traders who came from the ancient silk route sold their products, and see locals selling and auctioning daily household items.",
    "things_to_care_about": "",
    "address": "",
    "distance_from_city_centre": "10 Km",
    "price": "Rs 350 /- per person",
    "latitude": 27.169576,
    "longitude": 78.049314,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "6:00 AM - 7:00 PM",
    "days_off": "",
    "keywords": "Monuments of agra on cycle",
    "img": ""
  },
  {
    "slug": "petha",
    "title": "Eat Petha",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "30 mins",
    "destination": "Agra",
    "caption": "Sweatness overdose",
    "why_should_you_try": "You’ll start seeing signs for petha the minute you enter Agra. Closely associated with the city’s train stations, where it used to be the platform snack of choice, it’s a centuries-old sweet made from ash gourd—also called white pumpkin or squash—cooked in sugar syrup",
    "what_should_you_know": "It comes in many varieties: plain (white); kesar (saffron); with nuts; in colorful shades of pineapple, coconut, mango; in small balls or rectangular hunks; served dry or in some syrup. It can be very soft and a bit syrupy inside, or harder and chewy, but it’s always sweet and usually rather floral in taste.",
    "things_to_care_about": "",
    "address": "Chaat Wali Gali, Sadar Bazar, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "7.9 Km",
    "price": "Rs 40 /- per person",
    "latitude": 27.21046,
    "longitude": 78.006882,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "9:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Eat Petha",
    "img": ""
  },
  {
    "slug": "dalmoth",
    "title": "Eat Dalmoth",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "30 mins",
    "destination": "Agra",
    "caption": "Crispy, spicy, and a little greasy",
    "why_should_you_try": "Dalmoth is a traditional namkeen, or savory dry snack, in Agra, made from fried lentils, nuts, spices, and oil. Crispy, spicy, and a little greasy, it’s the kind of snack you’d enjoy best with a cold hoppy beer—if you weren’t in India.",
    "what_should_you_know": "A traditional namkeen from Agra, Dalmothis made from nuts, spices, and oil. The best Dalmoth can be found in PanchiPetha and Baluganj",
    "things_to_care_about": "",
    "address": "Chaat Wali Gali, Sadar Bazar, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "7.9 Km",
    "price": "Rs 100 /- per person",
    "latitude": 27.21046,
    "longitude": 78.006882,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "9:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Eat Dalmoth",
    "img": ""
  },
  {
    "slug": "bedhai-and-jalebi",
    "title": "Taste Bedhai and Jalebi",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "30 mins",
    "destination": "Agra",
    "caption": "Crispy & Sweet Indian Dessert",
    "why_should_you_try": "A famous breakfast dish among Agra-wasis, this typical breakfast is served at street stands, corner points and on redis.  Fresh Jalebis and Kachoris are so famous and loved that the street corners are filled with people in the morning time.",
    "what_should_you_know": "This mouthwatering dish consists of two parts, one of which is spicy and the other one is sweet. Bedhai part of it is a fried, round, puffy bread typically served with a bowl full of spicy green sabzi made from of potato and curd. Jalebi, as most of you must have tried is sweet, a sticky dessert made of fermented batter. GMB and Shree Ji sweets on Fatehabad Road are famous corners with Bedhai&Kachori being its specialty.",
    "things_to_care_about": "",
    "address": "Chaat Wali Gali, Sadar Bazar, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "7.9 Km",
    "price": "Rs 50 /- per person",
    "latitude": 27.16703,
    "longitude": 78.009331,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "9:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Taste Bedhai and Jalebi",
    "img": ""
  },
  {
    "slug": "chaat",
    "title": "Try Chaat",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "30 mins",
    "destination": "Agra",
    "caption": "Savory snack",
    "why_should_you_try": "Chaats are very popular amoung locals especially women's who becomes girl anytime they spot chaatwala.",
    "what_should_you_know": "When talking about Agra we will focus mainly of the bhallas, as Agra bhallas are a bit different than what you have in Delhi.The bhallas are made big and crispier in Agra.  Dahi-bhaal, raj kachori, samosa and golgappas are famous.",
    "things_to_care_about": "",
    "address": "Chaat Wali Gali, Sadar Bazar, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "7.9 Km",
    "price": "Rs 50 /- per person",
    "latitude": 27.15925,
    "longitude": 78.010244,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "9:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Try Chaat",
    "img": ""
  },
  {
    "slug": "gajak-and-chikki",
    "title": "Taste Gajak and Chikki",
    "best_time_to_visit": "DEC - FEB",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "30 mins",
    "destination": "Agra",
    "caption": "Dry sweet made of sesame seeds",
    "why_should_you_try": "Gajak and Rewadi are the traditional sweets found in northern India. They come in various varieties and are enjoyed only in winter seasons.",
    "what_should_you_know": "It is believed that Gajak and Rewadi are healthy to eat in winter as they provide good amount of energy to the body.",
    "things_to_care_about": "",
    "address": "Chaat Wali Gali, Sadar Bazar, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
    "distance_from_city_centre": "7.9 Km",
    "price": "Rs 125 / Pack",
    "latitude": 27.183422,
    "longitude": 78.016298,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "9:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Taste Gajak and Chikki",
    "img": ""
  },
  {
    "slug": "balloon-safari",
    "title": "Balloon safari",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "2 hours",
    "destination": "Agra",
    "caption": "Experience unforgettable moments",
    "why_should_you_try": "Air Balloon is one of the oldest and successful aerial vehicle which paved way to modern-day technology. Seeing different places in itself provides satisfaction and gives immense pleasure to human minds.The most amazing experience to view Taj Mahal from the top.",
    "what_should_you_know": "The experience of exploring places from a different perspective unimagined by normal minds is an exhilarating opportunity, Air Safari is one such.",
    "things_to_care_about": "",
    "address": "41/142, A/1 VIP Road to Taj Mahal, Fatehabad Road, Agra – 282001, Uttar Pradesh, India, ph 093595 22603",
    "distance_from_city_centre": "12 Km",
    "price": "Rs 750 /- per person",
    "latitude": 27.161602,
    "longitude": 78.060074,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "6:00 AM - 8:30 PM",
    "days_off": "",
    "keywords": "Balloon safari",
    "img": ""
  },
  {
    "slug": "taj-nature-walk",
    "title": "Taj Nature Walk",
    "best_time_to_visit": "NOV - MAR",
    "best_time_to_visit_more_information": "Availaible throughout the year",
    "time_to_explore": "1 hours",
    "destination": "Agra",
    "caption": "A beautiful natural forest",
    "why_should_you_try": "A well lit by decorative lamp post in th evening for a very good enjoyable walk towards the taj.",
    "what_should_you_know": "A very clean, picturesque and dotted way with nice shops on one side selling local decors/momentos and on other side their are government bunglows/facilities. it's 2-3 km approach road to Tajmahal, build with red paved blocks/ tiles, restricted for use of electrically operated vehicles , man pulled rickshaws, horse driven Tangas with both the shoulders kept for walkers",
    "things_to_care_about": "Beware of fraud autowallas, tangewallas, they will loot not only high rate from you but also act as agents to certain shopwallas and will misled you to these places.",
    "address": "Taj East Gate Road, Agra 282001, India",
    "distance_from_city_centre": "14.6 Km",
    "price": "",
    "latitude": 27.170705,
    "longitude": 78.04621,
    "how_to_reach": "There are a lot of autos and battery-powered rickshaws plying between the two which charge a minimal amount. Private cars and autos are highly recommended because of the road conditions.",
    "usual_timings": "06:00AM - 7:00 PM",
    "days_off": "",
    "keywords": "Taj Nature Walk",
    "img": ""
  },
  {
    "slug": "kadhi-chawal-old-manali",
    "title": "Eat kadhi Chawal in old manali",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "20 mins",
    "destination": "Manali",
    "caption": "Indian favourite",
    "why_should_you_try": "Local dhabas in old manali are famous for its mouthwatering kadhi chawal (a spicy gram flour curry and rice dish), no matter where you have this dish in Himachal, you will always come back for more.",
    "what_should_you_know": "",
    "things_to_care_about": "",
    "address": "Circuit House Road, Siyal, Kullu, Manali, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 100/ - per person",
    "latitude": 32.253155,
    "longitude": 77.176704,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Eat kadhi Chawal in old manali",
    "img": ""
  },
  {
    "slug": "lugari-in-manali",
    "title": "Drink Lugari",
    "best_time_to_visit": "DEC - FEB",
    "best_time_to_visit_more_information": "Prepared fresh in winter but availaible whole year",
    "time_to_explore": "3 hours",
    "destination": "Manali",
    "caption": "local alcholic beverage",
    "why_should_you_try": "A kind of crude beer made from fermented rice or barley,  You probably remember this drink from ' Yeh Jawani Hai Deewani '.",
    "what_should_you_know": "Sharab or Arak is a alcoholic drink distilled from Lugdi/chang. Arak can also be made from jaggery or apples or any other fruit.",
    "things_to_care_about": "",
    "address": "Circuit House Road, Siyal, Kullu, Manali, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 150/ - per person",
    "latitude": 32.253155,
    "longitude": 77.176704,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Drink Lugari",
    "img": ""
  },
  {
    "slug": "Dham-manali",
    "title": "Eat Dham",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "30 mins",
    "destination": "Manali",
    "caption": "Traditional food",
    "why_should_you_try": "Dham, which is usually cooked during wedding ceremonies in Himachal Pradesh. It often includes rice, curry, curd and sweetened rice among other things. Often served as a special lunch, you will find it at many local food joints.",
    "what_should_you_know": "",
    "things_to_care_about": "",
    "address": "Circuit House Road, Siyal, Kullu, Manali, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 150/ - per person",
    "latitude": 32.244076,
    "longitude": 77.189221,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Eat Dham",
    "img": ""
  },
  {
    "slug": "river-trout",
    "title": "Taste RivercTrout",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "30 mins",
    "destination": "Manali",
    "caption": "Local favourite",
    "why_should_you_try": "There is no way you can visit Manali and not feast on the local favourite--river trout preparations made with local flavours. Generally served along with rice, the flavours are both spicy and tangy. You can try out a tandoori take on this dish at the Khyber Restaurant.",
    "what_should_you_know": "",
    "things_to_care_about": "",
    "address": "Circuit House Road, Siyal, Kullu, Manali, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 250/ - per person",
    "latitude": 32.253155,
    "longitude": 77.176704,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 10:00 PM",
    "days_off": "",
    "keywords": "Taste RivercTrout",
    "img": ""
  },
  {
    "slug": "horse-riding-at-the-mall",
    "title": "Experience Horse Riding",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "2 hours",
    "destination": "Manali",
    "caption": "Horses make a landscape look beautiful",
    "why_should_you_try": "Enjoy admiring the attractive streams, enthralling mountains with the rustic flowers and cherish the marvellous memory. Explore the lush green dense forest of Manali and the snow clad mountains as you ride the majestic horse Participate in this horse ride around the captivating mountains of Manali along with your dear family.",
    "what_should_you_know": "The hotels may make arrangement for horse ride on request.",
    "things_to_care_about": "",
    "address": "Circuit House Road, Siyal, Kullu, Manali, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "For 2 Hours Rs. 700/- per person<br/>For  4 Hours Rs. 1000/- per person",
    "latitude": 32.253155,
    "longitude": 77.176704,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "10:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Experience Horse Riding",
    "img": ""
  },
  {
    "slug": "royal-enfield-rentals-manali",
    "title": "Hire Enfield for Manali Or Leh Ladakh",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 - 7 days",
    "destination": "Manali",
    "caption": "Some paths can't be discovered without getting lost",
    "why_should_you_try": "Home to the highest mountain range in the world, Himalayas is a synonym to Paradise. Explore the majestic mountains, deep valleys and great glaciers on royal enfield. The Himalayas are beautiful, serene and adventurous from thick forest to lush valleys, from tropical jungles to mighty hills, Himalayan ranges have it all.Rent a Enfield for a day or for a week.",
    "what_should_you_know": "Have proper tour guidance before hand. Set goals and distances you'll be covering for that day each morning. Avoid riding in night",
    "things_to_care_about": "",
    "address": "Vashisht Temple,, Manali, Himachal Pradesh 175103",
    "distance_from_city_centre": "3.9 Km",
    "price": "Rs 750/ - per motorbike per day",
    "latitude": 32.260886,
    "longitude": 77.189023,
    "how_to_reach": "You reach here either by bus or by taxi or by auto whichever is more convienent to you or you can just walk its only around 4 Km",
    "usual_timings": "09:00 AM - 06:00 PM",
    "days_off": "",
    "keywords": "Hire Enfield for Manali Or Leh Ladakh",
    "img": ""
  },
  {
    "slug": "body-spa-at-kanyal-road",
    "title": "Abhyangam Body Spa",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "45 mins",
    "destination": "Manali",
    "caption": "Sometimes our biggest mistakes give us our greatest reward",
    "why_should_you_try": "The therapist will provide you will effective strokes and rubs on your body, which will remove the toxins and will de-stress you Treat your stressed body with this relaxing Abhyangam body spa for 45 minutes and experience a rejuvenated self",
    "what_should_you_know": "This upscale resort surrounded by mountains, a pine forest and fruit orchards is on the banks of Beas River.",
    "things_to_care_about": "",
    "address": "Kullu - Manali Highway, Katrain, Himachal Pradesh 175129\nPhone: 098160 92413",
    "distance_from_city_centre": "19 Km",
    "price": "Rs 2400/ - per session per person",
    "latitude": 32.129924,
    "longitude": 77.124182,
    "how_to_reach": "You reach here either by bus or by taxi or by auto whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "10:00 AM - 09:00 PM",
    "days_off": "",
    "keywords": "Abhyangam Body Spa",
    "img": ""
  },
  {
    "slug": "rock-climbing-at-naggar",
    "title": "Rock Climbing at Naggar castle",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 - 2 hours",
    "destination": "Manali",
    "caption": "When you can’t climb, you tend to stag & call it home",
    "why_should_you_try": "This exhilarating activity can be the best way to overcome your fears, and conquer your own abilities. You need no previous rock climbing experience to participate in this activity. Explore the beauty of nature in an adventurous way.",
    "what_should_you_know": "You need no previous rock climbing experience to participate in this activity. you will get all the right instructions to make your experience a memorable one. You must bring your climbing boots (sports shoes) for experiencing a comfortable climbing activity. All other climbing equipment required for this activity will be provided",
    "things_to_care_about": "",
    "address": "Kullu - Naggar - Manali Rd, VPO Larankelo Near Naggar Castle, MDR29, Nathan, Himachal Pradesh 175130",
    "distance_from_city_centre": "20 Km",
    "price": "Rs 800/ - per session per person",
    "latitude": 32.055815,
    "longitude": 77.135194,
    "how_to_reach": "You can hire a taxi from Manali which will cost around Rs. 600. A much cheaper alternative is to take the government bus from Manali bus stand at 8 in the morning. The bus returns at 3 pm from Solang Valley.",
    "usual_timings": "09:00 AM - 04:00 PM",
    "days_off": "",
    "keywords": "Rock Climbing at Naggar castle",
    "img": ""
  },
  {
    "slug": "rock-climbing-rangri-vashisht",
    "title": "Rock Climbing Rangri, Vashisht",
    "best_time_to_visit": "OCT - MAY",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 - 2 hours",
    "destination": "Manali",
    "caption": "First step to fearlessness",
    "why_should_you_try": "One of the best places for rock climbing. Give those tired muscles a push and enjoy the adrenalin rush. Rock climbing involves climbing a slab of rock with the use of a rope and harness. This exhilarating activity can be the best way to overcome your fears, and conquer your own abilities.",
    "what_should_you_know": "You need no previous rock climbing experience to participate in this activity. you will get all the right instructions to make your experience a memorable one. You must bring your climbing boots (sports shoes) for experiencing a comfortable climbing activity. All other climbing equipment required for this activity will be provided",
    "things_to_care_about": "",
    "address": "Chidyari - Vashisht Road, Kullu, Vashist, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 600/ - per session per person",
    "latitude": 32.255001,
    "longitude": 77.189972,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Rock Climbing Rangri, Vashisht",
    "img": ""
  },
  {
    "slug": "canyoning-in-vashisht",
    "title": "Canyoning In Vashisht",
    "best_time_to_visit": "OCT - MAY",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 - 2 hours",
    "destination": "Manali",
    "caption": "Take a leap of faith",
    "why_should_you_try": "Canyoning is an adventure sport that utilizes abseiling, rock climbing, caving, swimming, hiking and trekking. Canyoning can cater to both young or old and provide an amazing recreational activity that will keep you hooked.",
    "what_should_you_know": "An adequate level of physical fitness is required for canyoning which mainly requires the use of your arms and legs.",
    "things_to_care_about": "",
    "address": "Chidyari - Vashisht Road, Kullu, Vashist, Himachal Pradesh 175131",
    "distance_from_city_centre": "4 Km",
    "price": "Rs 1400/ - per session per person",
    "latitude": 32.255001,
    "longitude": 77.189972,
    "how_to_reach": "You reach here either by bus or by taxi or by auto whichever is more convienent to you or you can just walk its only around 4 Km",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Canyoning In Vashisht",
    "img": ""
  },
  {
    "slug": "helicopter-rides-manali",
    "title": "Helicopter Rides Manali",
    "best_time_to_visit": "APR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "30 mins",
    "destination": "Manali",
    "caption": "First time looking down from helicopter",
    "why_should_you_try": "Joyride of helicopter at an amazing speed covering about 5 Nautical miles at an average altitude of 1500 feet above the Kullu Valley in Manali Region gets even more fun taking you closer to the high alpine areas.The rohtang pass flight taking you directly above the pass hover in the area and back to Manali.",
    "what_should_you_know": "",
    "things_to_care_about": "",
    "address": "HIMALAYAN JOURNEYS, Park View Building, The Mall, Manali-175131 Distt Kullu (H.P.) INDIA Ph : +91-1902-252365",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 5000 per person for 10 minute high speed thrill.",
    "latitude": 32.238049,
    "longitude": 77.193455,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "10:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Helicopter Rides Manali",
    "img": ""
  },
  {
    "slug": "atv-at-solong",
    "title": "All Terrain Vehicle at Solong",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "30 mins",
    "destination": "Manali",
    "caption": "Explore the rarest, fastest !",
    "why_should_you_try": "If you have never gone for a high speed ride through the forest with your home team you cannot simply miss changing that. Single and multiple seater ATV biking or quad biking are available at Solang valley for true adventurers.",
    "what_should_you_know": "There are professional drivers who guide you throughout. A ride to river bank of Beas is the most adventures and memorable. This 4x4 driving experience is available in both summer and winter.",
    "things_to_care_about": "",
    "address": "Solang Valley, Burwa, Himachal Pradesh 175103",
    "distance_from_city_centre": "17 Km",
    "price": "Rs 2000/ - per day per vehical",
    "latitude": 32.313162,
    "longitude": 77.163412,
    "how_to_reach": "You can hire a taxi from Manali which will cost around Rs. 600. A much cheaper alternative is to take the government bus from Manali bus stand at 8 in the morning. The bus returns at 3 pm from Solang Valley.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "All Terrain Vehicle at Solong",
    "img": ""
  },
  {
    "slug": "zorbing-in-solang-valley",
    "title": "Zorbing in Solang Valley",
    "best_time_to_visit": "JAN - MAY",
    "best_time_to_visit_more_information": "The best months for doing zorbing are from January to May and October to December as the rainy season is unfavourable for the activity.",
    "time_to_explore": "10 mins",
    "destination": "Manali",
    "caption": "Get High on Adernaline Fast",
    "why_should_you_try": "Zorbing includes slipping into the enormous straight forward balls and strapping yourself up at the highest point of the mountain, and afterward sliding down the same, which is regularly helped by the coordinator who keeps running along your ball.",
    "what_should_you_know": "The action can be delighted in by two individuals at any given time, if they coordinate as far as possible. The charges for this action rely on upon the length you cover with the zorb, and for the most part this separation is around 100 m",
    "things_to_care_about": "",
    "address": "Solang Valley, Burwa, Himachal Pradesh 175103",
    "distance_from_city_centre": "17 Km",
    "price": "Rs. 500 per person",
    "latitude": 32.313162,
    "longitude": 77.163412,
    "how_to_reach": "You can hire a taxi from Manali which will cost around Rs. 600. A much cheaper alternative is to take the government bus from Manali bus stand at 8 in the morning. The bus returns at 3 pm from Solang Valley.",
    "usual_timings": "09:00 AM - 06:00 PM",
    "days_off": "",
    "keywords": "Zorbing in Solang Valley",
    "img": ""
  },
  {
    "slug": "snowboarding-in-hamta-manali",
    "title": "Snowboarding in Hamta Manali",
    "best_time_to_visit": "DEC - JAN",
    "best_time_to_visit_more_information": "Availaible only in winters",
    "time_to_explore": "1 day",
    "destination": "Manali",
    "caption": "One of the purest pleasures of life",
    "why_should_you_try": "There is no sport more extreme and exhilarating than the exciting discipline of snowboarding Rushing down the ram bagh on a professional grade snowboard is one of the purest pleasures of life. This is an opportunity that would be excellent for expert snowboarders and also new comers to the discipline alike, try out something unique by hitting the slopes.",
    "what_should_you_know": "Take part in this experience and you'll be guided on the basic of snowboarding by a trained professional who will also select the best routes for you based on your skill level.",
    "things_to_care_about": "",
    "address": "Solang Valley, Burwa, Himachal Pradesh 175103",
    "distance_from_city_centre": "20 Km",
    "price": "Rs 1000/ -  per person",
    "latitude": 32.270415,
    "longitude": 77.346572,
    "how_to_reach": "You can hire a taxi from Manali which will cost around Rs. 600. A much cheaper alternative is to take the government bus from Manali bus stand at 8 in the morning. The bus returns at 3 pm from Solang Valley. It is recommended that you book your accommodation there.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Snowboarding in Hamta Manali",
    "img": ""
  },
  {
    "slug": "snowboarding-at-ram-bagh",
    "title": "Snowboarding at Ram Bagh",
    "best_time_to_visit": "DEC - JAN",
    "best_time_to_visit_more_information": "Availaible only in winters",
    "time_to_explore": "1 day",
    "destination": "Manali",
    "caption": "Be in the free spirit on white ground",
    "why_should_you_try": "There is no sport more extreme and exhilarating than the exciting discipline of snowboarding snow capped mountains of the r. Rushing down the ram bagh on a professional grade snowboard is one of the purest pleasures of life. This is an opportunity that would be excellent for expert snowboarders and new comers to the discipline alike, try out something unique by hitting the slopes !",
    "what_should_you_know": "Take part in this experience and you'll be guided on the basic of snowboarding by a trained professional who will also select the best routes for you based on your skill level.",
    "things_to_care_about": "",
    "address": "# 1, Rambagh, The Mall, Manali - Himachal Pradesh, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 1200/ - per person",
    "latitude": 32.246644,
    "longitude": 77.189989,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Snowboarding at Ram Bagh",
    "img": ""
  },
  {
    "slug": "skiing-at-rohtang-pass",
    "title": "Skiing at rohtang pass",
    "best_time_to_visit": "DEC - JAN",
    "best_time_to_visit_more_information": "Availaible only in winters",
    "time_to_explore": "1 day",
    "destination": "Manali",
    "caption": "Never give up falling",
    "why_should_you_try": "Set at an altitude of 2050 meter, Manali is covered by beautiful deodar forests and huge peaks over 6000 Mtr. If you are adventure lover and you are looking for safe skiing in manali managed by expert skiing professionals, then get ready for some thrilling experience of Skiing at rohtang.",
    "what_should_you_know": "You have to report at the office by 8 in the morning. Where they will provide you all the equipments for skiing. Trained instructors will also guide you to use them and give you tips on skiing efficiently without skidding or slipping. After you are properly geared and confident on the rules, start skiing on your own. lunch at the spot will be provided in the afternoon. Post lunch you can carry on skiing till 5:00 pm.",
    "things_to_care_about": "",
    "address": "Rohtang Tunnel North Portal Approach Road, Manali, Himachal Pradesh 175140",
    "distance_from_city_centre": "53 Km",
    "price": "Rs 7000/ -  per person",
    "latitude": 32.379841,
    "longitude": 77.251482,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Skiing at rohtang pass",
    "img": ""
  },
  {
    "slug": "sking-at-solang-valley",
    "title": "Sking at Solang valley",
    "best_time_to_visit": "DEC - JAN",
    "best_time_to_visit_more_information": "Availaible only in winters",
    "time_to_explore": "1 day",
    "destination": "Manali",
    "caption": "Crashing is the part of learning",
    "why_should_you_try": "Set at an altitude of 2050 meter, Manali is covered by beautiful deodar forests and huge peaks over 6000 Mtr. if you are adventure lover! If you are looking for safe skiing in manali managed by expert skiing professionals, then get ready for some thrilling experience of Skiing.",
    "what_should_you_know": "You have to report at the office by 8 in the morning. Where they will provide you all the equipments for skiing. Trained instructorsw ill also guide you to use them and give you tips on skiing efficiently without skidding or slipping. After you are properly geared and confident on the rules, start skiing on your own. lunch at the spot will be provided in the afternoon. Post lunch you can carry on skiing till 5:00 pm.",
    "things_to_care_about": "",
    "address": "PO Palchan, Solang Valley Manali, Manali, Himachal Pradesh 175103, ph 098157 55585",
    "distance_from_city_centre": "17 Km",
    "price": "Rs 5000/ -  per person",
    "latitude": 32.313162,
    "longitude": 77.163412,
    "how_to_reach": "You can hire a taxi from Manali which will cost around Rs. 600. A much cheaper alternative is to take the government bus from Manali bus stand at 8 in the morning. The bus returns at 3 pm from Solang Valley. It is recommended that you book your accommodation there.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Sking at Solang valley",
    "img": ""
  },
  {
    "slug": "skiing-at-gulaba",
    "title": "Skiing in gulaba",
    "best_time_to_visit": "DEC - JAN",
    "best_time_to_visit_more_information": "Availaible only in winters",
    "time_to_explore": "1 day",
    "destination": "Manali",
    "caption": "Rebellion against rules",
    "why_should_you_try": "Set at an altitude of 2050 meter, Manali is covered by beautiful deodar forests and huge peaks over 6000 Mtr. if you are adventure lover! If you are looking for safe skiing in manali managed by expert skiing professionals, then get ready for some thrilling experience of Skiing.",
    "what_should_you_know": "You have to report at the office by 8 in the morning. Where they will provide you all the equipments for skiing. Trained instructorsw ill also guide you to use them and give you tips on skiing efficiently without skidding or slipping. After that, you will be taken to Gulaba. After you are properly geared and confident on the rules, start skiing on your own. lunch at the spot will be provided in the afternoon. Post lunch you can carry on skiing till 5:00 pm.",
    "things_to_care_about": "",
    "address": "Gulaba ,Burwa, Himachal Pradesh, India",
    "distance_from_city_centre": "21 Km",
    "price": "Rs 6000/ -  per person",
    "latitude": 32.055815,
    "longitude": 77.135194,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Skiing in gulaba",
    "img": ""
  },
  {
    "slug": "snow-scooter",
    "title": "Snow Scooter",
    "best_time_to_visit": "DEC - JAN",
    "best_time_to_visit_more_information": "Availaible only in winters",
    "time_to_explore": "30 mins",
    "destination": "Manali",
    "caption": "Take control of your destiny",
    "why_should_you_try": "Ride the snow mobile for the ultimate fun at Rohtang La Snow Point. This snow scooter adventure is a unique way to revel in the endless snow.",
    "what_should_you_know": "Drive with either an experienced snow scooter instructor, or take it out for a spin on your own. The powerful machines allow you to glimpse the abundant beauty over a 2-kilometer stretch, and is fun with friends and family.",
    "things_to_care_about": "",
    "address": "Solang Valley, Burwa, Himachal Pradesh 175103",
    "distance_from_city_centre": "13 Km",
    "price": "Rs 1000/ -  per person",
    "latitude": 32.313162,
    "longitude": 77.163412,
    "how_to_reach": "You can hire a taxi from Manali which will cost around Rs. 600. A much cheaper alternative is to take the government bus from Manali bus stand at 8 in the morning. The bus returns at 3 pm from Solang Valley.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Snow Scooter",
    "img": ""
  },
  {
    "slug": "river-rafting-from-raison-to-kullu",
    "title": "River Rafting From Raison To Kullu",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "2 hours",
    "destination": "Manali",
    "caption": "14 Km Short rafting",
    "why_should_you_try": "River rafting in Manali is one heart racing adventure that gets thrill seeking travelers on their toes. Easy and abundant water in the Beas River, has made this place a hub for various water adventure activities. Manali river rafting is one adventure excursion for all adrenaline junkies! Brace yourself for a thrilling experience while manoeuvring your raft, as this is one adventure which is all about teamwork. So forget the fear and get ready for a memorable experience.",
    "what_should_you_know": "Your instructor is your life saver, so it is wise to hear him out. So, brace up and do what you are being told to do. A decent quality life jacket can deal with around 110-150kgs of weight, which means regardless of the possibility of falling your life jacket will offer you great deal of assistance in staying above water. The best thing to do is to wear clothes that can get dry effortlessly. Materials like polyester and capilene dry quickly and also keep your skin dry and warm.  it is a good idea to apply a good amount of waterproof sunscreen with maximum SPF on the exposed areas.",
    "things_to_care_about": "Long hours of staying in water and sun can leave you with major tanning.",
    "address": "Camping Site, Kullu District,, Raison, Himachal Pradesh 175128\nPhone: 088265 94262",
    "distance_from_city_centre": "23 Km",
    "price": "Rs. 1000 - Rs. 1500 per person",
    "latitude": "",
    "longitude": "",
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "River Rafting From Raison To Kullu",
    "img": ""
  },
  {
    "slug": "rafting-in-river-beas",
    "title": "Rafting in beas",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 hour",
    "destination": "Manali",
    "caption": "7 Km Short rafting",
    "why_should_you_try": "White water rafting is most likely one of the best adventure experience that one can take up. Whether you are an amateur or a veteran, the rush of rafting never shows signs of change. Manali river rafting is one adventure excursion for all adrenaline junkies! Brace yourself for a thrilling experience while manoeuvring your raft, as this is one adventure which is all about teamwork. No doubt rafting surprisingly can be nerve-wrecking activity.",
    "what_should_you_know": "Your instructor is your life saver, so it is wise to hear him out. So, brace up and do what you are being told to do. A decent quality life jacket can deal with around 110-150kgs of weight, which means regardless of the possibility of falling your life jacket will offer you great deal of assistance in staying above water. The best thing to do is to wear clothes that can get dry effortlessly. Materials like polyester and capilene dry quickly and also keep your skin dry and warm.  it is a good idea to apply a good amount of waterproof sunscreen with maximum SPF on the exposed areas.",
    "things_to_care_about": "Long hours of staying in water and sun can leave you with major tanning.",
    "address": "Beas River Tributaries, Manali, Himachal Pradesh",
    "distance_from_city_centre": "13 Km",
    "price": "Rs. 1000 per person",
    "latitude": 32.255001,
    "longitude": 77.189972,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Rafting in beas",
    "img": ""
  },
  {
    "slug": "rafting-in-pirdi",
    "title": "Rafting in pirdi",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 hour",
    "destination": "Manali",
    "caption": "7 Km Short rafting",
    "why_should_you_try": "Rafting in Pirdi: River rafting is offered by private operators at Pirdi, near Kullu. Rafting is done on Beas river from Pirdi down to Jhiri, which is approximately 14 kms. Fun, exciting and absolutely thrilling, rafting is just the thing for you if you are a water baby.",
    "what_should_you_know": "Your instructor is your life saver, so it is wise to hear him out. So, brace up and do what you are being told to do. A decent quality life jacket can deal with around 110-150kgs of weight, which means regardless of the possibility of falling your life jacket will offer you great deal of assistance in staying above water. The best thing to do is to wear clothes that can get dry effortlessly. Materials like polyester and capilene dry quickly and also keep your skin dry and warm.  it is a good idea to apply a good amount of waterproof sunscreen with maximum SPF on the exposed areas.",
    "things_to_care_about": "",
    "address": "HIMUDA Shopping Complex, 175126, Kullu - Ramshila Rd, Beasa Mod, Sarvari, Kullu, Himachal Pradesh 175101, ph 098163 03004",
    "distance_from_city_centre": "13 Km",
    "price": "Rs. 1000 - Rs. 1500 per person",
    "latitude": 31.960344,
    "longitude": 77.114067,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 06:00 PM",
    "days_off": "",
    "keywords": "Rafting in pirdi",
    "img": ""
  },
  {
    "slug": "paragliding-in-aleo",
    "title": "Paragliding In Aleo",
    "best_time_to_visit": "OCT - MAY",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "20 mins",
    "destination": "Manali",
    "caption": "Fly High and Touch The Sky",
    "why_should_you_try": "Revel in the panoramic view of the enthralling landscape and feel your heart beat pump with joy. Take pleasure in the exciting experience as you fly high in the air, and behold the bewitching view of the beautiful landscape spread below. The fascinating and thrilling flight will take place near Hamta Valley, on a private land.",
    "what_should_you_know": "Pilots have a great deal of control over their gliders. Controls held in each of the pilot's hands connect to the trailing edge of the left and right sides of the wing, and these can be used to steer and to adjust speed. The qualified and experienced instructor will enlighten you about paragliding, and will be guiding you through the paragliding flying experience. While ensuring your safety and he'll provide you a thrilling lifetime memory.",
    "things_to_care_about": "The experienced and qualified instructor will be happy to answer all of your question about paragliding if he is avoiding you he might not be the one you can trust. also the actual flying time might be reduced, subject to the instructor's judgment, in the case of bad weather or technical difficulties. No refund will be provided in such cases.",
    "address": "Colonel Norbu Building, Near Bhutani Gompa, Naggar Road, Aleo, Manali, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "For 2 mins short fly Rs 600 - Rs 1000 Per Person<br/>\nFor 20 mins long fly Rs 1500 - Rs 3000  Per Person",
    "latitude": 32.270415,
    "longitude": 77.346572,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Paragliding In Aleo",
    "img": ""
  },
  {
    "slug": "paragliding-in-Dobhi",
    "title": "Paragliding In Dobhi",
    "best_time_to_visit": "OCT - MAY",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "20 mins",
    "destination": "Manali",
    "caption": "Chutting down fly like a bird",
    "why_should_you_try": "Dobhi in Himachal Pradesh is one of the best places one can experience nature at its best. It is situated on NH21 between Kullu and Manali. The place is best for paragliders in the mornings and evenings. It is an adventure sport that makes flight a part of you. here,  paragliding takes recreation a step further. The lightweight glider aircrafts make air suspension possible for hours together.",
    "what_should_you_know": "Pilots have a great deal of control over their gliders. Controls held in each of the pilot's hands connect to the trailing edge of the left and right sides of the wing, and these can be used to steer and to adjust speed. The qualified and experienced instructor will enlighten you about paragliding, and will be guiding you through the paragliding flying experience. While ensuring your safety and he'll provide you a thrilling lifetime memory.",
    "things_to_care_about": "The experienced and qualified instructor will be happy to answer all of your question about paragliding if he is avoiding you he might not be the one you can trust. The actual flying time might be reduced, subject to the instructor's judgment, in the case of bad weather or technical difficulties. No refund will be provided in such cases.",
    "address": "NH3, Dobhi, Himachal Pradesh 175129, ph 088943 37933",
    "distance_from_city_centre": "13 Km",
    "price": "For 2 mins short fly Rs 600 - Rs 1000 Per Person<br/>\nFor 20 mins long fly Rs 1500 - Rs 3000  Per Person",
    "latitude": 32.091723,
    "longitude": 77.125513,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Paragliding In Dobhi",
    "img": ""
  },
  {
    "slug": "paragliding-in-siyal",
    "title": "Paragliding In siyal",
    "best_time_to_visit": "OCT - MAY",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "20 mins",
    "destination": "Manali",
    "caption": "Spread your imaginery wings",
    "why_should_you_try": "Take pleasure in the exciting experience as you fly high in the air, and behold the bewitching view of the beautiful landscape spread below. Paragliding is the recreational and competitive adventure sport of flying paragliders: lightweight, free-flying, foot-launched glider aircraft with no rigid primary structure.",
    "what_should_you_know": "Pilots have a great deal of control over their gliders. Controls held in each of the pilot's hands connect to the trailing edge of the left and right sides of the wing, and these can be used to steer and to adjust speed. The qualified and experienced instructor will enlighten you about paragliding, and will be guiding you through the paragliding flying experience. While ensuring your safety and he'll provide you a thrilling lifetime memory.",
    "things_to_care_about": "The experienced and qualified instructor will be happy to answer all of your question about paragliding if he is avoiding you he might not be the one you can trust. The actual flying time might be reduced, subject to the instructor's judgment, in the case of bad weather or technical difficulties. No refund will be provided in such cases.",
    "address": "Huntfactor, Near Bhutani Gompa, Naggar Road, Aleo, Manali, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "For 2 mins short fly Rs 600 - Rs 1000 Per Person<br/>\nFor 20 mins long fly Rs 1500 - Rs 3000  Per Person",
    "latitude": 32.270415,
    "longitude": 77.346572,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Paragliding In siyal",
    "img": ""
  },
  {
    "slug": "paragliding-at-solang-valley-manali",
    "title": "Paragliding At Solang Valley",
    "best_time_to_visit": "OCT - MAY",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "20 mins",
    "destination": "Manali",
    "caption": "Feel like a flying bird",
    "why_should_you_try": "Paragliding at Solang Valley: Paragliding is one of the most exciting adventure sports. It can be a mix of skydiving and hang gliding. A bird’s eye view of the surreal valley, an adrenalin rush and a memorable experience is all that Paragliding offers.",
    "what_should_you_know": "Pilots have a great deal of control over their gliders. Controls held in each of the pilot's hands connect to the trailing edge of the left and right sides of the wing, and these can be used to steer and to adjust speed. The qualified and experienced instructor will enlighten you about paragliding, and will be guiding you through the paragliding flying experience. While ensuring your safety and he'll provide you a thrilling lifetime memory.",
    "things_to_care_about": "The experienced and qualified instructor will be happy to answer all of your question about paragliding if he is avoiding you he might not be the one you can trust. The actual flying time might be reduced, subject to the instructor's judgment, in the case of bad weather or technical difficulties. No refund will be provided in such cases.",
    "address": "Solang Valley, Burwa, Himachal Pradesh 175103",
    "distance_from_city_centre": "17 Km",
    "price": "For 2 mins short fly Rs 600 - Rs 1000 Per Person<br/>\nFor 20 mins long fly Rs 1500 - Rs 3000  Per Person",
    "latitude": 32.313162,
    "longitude": 77.163412,
    "how_to_reach": "You can hire a taxi from Manali which will cost around Rs. 600. A much cheaper alternative is to take the government bus from Manali bus stand at 8 in the morning. The bus returns at 3 pm from Solang Valley.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Paragliding At Solang Valley",
    "img": ""
  },
  {
    "slug": "jeep-safaris-lahaul",
    "title": "Jeep Safaris Lahaul",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 - 6 days",
    "destination": "Manali",
    "caption": "Allow the wind to purify you",
    "why_should_you_try": "Lahaul is a land of magnificent Buddhist art and culture and catches attention of the adventure enthusiasts for uniformly high mountains and massive glaciers. Summer comes at Lahaul and Spiti Valley with flying colours and adds life to the green grassy meadows and alpine flowers. Admire and appreciate the lush green forests, the landscapes, the refreshing mountains and cool breeze in the jeep. This fabulous jeep safari tour to Munnar and enjoy admiring the green environment around.",
    "what_should_you_know": "The monasteries of Lahaul-Spiti are the treasure trove of ancient murals, wood carving, Thangkas and golden images of Padmasambhava. Visit the significant sightseeing places of Munnar, like Sree Narayana Puram Waterfalls, Ponmudi Dam and Hanging Bridge.",
    "things_to_care_about": "",
    "address": "",
    "distance_from_city_centre": "13 Km",
    "price": "",
    "latitude": 32.549445,
    "longitude": 77.395101,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Jeep Safaris Lahaul",
    "img": ""
  },
  {
    "slug": "jeep-safaris-spiti",
    "title": "Jeep Safaris Spiti",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 - 8 days",
    "destination": "Manali",
    "caption": "Let these moment to pass also",
    "why_should_you_try": "Blessed with high altitude mountain passes, undisturbed settlements and uncompromising motorable routes, Spiti is one of the few Indian destinations which every travel freak soul would love travelling to. Washed with the pristine and unpolluted mountain streams of some of the well known Himalayan Rivers, these Himalayan destinations offer breathtakingly beautiful landscapes with  cool breeze passing through jeep to soothe every peace lover's soul .",
    "what_should_you_know": "The valley lies close to the Indo-Tibetan border at a height of around 2745m and offers fascinating views of some of the highest mountain peaks of the world. Drive over Rohtang Pass into Lahaul valley. The road deviates towards Chandratal and Spiti at Gramphu.",
    "things_to_care_about": "",
    "address": "",
    "distance_from_city_centre": "13 Km",
    "price": "",
    "latitude": 32.549445,
    "longitude": 77.395101,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Jeep Safaris Spiti",
    "img": ""
  },
  {
    "slug": "fishing-or-angling-at-river-beas",
    "title": "Fishing or Angling At River Beas",
    "best_time_to_visit": "MAR - JUN",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 day",
    "destination": "Manali",
    "caption": "Reflect back to your life in Patience",
    "why_should_you_try": "An angler’s paradise, Himachal has several spots for both trout and Mahaseer as well as other fish. Experience a fun and exciting fishing trip to Manalsu Nala in Old Manali and get to know the fun and exciting ways of fishing in the north.",
    "what_should_you_know": "Acclaimed as the best spot for fishing in the world, both Brown and Rainbow Trout can be found in Himachal's streams. Fish also abounds in Beas River near Manali. Good spots on this beat are –Manualsu nalla, Beas river, Haripur nalla, Fozal nalla and Baragrain nalla that you can explore.",
    "things_to_care_about": "",
    "address": "",
    "distance_from_city_centre": "13 Km",
    "price": "",
    "latitude": 31.758477,
    "longitude": 76.082625,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "04:00 AM - 11:00 PM",
    "days_off": "",
    "keywords": "Fishing or Angling At River Beas",
    "img": ""
  },
  {
    "slug": "rappelling-at-mall-road",
    "title": "Enjoy 50ft. Rappelling",
    "best_time_to_visit": "OCT - MAY",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "1 hour",
    "destination": "Manali",
    "caption": "The Art of Descending",
    "why_should_you_try": "Rappelling is not always as physically demanding as rock climbing can be.  It is always easier to descend. Rappelling is fun and it is also very rewarding, once you get past the “first step”.  This first step is the point where you lean back on your rope and are required to trust the anchor system that has been employed.  This can be unnerving for a beginner and it is the crux of the beginner rappelling experience.  A lot of coaching and a good guide can help to make this transition easier!",
    "what_should_you_know": "After you have climbed to the top of a cliff, you have to descend back down. Sometimes you can hike off the back side of the cliff, which is usually the safest way to descend. But sometimes you have to rappel because it is easier, safer, and faster than hiking to get back to the flat earth below the cliff.",
    "things_to_care_about": "",
    "address": "Chidyari - Vashisht Road, Kullu, Vashist, Himachal Pradesh 175131",
    "distance_from_city_centre": "13 Km",
    "price": "Rs. 500 per person",
    "latitude": 32.255001,
    "longitude": 77.189972,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 05:00 PM",
    "days_off": "",
    "keywords": "Enjoy 50ft. Rappelling",
    "img": ""
  },
  {
    "slug": "trek-to-jogani-water-fall",
    "title": "Trek to Jogani Water Fall",
    "best_time_to_visit": "JAN - DEC",
    "best_time_to_visit_more_information": "Availaible whole year",
    "time_to_explore": "4 hours",
    "destination": "Manali",
    "caption": "Nature has its own way",
    "why_should_you_try": "Jogini Falls is a waterfall with a stream running down to join the river Beas in the Kullu Valley below. It is sacred to the the village goddess Jogini & is therefore a place of female power, known as a shakti peeth.",
    "what_should_you_know": "This is nearly 3 KM trek from Vashisht temple. Vashisht temple is 2 KM from Main market area of Manali. After crossing the main bridge over the river Beas and walk north towards the village of Vashisht. Walk through forest s of Oak, Fir and Deodar, you will reach the beautiful meadows of Lamadug.  Enjoy stunning views of Indrasen, Deo-Tibba, Hanuman Tibba.",
    "things_to_care_about": "",
    "address": "",
    "distance_from_city_centre": "13 Km",
    "price": "",
    "latitude": 32.26937,
    "longitude": 77.187815,
    "how_to_reach": "You reach here either by bus or by taxi or by auto  whichever is more convienent to you. autos and taxies fares are fixed but are negotiable, buses are not so punchal you might need some patience for a cheap ride. it recommended to hire a private cab with chauffer or rent a motorbike.",
    "usual_timings": "09:00 AM - 03:00 PM",
    "days_off": "",
    "keywords": "Trek to Jogani Water Fall",
    "img": ""
  }
];

// Router.get('/deleteAllPlacesExceptJaiBhai', (req, res) => {
// 	let x = []
// 	destinations.find({
// 		'slug': {
// 			$in: [
// 				'shimla', 'ladakh', 'jaipur', 'andaman-and-nicobar-islands'
// 				// 'manali',
// 				// 'coorg',
// 				// 'dharamshala',
// 				// 'ooty',
// 				// 'Kasol',
// 				// 'agra',
// 				// 'dehradun',
// 				// 'goa',
// 				// 'jaisalmer'
// 			]
// 		}
// 	}).select('experiences slug').exec((err, _destinations) => {
// 		for (var i = 0; i < _destinations.length; i++) {
// 			for (var j = 0; j < _destinations[i].experiences.length; j++) {
// 				x.push(_destinations[i].experiences[j])
// 			}
// 		}
// 		experiences.remove({
// 			slug: {
// 				$nin: x
// 			}
// 		}).exec((err, docs) => {
// 			if (err)
// 				res.send(err);
// 			else
// 				res.send({'Papu': docs})
// 		})
// 	});
// });
//
// Router.get('/AddVarinderPrahDaData', (req, res) => {
// 	// let count = 0
// 	// let d = []
// 	// for (var i = 0; i < y.length; i++) {
// 	// 	for (var j = 0; j < y.length; j++) {
// 	// 		if(y[i].slug == y[j].slug && i != j){
// 	// 			d.push(y[i].slug)
// 	// 		}
// 	// 	}
// 	// }
// 	// res.send({'count':count, 'i':i, 'j':j, 'd':d});
// 		experiences.insertMany(z, (err)=>{
// 			if(err)
// 			res.send(err)
// 			else res.send('God is dead.')
// 		});
// });
//
// Router.get('/fetchSlugsOfPlacesByDestination', (req, res) => {
// 	places.find({
// 		'destination': {
// 			$in: [
// 				'Agra', 'Ooty', 'Jaisalmer', 'Manali'
// 				// 'manali',
// 				// 'coorg',
// 				// 'dharamshala',
// 				// 'ooty',
// 				// 'Kasol',
// 				// 'agra',
// 				// 'dehradun',
// 				// 'goa',
// 				// 'jaisalmer'
// 			]
// 		}
// 	}).select('slug destination').exec((err, _places) => {
//     var agra = [];
//     var ooty = [];
//     var jaisalmer = [];
//     var manali = [];
//
// 		for (var i = 0; i < _places.length; i++) {
// 			if (_places[i].destination == 'Agra') {
// 				agra.push(_places[i].slug)
// 			}
//
// 			if (_places[i].destination == 'Ooty') {
// 				ooty.push(_places[i].slug)
// 			}
//
// 			if (_places[i].destination == 'Jaisalmer') {
// 				jaisalmer.push(_places[i].slug)
// 			}
//
// 			if (_places[i].destination == 'Manali') {
// 				manali.push(_places[i].slug)
// 			}
// 		}
//
// 		destinations.update({
// 			'slug': 'jaisalmer'
// 		}, {
// 			places: jaisalmer
// 		}, function(err, number, rawRes) {
// 			destinations.update({
// 				'slug': 'ooty'
// 			}, {
// 				places: ooty
// 			}, function(err1, number1, rawRes1) {
// 				if (err || err1) {
// 					res.send({'err' : err, 'err1' : err1});
// 				} else {
// 					res.send({'1' : number, '2' : number1});
// 				}
// 			})
// 		})
//
// 	});
// });

// Router.get('/fetchSlugsOfExByDestination', (req, res) => {
// 	experiences.find({
// 		'destination': {
// 			$in: [
// 				'Agra', 'Ooty', 'Jaisalmer', 'Manali'
// 				// 'manali',
// 				// 'coorg',
// 				// 'dharamshala',
// 				// 'ooty',
// 				// 'Kasol',
// 				// 'agra',
// 				// 'dehradun',
// 				// 'goa',
// 				// 'jaisalmer'
// 			]
// 		}
// 	}).select('slug destination').exec((err, _experiences) => {
//     var agra = [];
//     var ooty = [];
//     var jaisalmer = [];
//     var manali = [];
//
// 		for (var i = 0; i < _experiences.length; i++) {
// 			if (_experiences[i].destination == 'Agra') {
// 				agra.push(_experiences[i].slug)
// 			}
//
// 			if (_experiences[i].destination == 'Ooty') {
// 				ooty.push(_experiences[i].slug)
// 			}
//
// 			if (_experiences[i].destination == 'Jaisalmer') {
// 				jaisalmer.push(_experiences[i].slug)
// 			}
//
// 			if (_experiences[i].destination == 'Manali') {
// 				manali.push(_experiences[i].slug)
// 			}
// 		}
//
// 		destinations.update({
// 			'slug': 'jaisalmer'
// 		}, {
// 			experiences: jaisalmer
// 		}, function(err, number, rawRes) {
// 			destinations.update({
// 				'slug': 'ooty'
// 			}, {
// 				experiences: ooty
// 			}, function(err1, number1, rawRes1) {
//         destinations.update({
//   				'slug': 'manali'
//   			}, {
//   				experiences: manali
//   			}, function(err2, number2, rawRes2) {
//           destinations.update({
//     				'slug': 'agra'
//     			}, {
//     				experiences: jaisalmer
//     			}, function(err3, number3, rawRes3) {
//     				if (err || err1) {
//     					res.send({'err' : err, 'err1' : err1});
//     				} else {
//     					res.send({'1' : number, '2' : number1});
//     				}
//     			})
//   			})
// 			})
// 		})
//
// 	});
// });

Router.get('/ImgUrlGen', (req, res) => {
	places.find().select('slug').exec((err, _places) => {
    let x = [];
    for (var i = 0; i < _places.length; i++) {
      places.update({
        'slug': _places[i].slug
      }, {
        img: 'http://res.cloudinary.com/freeways/image/upload/' + _places[i].slug
      }, function(err, number, rawRes) {
        x++;
        if(x==_places.length){
          res.send(x);
        }
      })
    }
	});
});



Router.get('/home', (req, res) => {
	console.log('hello from home');
	var obj = {};
	trips.find().select('slug title caption time_to_explore img').limit(10).exec(function(err, trips) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			obj.trips = trips;

			destinations.find().select('slug title caption time_to_explore img').limit(10).exec(function(err, destinations) {
				if (err) {
					console.log('error finding destinations for home')
				} else {
					obj.destinations = destinations;

					experiences.find().select('slug title caption time_to_explore img').limit(10).exec(function(err, experiences) {
						if (err) {
							console.log('error finding experiences for home')
						} else {
							obj.experiences = experiences;
							places.find().select('slug title caption time_to_explore img').limit(10).exec(function(err, places) {
								if (err) {
									console.log('error finding experiences for home')
								} else {
									obj.places = places;
									res.send(obj);
								}
							})
						}
					})

				}
			})

		}
	})
});

Router.get('/places', (req, res) => {
	console.log('hello from home');
	places.find().select('slug img title caption introduction best_time_to_visit best_time_to_visit_more_information latitude longitude how_to_reach_by_bus how_to_reach_by_car how_to_reach_by_plane how_to_reach_by_train must_know how_to_reach_by_walk keywords').exec(function(err, places) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			res.send(places)
		}
	})
});

Router.get('/experiences', (req, res) => {
	console.log('hello from home');
	experiences.find().select('slug img title caption information best_time_to_visit best_time_to_visit_more_information latitude longitude usual_timings days_off timing_more_information how_to_reach_by_bus how_to_reach_by_car how_to_reach_by_plane how_to_reach_by_train must_know how_to_reach_by_walk keywords').exec(function(err, experiences) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			res.send(experiences)
		}
	})
});

Router.get('/placesslug', (req, res) => {
	console.log('hello from home');
	var obj = {};
	places.find().select('slug title').exec(function(err, places) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			res.send(places)
		}
	})
});

Router.get('/exslug', (req, res) => {
	console.log('hello from home');
	var obj = {};
	experiences.find().select('slug title').exec(function(err, experiences) {
		if (err) {
			console.log('error finding experiences for home')
		} else {
			res.send(experiences)
		}
	})
});

Router.get("/trip/:slug", (req, res) => {
	console.log("hello from trips");
	trips.findOne({
		slug: req.params.slug
	}, (err, data) => {
		if (err || data == null) {
			console.error("error looking up trip data");
		} else {
			res.send(data);
		}
	});
});

Router.get("/destination/:slug", (req, res, next) => {
	destinations.findOne({slug: req.params.slug}).lean().exec((err, data) => {
		if (err || data == null) {
			console.error("error looking up destination data ");
			next(err)
		} else {
			rp('http://api.openweathermap.org/data/2.5/weather?lat=' + data.latitude + '&lon=' + data.longitude + '&appid=e6c33eefa2e93035fbc5bb2964d35603').then((response) => {
				const weather = JSON.parse(response)
				places.find({"slug": data.places}).select('slug title name caption tags img').exec(function(err, _places) {
					if (err) {
						console.error(err);
					} else {
						experiences.find({"slug": data.experiences}).select('slug title name caption tags img').exec(function(err, _experiences) {
							if (err) {
								console.error(err);
							} else {
								mustCarry.find({"slug": data.must_carry}).select('slug title source information').exec(function(err, _must_carry) {
									if (err) {
										console.error(err);
									} else {
										const obj = {
											destination: data,
											places: _places,
											experiences: _experiences,
											weather: Math.round(weather.main.temp - 273.15),
											must_carry: _must_carry
										}
										res.send(obj);
									}
								});
							}
						});
					}
				});
			});

		}
	});
});

Router.get("/place/:slug", (req, res) => {
	places.findOne({
		slug: req.params.slug
	}, (err, data) => {
		if (err || data == null) {
			console.error("error took place while looking up places");
			next(Error("this place does not exist"));
		} else {
			let noLocationData = true
				let lat = 0,
					lon = 0
				if (data.latitude && data.longitude) {
					noLocationData = !noLocationData
					lat = Number(data.latitude)
					lon = Number(data.longitude)
				}
				console.log('lat', data.latitude);
				console.log('lon', data.longitude);
				// rp('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=e6c33eefa2e93035fbc5bb2964d35603').then((response) => {
				// 	const weather = JSON.parse(response)

				experiences.find({"slug": data.experiences}).select('slug title name caption tags img').exec(function(err, _experiences) {
					if (err) {
						console.error(err);
					} else {
						mustCarry.find({"slug": data.must_carry}).select('slug title source information').exec(function(err, _must_carry) {
							if (err) {
								console.error(err);
							} else {

								var x = data.toObject();
								x.how_to_reach = isEmpty(x.how_to_reach_by_bus) + isEmpty(x.how_to_reach_by_car) + isEmpty(x.how_to_reach_by_airplane) + isEmpty(x.how_to_reach_by_train);
								delete x.how_to_reach_by_bus;
								delete x.how_to_reach_by_car;
								delete x.how_to_reach_by_airplane;
								delete x.how_to_reach_by_train;
								// const w = (noLocationData)?Math.round(weather.main.temp - 273.15):0
								const w = 23;
								var obj = {
									place: x,
									experiences: _experiences,
									must_carry: _must_carry,
									weather: w
								}
								res.send(obj);
							}
						})
					}
				});
			}
		})
	})

	Router.get("/experience/:slug", (req, res, next) => {
		experiences.findOne({
			slug: req.params.slug
		}, (err, data) => {
			if (err || data == null) {
				console.error("error took place while looking up experiences");
				next(err);
			} else {
				mustCarry.find({"slug": data.must_carry}).select('slug title source information').exec(function(err, _must_carry) {
					if (err) {
						console.error(err);
					} else {

						var x = data.toObject();
						x.how_to_reach = isEmpty(x.how_to_reach_by_bus) + isEmpty(x.how_to_reach_by_car) + isEmpty(x.how_to_reach_by_airplane) + isEmpty(x.how_to_reach_by_train);
						delete x.how_to_reach_by_bus;
						delete x.how_to_reach_by_car;
						delete x.how_to_reach_by_airplane;
						delete x.how_to_reach_by_train;
						// const w = (noLocationData)?Math.round(weather.main.temp - 273.15):0
						const w = 23;
						var obj = {
							experiences: data,
							must_carry: _must_carry
						}
						res.send(obj);
					}
				})
			}
		});
	});

	Router.get("/mustCarry/:slug", (req, res) => {
		mustCarry.find({
			slug: req.params.slug
		}, (err, data) => {
			if (err) {
				console.error("error took place while looking up mustCarry");
			} else {
				res.send(data);
			}
		});
	});

	Router.get("/languages/:slug", (req, res) => {
		languages.find({
			slug: req.params.slug
		}, (err, data) => {
			if (err) {
				console.error("error took place while looking up languages");
			} else {
				res.send(data);
			}
		});
	});

	Router.get('/img', (req, res) => {
		var data = 'http://res.cloudinary.com/freeways/image/list/dude.json'
		var array = [];
		rp(data).then(function(body) {
			res = JSON.parse(body);
			array = res.resources.map(function(obj) {
				console.log('http://res.cloudinary.com/freeways/image/upload/v' + obj.version + '/' + obj.public_id + '.' + obj.format);
			})
		})
	});

	Router.get('/dataimport', (req, res) => {

		console.log('hello from ImportData');
		var obj = [];

		trips.find().lean().select('slug title keywords img').exec(function(err, _trips) {
			if (err) {
				console.log('error finding trips for import')
			} else {
				var d = _trips.map(function(trip) {
					trip.type = 'trip'
					return trip
				});
				obj.push(d);
				destinations.find().lean().select('slug title keywords img').exec(function(err, _destinations) {
					if (err) {
						console.log('error finding destinations for import')
					} else {
						var c = _destinations.map(function(destination) {
							destination.type = 'destination'
							return destination
						});
						obj.push(c);

						experiences.find().lean().select('slug title keywords img').exec(function(err, _experiences) {
							if (err) {
								console.log('error finding experiences for import')
							} else {
								var a = _experiences.map(function(experience) {
									experience.type = 'experience'
									return experience
								});
								obj.push(a);

								places.find().lean().select('slug title keywords img').exec(function(err, _places) {
									if (err) {
										console.log('error finding places for import')
									} else {
										var b = _places.map(function(place) {
											place.type = 'place'
											return place
										});
										obj.push(b);

										for (var i = 0; i < obj.length; i++) {
											searchKeys.collection.insert(obj[i], function(err, data) {
												if (err) {
													console.error("Error While Adding to SearchSchema", err);
												} else {
													console.log("Succes on Adding To SearchSchema");
												}
											})
										}

										res.send('Sending Data');
									}
								})

							}
						})

					}
				})
			}
		})
	});

	Router.get('/customgeo/:lon/:lat/:distance/:limit/', (req, res) => {

		var limit = Number(req.params.limit) || 100;
		// get the max distance or set it to 8 kilometers
		var maxDistance = Number(req.params.distance) || 500;
		// we need to convert the distance to radians
		// the raduis of Earth is approximately 6371 kilometers
		maxDistance /= 6371;
		// get coordinates [ <longitude> , <latitude> ]

		var coords = [];
		coords[0] = req.params.lon || 0;
		coords[1] = req.params.lat || 0;

		nearByLoc.find({
			loc: {
				$near: coords,
				$maxDistance: maxDistance
			}
		}).limit(limit).exec(function(err, custom) {

			if (err) {
				return res.send(500, err);
			}
			res.send(200, custom);
		});
	});

	Router.get('/geosearch/:slug/:distance/:limit/', (req, res) => {

		var limit = Number(req.params.limit) || 100;
		// get the max distance or set it to 8 kilometers
		var maxDistance = Number(req.params.distance) || 500;
		// we need to convert the distance to radians
		// the raduis of Earth is approximately 6371 kilometers
		maxDistance /= 6371;
		// get coordinates [ <longitude> , <latitude> ]

		nearByLoc.findOne({slug: req.params.slug}).exec(function(err, location) {

			if (err) {
				return res.send(500, err);
			}

			var coords = [];
			coords[0] = location.loc[0] || 0;
			coords[1] = location.loc[1] || 0;

			nearByLoc.find({
				loc: {
					$near: coords,
					$maxDistance: maxDistance
				}
			}).limit(limit).exec(function(err, locations) {

				if (err) {
					return res.send(500, err);
				}
				res.send(200, locations);
			});

		});

	});

	Router.get('/geoimport', (req, res) => {

		console.log('hello from GeoImport');
		var nearby = [];

		destinations.find().lean().select('slug latitude longitude').exec(function(err, _destinations) {
			if (err) {
				console.log('error finding loc in destinations')
			} else {
				var c = _destinations.map(function(destination) {
					destination.type = 'destination'
					destination.loc = [
						Number(destination.longitude),
						Number(destination.latitude)
					]
					delete destination.longitude
					delete destination.latitude
					return destination
				});
				nearby.push(c);

				experiences.find().lean().select('slug latitude longitude').exec(function(err, _experiences) {
					if (err) {
						console.log('error finding loc in experiences')
					} else {
						var a = _experiences.map(function(experience) {
							experience.type = 'experience'
							experience.loc = [
								Number(experience.longitude),
								Number(experience.latitude)
							]
							delete experience.longitude
							delete experience.latitude
							return experience
						});
						nearby.push(a);

						places.find().lean().select('slug latitude longitude').exec(function(err, _places) {
							if (err) {
								console.log('error finding loc in places')
							} else {
								var b = _places.map(function(place) {
									place.type = 'place'
									place.loc = [
										Number(place.longitude),
										Number(place.latitude)
									]
									delete place.longitude
									delete place.latitude
									return place
								});
								nearby.push(b);

								for (var i = 0; i < nearby.length; i++) {
									nearByLoc.collection.insert(nearby[i], function(err, data) {
										if (err) {
											console.error("Error While Adding to NearBySchema", err);

										} else {
											console.log("Succes on Adding To NearBySchema");
											console.log(typeof data);
											console.log(data.ops[0].type);
											//console.log(data);
											// switch (data.type) {
											// 	case "experience":
											// 		console.log("in exp",data.type)
											// 		experiences.findOne({"slug":data.slug}).exec((err,edata)=>{
											// 			edata.loc=data._id
											// 			edata.save((err,updatedExp)=>{
											// 				if(err)
											// 					console.error("error took place while adding ref to experiences");
											// 				else {
											// 					console.log("updated exp",updatedExp);
											// 					}
											// 				})
											// 			})
											// 		break;
											// 	default:
											//
											// }
										}
									})
								}

								res.send('Sending Data');
							}
						})

					}
				})

			}
		})
	});

	Router.get('/search/:keywords', function(req, res) {
		var re = new RegExp('^' + req.params.keywords + '.*', 'i');
		// console.log('API[DEBUG]: ' + re);

		var query = searchKeys.find({
			$or: [
				{
					title: {
						$regex: re
					}
				}, {
					keywords: {
						$regex: re
					}
				}
			],
			type: {
				$ne: 'trip'
			}
		}, {
			score: {
				$meta: "textScore"
			}
		}).sort({
			score: {
				$meta: "textScore"
			}
		}).select('title slug img type').limit(8).exec(function(err, output) {
			if (err) {
				res.send(500, err);
				// console.log(err);
			} else {
				res.send(output);
			}
		});
	});

	Router.get('/backup', (req, res) => {
		backup({
			uri: uri,
			root: __dirname,
			callback: function(err) {
				if (err) {
					return res.send(err);
				} else {
					return res.send("Red: Hope is a dangerous thing my friend, it can kill a man... \n Andy Dufresne: hope is a good thing maybe even the best of things and good things never die");
				}
			}
		})

	});

	Router.get("/fresh", (req, res) => {
		const url = 'http://api.cosmicjs.com/v1/freewaays'
		const url2 = 'http://api.cosmicjs.com/v1/freeways'
		console.log("fresh");
		rp(url2).then(function(body) {
			buckets = JSON.parse(body)
			data = {};
			fdata = {};
			buckets.bucket.objects.forEach(function(v) {
				data[v.type_slug] = [];
				fdata[v.type_slug] = [];
			})

			buckets.bucket.objects.forEach(function(v) {
				if (Object.keys(data).indexOf(v.type_slug) != -1) {
					data[v.type_slug].push(v)
				}
			});

			Object.keys(data).forEach(function(v) {
				data[v].forEach(function(i) {
					fdata[v].push({
						slug: i.slug,
						title: i.title,
						_id: mongoose.Types.ObjectId(i._id)
					});

					if (i.metadata !== null) {
						Object.keys(i.metadata).forEach(function(j) {
							len = fdata[v].length;
							if (typeof i.metadata[j] === 'object') {
								if ([j] == 'places') {
									Object.keys(i.metadata[j]).forEach(function(k) {
										fdata[v][len - 1][j] = [];
										fdata[v][len - 1][j].push(mongoose.Types.ObjectId(i.metadata[j][k]._id));
										//console.log(fdata[v][len-1][j]);

									});
								} else {
									fdata[v][len - 1][j] = i.metadata[j];
								}
							} else {
								fdata[v][len - 1][j] = i.metadata[j];
							}
						})
					}

				})
			})

			//console.log(fdata);
			console.log(Object.keys(fdata['languages'][0]));
			fdata["languages"].forEach(function(l) {
				if (Object.keys(l).indexOf('common_phrases') != -1)
					l["common_phrases"].forEach(function(v) {
						delete v.metafields;
						delete v.bucket;
						delete v.type_slug;
						delete v.status;
						delete v.content;
						delete v.created_at;
						delete v.created_by;
						delete v.created;
						delete v.modified_by;
						delete v.modified_at;

						Object.keys(v.metadata).forEach(function(i) {
							v[i] = v.metadata[i];
						})

						delete v.metadata;
						delete v._id;
						delete v.slug;
						delete v.language;
					})
			})

			mustCarry.collection.insert(fdata['must-carries'], function(err, data) {
				if (err) {
					console.error("error took place while adding mustCarry");
				} else {
					console.log("success while adding mustCarry");
				}
			});

			languages.collection.insert(fdata['languages'], function(err, data) {
				if (err) {
					console.error("error took place");
				} else {
					console.log("success while adding languages");
				}
			})

			for (var i = 0; i < fdata['places'].length; i++) {
				places.collection.insert(fdata['places'][i], function(err, data) {
					if (err) {
						console.error("error took place while adding places", err);
					} else {
						console.log("success while adding places");
					}
				})
			}

			for (var i = 0; i < fdata['destinations'].length; i++) {
				destinations.collection.insert(fdata['destinations'][i], function(err, data) {
					if (err) {
						console.error("error took place while adding destinations", err);
					} else {
						console.log("success while adding places");
					}
				})
			}

			trips.collection.insert(fdata['trips'], function(err, data) {
				if (err) {
					console.error("error in trips");
				} else {
					console.log("success while adding trips");
				}
			});

			for (var i = 0; i < fdata['experiences'].length; i++) {
				experiences.collection.insert(fdata['experiences'][i], function(err, data) {
					if (err) {
						console.error("error took place while adding experiences", err);
					} else {
						console.log("success while adding places");
					}
				})
			}

			res.send("fresh data has been added to the database")

		});
	});

	function isEmpty(val) {
		if (val === undefined || val == null || val.length <= 0)
			val = '';

		return val
	}

	module.exports = Router
