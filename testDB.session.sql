SELECT "User"."id",
    "User"."firstName",
    "User"."lastName",
    "User"."email",
    "User"."password",
    "User"."status",
    "User"."createdAt",
    "User"."updatedAt",
    "User"."roleId"
FROM "Users" AS "User"
ORDER BY "User"."id" ASC