-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2025 at 03:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cantake`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `merchant_id`, `name`, `description`, `price`, `prep_time`, `available`, `image_url`) VALUES
(1, 1, 'Bakarin Ayam Suwir', 'Nasi bakar gurih dengan isian ayam suwir spesial.', 10000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Upload/menu_68368f3328301_1748406067.png'),
(2, 1, 'Bakarin Tongkol Suwir', 'Nasi bakar nikmat dengan isian tongkol suwir bumbu.', 12000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Bakarin_Tongkol_Suwir.png'),
(3, 1, 'Bakarin Teri', 'Nasi bakar sedap dengan isian teri medan pedas.', 12000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Bakarin_Teri.png'),
(4, 1, 'Bakarin Cumi', 'Nasi bakar lezat dengan isian cumi asin menggoda.', 13000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Bakarin_Cumi.png'),
(5, 1, 'Bakarin Campur', 'Nasi bakar komplit dengan berbagai isian spesial.', 12000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Bakarin_Campur.png'),
(6, 1, 'Sate Ati Ampela', 'Sate ati ampela ayam, bumbu meresap.', 2000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Sate_Ati_Ampela.png'),
(7, 1, 'Ayam Goreng', 'Ayam goreng kampung renyah dan gurih.', 10000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Ayam_Goreng.png'),
(8, 1, 'Nasi Bakarin Besar', 'Nasi bakar porsi besar, lebih puas.', 15000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Nasi_Bakarin_Besar.png'),
(9, 2, 'Paket Nasi Pecel', '(Nasi+Tahu+Tempe+Pecel)', 10000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Paket_Nasi_Pecel.png'),
(10, 2, 'Paket Nasi Pecel Telor', '(Nasi+Tahu+Tempe+Telor+Pecel)', 13000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Paket_Nasi_Pecel_Telor.png'),
(11, 2, 'Paket Nasi Pecel Ayam', '(Nasi+Lalaban+Sambal)', 16000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Paket_Nasi_Pecel_Ayam.png'),
(12, 2, 'Paket Nasi Pecel Lele', '(Nasi+Lalaban+Sambal)', 14000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Paket_Nasi_Pecel_Lele.png'),
(13, 2, 'Nasi Uduk', 'Nasi uduk gurih khas Betawi.', 10000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Nasi_Uduk.png'),
(14, 2, 'Nasi Uduk Telor Balado', 'Nasi uduk komplit dengan telur balado pedas manis.', 15000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Nasi_Uduk_Telor_Balado.png'),
(15, 2, 'Telor Puyuh', 'Sate telur puyuh bacem atau bumbu kecap.', 3000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Telor_Puyuh.png'),
(16, 3, 'Soto Mie Rempah', 'Soto mie kaya rempah dengan potongan daging dan risol.', 15000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Soto Mie Rempah Bang Dede/Soto_Mie_Rempah.png'),
(17, 3, 'Soto Mie Rempah + Nasi', 'Soto mie rempah disajikan dengan nasi putih hangat.', 18000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Soto Mie Rempah Bang Dede/Soto_Mie_Rempah_+_Nasi.png'),
(18, 3, 'Soto Mie Rempah Full Daging', 'Soto mie rempah dengan porsi daging lebih banyak.', 18000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Soto Mie Rempah Bang Dede/Soto_Mie_Rempah_Full_Daging.png'),
(19, 3, 'Risol', 'Risol renyah isi sayuran dan bihun.', 2000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Soto Mie Rempah Bang Dede/Risol.png'),
(20, 3, 'Nasi Putih', 'Nasi putih pulen pendamping hidangan.', 3000.00, 1, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Soto Mie Rempah Bang Dede/Nasi _Putih.png'),
(21, 4, 'Java Tea Selasih', 'Teh selasih segar dengan aroma khas Jawa.', 5000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Java_Tea_Selasih.jpg'),
(22, 4, 'Milo Dino', 'Minuman Milo dingin dengan taburan bubuk Milo melimpah.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Milo_Dino.jpg'),
(23, 4, 'Teh Tarik', 'Teh tarik klasik dengan buih lembut.', 6000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Teh_Tarik.png'),
(24, 4, 'Ice Matcha', 'Minuman matcha latte dingin yang menyegarkan.', 5000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Ice_Matcha.jpg'),
(25, 4, 'Ice Chocolate', 'Minuman cokelat dingin klasik yang nikmat.', 5000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Ice_Chocolate.png'),
(26, 4, 'Ice Milo', 'Es Milo segar pelepas dahaga.', 6000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Ice_Milo.png'),
(27, 4, 'Nutrisari', 'Minuman Nutrisari berbagai rasa buah segar.', 5000.00, 2, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Nutrisari.jpg'),
(28, 4, 'Pop Ice', 'Minuman Pop Ice aneka rasa favorit.', 5000.00, 2, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Pop_Ice.jpg'),
(29, 4, 'Americano', 'Kopi hitam Americano klasik tanpa susu.', 13000.00, 5, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Americano.png'),
(30, 4, 'Kopi Susu Gula Aren', 'Kopi susu kekinian dengan manisnya gula aren.', 18000.00, 5, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Kopi_Susu_Gula_Aren.jpg'),
(31, 4, 'Cappucino', 'Cappucino klasik dengan foam susu lembut.', 6000.00, 5, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Cappucino.jpg'),
(32, 4, 'Mocha Latte', 'Mocha latte, perpaduan kopi, cokelat, dan susu.', 18000.00, 5, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Mocha_Latte.jpg'),
(33, 5, 'Bakso Echo Malang (Isi 7)', 'Bakso Malang komplit dengan 7 macam isian.', 15000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Bakso Echo Malang/Bakso_Echo_Malang_(Isi_7).jpg'),
(34, 5, 'Bakso Echo Malang (Isi 9)', 'Bakso Malang super komplit dengan 9 macam isian.', 18000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Bakso Echo Malang/Bakso_Echo_Malang_(Isi_9).jpg'),
(35, 5, 'Topping Bakso Goreng', 'Topping bakso goreng renyah untuk pelengkap.', 2500.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Bakso Echo Malang/Bakso_Goreng.jpg'),
(36, 5, 'Topping Kerupuk', 'Topping kerupuk renyah berbagai jenis.', 2000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Bakso Echo Malang/Topping_Kerupuk.jpg'),
(37, 5, 'Topping Mie', 'Topping mie kuning untuk tambahan bakso.', 3000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Bakso Echo Malang/Topping_Mie.jpg'),
(38, 6, 'Nasi Goreng Biasa', 'Nasi goreng klasik dengan bumbu spesial.', 12000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Goreng_Biasa.jpg'),
(39, 6, 'Nasi Goreng Teri', 'Nasi goreng dengan tambahan teri medan gurih.', 13000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Goreng_Teri.jpg'),
(40, 6, 'Nasi Goreng Ati', 'Nasi goreng dengan potongan ati ampela ayam.', 14000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Goreng_Ati.png'),
(41, 6, 'Nasi Goreng Omelet', 'Nasi goreng disajikan dengan telur dadar atau ceplok.', 15000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Goreng_Omelet.jpg'),
(42, 6, 'Nasi Goreng Spesial', 'Nasi goreng dengan topping komplit dan istimewa.', 17000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Goreng_Spesial.jpg'),
(43, 6, 'Nasi Goreng Gila', 'Nasi goreng pedas dengan topping beragam yang \"gila\".', 17000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Goreng_Gila.jpg'),
(44, 6, 'Mimastel', 'Mie Mastel, mie dengan bumbu khas dan topping pilihan.', 17000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Mimastel.jpg'),
(45, 6, 'Kwenastel', 'Kwenastel, kwetiau dengan bumbu khas dan topping pilihan.', 17000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Kwenastel.jpg'),
(46, 6, 'Mie Goreng / Rebus', 'Pilihan mie goreng atau mie rebus dengan bumbu lezat.', 13000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Mie_Goreng___Rebus.jpeg'),
(47, 6, 'Kwetiaw Goreng / Rebus', 'Pilihan kwetiau goreng atau rebus dengan bumbu khas.', 13000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Kwetiau_Goreng___Rebus.jpg'),
(48, 6, 'Bihun Goreng / Rebus', 'Pilihan bihun goreng atau rebus dengan cita rasa nikmat.', 13000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Bihun_Goreng___Kuah.jpg'),
(49, 6, 'Nasi Fuyunghai', 'Nasi dengan Fuyunghai telur tebal isi sayuran dan daging.', 17000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Fuyunghai.jpg'),
(50, 6, 'Nasi Capcay', 'Nasi dengan Capcay sayuran segar dan topping pilihan.', 17000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Capcay.jpg'),
(51, 7, 'Kebuli Telur', 'Nasi kebuli gurih dengan rempah khas dan telur.', 14000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Kebuli_Telur.png'),
(52, 7, 'Kebuli Telur + Sosis', 'Nasi kebuli dengan tambahan telur dan sosis.', 17000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Kebuli_Telur_+_Sosis.png'),
(53, 7, 'Kebuli Sosis Double', 'Nasi kebuli dengan porsi sosis double.', 17000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Kebuli_Sosis_Double.png'),
(54, 7, 'Kebuli Chicken Katsu', 'Nasi kebuli disajikan dengan chicken katsu renyah.', 18000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Kebuli_Chicken_Katsu.png'),
(55, 7, 'Kebuli Ayam Goreng', 'Nasi kebuli dengan lauk ayam goreng bumbu rempah.', 19000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Kebuli_Ayam_Goreng.png'),
(56, 7, 'Nasi Kebuli Beef Patty (Single)', 'Nasi kebuli dengan satu beef patty juicy.', 16000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Nasi_Kebuli_Beef_Patty_(Single).png'),
(57, 7, 'Nasi Kebuli Beef Patty (Double)', 'Nasi kebuli dengan dua beef patty, lebih mantap.', 20000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Nasi_Kebuli_Beef_Patty_(Double).png'),
(58, 7, 'Nasi aja', 'Nasi putih saja, porsi standar.', 10000.00, 1, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Nasi_Putih.png'),
(59, 8, 'Sate Taichan + Nasi / Lontong', 'Sate taichan pedas gurih disajikan dengan nasi atau lontong.', 18000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Taichan Mama Ika/Sate_Taichan_+_Nasi___Lontong.png'),
(60, 8, 'Sate Bumbu Kacang + Nasi / Lontong', 'Sate ayam bumbu kacang khas, disajikan dengan nasi atau lontong.', 20000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Taichan Mama Ika/Sate_Bumbu_Kacang_+_Nasi___Lontong.jpg'),
(61, 9, 'Paket Nasi Fried Chiken', 'Paket nasi dengan ayam goreng tepung renyah.', 13000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Paket_Nasi_Friend_Chicken.png'),
(62, 9, 'Paket Nasi Ayam Geprek', 'Paket nasi dengan ayam geprek pedas sambal bawang.', 15000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Paket_Nasi_Ayam_Geprek.png'),
(63, 9, 'Paket Nasi Ayam Bakar', 'Paket nasi dengan ayam bakar bumbu meresap.', 18000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Paket_Nasi_Ayam_Bakar.png'),
(64, 9, 'Paket Nasi Ayam Pedas Manis', 'Paket nasi dengan ayam bumbu pedas manis.', 15000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Paket_Nasi_Ayam_Pedes_Manis.png'),
(65, 9, 'Paket Nasi Chicken Katsu', 'Paket nasi dengan chicken katsu dan saus spesial.', 20000.00, 12, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Paket_Nasi_Chicken_Katsu.png'),
(66, 9, 'Hamburger', 'Hamburger klasik dengan daging patty dan sayuran segar.', 10000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Hamburger.png'),
(67, 9, 'Cheese Burger', 'Hamburger dengan tambahan keju slice lezat.', 12000.00, 8, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Cheese_Burger.png'),
(68, 9, 'Nasi Putih', 'Nasi putih pulen sebagai pelengkap.', 4000.00, 1, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Nasi_Putih.png'),
(69, 10, 'Soto Ayam Boyolali (Soto saja)', 'Soto ayam Boyolali bening segar, tanpa nasi.', 11000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Soto_Ayam_Boyolali.png'),
(70, 10, 'Soto Ayam Boyolali (Nasi Soto)', 'Soto ayam Boyolali disajikan dengan nasi putih.', 13000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Nasi_Soto_Ayam_Boyolali_(Nasi_Soto+Telur).png'),
(71, 10, 'Soto Ayam Boyolali (Nasi Soto + Telur)', 'Soto ayam Boyolali komplit dengan nasi dan telur rebus.', 15000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Nasi_Soto_Ayam_Boyolali_(Nasi_Soto+Telur).png'),
(72, 10, 'Soto Ayam Koya (Soto saja)', 'Soto ayam dengan taburan koya gurih, tanpa nasi.', 11000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Soto_Ayam_Koya (Soto_Saja).png'),
(73, 10, 'Soto Ayam Koya (Nasi Soto)', 'Soto ayam koya disajikan dengan nasi putih.', 13000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Soto_ Ayam_Koya_ (Nasi Soto + Telur).png'),
(74, 10, 'Soto Ayam Koya (Nasi Soto + Telur)', 'Soto ayam koya komplit dengan nasi dan telur rebus.', 15000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Soto_ Ayam_Koya_ (Nasi Soto + Telur).png'),
(75, 10, 'Rawon Daging (Rawon saja)', 'Rawon daging sapi khas dengan kuah hitam kluwek, tanpa nasi.', 16000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Rawon_Daging_(Rawon_saja).png'),
(76, 10, 'Rawon Daging (Nasi Rawon)', 'Rawon daging sapi disajikan dengan nasi putih.', 18000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Rawon_ Daging_Telur.png'),
(77, 10, 'Rawon Daging (Nasi Rawon + Telur)', 'Rawon daging sapi komplit dengan nasi dan telur asin.', 20000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Rawon_ Daging_Telur.png'),
(78, 10, 'Nasi Putih', 'Nasi putih pulen porsi pas.', 4000.00, 1, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Nasi_Putih.png'),
(79, 10, 'Telur Rebus', 'Telur ayam rebus, matang sempurna.', 3000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Telur_Rebus.png'),
(80, 10, 'Telur Asin', 'Telur bebek asin, gurih dan masir.', 5000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Telur_Asin.png'),
(81, 11, 'Jus Mangga', 'Jus mangga segar dari buah mangga pilihan.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Mangga.jpg'),
(82, 11, 'Jus Naga', 'Jus buah naga merah, kaya antioksidan.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Naga.jpg'),
(83, 11, 'Jus Alpukat', 'Jus alpukat kental dan creamy.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Alpukat.jpg'),
(84, 11, 'Jus Sirsak', 'Jus sirsak segar dengan rasa asam manis.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Sirsak.jpg'),
(85, 11, 'Jus Melon', 'Jus melon manis dan menyegarkan.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Melon.jpg'),
(86, 11, 'Jus Stroberi', 'Jus stroberi segar, kaya vitamin C.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Stroberi.jpg'),
(87, 11, 'Jus Jeruk', 'Jus jeruk peras murni, pelepas dahaga.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Jeruk.jpg'),
(88, 11, 'Jus Wortel', 'Jus wortel segar, baik untuk mata.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Wortel.jpg'),
(89, 11, 'Jus Tomat', 'Jus tomat segar, sumber likopen.', 7000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Tomat.jpg'),
(90, 11, 'Jus Jambu', 'Jus jambu biji merah, kaya serat.', 9000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Jambu.png'),
(91, 11, 'Jus Apel', 'Jus apel segar, manis alami.', 9000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Apel.jpg'),
(92, 11, 'Jus Terong Belanda', 'Jus terong Belanda, unik dan menyegarkan.', 9000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Terong_Belanda.jpg'),
(93, 11, 'Jus Pisang', 'Jus pisang susu, creamy dan mengenyangkan.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Pisang.jpg'),
(94, 11, 'Susu Dancow Vanilla dan Oreo', 'Susu Dancow vanilla dingin dengan taburan Oreo.', 7000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Susu_Dancow_Vanilla_dan_Oreo.jpg'),
(95, 11, 'Good Day dan Oreo', 'Kopi Good Day instan dengan taburan Oreo.', 5000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Good_Day_Oreo.jpg'),
(97, 12, 'Jasmine Original / Original 16oz', 'Es teh poci original, manis dan menyegarkan.', 5000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/20250417_141119.jpg'),
(101, 13, 'Mie Ayam Pangsit', 'Mie ayam klasik dengan pangsit rebus atau goreng.', 10000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Mie_Ayam_Pangsit.png'),
(102, 13, 'Mie Ayam Bakso Pangsit', 'Mie ayam komplit dengan bakso dan pangsit.', 13000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Mie_Ayam_Bakso_Pangsit.png'),
(103, 13, 'Mie Ayam Pangsit Double', 'Mie ayam porsi double dengan pangsit.', 12000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Mie_Ayam_Pangsit_Double.png'),
(104, 13, 'Mie Ayam Bakso Pangsit Double', 'Mie ayam porsi double komplit dengan bakso dan pangsit.', 15000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Mie_Ayam_Bakso_Pangsit_Double.png'),
(105, 13, 'Yamin Pangsit', 'Yamin manis atau asin dengan topping ayam dan pangsit.', 10000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Yamin_Pangsit.png'),
(106, 13, 'Yamin Bakso Pangsit', 'Yamin komplit dengan bakso dan pangsit.', 13000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Yamin_Bakso_Pangsit.png'),
(107, 13, 'Yamin Bakso Pangsit Double', 'Yamin porsi double komplit dengan bakso dan pangsit.', 15000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Yamin_Bakso_Pangsit_Double.png'),
(108, 13, 'Mie Ayam Lada Hitam', 'Mie ayam dengan bumbu lada hitam yang khas dan pedas.', 10000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Mie_Ayam_Lada_Hitam.png'),
(109, 13, 'Spagheti Bologhnise', 'Spaghetti dengan saus bolognese daging cincang klasik.', 10000.00, 10, 1, NULL),
(110, 13, 'Fettucini Bologhnise', 'Fettucini dengan saus bolognese daging cincang.', 10000.00, 10, 1, NULL),
(111, 13, 'Fusili Bologhnise', 'Fusili pasta dengan saus bolognese yang lezat.', 10000.00, 10, 1, NULL),
(112, 12, 'Es Teh Poci Rasa Apel', 'Es teh poci dengan kesegaran rasa apel.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Apel.png'),
(113, 12, 'Es Teh Poci Rasa Blackcurrant', 'Es teh poci dengan cita rasa blackcurrant yang khas.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Blackcurrant.png'),
(114, 12, 'Es Teh Poci Rasa Lemon', 'Es teh poci dengan sensasi asam segar lemon.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Lemon.png'),
(115, 12, 'Es Teh Poci Rasa Lemon Honey', 'Es teh poci perpaduan lemon dan madu yang nikmat.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Lemon_Honey.png'),
(116, 12, 'Es Teh Poci Rasa Lychee', 'Es teh poci dengan aroma dan rasa leci yang manis.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Lycheepng.png'),
(117, 12, 'Es Teh Poci Rasa Orange', 'Es teh poci dengan kesegaran jeruk.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Orange.png'),
(118, 12, 'Es Teh Poci Rasa Guava', 'Es teh poci dengan rasa jambu biji yang unik.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Guava.png'),
(119, 12, 'Es Teh Poci Rasa Mangga', 'Es teh poci dengan manisnya rasa mangga.', 8000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Mangga.png'),
(120, 12, 'Es Teh Poci Milk Tea Grape', 'Milk tea dengan rasa anggur yang unik.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Milk_Tea_Grape.png'),
(121, 12, 'Es Teh Poci Milk Tea Chocolate', 'Milk tea klasik dengan rasa cokelat.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Milk_Tea_Chocolate.png'),
(122, 12, 'Es Teh Poci Milk Tea Original', 'Milk tea original dengan rasa teh susu klasik.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Milk_Tea_Original.png'),
(123, 12, 'Es Teh Poci Milk Tea Taro', 'Milk tea dengan rasa taro yang khas dan creamy.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Milk_Tea_Taro.png'),
(124, 12, 'Es Teh Poci Milk Tea Cappucino', 'Milk tea dengan sentuhan rasa cappucino.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Milk_Tea_Cappucino.png'),
(125, 12, 'Milk Tea Rasa Apple (Baru)', 'Varian baru milk tea dengan rasa apel segar.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Milk_Tea_Rasa_Apple_(Baru).png'),
(126, 12, 'Milk Tea Rasa Blackcurrant (Baru)', 'Varian baru milk tea dengan rasa blackcurrant.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Milk_Tea_Rasa_Blackcurrant_(Baru).png'),
(127, 12, 'Milk Tea Rasa Mango (Baru)', 'Varian baru milk tea dengan rasa mangga manis.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Milk_Tea_Rasa_Mango_(Baru).png'),
(128, 12, 'Milk Tea Rasa Orange (Baru)', 'Varian baru milk tea dengan rasa jeruk segar.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Milk_Tea_Rasa_Orange_(Baru).png'),
(129, 11, 'Jus Stroberi + Susu Dancow', 'Perpaduan jus stroberi segar dengan susu Dancow creamy.', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Stroberi_+_Susu_Dancow.jpg'),
(130, 11, 'Jus Mix (Mangga + Naga)', 'Contoh Jus Mix', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Mix_(Mangga_+_Naga).jpg'),
(131, 11, 'Jus Mix (Sirsak + Jeruk)', 'Contoh Jus Mix', 10000.00, 3, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Mix_(Sirsak_+_Jeruk).jpg'),
(135, 1, 'Nasi Dibakar bakar', 'Enak mantap', 12000.00, 10, 1, 'CanTake/FrontEnd/public/assets/MainAssets/Upload/menu_68370f5a46129_1748438874.png');

-- --------------------------------------------------------

--
-- Table structure for table `merchants`
--

CREATE TABLE `merchants` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `merchant_name` varchar(255) NOT NULL,
  `qris_code_url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL COMMENT 'URL gambar thumbnail merchant'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `merchants`
