-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 21 jan. 2021 à 09:45
-- Version du serveur :  8.0.22-0ubuntu0.20.04.2
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fmi`
--

-- --------------------------------------------------------

--
-- Structure de la table `arbiter_detail`
--

CREATE TABLE `arbiter_detail` (
  `id` int NOT NULL,
  `person_id` int NOT NULL,
  `match_sheet_id` int NOT NULL,
  `type` enum('PRINCIPAL','ASSISTANT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `arbiter_detail`
--

INSERT INTO `arbiter_detail` (`id`, `person_id`, `match_sheet_id`, `type`) VALUES
(39, 76, 12, 'ASSISTANT'),
(40, 75, 12, 'PRINCIPAL'),
(41, 77, 12, 'ASSISTANT');

-- --------------------------------------------------------

--
-- Structure de la table `club`
--

CREATE TABLE `club` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `club`
--

INSERT INTO `club` (`id`, `name`, `short_name`, `city`, `logo_url`) VALUES
(1, 'Paris Saint Germain', 'PSG', 'Paris', 'https://upload.wikimedia.org/wikipedia/fr/thumb/4/4a/Paris_Saint-Germain_Football_Club_%28logo%29.svg/1200px-Paris_Saint-Germain_Football_Club_%28logo%29.svg.png'),
(2, 'Olympique de Marseille', 'OM', 'Marseille', 'https://upload.wikimedia.org/wikipedia/fr/thumb/4/43/Logo_Olympique_de_Marseille.svg/472px-Logo_Olympique_de_Marseille.svg.png'),
(3, 'Football Club des Girondins de Bordeaux', 'FCGB', 'Bordeaux', 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/ec/Logo_FC_Girondins_Bordeaux_2020.svg/langfr-260px-Logo_FC_Girondins_Bordeaux_2020.svg.png'),
(4, 'Olympique Gymnaste Club de Nice', 'OGC Nice', 'Nive', 'https://upload.wikimedia.org/wikipedia/fr/thumb/b/b1/Logo_OGC_Nice_2013.svg/langfr-130px-Logo_OGC_Nice_2013.svg.png'),
(5, 'Racing Club Strasbourg Alsace', 'RCSA', 'Strasbourg', 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/70/Racing_Club_de_Strasbourg_Alsace_%28RC_Strasbourg_-_RCS_-_RCSA%29_logo_officiel.svg/langfr-130px-Racing_Club_de_Strasbourg_Alsace_%28RC_Strasbourg_-_RCS_-_RCSA%29_logo_officiel.svg.png'),
(6, 'Association sportive de Saint-Étienne Loire', 'ASSE', 'Association sportive de Saint-Étienne Loire', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_AS_Saint-%C3%89tienne.svg/langfr-130px-Logo_AS_Saint-%C3%89tienne.svg.png');

-- --------------------------------------------------------

--
-- Structure de la table `country`
--

CREATE TABLE `country` (
  `id` int NOT NULL,
  `alpha_3_code` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nationality` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `country`
--

INSERT INTO `country` (`id`, `alpha_3_code`, `nationality`, `name`) VALUES
(1, 'FRA', 'Française', 'France'),
(2, 'GBR', 'Anglaise', 'Royaume-Uni');

-- --------------------------------------------------------

--
-- Structure de la table `match_sheet`
--

