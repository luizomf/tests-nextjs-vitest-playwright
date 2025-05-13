CREATE TABLE `todo` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todo_description_unique` ON `todo` (`description`);