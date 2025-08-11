import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Navbar from "./Landingpage/Navbar/Navbar"
import HeroSection from "./Landingpage/HeroSection/HeroSection"
import Footer from "./LandingPage/Footer/Footer"
import Course from "./LandingPage/Course/Course"
import Youtube from "./LandingPage/Youtube/Youtube"
import LatestBook from "./LandingPage/LatestBook/LatestBook"
import Author from "./LandingPage/Author/Author"
import Lift from "./LandingPage/Lift/Lift"
import BuyingBook from "./LandingPage/BuyingBook/BuyingBook"
import Expert from "./LandingPage/Expert/Expert"
import Studies from "./LandingPage/Studies/Studies"
import OurVideos from "./LandingPage/OurVideos/OurVideos"
import SpeakerCard from "./LandingPage/SpeakerCard/SpeakerCard"
import Aboutpage from "./LandingPage/AboutPage/AboutPage"
import AboutSection from "./About/AboutSection/AboutSection"
import Blog from "./Blog/BlogMain/Blog"
import Hero from "./About/Hero/Hero"
import Work from "./About/Work/Work"
import BookPage from "./Book/BookPage/BookPage"
import Contact from "./Contact/Contact"
import Contactform from "./Contactform/Contactform"
import Maparea from "./Maparea/Maparea"
import Adminlogin from "./Admin/AdminLogin"
import BookOrderPage from "./Book/BookOrderPage/BookOrderPage"
import Userregistration from "./Register/UserRegister"
import UserLogin from "./Login/UserLoginPage"
import AdminBookForm from "./Admin/AdminBookForm/AdminBookForm"
import Admindatapage from "./Admin/Admindatapage/Admindatapage"
import ViewBooks from "./Admin/ViewBooks/ViewBooks"
import Updatebookdetails from "./Admin/Bookdetails/Updatebookdetails"

import Testimonialpart from "./Testimonialpart/Testimonialpart"
import Addblog from "./Blog/Addblog/Addblog"
import Updateblog from "./Blog/Updateblog/Updateblog"
import Blogs from "./Blog/RenderBlog/RenderBlogs"
import UpdateBlogPage from "./Blog/RenderBlog/UpdateBlog"
import AddYoutubeData from "./Admin/Youtube/AddYoutube"
import BlogPreview from "./Blog/BlogPreview/BlogPreview"
import Reviews from "./Admin/Review/Testimonial/Testimonial"
import Mainbanner from "./LandingPage/Banner/Banner"
import Adminblogview from "./Admin/Adminblogview/Adminblogview"
import Adminblogpreview from "./Blog/Addblog/Adminblogpreview"
import Checkoutpage from "./Checkout/Checkoutpage"
import Userprofile from "./Userprofile/Userprofile"
import ForgotPassword from "./ForgotPassword/ForgotPassword"
import  { ProtectedRoute,UserProtectedRoute } from "./ProtectedRoute"

//lms
import Drmenubar from "./Lms/Homepage/DrMenubar/DrMenubar"
import Drkenhome from "./Lms/Homepage/DrHomepage/DrHomepage"
import Login from "./Lms/Login/Login"

