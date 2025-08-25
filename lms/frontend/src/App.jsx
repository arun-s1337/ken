import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// LandingPage
import Navbar from "./LandingPage/Navbar/Navbar"
import HeroSection from "./LandingPage/HeroSection/HeroSection"
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
import MainBanner from "./LandingPage/Banner/Banner"
import AboutPage from "./LandingPage/AboutPage/AboutPage"

// About
import AboutSection from "./About/AboutSection/AboutSection"
import Hero from "./About/Hero/Hero"
import Work from "./About/Work/Work"

// Blog
import Blog from "./Blog/BlogMain/Blog"
import AddBlog from "./Blog/AddBlog/AddBlog"
import UpdateBlog from "./Blog/UpdateBlog/UpdateBlog"
import Blogs from "./Blog/RenderBlog/RenderBlogs"
import UpdateBlogPage from "./Blog/RenderBlog/UpdateBlog"
import BlogPreview from "./Blog/BlogPreview/BlogPreview"
import AdminBlogPreview from "./Blog/AddBlog/AdminBlogPreview"

// Book
import BookPage from "./Book/BookPage/BookPage"
import BookOrderPage from "./Book/BookOrderPage/BookOrderPage"
import ViewBooks from "./Admin/ViewBooks/ViewBooks"

// Contact
import Contact from "./Contact/Contact"
import ContactForm from "./ContactForm/ContactForm"
import MapArea from "./MapArea/MapArea"

// Admin
import AdminLogin from "./Admin/AdminLogin"
import AdminBookForm from "./Admin/AdminBookForm/AdminBookForm"
import AdminDataPage from "./Admin/AdmindataPage/AdmindataPage"
import Reviews from "./Admin/Review/Testimonial/Testimonial"
import AdminBlogView from "./Admin/AdminBlogView/AdminBlogView"
import AddYoutubeData from "./Admin/Youtube/AddYoutube"

// Checkout
import CheckoutPage from "./Checkout/CheckoutPage"

// User
import UserRegistration from "./Register/UserRegister"
import UserLogin from "./Login/UserLoginPage"
import UserProfile from "./UserProfile/UserProfile"
import ForgotPassword from "./ForgotPassword/ForgotPassword"

// Protected Routes
import { ProtectedRoute, UserProtectedRoute } from "./ProtectedRoute"

// LMS
import DrMenuBar from "./Lms/Homepage/DrMenubar/DrMenubar"
import DrKenHome from "./Lms/Homepage/DrHomepage/DrHomepage"
import Login from "./Lms/Login/Login"
import CourseVideos from "./Lms/Homepage/CourseVideos/CourseVideos"
import AvailableCourses from "./Lms/Homepage/AvailableCourses/AvailableCourses"
import Grade from "./Lms/Homepage/Grade/Grade"
import CertificateBadge from "./Lms/Homepage/CertificateBadge/CertificateBadge"
import FeedbackPage from "./Lms/Homepage/FeedbackPage/FeedbackPage"
import DashBoardProfile, { DashBoardMessage, DashBoardPayment } from "./Lms/Homepage/DashBoardProfile/DashBoardProfile"
import DrMenuBarUser from "./Lms/Homepage/DrMenubarUser/DrMenubarUser"
import RegisterPage from "./Lms/Registration/Registration"
import ResetPassword from "./Lms/ResetPassword/ResetPassword"
import InvitedRegister from "./Lms/InvitedRegister/InvitedRegister"
import CompanyRegister from "./Lms/CompanyRegister/CompanyRegister"
import LmsForgotPassword from "./Lms/ForgotPassword/ForgotPassword"
import { Edit } from "./Lms/Homepage/DashBoardProfile/Edit/Edit"
import SuperAdminDashboard from "./Lms/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard"
import { SuperDashboard } from "./Lms/SuperAdmin/Dashboard/SuperDashboard"
import { Approve } from "./Lms/SuperAdmin/Approve/Approve"
import AdminDashboard from "./Lms/Admin/AdminDashboard/AdminDashboard"
import CourseDetail from "./Lms/Admin/CourseDetail/CourseDetail"
import CourseUpdation from "./Lms/Admin/CourseUpdation/CourseUpdation"
import AdminCredential from "./Lms/Admin/AdminCredential/AdminCredential"
import CategoryCreation from "./Lms/Admin/CategoryCreation/CategoryCreation"
import Dashboard from "./Lms/Admin/Dashboard/Dashboard"
import LicensePurchase from "./Lms/Admin/LicensePurchase/LicensePurchase"
import CheckPayment from "./Lms/Admin/CheckPayment/CheckPayment"
import NeftPayment from "./Lms/Admin/NeftPayment/NeftPayment"
import NotEnrolledFile from "./Lms/Admin/NotEnrolledFile/NotEnrolledFile"

