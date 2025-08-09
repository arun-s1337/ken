-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ken
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author_detail` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT (1),
  `kindle` float DEFAULT (0.0),
  `audible` float DEFAULT (0.0),
  `hardcover` float DEFAULT (0.0),
  `audio_cd` float DEFAULT (0.0),
  `book_description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `images` json DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `editorial_review` text,
  `about_author` text,
  `product_details` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (5,'Watch Your Back part 1','MD Hansraj, Ken (Author), Gary Crumpler (Illustrator)',1,17,23,17,11,'This image shows how backpack forces affect spinal wellness and posture,\r\nlinking excess weight to neck and back pain. Great for authors and speakers on self-care\r\nstrategies and spine health.','2025-05-13 10:02:00','2025-05-16 06:34:57','[\"images-1747376309585-957369144.png\", \"uploads\\\\\\\\images-1747377297339-47058764.png\"]',5,'“This is good medicine.” ―Jack Kornfield, author of A Path with Heart  “A groundbreaking game plan for your neck and back care.” ―Patrick F. O’Leary, MD, associate professor of spine surgery, Hospital for Special Surgery, New York  “With over 12 billion impressions online, Dr. Ken is one of the world’s most celebrated orthopedic surgeons. His latest work is a blueprint for neck and spine care and how its health is essential to our overall well-being.” ―Richard Rubenstein, president, Rubenstein Public Relations  “Back pain continues to be a prevalent problem. Far too many people are restricted from full enjoyment of life because of acute and chronic back pain. Dr. Hansraj provides an innovative, evidence-based, up-to-the-minute plan of action to reduce back pain and suffering.” ―Charles G. Fisher, MD, MHSc, FRCSC, professor and head―Division of Spine Surgery, University of British Columbia and Vancouver General Hospital  “Learn to reduce the harms of belly fat, text neck, and sitting disease. Master the nine practical ways to keep your spine young, supple, and pain-free. Watch Your Back is a must-read.” ―Shiv Kumar Sarin, MD, professor, former chairman of the board of governors of the Medical Council of India, and recipient of the Shanti Swarup Bhatnagar prize and the Padma Bushan','Ken Hansraj, MD, is a spinal and orthopedic surgeon with more than 20 years’ experience specializing in preventative medicine and using minimally invasive approaches to spinal care when possible. He is board certified by the American Board of Orthopaedic Surgery and fellowship trained in spine surgery at the Hospital for Special Surgery in New York. Dr. Ken is well known for his work on “text neck” and has appeared on CNN, CBS, FOX, NBC, ABC, and NPR. He was named one of America’s most compassionate doctors in 2020 by vitals.com.',NULL),(6,'THe old gun and basket','Sankar,Sairam,Prasanna',3,25,17,17,12,'Image Alt: Dr. Ken Hansraj offers keynote speaking on spinal wellness, emotional health,\r\nand self-care strategies.\r\nImage Description: Dr. Ken Hansraj, author and speaker, promotes spine health, spinal\r\nwellness, and self-care strategies to reduce neck and back pain. Book him as a global keynote\r\nspeaker for vibrant health insights.\r\n','2025-05-13 10:48:59','2025-05-16 05:45:18','[]',4,NULL,NULL,NULL),(7,'The new school book published','Sankar,Sairam',3,15,20,36,25,'for spine health.\r\nDescription: This image shows how backpack forces affect spinal wellness and posture,\r\nlinking excess weight to neck and back pain. Great for authors and speakers on self-care\r\nstrategies and spine health.\r\nImage Alt: Dr. Ken Hansraj offers keynote speaking on spinal wellness, emotional health,\r\nand self-care strategies.\r\nImage Description: Dr. Ken Hansraj, author and speaker, promotes spine health, spinal\r\nwellness, and self-care strategies to reduce neck and back pain. Book him as a global keynote\r\nspeaker for vibrant health insights.\r\nImage Alt: Dr. Ken Hansraj performing spinal surgery focused on spine health and spinal\r\nwellness care.\r\nImage Description: Dr. Ken Hansraj is a spinal surgeon and author promoting spinal\r\nwellness, back pain relief, and self-care strategies.Image alt: Book by Dr.Ken Hansraj - Watch Your Back\r\nImage Description: Watch Your Back by Dr.Ken Hansraj, shares nine proven strategies to\r\nease neck and back pain without surgery, promoting spinal wellness and self-care.\r\nImage Alt: Book cover of Secrets of the Cervical Spine by Dr. Kenneth Hansraj, promoting\r\nspinal health.\r\nImage Description: Secrets of the Cervical Spine by Dr. Kenneth Hansraj reveals keys to\r\nspinal wellness and a vibrant life, focusing on cervical spine care for improved health and\r\nvitality.','2025-05-13 11:05:56','2025-05-20 10:26:33','[\"uploads\\\\images-1747134356626-796195578.png\"]',3,'“This is good medicine.” ―Jack Kornfield, author of A Path with Heart \n\n“A groundbreaking game plan for your neck and back care.” ―Patrick F. O’Leary, MD, associate professor of spine surgery, Hospital for Special Surgery, New York \n\n“With over 12 billion impressions online, Dr. Ken is one of the world’s most celebrated orthopedic surgeons. His latest work is a blueprint for neck and spine care and how its health is essential to our overall well-being.” ―Richard Rubenstein, president, Rubenstein Public Relations \n\n“Back pain continues to be a prevalent problem. Far too many people are restricted from full enjoyment of life because of acute and chronic back pain. Dr. Hansraj provides an innovative, evidence-based, up-to-the-minute plan of action to reduce back pain and suffering.” ―Charles G. Fisher, MD, MHSc, FRCSC, professor and head—Division of Spine Surgery, University of British Columbia and Vancouver General Hospital \n\n“Learn to reduce the harms of belly fat, text neck, and sitting disease. Master the nine practical ways to keep your spine young, supple, and pain-free. Watch Your Back is a must-read.” ―Shiv Kumar Sarin, MD, professor, former chairman of the board of governors of the Medical Council of India, and recipient of the Shanti Swarup Bhatnagar prize and the Padma Bushan','Ken Hansraj, MD, is a spinal and orthopedic surgeon with more than 20 years’ experience specializing in preventative medicine and using minimally invasive approaches to spinal care when possible. He is board certified by the American Board of Orthopaedic Surgery and fellowship trained in spine surgery at the Hospital for Special Surgery in New York. Dr. Ken is well known for his work on “text neck” and has appeared on CNN, CBS, FOX, NBC, ABC, and NPR. He was named one of America’s most compassionate doctors in 2020 by vitals.com.',NULL),(11,'SPINE and Neck','ken',1,36,24,67,35,'fergdr','2025-05-14 12:07:56','2025-05-14 12:07:56','[\"uploads\\\\images-1747224476316-459677053.png\"]',1,NULL,NULL,NULL),(12,'The new jungle book','Sankar,Sairam',8,14,14,7,10,'A small description to add this is to do great work in the environment','2025-05-16 05:11:51','2025-05-16 05:11:51','[\"uploads\\\\images-1747372311713-410908775.png\", \"uploads\\\\images-1747372311722-506818435.png\", \"uploads\\\\images-1747372311727-4526247.png\"]',5,NULL,NULL,NULL),(13,'This is ggreatest book','MD Hansraj, Ken (Author), Gary Crumpler (Illustrator)',1,23,29,26,24,'qeqeqeqeqeq\r\nw\r\ndas\r\nd\r\ndas\r\nd\r\nd\r\n','2025-05-16 06:13:17','2025-05-16 06:13:17','[\"uploads\\\\images-1747375997401-619765688.png\"]',4,NULL,NULL,NULL);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20 17:17:12