CREATE TABLE `match_sheet` (
  `id` int NOT NULL,
  `home_club_id` int NOT NULL,
  `visitor_club_id` int NOT NULL,
  `status` enum('BEFORE','IN_PROGRESS','CLOSE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `candidate_home` tinyint DEFAULT NULL,
  `candidate_visitor` tinyint DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `match_sheet`
--

INSERT INTO `match_sheet` (`id`, `home_club_id`, `visitor_club_id`, `status`, `candidate_home`, `candidate_visitor`, `date`) VALUES
(12, 1, 2, 'CLOSE', 1, 1, '2021-01-20 10:10:43');

-- --------------------------------------------------------

--
-- Structure de la table `metadata`
--

CREATE TABLE `metadata` (
  `id` int NOT NULL,
  `person_id` int NOT NULL,
  `match_sheet_id` int NOT NULL,
  `key_metadata_field` enum('BUT','RED_CARD','INPUT','OUTPUT','YELLOW_CARD','CSC') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valueTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `metadata`
--

INSERT INTO `metadata` (`id`, `person_id`, `match_sheet_id`, `key_metadata_field`, `valueTime`) VALUES
(23, 151, 12, 'BUT', '2'),
(24, 185, 12, 'BUT', '15');

-- --------------------------------------------------------

--
-- Structure de la table `person`
--

CREATE TABLE `person` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('player','coach','second_coach','arbiter') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int DEFAULT NULL,
  `poste` enum('GARDIEN','DEFENSEUR','MILIEU','ATTAQUANT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  `country_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `person`
--

INSERT INTO `person` (`id`, `name`, `role`, `number`, `poste`, `club_id`, `country_id`) VALUES
(75, 'Benny Sparks', 'arbiter', NULL, NULL, NULL, 2),
(76, 'Brooke Davidson', 'arbiter', NULL, NULL, NULL, 2),
(77, 'Julien de Launay', 'arbiter', NULL, NULL, NULL, 1),
(78, 'Maxime Turgeon', 'arbiter', NULL, NULL, NULL, 1),
(100, 'L. Balerdi', 'player', 1, 'DEFENSEUR', 2, 1),
(101, 'A. Diallo', 'player', 2, 'DEFENSEUR', 1, 1),
(102, 'Rony Lopes', 'player', 15, 'ATTAQUANT', 4, 1),
(103, 'K. Thuram-Ulien', 'player', 17, 'MILIEU', 4, 1),
(104, 'Rafinha', 'player', 22, 'MILIEU', 1, 1),
(105, 'M. Icardi', 'player', 25, 'ATTAQUANT', 1, 1),
(106, 'Marquinhos', 'player', 27, 'DEFENSEUR', 1, 1),
(107, 'Juan Bernat', 'player', 28, 'DEFENSEUR', 1, 1),
(108, 'C. Dagba', 'player', 29, 'DEFENSEUR', 1, 1),
(109, 'T. Kehrer', 'player', 30, 'DEFENSEUR', 1, 1),
(110, 'P. Kimpembe', 'player', 31, 'DEFENSEUR', 1, 1),
(111, 'L. Kurzawa', 'player', 32, 'DEFENSEUR', 1, 1),
(112, 'Á. Di María', 'player', 34, 'MILIEU', 1, 1),
(113, 'J. Draxler', 'player', 35, 'MILIEU', 1, 1),
(114, 'S. N&apos;Soki', 'player', 36, 'DEFENSEUR', 4, 1),
(115, 'L. Paredes', 'player', 37, 'MILIEU', 1, 1),
(116, 'M. Verratti', 'player', 38, 'MILIEU', 1, 1),
(117, 'Neymar', 'player', 39, 'ATTAQUANT', 1, 1),
(118, 'K. Mbappé', 'player', 40, 'ATTAQUANT', 1, 1),
(119, 'Danilo Pereira', 'player', 42, 'MILIEU', 1, 1),
(120, 'Y. Nagatomo', 'player', 43, 'DEFENSEUR', 2, 1),
(121, 'M. Bakker', 'player', 46, 'DEFENSEUR', 1, 1),
(122, 'K. Dolberg', 'player', 47, 'ATTAQUANT', 4, 1),
(123, 'K. Navas', 'player', 66, 'GARDIEN', 1, 1),
(124, 'A. Florenzi', 'player', 67, 'DEFENSEUR', 1, 1),
(125, 'M. Kean', 'player', 71, 'ATTAQUANT', 1, 1),
(126, 'Ander Herrera', 'player', 73, 'MILIEU', 1, 1),
(127, 'L. Benito', 'player', 74, 'DEFENSEUR', 3, 1),
(128, 'J. Lotomba', 'player', 75, 'DEFENSEUR', 4, 1),
(129, 'P. Retsos', 'player', 77, 'DEFENSEUR', 6, 1),
(130, 'B. Costil', 'player', 82, 'GARDIEN', 3, 1),
(131, 'G. Poussin', 'player', 83, 'GARDIEN', 3, 1),
(132, 'V. Jovanović', 'player', 84, 'DEFENSEUR', 3, 1),
(133, 'Alexandre Lauray', 'player', 85, 'DEFENSEUR', 3, 1),
(134, 'Pablo', 'player', 86, 'DEFENSEUR', 3, 1),
(135, 'Sergi Palencia', 'player', 87, 'DEFENSEUR', 6, 1),
(136, 'Otávio', 'player', 88, 'MILIEU', 3, 1),
(137, 'M. Poundjé', 'player', 89, 'DEFENSEUR', 3, 1),
(138, 'Y. Sabaly', 'player', 90, 'DEFENSEUR', 3, 1),
(139, 'Y. Adli', 'player', 91, 'MILIEU', 3, 1),
(140, 'T. Bašić', 'player', 92, 'MILIEU', 3, 1),
(141, 'Z. Youssouf', 'player', 95, 'MILIEU', 6, 1),
(142, 'J. Briand', 'player', 96, 'ATTAQUANT', 3, 1),
(143, 'N. de Préville', 'player', 97, 'ATTAQUANT', 3, 1),
(144, 'S. Kalu', 'player', 98, 'ATTAQUANT', 3, 1),
(145, 'F. Kamano', 'player', 99, 'ATTAQUANT', 3, 1),
(146, 'J. Maja', 'player', 100, 'ATTAQUANT', 3, 1),
(147, 'L. Koscielny', 'player', 4, 'DEFENSEUR', 3, 1),
(148, 'Jesé', 'player', 8, 'ATTAQUANT', 1, 1),
(149, 'Álvaro González', 'player', 11, 'DEFENSEUR', 2, 1),
(150, 'S. Mandanda', 'player', 15, 'GARDIEN', 2, 1),
(151, 'Y. Pelé', 'player', 16, 'GARDIEN', 2, 1),
(152, 'A. Ali Mohamed', 'player', 17, 'DEFENSEUR', 2, 1),
(153, 'J. Amavi', 'player', 18, 'DEFENSEUR', 2, 1),
(154, 'D. Ćaleta-Car', 'player', 19, 'DEFENSEUR', 2, 1),
(155, 'B. Kamara', 'player', 20, 'DEFENSEUR', 2, 1),
(156, 'H. Sakai', 'player', 21, 'DEFENSEUR', 2, 1),
(157, 'F. Chabrolle', 'player', 22, 'MILIEU', 2, 1),
(158, 'M. Lopez', 'player', 23, 'MILIEU', 2, 1),
(159, 'D. Payet', 'player', 24, 'MILIEU', 2, 1),
(160, 'A. Phliponeau', 'player', 25, 'MILIEU', 2, 1),
(161, 'M. Sanson', 'player', 26, 'MILIEU', 2, 1),
(162, 'B. Sarr', 'player', 27, 'DEFENSEUR', 2, 1),
(163, 'K. Strootman', 'player', 28, 'MILIEU', 2, 1),
(164, 'V. Germain', 'player', 29, 'ATTAQUANT', 2, 1),
(165, 'N. Radonjić', 'player', 30, 'MILIEU', 2, 1),
(166, 'F. Thauvin', 'player', 31, 'ATTAQUANT', 2, 1),
(167, 'Pablo Sarabia', 'player', 34, 'MILIEU', 1, 1),
(168, 'Mexer', 'player', 43, 'DEFENSEUR', 3, 1),
(169, 'H. Ben Arfa', 'player', 46, 'MILIEU', 3, 1),
(170, 'M. Bulka', 'player', 56, 'GARDIEN', 1, 1),
(171, 'M. Trauco', 'player', 57, 'DEFENSEUR', 6, 1),
(172, 'D. Benedetto', 'player', 59, 'ATTAQUANT', 2, 1),
(173, 'S. Mitrović', 'player', 72, 'DEFENSEUR', 5, 1),
(174, 'Hwang Ui-jo', 'player', 73, 'ATTAQUANT', 3, 1),
(175, 'M. Sels', 'player', 74, 'GARDIEN', 5, 1),
(176, 'S. Khaoui', 'player', 77, 'MILIEU', 2, 1),
(177, 'I. Gueye', 'player', 82, 'MILIEU', 1, 1),
(178, 'Y. Atal', 'player', 88, 'DEFENSEUR', 4, 1),
(179, 'L. Mothiba', 'player', 94, 'ATTAQUANT', 5, 1),
(180, 'A. Waris', 'player', 8, 'ATTAQUANT', 5, 1),
(181, 'H. Boudaoui', 'player', 9, 'MILIEU', 4, 1),
(182, 'Luis Henrique', 'player', 24, 'ATTAQUANT', 2, 1),
(183, 'Robson Bambu', 'player', 25, 'DEFENSEUR', 4, 1),
(184, 'M. Schneiderlin', 'player', 31, 'MILIEU', 4, 1),
(185, 'Sergio Rico', 'player', 33, 'GARDIEN', 1, 1),
(186, 'A. Letellier', 'player', 60, 'GARDIEN', 1, 1),
(187, 'A. Claude Maurice', 'player', 69, 'MILIEU', 4, 1),
(188, 'J. Bellegarde', 'player', 87, 'MILIEU', 5, 1),
(189, 'H. Moukoudi', 'player', 93, 'DEFENSEUR', 6, 1),
(190, 'P. Gueye', 'player', 94, 'MILIEU', 2, 1),
(191, 'N. Sissoko', 'player', 98, 'DEFENSEUR', 6, 1),
(192, 'M. Siby', 'player', 6, 'MILIEU', 5, 1),
(193, 'C. Rocchia', 'player', 14, 'DEFENSEUR', 2, 1),
(194, 'E. Kwateng', 'player', 19, 'DEFENSEUR', 3, 1),
(195, 'V. Rongier', 'player', 28, 'MILIEU', 2, 1),
(196, 'D. Bouanga', 'player', 56, 'ATTAQUANT', 6, 1),
(197, 'Alexandre Mendy', 'player', 75, 'ATTAQUANT', 3, 1),
(198, 'R. Souici', 'player', 77, 'MILIEU', 6, 1),
(199, 'P. Baysse', 'player', 99, 'DEFENSEUR', 3, 1),
(200, 'A. Djiku', 'player', 100, 'DEFENSEUR', 5, 1),
(201, 'H. Kamara', 'player', 23, 'MILIEU', 4, 1),
(202, 'R. Oudin', 'player', 26, 'ATTAQUANT', 3, 1),
(203, 'J. Moulin', 'player', 28, 'GARDIEN', 6, 1),
(204, 'S. Ruffier', 'player', 29, 'GARDIEN', 6, 1),
(205, 'Gabriel Silva', 'player', 30, 'DEFENSEUR', 6, 1),
(206, 'M. Debuchy', 'player', 31, 'DEFENSEUR', 6, 1),
(207, 'T. Kolodziejczak', 'player', 32, 'DEFENSEUR', 6, 1),
(208, 'L. Perrin', 'player', 33, 'DEFENSEUR', 6, 1),
(209, 'B. Benkhedim', 'player', 34, 'MILIEU', 6, 1),
(210, 'W. Fofana', 'player', 35, 'DEFENSEUR', 6, 1),
(211, 'R. Hamouma', 'player', 36, 'ATTAQUANT', 6, 1),
(212, 'Yann Gérard MVila', 'player', 37, 'MILIEU', 6, 1),
(213, 'A. Nordin', 'player', 38, 'ATTAQUANT', 6, 1),
(214, 'L. Diony', 'player', 39, 'ATTAQUANT', 6, 1),
(215, 'W. Khazri', 'player', 40, 'ATTAQUANT', 6, 1),
(216, 'K. Monnet-Paquet', 'player', 41, 'ATTAQUANT', 6, 1),
(217, 'L. Bessile', 'player', 44, 'DEFENSEUR', 3, 1),
(218, 'W. Benítez', 'player', 49, 'GARDIEN', 4, 1),
(219, 'Y. Cardinale', 'player', 50, 'GARDIEN', 4, 1),
(220, 'P. Burner', 'player', 51, 'DEFENSEUR', 4, 1),
(221, 'R. Coly', 'player', 52, 'DEFENSEUR', 4, 1),
(222, 'Dante', 'player', 53, 'DEFENSEUR', 4, 1),
(223, 'Danilo Barbosa', 'player', 55, 'MILIEU', 4, 1),
(224, 'P. Lees Melou', 'player', 56, 'MILIEU', 4, 1),
(225, 'I. Sacko', 'player', 57, 'ATTAQUANT', 4, 1),
(226, 'M. Maolida', 'player', 59, 'ATTAQUANT', 4, 1),
(227, 'B. Kamara', 'player', 73, 'GARDIEN', 5, 1),
(228, 'E. Kawashima', 'player', 74, 'GARDIEN', 5, 1),
(229, 'I. Aaneba', 'player', 75, 'DEFENSEUR', 5, 1),
(230, 'A. Caci', 'player', 76, 'DEFENSEUR', 5, 1),
(231, 'L. Carole', 'player', 77, 'DEFENSEUR', 5, 1),
(232, 'L. Koné', 'player', 78, 'DEFENSEUR', 5, 1),
(233, 'K. Lala', 'player', 79, 'DEFENSEUR', 5, 1),
(234, 'M. Simakan', 'player', 81, 'DEFENSEUR', 5, 1),
(235, 'D. Liénard', 'player', 83, 'MILIEU', 5, 1),
(236, 'S. Prcić', 'player', 85, 'MILIEU', 5, 1),
(237, 'I. Sissoko', 'player', 86, 'MILIEU', 5, 1),
(238, 'A. Thomasson', 'player', 87, 'MILIEU', 5, 1),
(239, 'K. Zohi', 'player', 88, 'ATTAQUANT', 5, 1),
(240, 'L. Ajorque', 'player', 89, 'ATTAQUANT', 5, 1),
(241, 'I. Saadi', 'player', 91, 'ATTAQUANT', 5, 1),
(242, 'J. Krasso', 'player', 92, 'ATTAQUANT', 6, 1),
(243, 'M. Camara', 'player', 97, 'MILIEU', 6, 1),
(244, 'M. Chahiri', 'player', 100, 'MILIEU', 5, 1),
(245, 'Y. Maçon', 'player', 1, 'DEFENSEUR', 6, 1),
(246, 'M. Cuisance', 'player', 6, 'MILIEU', 2, 1),
(247, 'A. Dioussé', 'player', 9, 'MILIEU', 6, 1),
(248, 'Y. Neyou Noupa', 'player', 19, 'MILIEU', 6, 1),
(249, 'Rubén Pardo', 'player', 22, 'MILIEU', 3, 1),
(250, 'R. Boudebouz', 'player', 23, 'MILIEU', 6, 1),
(251, 'D. Ndoye', 'player', 26, 'ATTAQUANT', 4, 1),
(252, 'A. Pelmard', 'player', 31, 'DEFENSEUR', 4, 1),
(253, 'C. Abi', 'player', 32, 'ATTAQUANT', 6, 1),
(254, 'L. Perrin', 'player', 33, 'DEFENSEUR', 2, 1),
(255, 'E. Sylvestre', 'player', 36, 'MILIEU', 4, 1),
(256, 'H. Mahou', 'player', 41, 'MILIEU', 4, 1),
(257, 'A. Gouiri', 'player', 43, 'ATTAQUANT', 4, 1),
(258, 'Yohan Cabaye', 'player', 49, 'MILIEU', 6, 1),
(259, 'O. Mandanda', 'player', 52, 'GARDIEN', 3, 1),
(260, 'P. Wade', 'player', 56, 'MILIEU', 4, 1),
(261, 'A. Lebeau', 'player', 57, 'MILIEU', 5, 1),
(262, 'F. Daniliuc', 'player', 58, 'DEFENSEUR', 4, 1),
(263, 'A. Ousame', 'player', 62, 'DEFENSEUR', 5, 1),
(264, 'S. Bajic', 'player', 64, 'GARDIEN', 6, 1),
(265, 'Ahmadou Bamba Dia', 'player', 67, 'GARDIEN', 2, 1),
(266, 'M. Aké', 'player', 68, 'ATTAQUANT', 2, 1),
(267, 'I. Diarra', 'player', 71, 'MILIEU', 3, 1),
(268, 'D. Bakwa', 'player', 72, 'ATTAQUANT', 3, 1),
(269, 'A. Traore', 'player', 73, 'ATTAQUANT', 3, 1),
(270, 'A. Aouchiche', 'player', 74, 'MILIEU', 6, 1),
(271, 'E. Guessand', 'player', 75, 'ATTAQUANT', 4, 1),
(272, 'S. Ngapandouetnbu', 'player', 77, 'GARDIEN', 2, 1),
(273, 'A. Muinga', 'player', 80, 'ATTAQUANT', 1, 1),
(274, 'M. Tshibuabua', 'player', 84, 'DEFENSEUR', 6, 1),
(275, 'X. Simons', 'player', 92, 'MILIEU', 1, 1),
(276, 'B. Fadiga', 'player', 93, 'MILIEU', 1, 1),
(277, 'K. Ruiz-Atil', 'player', 94, 'MILIEU', 1, 1),
(278, 'T. Pembele', 'player', 95, 'DEFENSEUR', 1, 1),
(279, 'M. Kapo', 'player', 96, 'MILIEU', 1, 1),
(280, 'M. Zerkane', 'player', 6, 'MILIEU', 3, 1),
(281, 'G. Innocent', 'player', 13, 'GARDIEN', 1, 1),
(282, 'I. Sow', 'player', 14, 'DEFENSEUR', 3, 1),
(283, 'A. Pierre', 'player', 24, 'GARDIEN', 5, 1),
(284, 'M. Rivera', 'player', 26, 'ATTAQUANT', 6, 1),
(285, 'A. Moueffek', 'player', 27, 'MILIEU', 6, 1),
(286, 'E. Green', 'player', 29, 'GARDIEN', 6, 1),
(287, 'T. Tormin', 'player', 30, 'ATTAQUANT', 6, 1),
(288, 'A. Sidibe', 'player', 34, 'ATTAQUANT', 6, 1),
(289, 'N. Ahmed', 'player', 36, 'MILIEU', 2, 1),
(290, 'J. Rolland', 'player', 37, 'GARDIEN', 4, 1),
(291, 'T. Boulhendi', 'player', 38, 'GARDIEN', 4, 1),
(292, 'F. Vanni', 'player', 39, 'GARDIEN', 2, 1),
(293, 'A. Kamardin', 'player', 41, 'DEFENSEUR', 2, 1),
(294, 'R. Richard', 'player', 42, 'DEFENSEUR', 2, 1),
(295, 'J. Rahou', 'player', 43, 'MILIEU', 2, 1),
(296, 'C. Souare', 'player', 44, 'MILIEU', 2, 1),
(297, 'L. Gourna-Douath', 'player', 46, 'MILIEU', 6, 1),
(298, 'A. Sotona', 'player', 47, 'ATTAQUANT', 4, 1),
(299, 'T. Lacoux', 'player', 51, 'MILIEU', 3, 1),
(300, 'S. Mara', 'player', 52, 'ATTAQUANT', 3, 1),
(301, 'M. Sellouki', 'player', 53, 'MILIEU', 4, 1),
(302, 'L. Prso', 'player', 54, 'DEFENSEUR', 4, 1),
(303, 'N. Crétier', 'player', 55, 'DEFENSEUR', 4, 1),
(304, 'B. Besic', 'player', 58, 'MILIEU', 5, 1),
(305, 'N. Sommer', 'player', 59, 'MILIEU', 5, 1),
(306, 'M. Senaya', 'player', 60, 'DEFENSEUR', 5, 1),
(307, 'T. Pionnier', 'player', 61, 'DEFENSEUR', 4, 1),
(308, 'S. Kari', 'player', 62, 'MILIEU', 4, 1),
(309, 'S. Ben Seghir', 'player', 63, 'ATTAQUANT', 4, 1),
(310, 'A. Trouillet', 'player', 64, 'MILIEU', 4, 1),
(311, 'U. Bertelli', 'player', 67, 'MILIEU', 2, 1),
(312, 'E. Bitshiabu', 'player', 72, 'DEFENSEUR', 1, 1),
(313, 'S. Sow', 'player', 76, 'DEFENSEUR', 6, 1),
(314, 'A. Duville-Parsemain', 'player', 77, 'ATTAQUANT', 4, 1),
(315, 'M. Randriamamy', 'player', 79, 'GARDIEN', 1, 1),
(316, 'Mauricio Pochettino', 'coach', NULL, NULL, 1, 1),
(317, 'Zoumana Camara', 'second_coach', NULL, NULL, 1, 1),
(318, 'André Villas-Boas', 'coach', NULL, NULL, 2, 1),
(319, 'Ricardo Carvalho', 'second_coach', NULL, NULL, 2, 1),
(320, 'Jean-Louis Gasset', 'coach', NULL, NULL, 3, 1),
(321, 'Patrick Colleter', 'second_coach', NULL, NULL, 3, 1),
(322, 'Adrian Ursea', 'coach', NULL, NULL, 4, 1),
(323, 'Frédéric Gioria', 'second_coach', NULL, NULL, 4, 1),
(324, 'Thierry Laurey', 'coach', NULL, NULL, 5, 1),
(325, 'Sébastien Roi', 'second_coach', NULL, NULL, 5, 1),
(326, 'Claude Puel', 'coach', NULL, NULL, 6, 1),
(327, 'Julien Sablé', 'second_coach', NULL, NULL, 6, 1);

-- --------------------------------------------------------

--
-- Structure de la table `player_detail`
--

CREATE TABLE `player_detail` (
  `id` int NOT NULL,
  `person_id` int NOT NULL,
  `match_sheet_id` int NOT NULL,
  `position` enum('AVANT','AILIER','MILIEU_OFF','MILIEU','MILIEU_DEF','ARRIERE','GARDIEN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `placement` enum('GAUCHE','CENTRE','DROIT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_captain` tinyint(1) DEFAULT '0',
  `is_second_captain` tinyint(1) DEFAULT '0',
  `is_spare` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `player_detail`
--

INSERT INTO `player_detail` (`id`, `person_id`, `match_sheet_id`, `position`, `placement`, `is_captain`, `is_second_captain`, `is_spare`) VALUES
(158, 151, 12, 'AVANT', 'CENTRE', 1, 0, 0),
(159, 149, 12, 'AVANT', 'CENTRE', 0, 0, 0),
(160, 150, 12, 'AVANT', 'GAUCHE', 0, 1, 0),
(161, 153, 12, 'MILIEU', 'CENTRE', 0, 0, 0),
(162, 152, 12, 'MILIEU', 'CENTRE', 0, 0, 0),
(163, 120, 12, 'MILIEU', 'CENTRE', 0, 0, 0),
(164, 195, 12, 'ARRIERE', 'GAUCHE', 0, 0, 0),
(165, 190, 12, 'ARRIERE', 'CENTRE', 0, 0, 0),
(166, 266, 12, 'ARRIERE', 'DROIT', 0, 0, 0),
(167, 246, 12, 'GARDIEN', NULL, 0, 0, 0),
(168, 163, 12, 'ARRIERE', 'CENTRE', 0, 0, 0),
(169, 100, 12, NULL, NULL, 0, 0, 1),
(170, 154, 12, NULL, NULL, 0, 0, 1),
(171, 155, 12, NULL, NULL, 0, 0, 1),
(172, 156, 12, NULL, NULL, 0, 0, 1),
(173, 104, 12, 'AVANT', 'GAUCHE', 0, 0, 0),
(174, 105, 12, 'AILIER', 'CENTRE', 1, 0, 0),
(175, 106, 12, 'MILIEU_OFF', 'GAUCHE', 0, 0, 0),
(176, 109, 12, 'MILIEU_DEF', 'GAUCHE', 0, 0, 0),
(177, 108, 12, 'MILIEU_OFF', 'CENTRE', 0, 1, 0),
(178, 101, 12, 'MILIEU', 'DROIT', 0, 0, 0),
(179, 126, 12, 'ARRIERE', 'GAUCHE', 0, 0, 0),
(180, 186, 12, 'ARRIERE', 'GAUCHE', 0, 0, 0),
(181, 273, 12, 'ARRIERE', 'GAUCHE', 0, 0, 0),
(182, 185, 12, 'ARRIERE', 'CENTRE', 0, 0, 0),
(183, 111, 12, 'GARDIEN', NULL, 0, 0, 0),
(184, 112, 12, NULL, NULL, 0, 0, 1),
(185, 113, 12, NULL, NULL, 0, 0, 1),
(186, 115, 12, NULL, NULL, 0, 0, 1),
(187, 117, 12, NULL, NULL, 0, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL,
  `club_id` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `club_id`) VALUES
(1, 'thierry', '2a08314de25588b753bcf7135893282c052ab90bf882f9b4b7e8449652f593aa', 'ADMIN', NULL),
(2, 'psg', '1d7a4cf68dcde36a2504e36ff8c29075dbac084ebb2eb491f008584281db0532', 'USER', 1),
(3, 'om', '38f53ad836232a86b54716a35a548039a16e889c78aa50cd184fef19a3b8c896', 'USER', 2),
(4, 'bdx', '5b61ee1bcbe69660ea2f90ad609e1c7eec9d9d952b10d824dc58a297de582d34', 'USER', 3),
(5, 'nice', 'e679dad6d75c35719edc830f1f254e931346f571abc5171ae4a85e71af5b1da2', 'USER', 4);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `arbiter_detail`
--
ALTER TABLE `arbiter_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B84BB4F7164D8144` (`person_id`),
  ADD KEY `IDX_B84BB4F75668DC33` (`match_sheet_id`);

--
-- Index pour la table `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `match_sheet`
--
ALTER TABLE `match_sheet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UNIQ_3956EE43D439C16A` (`home_club_id`) USING BTREE,
  ADD KEY `UNIQ_3956EE43EADE5854` (`visitor_club_id`) USING BTREE;

--
-- Index pour la table `metadata`
--
ALTER TABLE `metadata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_4F14341499E6F5DF` (`person_id`),
  ADD KEY `IDX_4F143414E48FD905` (`match_sheet_id`);

--
-- Index pour la table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_34DCD176F92F3E70` (`country_id`),
  ADD KEY `fk_constraint_club` (`club_id`);

--
-- Index pour la table `player_detail`
--
ALTER TABLE `player_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B106E94D99E6F5DF` (`person_id`),
  ADD KEY `IDX_B106E94DE48FD905` (`match_sheet_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `arbiter_detail`
--
ALTER TABLE `arbiter_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `club`
--
ALTER TABLE `club`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `country`
--
ALTER TABLE `country`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `match_sheet`
--
ALTER TABLE `match_sheet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `person`
--
ALTER TABLE `person`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=328;

--
-- AUTO_INCREMENT pour la table `player_detail`
--
ALTER TABLE `player_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `arbiter_detail`
--
ALTER TABLE `arbiter_detail`
  ADD CONSTRAINT `FK_B84BB4F75668DC33` FOREIGN KEY (`match_sheet_id`) REFERENCES `match_sheet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_constraint_arbiter_peroson` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

--
-- Contraintes pour la table `match_sheet`
--
ALTER TABLE `match_sheet`
  ADD CONSTRAINT `FK_3956EE43D439C16A` FOREIGN KEY (`home_club_id`) REFERENCES `club` (`id`),
  ADD CONSTRAINT `FK_3956EE43EADE5854` FOREIGN KEY (`visitor_club_id`) REFERENCES `club` (`id`);

--
-- Contraintes pour la table `metadata`
--
ALTER TABLE `metadata`
  ADD CONSTRAINT `fk_constraint_match_sheet_meta` FOREIGN KEY (`match_sheet_id`) REFERENCES `match_sheet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_constraint_person_meta` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

--
-- Contraintes pour la table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `FK_34DCD176F92F3E70` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `fk_constraint_club` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`);

--
-- Contraintes pour la table `player_detail`
--
ALTER TABLE `player_detail`
  ADD CONSTRAINT `FK_B106E94DE48FD905` FOREIGN KEY (`match_sheet_id`) REFERENCES `match_sheet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_constraint_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
