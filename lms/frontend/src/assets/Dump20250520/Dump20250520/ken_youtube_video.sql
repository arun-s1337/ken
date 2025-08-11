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
-- Table structure for table `youtube_video`
--

DROP TABLE IF EXISTS `youtube_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `youtube_video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL DEFAULT '2',
  `yotubelLink` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `youtube_video_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `web_admin_login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `youtube_video`
--

LOCK TABLES `youtube_video` WRITE;
/*!40000 ALTER TABLE `youtube_video` DISABLE KEYS */;
INSERT INTO `youtube_video` VALUES (2,2,'https://www.youtube.com/embed/gCBm7iG_KLA?si=bbEOnOPqVoWLL9ig','Colorado Bovie','2025-05-19 10:07:35','2025-05-19 10:07:35'),(3,2,'https://www.youtube.com/embed/PfAdj_DsXN8?si=E4Dd68zknk5dy_B3','USA Independence Day','2025-05-19 10:15:16','2025-05-19 10:15:16'),(4,2,'https://www.youtube.com/embed/G1O39BS2h90?si=W8FDhQKvbgyuBLfA','LIFT Meditations to Boost Back Health','2025-05-19 10:22:25','2025-05-19 10:22:25'),(5,2,'https://www.youtube.com/embed/mRpkxeGZ584?si=BQq3TGtcTe8RGtOE','The World Has A Spine Problem (Ultra HD 4K)','2025-05-19 10:22:55','2025-05-19 10:22:55'),(6,2,'https://www.youtube.com/embed/Ryfn1x3KHuE?si=Om1TcZITvVMi8Rai','The World Has A Spine Problem Presented at the United Nations','2025-05-19 10:23:32','2025-05-19 10:23:32');
/*!40000 ALTER TABLE `youtube_video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20 17:17:13
