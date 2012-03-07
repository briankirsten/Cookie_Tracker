CREATE SCHEMA `cookie_gen` ;

use `cookie_gen`;

CREATE TABLE `cookie_id_seq` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1$$;
