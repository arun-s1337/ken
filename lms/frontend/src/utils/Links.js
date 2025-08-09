import { FaFacebook,FaInstagram,FaLinkedinIn,FaTwitter,FaPhoneAlt,FaEnvelope } from "react-icons/fa";

export const Links = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/about" },
  { id: 3, name: "Blog", link: "/blog" },
  { id: 4, name: "Book", link: "/book" },
  { id: 5, name: "My Spine Coach", link: "/myspinecoach" },
  { id: 6, name: "Contact", link: "/Contact" },
];

export const CONTACT_US = [
  {
    id: 1,
    type: "address",
    value: "354 Kingston Rd, Parsippany, NJ 07054", // no icon
    
  },
  {
    id: 2,
    type: "phone",
    value: "(845) 226-4590",
    icon: FaPhoneAlt ,
  },
  {
    id: 3,
    type: "mail",
    value: "drken@drken.us",
    icon: FaEnvelope ,
  },
];


export const SOCIAL = [
  {
    id: 1,
    name: "Facebook",
    link: "https://www.facebook.com/ken.hansraj/",
    icon: FaFacebook ,
  },
  {
    id: 2,
    name: "Instagram",
    link: "https://www.instagram.com/kennethhansraj/",
    icon: FaInstagram ,
  },
  {
    id: 3,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ken-hansraj-m-d-2076a1a/",
    icon: FaLinkedinIn ,
  },
  {
    id: 4,
    name: "Twitter",
    link: "https://x.com/KenHansraj",
    icon: FaTwitter ,
  },
];

export const ACHIEVEMENTS = [{
  id : 1,
  count : 3,
  name : "Best-Sellers"
},{
  id : 2,
  count : 80,
  name : "Countries"
},{
  id : 3,
  count : 25153,
  name : "Lives Impacted"
},{
  id : 4,
  count : 10895322,
  name : "Views Globally"
}]

export const EXPERTS = [{
  id : 1,
  img : "./ball.png"
},{
  id : 2,
  img : "./fox.png"
},{
  id : 3,
  img : "./abc.png"

},{
  id : 4,
  img : "./weather-channel.png"
  
},{
  id : 5,
  img : "./nbc.png"
  
},{
  id : 6,
  img : "./cnn.png"
  
},{
  id : 7,
  img : "./today.png"
}]


export const STUDIES = [{
  id : 1,
  img : "./Text Neck Forces.png",
  name : "Text Neck Forces.",
  alt : "Text neck illustration showing spine health impact from head tilt angles and increasing neck forces.",
  title : "Text neck and its effect on spinal wellness, showing how tilt angles increase neck and back pain. Ideal for author and speaker content on self-care strategies and spine health."
}, {
  id : 2,
  img : "./Backpack Forces.png",
  name : "Backpack Forces.",
  alt : "Backpack forces illustration showing spinal stress at various weights and postures for spine health.",
  title : "This image shows how backpack forces affect spinal wellness and posture,linking excess weight to neck and back pain. Great for authors and speakers on self-care strategies and spine health."
}]

export const VIDEOS= [{
  id: 1 ,
  video : "https://www.youtube.com/embed/gCBm7iG_KLA?si=PEqfSIkoc62PbA5A",
  description : "Colorado Bovie"
},{
  id: 2 ,
  video : "https://www.youtube.com/embed/0JYvYiulaXw?si=lyUpHSAa1WySv8hp",
  description : "USA Independence Day"
},{
  id: 3 ,
  video : "https://www.youtube.com/embed/LqH0vGoBKHo?si=71zP6xHvlSTegR9T",
  description : "Viveks's HealthCare Recommendation"
}]


export const trainingData = [
  {
    title: "Fellowship in Scoliosis and Spinal Surgery",
    subtitle: "The Hospital for Special Surgery New York, New York",
    dateRange: "August 1, 1996 - December 31, 1996"
  },
  {
    title: "Fellowship in Minimally Invasive Spinal Surgery",
    subtitle: "California Center for Minimally Invasive Spine Surgery",
    location: "Thousand Oaks, California",
    dateRange: "January 1, 1997 - July 30, 1997"
  },
  {
    title: "Orthopedic Surgery Residency Training",
    subtitle: "King/Drew Medical Center Los Angeles, California",
    dateRange: "July 1, 1990 - June 30, 1995"
  },
  {
    title: "General Surgery Training",
    subtitle: "Mount Sinai Hospital",
    location: "New York, New York",
    dateRange: "July 1, 1988 - June 30, 1990"
  },
  {
    title: "Fellowship in Orthopedic Biomechanics",
    subtitle: "The Hospital for Special Surgery New York, New York",
    dateRange: "July 1, 1987 - June 30, 1988"
  }
];


export const affiliationsData = [
  {
    title: "Attending Orthopedic Spine Surgeon",
    subtitle: "Westchester Medical Center Valhalla, New York"
  },
  {
    title: "Attending Orthopedic Spine Surgeon",
    subtitle: "Mid-Hudson Regional Hospital of Westchester Medical Center"
  }
];


export const licensesData = [
  {
    title: "New York 1996",
    recertified: "December 2020"
  }
];


export const educationData = [
  {
    title: "MEDICAL SCHOOL:",
    subtitle: "Hahnemann University School of Medicine",
    location: "Philadelphia, Pennsylvania Medical Doctor",
    dateRange: "August 1983 - June 1987"
  },
  {
    title: "GRADUATE SCHOOL",
    subtitle: "Columbia University"
  },
  {
    title: "School of General Studies New York",
    location: "New York, June 1982 - January 1983"
  },
  {
    title: "College",
    subtitle: "Fairleigh Dickinson University",
    location: "Teaneck, New Jersey Bachelor of Science, June 1982"
  }
];


export const certificationsData = [
  {
    title: "American Board of Orthopedic Surgeons",
    recertified: "December 2022"
  },
  {
    title: "American Board of Orthopedic Surgeons",
    subtitle: "Part I July 1997, Part 2, July 2001"
  },
  {
    title: "American Board of Minimally Invasive Spinal Medicine and Surgery",
  
    recertified: "Parts 1 & 2, August 1999"

  },
  {
    title: "National Board of Medical Examiners",
    recertified : "Part3 : 1989",
    recertified : "Part2 : 1987 Part 1 : 1985"
  }
];

export const BOOKS = [{
  id : 1,
  title : "Watch Your Back",
  image : "./book-watch-your-back.png",
  price: "$6.99",
  description : "",
  stars : 5,
  editorialReview : "",
  aboutAuthor : "",
  review : ""
},
{
  id : 2,
  title : "Key to An Amazing Life",
  image : "./spine-book.png",
  price: "$14.99",
  description : "",
  stars : 5,
  editorialReview : "",
  aboutAuthor : "",
  review : ""
},{
  id : 3,
  title : "Lift:Mediations To Boost Back Health",
  image : "./Lift-book.png",
  price: "$6.99",
  description : "",
  stars : 5,
  editorialReview : "",
  aboutAuthor : "",
  review : ""
}
]