CREATE TABLE `template` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(128) NOT NULL COMMENT '模板名称',
	`description` VARCHAR(512) NOT NULL COMMENT '模板说明',
	`content` TEXT NOT NULL COMMENT 'freemarker模板内容',
	`group` VARCHAR(128) NOT NULL COMMENT '模板分组，如java/vue/menu..',
	`project` VARCHAR(255) NOT NULL COMMENT '模板所属项目(不同项目使用模板不同)',
	`template_engine` TINYINT(1) DEFAULT 0 COMMENT '模板引擎，默认0-freemarker',
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`created_by` VARCHAR(64),
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
	`updated_by` VARCHAR(64),
	PRIMARY KEY(`id`)
) COMMENT='模板表';


CREATE UNIQUE INDEX `template_index_0`
ON `template` (`id`);
CREATE INDEX `template_index_1`
ON `template` (`name`);
CREATE INDEX `template_index_2`
ON `template` (`project`);
