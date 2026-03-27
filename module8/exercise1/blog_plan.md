# Blog Application — Logical Data Model

> 💡 **What is a logical data model?** It's a blueprint for your database that describes what data you'll store and how it relates—without worrying about which specific database software (MySQL, PostgreSQL, etc.) you'll use.

---

## 0. Approach

A logical data model defines entities (tables), attributes (fields), primary keys, foreign keys, relationships, and normalization rules. It is independent of any specific database implementation.

> 💡 **Key terms:**
> - **Entity** = a table (e.g., User, Post)
> - **Attribute** = a column/field in a table (e.g., username, email)
> - **Primary Key (PK)** = a unique identifier for each row
> - **Foreign Key (FK)** = a field that links to another table's primary key
> - **Normalization** = organizing data to reduce redundancy and improve integrity

---

## 1. Entities & Attributes

### User
Represents people using the system.

- `user_id` (PK)
- `username`
- `email` (UNIQUE)
- `created_at`

> 💡 **Why `user_id` instead of using email as the primary key?** IDs are stable—even if a user changes their email, their `user_id` stays the same. This makes linking tables easier and more reliable.

### Post
Represents blog posts created by users.

- `post_id` (PK)
- `user_id` (FK → User)
- `title`
- `description`
- `image_url` (optional)
- `created_at`
- `updated_at`

> 💡 **What does `FK → User` mean?** It means this field references the `user_id` in the User table. This creates a link: each post "belongs to" a specific user.

### Comment
Represents comments on posts.

- `comment_id` (PK)
- `post_id` (FK → Post)
- `user_id` (FK → User)
- `comment_text`
- `created_at`

> 💡 **Why does Comment have TWO foreign keys?** A comment needs to know both *which post* it's on (`post_id`) and *who wrote it* (`user_id`).

### Like
Resolves the many-to-many relationship between users and posts.

- `user_id` (PK, FK → User)
- `post_id` (PK, FK → Post)
- `created_at`

> 💡 **What is a "many-to-many relationship"?** It means: one user can like many posts, AND one post can be liked by many users. To model this, we create a separate table (Like) that links users and posts together.

---

## 2. Primary Keys

| Entity  | Primary Key                  |
|---------|------------------------------|
| User    | `user_id`                    |
| Post    | `post_id`                    |
| Comment | `comment_id`                 |
| Like    | composite: `(user_id, post_id)` |

> 💡 **What is a composite primary key?** It's a primary key made of multiple columns. For Like, the combination of `user_id` + `post_id` uniquely identifies each row—this prevents the same user from liking the same post twice.

---

## 3. Relationships

- **User → Post (1:M)** — one user authors many posts. FK: `Post.user_id → User.user_id`
- **User → Comment (1:M)** — one user writes many comments. FK: `Comment.user_id → User.user_id`
- **Post → Comment (1:M)** — one post has many comments. FK: `Comment.post_id → Post.post_id`
- **User ↔ Post via Like (M:N)** — users like posts. FKs: `Like.user_id → User.user_id`, `Like.post_id → Post.post_id`

> 💡 **Understanding relationship notation:**
> - **1:M (One-to-Many)** = one record in Table A relates to many records in Table B (e.g., one user → many posts)
> - **M:N (Many-to-Many)** = many records in Table A relate to many records in Table B (e.g., many users → many posts via likes)

---

## 4. Normalization

Normalization is the process of organizing your database to minimize redundancy and avoid data anomalies.

- **1NF (First Normal Form)** — atomic fields, no repeating groups. Likes are stored as individual rows in the Like table, not as an array on Post or User.
- **2NF (Second Normal Form)** — all non-key attributes depend on the full primary key. In Like, `created_at` depends on the full composite key `(user_id, post_id)`, not on either column alone.
- **3NF (Third Normal Form)** — no transitive dependencies. Post stores only `user_id`, not `username` or any other derived user data. Those are retrieved via JOIN.

> 💡 **Why does normalization matter?**
> - **1NF** ensures each field holds only one value (e.g., you can't store multiple likes in a single cell)
> - **2NF** ensures data makes sense with the primary key (e.g., the like timestamp belongs to the specific user+post pair)
> - **3NF** avoids storing duplicate data (e.g., don't store the username in the Post table—just store `user_id` and look up the username when needed)

---

## 5. Constraints

Constraints are rules that the database enforces automatically.

- `User.email` — UNIQUE
- `Like(user_id, post_id)` — composite PK enforces no duplicate likes, no separate unique index needed
- `Post.image_url` — nullable

> 💡 **What do these constraints do?**
> - **UNIQUE** = ensures no two users can have the same email
> - **Composite PK** = ensures a user can't like the same post twice
> - **Nullable** = the field is optional; a post can exist without an image

---

## 6. Cardinality Summary

| Relationship              | Type        |
|---------------------------|-------------|
| User → Post               | 1 : many    |
| User → Comment            | 1 : many    |
| Post → Comment            | 1 : many    |
| User ↔ Post via Like      | many : many |

> 💡 **Cardinality** = the numerical relationship between two tables. It answers: "How many records in Table A can relate to records in Table B?"

---

## 7. Design Decisions

- Like uses a composite PK `(user_id, post_id)` instead of a surrogate `like_id` — the composite naturally enforces uniqueness and eliminates a redundant index.
- `Post.updated_at` added to support edit tracking, which is a near-universal requirement for blog content.
- `User.email` is marked UNIQUE at the logical level, not left as an optional application-layer concern.

> 💡 **What is a surrogate key?** It's an artificial primary key (like `like_id = 1, 2, 3...`) that has no real-world meaning. Here, we chose a composite key instead because it enforces a useful rule (no duplicate likes) automatically.
