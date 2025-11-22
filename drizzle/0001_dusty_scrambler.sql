CREATE TABLE `giftSelections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`giftId` varchar(64) NOT NULL,
	`giftName` varchar(255) NOT NULL,
	`selectedBy` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `giftSelections_id` PRIMARY KEY(`id`)
);
