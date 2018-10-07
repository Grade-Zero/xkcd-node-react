-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: xkcd
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `xkcd`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `xkcd` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `xkcd`;

--
-- Table structure for table `comics`
--

DROP TABLE IF EXISTS `comics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics`
--

LOCK TABLES `comics` WRITE;
/*!40000 ALTER TABLE `comics` DISABLE KEYS */;
INSERT INTO `comics` VALUES (1,'Sandboxing Cycle','https://imgs.xkcd.com/comics/sandboxing_cycle.png'),(2,'Data','https://imgs.xkcd.com/comics/data.png'),(3,'Containers','https://imgs.xkcd.com/comics/containers.png'),(4,'Ballooning','https://imgs.xkcd.com/comics/ballooning.png'),(5,'The Ring','https://imgs.xkcd.com/comics/the_ring.png'),(6,'Unique Date','https://imgs.xkcd.com/comics/unique_date.png'),(7,'Fountain','https://imgs.xkcd.com/comics/fountain.png'),(8,'Second','https://imgs.xkcd.com/comics/second.png'),(9,'Sheep','https://imgs.xkcd.com/comics/sheep.jpg'),(10,'Dorm Poster','https://imgs.xkcd.com/comics/dorm_poster.png'),(11,'The Ring','https://imgs.xkcd.com/comics/the_ring.png'),(12,'Stories of the Past and Future','https://imgs.xkcd.com/comics/stories_of_the_past_and_future.png'),(13,'Baby Post','https://imgs.xkcd.com/comics/baby_post.png'),(14,'Spoiler Alert','https://imgs.xkcd.com/comics/spoiler_alert.png'),(15,'Pointers','https://imgs.xkcd.com/comics/pointers.png'),(16,'Six Words','https://imgs.xkcd.com/comics/six_words.png'),(17,'Love','https://imgs.xkcd.com/comics/love.jpg'),(18,'Threesome','https://imgs.xkcd.com/comics/threesome.png'),(19,'Scheduling Conflict','https://imgs.xkcd.com/comics/scheduling_conflict.png'),(20,'Insomnia','https://imgs.xkcd.com/comics/insomnia.png'),(21,'DNA','https://imgs.xkcd.com/comics/dna.png'),(22,'Expedition','https://imgs.xkcd.com/comics/expedition.png'),(23,'Knights','https://imgs.xkcd.com/comics/knights.png'),(24,'Salt Mine','https://imgs.xkcd.com/comics/salt_mine.png'),(25,'Palindrome','https://imgs.xkcd.com/comics/palindrome.png'),(26,'Turkish Delight','https://imgs.xkcd.com/comics/turkish_delight.png'),(27,'To Taste','https://imgs.xkcd.com/comics/to_taste.png'),(28,'Skynet','https://imgs.xkcd.com/comics/skynet.png'),(29,'3D Printer','https://imgs.xkcd.com/comics/3d_printer.png'),(30,'New Study','https://imgs.xkcd.com/comics/new_study.png'),(31,'Blogofractal','https://imgs.xkcd.com/comics/blogofractal.png'),(32,'Sunrise','https://imgs.xkcd.com/comics/sunrise.jpg'),(33,'Substitutions','https://imgs.xkcd.com/comics/substitutions.png'),(34,'United Shapes','https://imgs.xkcd.com/comics/united_shapes.png'),(35,'Lakes and Oceans','https://imgs.xkcd.com/comics/lakes_and_oceans.png'),(36,'Tumblr','https://imgs.xkcd.com/comics/tumblr.png'),(37,'Proteins','https://imgs.xkcd.com/comics/proteins.png'),(38,'Abstraction','https://imgs.xkcd.com/comics/abstraction.png'),(39,'Sagan-Man','https://imgs.xkcd.com/comics/sagan-man.png'),(40,'QR Code','https://imgs.xkcd.com/comics/qr_code.png'),(41,'Mission to Culture','https://imgs.xkcd.com/comics/mission_to_culture.png'),(42,'Magic School Bus','https://imgs.xkcd.com/comics/magic_school_bus.png'),(43,'USB Cables','https://imgs.xkcd.com/comics/usb_cables.png'),(44,'Fruit Collider','https://imgs.xkcd.com/comics/fruit_collider.png'),(45,'Board Game','https://imgs.xkcd.com/comics/board_game.png'),(46,'Episode VII','https://imgs.xkcd.com/comics/episode_vii.png'),(47,'Percentage Points','https://imgs.xkcd.com/comics/percentage_points.png'),(48,'Upcoming Hurricanes','https://imgs.xkcd.com/comics/upcoming_hurricanes.png'),(49,'Marshmallow Gun','https://imgs.xkcd.com/comics/marshmallow_gun.png'),(50,'Lorenz','https://imgs.xkcd.com/comics/shouldnt_be_hard.png'),(51,'Memorable Quotes','https://imgs.xkcd.com/comics/memorable_quotes.png'),(52,'Superlative','https://imgs.xkcd.com/comics/superlative.png'),(53,'Density','https://imgs.xkcd.com/comics/density.png'),(54,'Super Bowl','https://imgs.xkcd.com/comics/super_bowl.png'),(55,'Rickrolling Anniversary','https://imgs.xkcd.com/comics/rickrolling_anniversary.png'),(56,'Penny Arcade','https://imgs.xkcd.com/comics/penny_arcade.jpg'),(57,'The Familiar','https://imgs.xkcd.com/comics/the_familiar.png'),(58,'Bun','https://imgs.xkcd.com/comics/bun.png'),(59,'The Sky','https://imgs.xkcd.com/comics/the_sky.png'),(60,'Let Go','https://imgs.xkcd.com/comics/let_go.png'),(61,'Important Life Lesson','https://imgs.xkcd.com/comics/important_life_lesson.png'),(62,'Kepler','https://imgs.xkcd.com/comics/kepler.jpg'),(63,'Morning','https://imgs.xkcd.com/comics/morning.png'),(64,'Scary Names','https://imgs.xkcd.com/comics/scary_names.png'),(65,'Geochronology','https://imgs.xkcd.com/comics/geochronology.png'),(66,'1337: Part 4','https://imgs.xkcd.com/comics/1337_part_4.png'),(67,'Extrapolating','https://imgs.xkcd.com/comics/extrapolating.png'),(68,'Wisdom of the Ancients','https://imgs.xkcd.com/comics/wisdom_of_the_ancients.png'),(69,'Time','https://imgs.xkcd.com/comics/time.png'),(70,'Tabletop Roleplaying','https://imgs.xkcd.com/comics/tabletop_roleplaying.png'),(71,'Election Map','https://imgs.xkcd.com/comics/election_map.png'),(72,'Done','https://imgs.xkcd.com/comics/done.png'),(73,'T-shirts','https://imgs.xkcd.com/comics/t-shirts.jpg'),(74,'Air Force Museum','https://imgs.xkcd.com/comics/air_force_museum.png'),(75,'Anti-Mindvirus','https://imgs.xkcd.com/comics/anti_mind_virus.png'),(76,'Cold Medicine','https://imgs.xkcd.com/comics/cold_medicine.png'),(77,'Syllable Planning','https://imgs.xkcd.com/comics/syllable_planning.png'),(78,'Earth Temperature Timeline','https://imgs.xkcd.com/comics/earth_temperature_timeline.png'),(79,'TED Talk','https://imgs.xkcd.com/comics/ted_talk.png'),(80,'Incinerator','https://imgs.xkcd.com/comics/incinerator.png'),(81,'Making Friends','https://imgs.xkcd.com/comics/making_friends.png'),(82,'Still No Sleep','https://imgs.xkcd.com/comics/still_no_sleep.png'),(83,'Girl sleeping (Sketch -- 11th grade Spanish class)','https://imgs.xkcd.com/comics/girl_sleeping_noline_(1).jpg'),(84,'Solar System Questions','https://imgs.xkcd.com/comics/solar_system_questions.png'),(85,'Snapchat','https://imgs.xkcd.com/comics/snapchat.png'),(86,'Interplanetary Experience','https://imgs.xkcd.com/comics/interplanetary_experience.png'),(87,'Kilobyte','https://imgs.xkcd.com/comics/kilobyte.png'),(88,'Seashell','https://imgs.xkcd.com/comics/seashell.png'),(89,'Everything','https://imgs.xkcd.com/comics/everything.png'),(90,'Star Lore','https://imgs.xkcd.com/comics/star_lore.png'),(91,'Snopes','https://imgs.xkcd.com/comics/snopes.png'),(92,'Automatic Doors','https://imgs.xkcd.com/comics/automatic_doors.png'),(93,'Advertising Discovery','https://imgs.xkcd.com/comics/citations.png'),(94,'Listening','https://imgs.xkcd.com/comics/listening.png'),(95,'Never','https://imgs.xkcd.com/comics/never.png'),(96,'2038','https://imgs.xkcd.com/comics/2038.png'),(97,'Chin-Up Bar','https://imgs.xkcd.com/comics/chin_up_bar.png'),(98,'Board Game','https://imgs.xkcd.com/comics/board_game.png'),(99,'Geology','https://imgs.xkcd.com/comics/geology.png'),(100,'Savannah Ancestry','https://imgs.xkcd.com/comics/savannah_ancestry.png'),(101,'The True Meaning of Christmas','https://imgs.xkcd.com/comics/the_true_meaning_of_christmas.png'),(102,'Jacket','https://imgs.xkcd.com/comics/jacket.jpg'),(103,'Conversation','https://imgs.xkcd.com/comics/conversation.png'),(104,'Gnome Ann','https://imgs.xkcd.com/comics/gnome_ann.png'),(105,'1 to 10','https://imgs.xkcd.com/comics/1_to_10.png'),(106,'Sleet','https://imgs.xkcd.com/comics/sleet.png'),(107,'xkcd Loves the Discovery Channel','https://imgs.xkcd.com/comics/xkcd_loves_the_discovery_channel.png'),(108,'Moving','https://imgs.xkcd.com/comics/moving.png'),(109,'Rayleigh Scattering','https://imgs.xkcd.com/comics/rayleigh_scattering.png');
/*!40000 ALTER TABLE `comics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-08  2:54:07
