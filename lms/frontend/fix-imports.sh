#!/bin/bash
# 🔧 Auto-fix case sensitivity issues for React imports
# Run this inside lms/frontend

ROOT="src"

# A list of expected components and their paths (must match App.jsx)
declare -A EXPECTED=(
  ["Navbar"]="$ROOT/Landingpage/Navbar/Navbar.jsx"
  ["HeroSection"]="$ROOT/Landingpage/HeroSection/HeroSection.jsx"
  ["Footer"]="$ROOT/Landingpage/Footer/Footer.jsx"
  ["Course"]="$ROOT/Landingpage/Course/Course.jsx"
  ["Youtube"]="$ROOT/Landingpage/Youtube/Youtube.jsx"
  ["LatestBook"]="$ROOT/Landingpage/LatestBook/LatestBook.jsx"
  ["Author"]="$ROOT/Landingpage/Author/Author.jsx"
  ["Lift"]="$ROOT/Landingpage/Lift/Lift.jsx"
  ["BuyingBook"]="$ROOT/Landingpage/BuyingBook/BuyingBook.jsx"
  ["Expert"]="$ROOT/Landingpage/Expert/Expert.jsx"
  ["Studies"]="$ROOT/Landingpage/Studies/Studies.jsx"
  ["OurVideos"]="$ROOT/Landingpage/OurVideos/OurVideos.jsx"
  ["SpeakerCard"]="$ROOT/Landingpage/SpeakerCard/SpeakerCard.jsx"
  ["Banner"]="$ROOT/Landingpage/Banner/Banner.jsx"

  ["AboutSection"]="$ROOT/About/AboutSection/AboutSection.jsx"
  ["Hero"]="$ROOT/About/Hero/Hero.jsx"
  ["Work"]="$ROOT/About/Work/Work.jsx"

  ["Blog"]="$ROOT/Blog/BlogMain/Blog.jsx"
  ["Addblog"]="$ROOT/Blog/Addblog/Addblog.jsx"
  ["Updateblog"]="$ROOT/Blog/Updateblog/Updateblog.jsx"
  ["RenderBlogs"]="$ROOT/Blog/RenderBlog/RenderBlogs.jsx"
  ["UpdateBlog"]="$ROOT/Blog/RenderBlog/UpdateBlog.jsx"
  ["BlogPreview"]="$ROOT/Blog/BlogPreview/BlogPreview.jsx"

  ["BookPage"]="$ROOT/Book/BookPage/BookPage.jsx"
  ["BookOrderPage"]="$ROOT/Book/BookOrderPage/BookOrderPage.jsx"

  ["Contact"]="$ROOT/Contact/Contact.jsx"
  ["Contactform"]="$ROOT/Contactform/Contactform.jsx"
  ["Maparea"]="$ROOT/Maparea/Maparea.jsx"

  ["AdminLogin"]="$ROOT/Admin/AdminLogin.jsx"
  ["AdminBookForm"]="$ROOT/Admin/AdminBookForm/AdminBookForm.jsx"
  ["Admindatapage"]="$ROOT/Admin/Admindatapage/Admindatapage.jsx"
  ["ViewBooks"]="$ROOT/Admin/ViewBooks/ViewBooks.jsx"
  ["Updatebookdetails"]="$ROOT/Admin/Bookdetails/Updatebookdetails.jsx"
  ["AddYoutube"]="$ROOT/Admin/Youtube/AddYoutube.jsx"

  ["Testimonialpart"]="$ROOT/Testimonialpart/Testimonialpart.jsx"
  ["Checkoutpage"]="$ROOT/Checkout/Checkoutpage.jsx"
  ["Userprofile"]="$ROOT/Userprofile/Userprofile.jsx"
  ["ForgotPassword"]="$ROOT/ForgotPassword/ForgotPassword.jsx"
  ["UserLoginPage"]="$ROOT/Login/UserLoginPage.jsx"
  ["UserRegister"]="$ROOT/Register/UserRegister.jsx"
  ["ScrollToTop"]="$ROOT/ScrollToTop.jsx"
)

echo "🔍 Checking and fixing file casing issues..."
for key in "${!EXPECTED[@]}"; do
  expected_path="${EXPECTED[$key]}"
  dir_path=$(dirname "$expected_path")
  file_name=$(basename "$expected_path")

  if [ -d "$dir_path" ]; then
    # Find file ignoring case
    actual_file=$(find "$dir_path" -maxdepth 1 -type f -iname "$file_name")
    if [ -n "$actual_file" ] && [ "$actual_file" != "$expected_path" ]; then
      echo "⚡ Fixing: $actual_file -> $expected_path"
      mv "$actual_file" "$expected_path"
    elif [ ! -f "$expected_path" ]; then
      echo "❌ Missing: $expected_path"
    fi
  else
    echo "❌ Missing directory: $dir_path"
  fi
done

echo "✅ Import case-sensitivity check complete."
