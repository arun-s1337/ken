import express from "express";
import {
  addQuestion,
  createQuiz,
  fetchQuizQuestions,
  getOldQuestionsByModuleId,
  getQuestion,
  getQuestionByModule,
  getQuestionsByModuleAndCourse,
  getQuestionsByModuleId,
  getQuestionsWithAnswers,
  getQuizType,
  saveQuizAttempt,
  updateQuestionByModule,
  updateQuestionIds,
} from "../../controller/Course/quiz.controller.js";
import upload from "../../middleware/multer-config.js";
const router = express.Router();

router.post("/addquestion", addQuestion);
router.get("/getquestion", getQuestion);
router.get("/getmodulequestions/:moduleId", getQuestionByModule);
router.post("/updatequestion", updateQuestionByModule);
router.get("/questions/:course/:module", getQuestionsByModuleAndCourse);
router.get("/getquiztype", getQuizType);
router.get("/fetch/:courseId/:moduleId/:quizTypeId", fetchQuizQuestions);

router.post("/createquiz", createQuiz);
router.post("/savequiz/:user_id/:ass_id/:module", saveQuizAttempt);

router.get("/getcorrectanswers/:courseid/:moduleid",getQuestionsWithAnswers)

router.get(`/updatequestionbank/:moduleid`,getQuestionsByModuleId)
router.get("/getoldquestions/:moduleid",getOldQuestionsByModuleId)
router.post("/updatequestionids",updateQuestionIds)

export default router;