import CourseVideos from "./Lms/Homepage/CourseVideos/CourseVideos"
import Availablecourses from "./Lms/Homepage/AvailableCourses/AvailableCourses"
import Grade from "./Lms/Homepage/Grade/Grade"
import CertificateBadge from "./Lms/Homepage/CertficateBadge/CertficateBadge"
import Feedbackpage from "./Lms/Homepage/Feedbackpage/Feedbackpage"
import DashBoardProfile from "./Lms/Homepage/DashBoardProfile/DashBoardProfile"
import { DashBoardMessage } from "./Lms/Homepage/DashBoardProfile/DashBoardProfile"
import { DashBoardPayment } from "./Lms/Homepage/DashBoardProfile/DashBoardProfile"
import DrMenuBarUser from "./Lms/Homepage/DrMenubarUser/Drmenubaruser"
import Registerpage from "./Lms/Registration/Registration"
import ResetPassword from "./Lms/ResetPassword/ResetPassword"
import InvitedRegister from "./Lms/InvitedRegister/InvitedRegister"
import CompanyRegister from "./Lms/CompanyRegister/CompanyRegister"
import LmsForgotPassword from "./Lms/ForgotPassword/ForgotPassword"
import { Edit } from "./Lms/Homepage/DashBoardProfile/Edit/Edit"
import SuperAdminDashboard from "./Lms/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard"
import { SuperDashboard } from "./Lms/SuperAdmin/Dashboard/SuperDashboard"
import { Approve } from "./Lms/SuperAdmin/Approve/Approve"
import Admindashboard from "./Lms/Admin/Admindashboard/Admindashboard"
import CourseDetail from "./Lms/Admin/Coursedetail/Coursedetail"
import Courseupdation from "./Lms/Admin/Courseupdation/Courseupdation"
import AdminCredential from "./Lms/Admin/Admincredential/Admincredential"
import Categorycreation from "./Lms/Admin/Categorycreation/Categorycreation"
import Dashboard from "./Lms/Admin/Dashboard/Dashboard"
import LicensePurchase from "./Lms/Admin/LicensePurchase/LicensePurchase"
import CheckPayment from "./Lms/Admin/CheckPayment/CheckPayment"
import NeftPayment from "./Lms/Admin/NeftPayment/NeftPayment"
import Notenrolledfile from "./Lms/Admin/Notenrolledfile/Notenrolledfile"
import CourseList from "./Lms/Admin/CourseList/CourseList"
import Courselist from "./Lms/Instructor/Courselist/Courselist"
import Coursecontent from "./Lms/Instructor/Coursecontent/Coursecontent"
import CoursecontentUpdate from "./Lms/Instructor/CoursecontentUpdate/CoursecontentUpdate"
import Modulepage from "./Lms/Instructor/Modulepage/Modulepage"
import ModuleUpdate from "./Lms/Instructor/ModuleUpdate/ModuleUpdate"
import QuestionPage from "./Lms/Instructor/QuestionPage/QuestionPage"
import QuestionUpdate  from "./Lms/Instructor/QuestionUpdate/QuestionUpdate"
import QuestionBankUpdate from "./Lms/Instructor/QuestionBankUpdate/QuestionBankUpdate"
import AddCategory from "./Lms/Instructor/AddCategory/AddCategory"
import AddCourse from "./Lms/Instructor/AddCourse/AddCourse"
import UpdateCourse from "./Lms/Instructor/UpdateCourse/UpdateCourse"
import CategoryQuizList from "./Lms/Instructor/Questionbank/CategoryQuizList"
import Dashboardinstructor from "./Lms/Instructor/Dashboardinstructor/Dashboardinstructor"
import Question from "./Lms/Instructor/Question/Question"
import ScrollToTop from "./ScrollToTop"