// Instructor
import CourseListInstructor from "./Lms/Instructor/CourseList/CourseList"
import CourseContent from "./Lms/Instructor/CourseContent/CourseContent"
import CourseContentUpdate from "./Lms/Instructor/CourseContentUpdate/CourseContentUpdate"
import ModulePage from "./Lms/Instructor/ModulePage/ModulePage"
import ModuleUpdate from "./Lms/Instructor/ModuleUpdate/ModuleUpdate"
import QuestionPage from "./Lms/Instructor/QuestionPage/QuestionPage"
import QuestionUpdate from "./Lms/Instructor/QuestionUpdate/QuestionUpdate"
import QuestionBankUpdate from "./Lms/Instructor/QuestionBankUpdate/QuestionBankUpdate"
import AddCategory from "./Lms/Instructor/AddCategory/AddCategory"
import AddCourse from "./Lms/Instructor/AddCourse/AddCourse"
import UpdateCourse from "./Lms/Instructor/UpdateCourse/UpdateCourse"
import CategoryQuizList from "./Lms/Instructor/QuestionBank/CategoryQuizList"
import DashboardInstructor from "./Lms/Instructor/DashboardInstructor/DashboardInstructor"
import Question from "./Lms/Instructor/Question/Question"

// Misc
import ScrollToTop from "./ScrollToTop"


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>

        {/* Landing Pages */}
        <Route path="/" element={<><Navbar/><HeroSection/><AboutPage/><Course/><Youtube/><LatestBook/><Author/><Lift/><BuyingBook/><Expert/><Studies/><OurVideos/><SpeakerCard/><MainBanner/><Footer/></>} />
        <Route path="/about" element={<><Navbar/><Hero/><AboutSection/><Work/><Footer/></>} />
        <Route path="/blog" element={<><Navbar/><Blog/><Footer/></>} />
        <Route path="/blog/:blogId" element={<><Navbar/><BlogPreview/><Footer/></>} />
        <Route path="/book" element={<><Navbar/><BookPage/><Footer/></>} />
        <Route path="/book/:id" element={<><Navbar/><BookOrderPage/><Footer/></>} />
        <Route path="/contact" element={<><Navbar/><Contact/><MapArea/><ContactForm/><Footer/></>} />
        <Route path="/checkout" element={<><Navbar/><CheckoutPage/><Footer/></>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />

        {/* User Auth */}
        <Route path="/register" element={<UserRegistration/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/profile" element={<UserProtectedRoute><><Navbar/><UserProfile/><Footer/></></UserProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/addblog" element={<ProtectedRoute><AddBlog/></ProtectedRoute>} />
        <Route path="/admin/blogview" element={<ProtectedRoute><AdminBlogView/></ProtectedRoute>} />
        <Route path="/admin/youtube" element={<ProtectedRoute><AddYoutubeData/></ProtectedRoute>} />
        <Route path="/admin/review" element={<ProtectedRoute><Reviews/></ProtectedRoute>} />
        <Route path="/adminpage" element={<><Navbar/><ProtectedRoute><AdminDataPage/></ProtectedRoute></>} />
        <Route path="/admin/book" element={<ProtectedRoute><AdminBookForm/></ProtectedRoute>} />
        <Route path="/updateblog" element={<ProtectedRoute><UpdateBlog/></ProtectedRoute>} />
        <Route path="/renderblog" element={<ProtectedRoute><Blogs/></ProtectedRoute>} />
        <Route path="/bookupdate/:bookId" element={<ProtectedRoute><UpdateCourse/></ProtectedRoute>} />
        <Route path="/admin/blog/:blogId" element={<><Navbar/><AdminBlogPreview/><Footer/></>} />
        <Route path="/admin/renderblog/:blogId" element={<ProtectedRoute><UpdateBlogPage/></ProtectedRoute>} />

        {/* LMS */}
        <Route path="/lmslogin" element={<Login/>} />
        <Route path="/lmsregister" element={<RegisterPage/>} />
        <Route path="/myspinecoach" element={<><DrMenuBar/><DrKenHome/></>} />
        <Route path="/user/:id" element={<><DrMenuBarUser/><DrKenHome/></>} />
        <Route path="/ken/:course/:module/:id" element={<><DrMenuBarUser/><CourseVideos/></>} />
        <Route path="/allcourselist/:id" element={<><DrMenuBarUser/><AvailableCourses/></>} />
        <Route path="/grade/:id" element={<><DrMenuBarUser/><Grade/></>} />
        <Route path="/badge/:id" element={<><DrMenuBarUser/><CertificateBadge/></>} />
        <Route path="/feedback/:id" element={<><DrMenuBarUser/><FeedbackPage/></>} />
        <Route path="/user/:id/profile" element={<><DrMenuBarUser/><DashBoardProfile/></>} />
        <Route path="/user/:id/message" element={<><DrMenuBarUser/><DashBoardMessage/></>} />
        <Route path="/user/:id/payment" element={<><DrMenuBarUser/><DashBoardPayment/></>} />
        <Route path="/user/:id/editprofile" element={<><DrMenuBarUser/><Edit/></>} />
        <Route path="/forgot_password" element={<LmsForgotPassword/>} />
        <Route path="/reset_password/:token" element={<ResetPassword/>} />
        <Route path="/inv_register/:id" element={<InvitedRegister/>} />
        <Route path="/business_register" element={<CompanyRegister/>} />

        {/* Super Admin */}
        <Route path="/superadmin/:id" element={<SuperAdminDashboard/>}>
          <Route path="dashboard" element={<SuperDashboard/>} />
          <Route path="approve" element={<Approve/>} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admindashboard/:id" element={<AdminDashboard/>}>
          <Route path="coursedetail" element={<CourseDetail/>} />
          <Route path="courseupdate" element={<CourseUpdation/>} />
          <Route path="admincredential" element={<AdminCredential/>} />
          <Route path="category" element={<CategoryCreation/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="purchaselicense" element={<LicensePurchase/>} />
          <Route path="check/:quantity" element={<CheckPayment/>} />
          <Route path="neft/:quantity" element={<NeftPayment/>} />
          <Route path="notenroll" element={<NotEnrolledFile/>} />
          <Route path="courselist" element={<CourseListInstructor/>} />
        </Route>

        {/* Instructor Dashboard */}
        <Route path="/instructordashboard/:id" element={<DashboardInstructor/>}>
          <Route path="courselist" element={<CourseListInstructor/>} />
          <Route path="addpagecontent" element={<CourseContent/>} />
          <Route path="updatepagecontent" element={<CourseContentUpdate/>} />
          <Route path="addmodule" element={<ModulePage/>} />
          <Route path="updatemodule" element={<ModuleUpdate/>} />
          <Route path="quilltxt" element={<QuestionPage/>} />
          <Route path="addquestion" element={<Question/>} />
          <Route path="updatequestion" element={<QuestionUpdate/>} />
          <Route path="questionbank" element={<CategoryQuizList/>} />
          <Route path="questionbankupdate" element={<QuestionBankUpdate/>} />
          <Route path="category" element={<AddCategory/>} />
          <Route path="coursecreation" element={<AddCourse/>} />
          <Route path="coursecreation/:course" element={<UpdateCourse/>} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<><Navbar/><HeroSection/><AboutPage/><Course/><Youtube/><LatestBook/><Author/><Lift/><BuyingBook/><Expert/><Studies/><OurVideos/><SpeakerCard/><MainBanner/><Footer/></>} />

      </Routes>
    </Router>
  )
}

export default App
