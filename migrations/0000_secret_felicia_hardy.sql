CREATE TABLE `directs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`fields` text DEFAULT (json_array()) NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`expires_at` text DEFAULT (date('now', '+1 month')) NOT NULL
);