--

INSERT INTO `merchants` (`id`, `user_id`, `merchant_name`, `qris_code_url`, `image_url`) VALUES
(1, 1, 'Nasi Bakar Ibu Neni', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Nasi Bakar Ibu Neni/Bakarin_Campur.png'),
(2, 2, 'DNE Kitchen', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/DNE Kitchen/Paket_Nasi_Pecel_Ayam.png'),
(3, 3, 'Soto Mie Rempah Bang Dede', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Soto Mie Rempah Bang Dede/Soto_Mie_Rempah_Full_Daging.png'),
(4, 4, 'Pina Coffee', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Pina Coffee/Ice_Chocolate.png'),
(5, 5, 'Bakso Echo Malang', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Bakso Echo Malang/Bakso_Echo_Malang_(Isi_9).jpg'),
(6, 6, 'Nasgorrr 962', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/NasGor 962/Nasi_Goreng_Spesial.jpg'),
(7, 7, 'Kebuli Pawonenur', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Kebuli Pawonenur/Kebuli_Chicken_Katsu.png'),
(8, 8, 'Taichan Mama Ika', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Taichan Mama Ika/Sate_Taichan_+_Nasi___Lontong.png'),
(9, 9, 'Pawon Bu Ina Kantin PNJ', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Pawon Bu Ina Kantin PNJ/Paket_Nasi_Ayam_Geprek.png'),
(10, 10, 'Kedai Bunda Rachma', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Kedai Bunda Rachma/Rawon_ Daging_Telur.png'),
(11, 11, 'Aneka Juice', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Aneka Juice/Jus_Jambu.png'),
(12, 12, 'Es Teh Poci', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Es Teh Poci/Es_Teh_Poci_Rasa_Thai_Tea.png'),
(13, 13, 'Mie Ayam N Pasta Berkah', NULL, 'CanTake/FrontEnd/public/assets/MainAssets/Mie Ayam dan Pasta Berkah/Mie_Ayam_Bakso_Pangsit.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `paid_at` datetime DEFAULT NULL,
  `accepted_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `rejection_reason_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `merchant_id`, `status_id`, `total_amount`, `created_at`, `paid_at`, `accepted_at`, `completed_at`, `rejection_reason_id`) VALUES
(1, 1, 1, 5, 32000.00, '2023-05-01 12:30:00', '2023-05-01 12:35:00', '2023-05-01 12:40:00', '2023-05-01 13:00:00', NULL),
(2, 2, 1, 5, 25000.00, '2023-05-01 13:15:00', '2023-05-01 13:20:00', '2023-05-01 13:25:00', '2023-05-01 13:45:00', NULL),
(3, 1, 2, 5, 24000.00, '2023-05-02 12:00:00', '2023-05-02 12:05:00', '2023-05-02 12:10:00', '2023-05-02 12:30:00', NULL),
(4, 2, 3, 5, 40000.00, '2023-05-02 18:30:00', '2023-05-02 18:35:00', '2023-05-02 18:40:00', '2023-05-02 19:00:00', NULL),
(5, 1, 4, 5, 43000.00, '2023-05-03 12:45:00', '2023-05-03 12:50:00', '2023-05-03 12:55:00', '2023-05-03 13:15:00', NULL),
(6, 2, 2, 5, 21000.00, '2023-05-03 19:00:00', '2023-05-03 19:05:00', '2023-05-03 19:10:00', '2023-05-03 19:30:00', NULL),
(7, 1, 3, 5, 33000.00, '2023-05-04 12:15:00', '2023-05-04 12:20:00', '2023-05-04 12:25:00', '2023-05-04 12:45:00', NULL),
(8, 2, 4, 5, 55000.00, '2023-05-04 18:45:00', '2023-05-04 18:50:00', '2023-05-04 18:55:00', '2023-05-04 19:15:00', NULL),
(9, 1, 1, 5, 40000.00, '2023-05-05 12:30:00', '2023-05-05 12:35:00', '2023-05-05 12:40:00', '2023-05-05 13:00:00', NULL),
(10, 2, 3, 5, 48000.00, '2023-05-05 19:15:00', '2023-05-05 19:20:00', '2023-05-05 19:25:00', '2023-05-05 19:45:00', NULL),
(11, 14, 6, 5, 15000.00, '2025-05-28 01:50:14', '2025-05-28 01:50:14', '2025-05-28 10:38:05', '2025-05-28 11:22:58', NULL),
(12, 14, 10, 4, 11000.00, '2025-05-28 02:07:43', '2025-05-28 02:07:43', '2023-05-05 19:25:00', NULL, 1),
(13, 16, 7, 2, 51000.00, '2025-05-28 02:21:53', '2025-05-28 02:21:53', '2023-05-05 19:25:00', NULL, NULL),
(14, 16, 4, 2, 5000.00, '2025-05-28 05:46:22', '2025-05-28 05:46:22', '2023-05-05 19:25:00', NULL, NULL),
(15, 16, 3, 2, 18000.00, '2025-05-28 06:02:22', '2025-05-28 06:02:22', NULL, NULL, NULL),
(16, 16, 1, 4, 10000.00, '2025-05-28 06:14:51', '2025-05-28 06:14:51', NULL, NULL, 7),
(17, 16, 10, 4, 3000.00, '2025-05-28 06:26:01', '2025-05-28 06:26:01', NULL, NULL, 6),
(18, 14, 1, 5, 10000.00, '2025-05-28 07:53:19', '2025-05-28 07:53:19', '2025-05-28 07:53:52', '2025-05-28 07:53:55', NULL),
(19, 17, 1, 5, 32000.00, '2025-05-28 08:33:59', '2025-05-28 08:33:59', '2025-05-28 08:35:05', '2025-05-28 08:37:44', NULL),
(20, 14, 2, 4, 23000.00, '2025-05-28 08:43:02', '2025-05-28 08:43:02', NULL, NULL, 8),
(21, 14, 1, 5, 10000.00, '2025-05-28 08:43:30', '2025-05-28 08:43:30', '2025-05-28 08:44:06', '2025-05-28 08:44:08', NULL),
(22, 18, 1, 5, 31000.00, '2025-05-28 12:39:30', '2025-05-28 12:39:30', '2025-05-28 12:40:05', '2025-05-28 12:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_at_order` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `menu_item_id`, `quantity`, `price_at_order`) VALUES
(1, 1, 1, 1, 15000.00),
(2, 1, 2, 1, 12000.00),
(3, 1, 4, 1, 5000.00),
(4, 2, 3, 1, 20000.00),
(5, 2, 4, 1, 5000.00),
(6, 3, 5, 1, 18000.00),
(7, 3, 8, 1, 6000.00),
(8, 4, 9, 1, 25000.00),
(9, 4, 10, 1, 15000.00),
(10, 5, 13, 1, 25000.00),
(11, 5, 14, 1, 18000.00),
(12, 6, 6, 1, 15000.00),
(13, 6, 8, 1, 6000.00),
(14, 7, 9, 1, 25000.00),
(15, 7, 12, 1, 8000.00),
(16, 8, 13, 1, 25000.00),
(17, 8, 15, 1, 30000.00),
(18, 9, 1, 1, 15000.00),
(19, 9, 3, 1, 20000.00),
(20, 9, 4, 1, 5000.00),
(21, 10, 9, 1, 25000.00),
(22, 10, 10, 1, 15000.00),
(23, 10, 12, 1, 8000.00),
(24, 11, 41, 1, 15000.00),
(25, 12, 72, 1, 11000.00),
(26, 13, 52, 2, 17000.00),
(27, 13, 53, 1, 17000.00),
(28, 14, 21, 1, 5000.00),
(29, 15, 18, 1, 18000.00),
(30, 16, 1, 1, 10000.00),
(31, 17, 79, 1, 3000.00),
(32, 18, 1, 1, 10000.00),
(33, 19, 1, 2, 10000.00),
(34, 19, 2, 1, 12000.00),
(35, 20, 10, 1, 13000.00),
(36, 20, 9, 1, 10000.00),
(37, 21, 1, 1, 10000.00),
(38, 22, 5, 1, 12000.00),
(39, 22, 6, 2, 2000.00),
(40, 22, 8, 1, 15000.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `status_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `status_name`) VALUES
(1, 'Pending'),
(2, 'Paid'),
(3, 'Accepted'),
(4, 'Rejected'),
(5, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `reject_reasons`
--

CREATE TABLE `reject_reasons` (
  `id` int(11) NOT NULL,
  `reason` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reject_reasons`
--

INSERT INTO `reject_reasons` (`id`, `reason`) VALUES
(1, 'Stok Habis'),
(2, 'Tutup'),
(3, 'Cancel'),
(4, 'Hal Lain'),
(5, 'Berubah pikiran'),
(6, 'Salah pesan'),
(7, 'Terlalu lama menunggu'),
(8, 'Alasan lain');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'buyer'),
(2, 'merchant');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `google_oauth_id` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `google_oauth_id`, `email`, `first_name`, `last_name`, `role_id`) VALUES
(1, 'NasiBakarIbuNeni', '123', NULL, 'nasibakaribuneni@example.com', 'Nasi Bakar', 'Ibu Neni', 2),
(2, 'DNEKitchen', '123', NULL, 'dnekitchen@example.com', 'DNE', 'Kitchen', 2),
(3, 'SotoMieBangDede', '123', NULL, 'sotomiebangdede@example.com', 'Soto Mie Rempah', 'Bang Dede', 2),
(4, 'PinaCoffee', '123', NULL, 'pinacoffee@example.com', 'Pina', 'Coffee', 2),
(5, 'BaksoEchoMalang', '123', NULL, 'baksoechomalang@example.com', 'Bakso Echo', 'Malang', 2),
(6, 'Nasgorrr962', '123', NULL, 'nasgorrr962@example.com', 'Nasgorrr', '962', 2),
(7, 'KebuliPawonenur', '123', NULL, 'kebulipawonenur@example.com', 'Kebuli', 'Pawonenur', 2),
(8, 'TaichanMamaIka', '123', NULL, 'taichanmamaika@example.com', 'Taichan', 'Mama Ika', 2),
(9, 'PawonBuInaPNJ', '123', NULL, 'pawonbuinapnj@example.com', 'Pawon Bu Ina', 'Kantin PNJ', 2),
(10, 'KedaiBundaRachma', '123', NULL, 'kedaibundarachma@example.com', 'Kedai Bunda', 'Rachma', 2),
(11, 'AnekaJuice', '123', NULL, 'anekajuice@example.com', 'Aneka', 'Juice', 2),
(12, 'EsTehPoci', '123', NULL, 'estehpoci@example.com', 'Es Teh', 'Poci', 2),
(13, 'MieAyamPastaBerkah', '123', NULL, 'mieayampastaberkah@example.com', 'Mie Ayam Pasta', 'Berkah', 2),
(14, 'Nurul', '123', NULL, 'apaanajadah@gmail.com', 'Nurul', 'Wahyuni', 1),
(15, 'Khalfani', '1234', NULL, 'mkafstudio@gmail.com', 'Khalfani', 'Ali', 1),
(16, 'nanda', '123', NULL, 'nanda@gmail.com', 'Ananda', 'Maria', 1),
(17, 'Ali', '123', NULL, 'aliebert34@gmail.com', 'Ali', 'Ai', 1),
(18, 'lada', '123', NULL, 'ladahitamcreation@gmail.com', 'lada', 'hitam', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `merchant_id` (`merchant_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `merchant_id` (`merchant_id`);

--
-- Indexes for table `merchants`
--
ALTER TABLE `merchants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `merchant_id` (`merchant_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `rejection_reason_id` (`rejection_reason_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reject_reasons`
--
ALTER TABLE `reject_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `google_oauth_id` (`google_oauth_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `merchants`
--
ALTER TABLE `merchants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reject_reasons`
--
ALTER TABLE `reject_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`);

--
-- Constraints for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`);

--
-- Constraints for table `merchants`
--
ALTER TABLE `merchants`
  ADD CONSTRAINT `merchants_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `order_status` (`id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`rejection_reason_id`) REFERENCES `reject_reasons` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