function App() {
  return (
   <Router>
    <ScrollToTop/>
      <Routes>
         <Route path="/instructordashboard/:id" element={<Dashboardinstructor />}>
              <Route path="courselist" element={<Courselist />} />
              <Route path="addpagecontent" element={[<Coursecontent />]} />
              <Route path="updatepagecontent" element={[<CoursecontentUpdate />]}/>
              <Route path="addmodule" element={[<Modulepage />]} />
              <Route path="updatemodule" element={[<ModuleUpdate />]} />
              <Route path="quilltxt" element={<QuestionPage />} />
              <Route path="addquestion" element={<Question />} />
              <Route path="updatequestion" element={<QuestionUpdate />} />
              <Route path="questionbank" element={<CategoryQuizList />} />
              <Route path="questionbankupdate" element={<QuestionBankUpdate />} />
              <Route path="category" element={<AddCategory />} />
              <Route path="coursecreation" element={<AddCourse />} />
              <Route path="coursecreation/:course" element={<UpdateCourse />} />
          </Route>


        <Route path="/register" element={[<Userregistration/>]} />
        <Route path="/login" element={[<UserLogin/>]} /> 
        <Route path="/" element={[<Navbar/>,<HeroSection/>,<Aboutpage/>,<Course/>,<Youtube/>,< LatestBook/>,<Author/>,<Lift/>,<BuyingBook />,<Expert/>,<Studies/>,<OurVideos/>,<SpeakerCard/>,<Testimonialpart/>,<Footer/>]} />
        <Route path="/about" element={[<Navbar/>,<Hero/>,<AboutSection/>,<Work/>,<Footer/>]} />
        <Route path="/blog" element={[<Navbar/>,<Blog/>,<Footer/>]} />
        <Route path="/blog/:blogId" element={[<Navbar/>,<BlogPreview/>,<Footer/>]} />
        <Route path="/book" element={[<Navbar/>,<BookPage />,<Footer/>]} />
        <Route path="/forgot-password" element={[<ForgotPassword/>]} />
        <Route path="/book/:id" element={[<Navbar/>,<BookOrderPage/>,<Footer/>]} />
        <Route path="/Contact" element={[<Navbar/>,<Contact/>,<Maparea/>,<Contactform/> ,<Footer/>]} />
        <Route path="*" element={[<Navbar/>,<HeroSection/>,<Aboutpage/>,<Course/>,<Youtube/>,< LatestBook/>,<Author/>,<Lift/>,<BuyingBook />,<Expert/>,<Studies/>,<OurVideos/>,<SpeakerCard/>,<Footer/>]} />
        <Route path="/bookarea" element={<ViewBooks/>}/>
        {/* <Route path="http://18.232.97.230/lms" element={[<Navbar/>,<Mainbanner/>,<Footer/>]}/> */}
        
        <Route path="/checkout" element={[<Navbar/>,<Checkoutpage/>,<Footer/>]}/>
        <Route path="/admin/addblog" element={[<ProtectedRoute><Addblog/></ProtectedRoute>]}/>
        <Route path="/admin/login" element={[<Adminlogin/>]}/>
        <Route path="/adminpage" element={[<Navbar/>,<ProtectedRoute><Admindatapage/></ProtectedRoute>]}/>
        <Route path="/admin/book" element={[<ProtectedRoute><AdminBookForm/></ProtectedRoute>]} />
        <Route path="/updateblog" element={[<ProtectedRoute><Updateblog/></ProtectedRoute>]}/>
        <Route path="/renderblog" element={[<ProtectedRoute><Blogs/></ProtectedRoute>]} />
        <Route path="/bookupdate/:bookId" element={[<ProtectedRoute><Updatebookdetails/></ProtectedRoute>]}/>
        <Route path="/admin/blog/:blogId" element={[<Navbar/>,<Adminblogpreview/>,<Footer/>]} />
        <Route path="/admin/renderblog/:blogId" element={[<ProtectedRoute><UpdateBlogPage/></ProtectedRoute>]} />
        <Route path="/admin/youtube" element={[<ProtectedRoute><AddYoutubeData/></ProtectedRoute>]} />
        <Route path="/admin/review" element={[<ProtectedRoute><Reviews/></ProtectedRoute>]} />
        <Route path="/admin/blogview" element={[<ProtectedRoute>,<Adminblogview/>,</ProtectedRoute>]}/>
        <Route path="/profile" element={<UserProtectedRoute><Navbar/>,<Userprofile/>,<Footer/></UserProtectedRoute>}/>

        {/* lms routes */}

        <Route path="/lmslogin" element={[<Login/>]} />
        <Route path="/lmsregister" element={<Registerpage />} />
        <Route path="/myspinecoach" element={[<Drmenubar/>,<Drkenhome/> ]} />
        <Route path="/user/:id"
            element={[<DrMenuBarUser />, <Drkenhome />]}/>
        <Route
            path="/ken/:course/:module/:id"
            element={[<DrMenuBarUser  />, <CourseVideos />]}
        />
        <Route
            path="/allcourselist/:id"
            element={[<DrMenuBarUser  />, <Availablecourses />]}
        />
        <Route path="/grade/:id" element={[<DrMenuBarUser  />,<Grade />]} />
        <Route path="/badge/:id" element={[<DrMenuBarUser  />, <CertificateBadge />]}/>
        <Route path="/feedback/:id" element={[<DrMenuBarUser  />,<Feedbackpage/>]}/>

        <Route
            path="/ken/:course/:module/undefined"
            element={[<Drmenubar />, <CourseVideos />]}
          />
          
        <Route
            path="/user/:id/profile"
            element={[<DrMenuBarUser  />, <DashBoardProfile />]}
        />
        <Route
            path="/user/:id/message"
            element={[<DrMenuBarUser  />, <DashBoardMessage />]}
          />
          <Route
            path="/user/:id/payment"
            element={[<DrMenuBarUser  />, <DashBoardPayment />]}
          />
          <Route path="/user/:id/editprofile" element={[<DrMenuBarUser/>,<Edit />]} />
          <Route path="/forgot_password" element={<LmsForgotPassword />} />
          <Route path="/reset_password/:token" element={<ResetPassword />} />
          <Route path="/inv_register/:id" element={<InvitedRegister />} />
          <Route path="/business_register" element={<CompanyRegister />} /> 

          <Route path="/superadmin/:id" element={<SuperAdminDashboard />}>
            <Route path="dashboard" element={<SuperDashboard />} />
            <Route path="approve" element={<Approve />} />
          </Route>

          <Route path="/admindashboard/:id" element={<Admindashboard />}>
            <Route path="coursedetail" element={<CourseDetail />} />
            <Route path="courseupdate" element={<Courseupdation />} />
            <Route path="admincredential" element={<AdminCredential />} />
            <Route path="category" element={<Categorycreation />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purchaselicense" element={<LicensePurchase />} />
            <Route path="check/:quantity" element={<CheckPayment />} />
            <Route path="neft/:quantity" element={<NeftPayment />} />
            <Route path="notenroll" element={<Notenrolledfile />} />
            <Route path="courselist" element={<CourseList />} />
        </Route>

        
      </Routes>
   </Router>
  )
}

export default App
