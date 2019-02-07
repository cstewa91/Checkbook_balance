-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2019 at 11:20 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mycheckbook`
--
DROP DATABASE IF EXISTS `mycheckbook`;
CREATE DATABASE `mycheckbook`;
USE `mycheckbook`;
-- --------------------------------------------------------

--
-- Table structure for table `checkbook`
--

CREATE TABLE IF NOT EXISTS `checkbook` (
  `id` int(11) UNSIGNED NOT NULL,
  `type` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `amount` int(11) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `account` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checkbook`
--

INSERT INTO `checkbook` (`id`, `type`, `name`, `amount`, `date`, `account`) VALUES
(1, 'Income', 'Something', 55, NULL, 'Checking'),
(2, 'Income', 'Thing', 100, NULL, 'Savings'),
(3, 'Expense', 'Stuff', 6, NULL, 'Checking'),
(4, 'Income', 'Paycheck', 500, NULL, 'Checking');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkbook`
--
ALTER TABLE `checkbook`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkbook`
--
ALTER TABLE `checkbook`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
